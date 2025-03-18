require("dotenv").config();
const { SUCCESS, ERROR } = require("../utils/response")
const { User, Transaction } = require("../models/index.model")
const argon2 = require("argon2");
const midtransClient = require("midtrans-client");

const { CLIENT_KEY, SERVER_KEY } = process.env;

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: SERVER_KEY,
    clientKey: CLIENT_KEY,
});

const GetTransactions = async (req, res) => {
    return SUCCESS(res, 200, req.user, "success getting transactions data")
}

const AddTransaction = async (req, res) => {
    const { amount, transactionType, senderId, recipientId } = req.body;

    try {
        if (!transactionType) return ERROR(res, 400, "Transaction Type is required");

        const user = await User.findById(req.user._id);
        if (!user) return ERROR(res, 404, "User not found");

        let sender, recipient, data;

        if (transactionType === "transfer") {
            if (!senderId || !recipientId) return ERROR(res, 400, "Sender or recipient not provided");

            sender = senderId === "main-pocket" 
                ? user 
                : user.plans.find(plan => plan._id.toString() === senderId);
            
            recipient = user.plans.find(plan => plan._id.toString() === recipientId);

            if (!sender || !recipient) return ERROR(res, 400, "Invalid sender or recipient");

            if (senderId === "main-pocket") {

                sender.balance -= amount;
            } else {
                sender.amount -= amount;
            }

            recipient.amount += amount;

            const orderId = new Date().getTime();
            data = {
                orderId,
                amount,
                email: user.email,
                transactionType,
                senderId,
                recipientId,
                status: "settlement"
            }
        }

        user.transactions.push(data);
        await user.save();

        return SUCCESS(res, 201, data, "Transaction added successfully");
    } catch (error) {
        console.error(error);
        return ERROR(res, 500, "Error adding transaction");
    }
};

const MidtransTransaction = async (req, res) => {
    const { orderId, amount, email } = req.body;

    try {
        const transactionDetails = {
            transaction_details: {
                order_id: orderId,
                gross_amount: amount
            },
            customer_details: { email: email },
            callbacks: {
                finish: "http://localhost:5173/dashboard/payment/receipt"
            }
        };

        const transaction = await snap.createTransaction(transactionDetails);

        const user = await User.findOne({ email });
        if (!user) return ERROR(res, 404, "User not found");

        user.transactions.push({
            orderId,
            amount,
            email,
            transactionToken: transaction.token,
            status: transaction.status,
        });

        await user.save();

        res.json({ token: transaction.token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Create transaction failed" });
    }
};

const MidtransWebHook = async (req, res) => {
    const { order_id, transaction_status, payment_type, va_numbers, gross_amount, issuer } = req.body;

    try {
        // if (!order_id || !transaction_status) return ERROR(res, 400, "Data not found");

        // const updateFields = {
        //     $set: {
        //         "transactions.$.paymentType": payment_type,
        //         "transactions.$.status": transaction_status,
        //     },
        // };

        // if (payment_type === "bank" || payment_type === "bank_transfer") {
        //     updateFields.$set["transactions.$.vaNumbers"] = va_numbers;
        // } else {
        //     updateFields.$set["transactions.$.issuer"] = issuer;
        // }

        // // Update transaksi di dalam array transactions pada user
        // let updatedUser = await User.findOneAndUpdate(
        //     { "transactions.orderId": order_id },
        //     { 
        //         ...updateFields,
        //         ...(transaction_status === "settlement" || transaction_status === "capture"
        //             ? { $inc: { balance: parseFloat(gross_amount) } }
        //             : {})
        //     },
        //     { new: true }
        // );

        // if (!updatedUser) return ERROR(res, 404, "Transaction not found");

        // return SUCCESS(res, 200, updatedUser, "Success updated data");
        return SUCCESS(res, 200, null, "Success updated data");
    } catch (error) {
        console.error(error);
        return ERROR(res, 500, "Error updating data");
    }
};


const GetUserTransactions = async (req, res) => {
    const { order_id } = req.params;

    try {
        if (!order_id) return ERROR(res, 400, "Data not found");

        const userTransactions = await User.findOne(
            { "transactions.orderId": order_id },
            { "transactions.$": 1 }
        )
        if (!userTransactions) return ERROR(res, 404, "User not found");

        return SUCCESS(res, 200, userTransactions, "success getting transactions data");
    } catch (error) {
        console.error(error);
        return ERROR(res, 500, "Error getting data");
    }
}

const SignInToken = async (req, res) => {
    try {
        const { email, password, token } = req.body;

        let user = await User.findOne({ email });
        if (!user) return Error(res, 404, "User not found")

        const valid = await argon2.verify(user.password, password)
        if (!valid) return Error(res, 401, "Invalid password")
        
        user.token = token;
        await user.save();

        return SUCCESS(res, 200, null, "Success signing in token");
    } catch (error) {
        return Error(res, 500, "Error signing in");
    }
}

const SignUpUser = async (req, res) => {
    const { username, email, password } = req.body;
    const hassPass = await argon2.hash(password);
    
    try {
        const user = await User.findOne({ email });
        
        if (user) {
            return ERROR(res, 409, "Email alredy exists");
        }
        
        const addNewUser = new User({ username, email, password: hassPass })
        await addNewUser.save();

        return SUCCESS(res, 201, addNewUser._id, "User created successfully");
    } catch (error) {
        return ERROR(res, 500, "Signup failed");
    }
}

const AddNote = async (req, res) => {
    const { title, content, type, subTasks, listItems, color } = req.body;
    
    try {
        const user = await User.findById(req.user._id);
        if (!user) return ERROR(res, 404, "User not found");

        user.notes.push({
            title,
            content,
            type,
            subTasks,
            listItems,
            color,
        });

        await user.save();

        return SUCCESS(res, 201, null, "Note added successfully");
    } catch (error) {
        console.error(error);
        return ERROR(res, 500, "Error adding note");
    }
};

const GetNote = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return ERROR(res, 404, "User not found");

        return SUCCESS(res, 200, user.notes, "Success getting notes data");
    } catch (error) {
        console.error(error);
        return ERROR(res, 500, "Error getting notes data");
    }
};

const UpdateNote = async (req, res) => {
    const noteId = req.params.id;
    const data = req.body;

    try {
        if (!noteId || !data) return ERROR(res, 400, "Data not found");

        const user = await User.findById(req.user._id);
        if (!user) return ERROR(res, 404, "User not found");

        const note = user.notes.id(noteId);
        if (!note) return ERROR(res, 404, "Notes not found");

        Object.assign(note, data);

        await user.save();

        return SUCCESS(res, 200, note, "Success updated data");
    } catch (error) {
        console.error(error);
        return ERROR(res, 500, "Error updating data");
    }
};

const DeleteNote = async (req, res) => {
    const noteId = req.params.id;

    try {
        if (!noteId) return ERROR(res, 400, "Note id is required");

        const user = await User.findById(req.user._id);
        if (!user) return ERROR(res, 404, "User not found");

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { notes: { _id: noteId } } },
            { new: true }
        );

        if (!updatedUser) return ERROR(res, 404, "Note not found");

        return (res, 200, null, "Note deleted successfully");
    } catch (error) {
        console.error(error);
        return (res, 500, "Error deleting note");
    }
};

const AddPlan = async (req, res) => {
    const { title, desc, type, color, amount } = req.body;

    try {
        const user = await User.findById(req.user._id);
        if (!user) return ERROR(res, 404, "User not found");

        user.plans.push({
            title,
            desc,
            type,
            color,
            amount,
            // targetAmount,
            // endPlanning,
        });

        await user.save();

        return SUCCESS(res, 201, null, "Plan added succesfully");
    } catch (error) {
        console.error(error);
        return ERROR(res, 500, "Error adding plan")
    }
}

// const GetPlan = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id);
//         if (!user) return ERROR(res, 404, "User not found");

//         return SUCCESS(res, 200, user.plans, "Success getting plans data");
//     } catch (error) {
//         console.error(error);
//         return ERROR(res, 500, "Error getting plan data");
//     }
// }

// const UpdatePlan = async (req, res) => {
//     const planId = req.params.id;
//     const data = req.body;

//     try {
//         if (!planId && !data) return ERROR(res, 400, "Data not found");

//         const user = await User.findById(req.user._id);
//         if (!user) return ERROR(res, 404, "User not found");

//         const plan = user.plans.id(planId);
//         if (!plan) return ERROR(res, 404, "Plans not found");

//         Object.assign(plan, data);

//         await user.save();

//         return SUCCESS(res, 200, plan, "Success updated data")
//     } catch (error) {
//         console.error(error);
//         return ERROR(res, 500, "Error updating data");
//     }
// }

const DeletePlan = async (req, res) => {
    const planId = req.params.id

    try {
        if (!planId) return ERROR(res, 400, "Plan id is required");

        const user = await User.findById(req.user._id);
        if (!user) return ERROR(res, 404, "User not found");

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { plans: { _id: planId } } },
            { new: true }
        );

        if (!updatedUser) return ERROR(res, 404, "Plan not found");

        return SUCCESS(res, 200, null, "Plan deleted successfully");
    } catch (error) {
        console.error(error)
        return ERROR(res, 500, "Error deletign plan")
    }
}

module.exports = {
    GetTransactions,
    AddTransaction,
    MidtransTransaction,
    MidtransWebHook,
    GetUserTransactions,
    SignInToken,
    SignUpUser,
    AddNote,
    GetNote,
    UpdateNote,
    DeleteNote,
    AddPlan,
    // GetPlan,
    // UpdatePlan,
    DeletePlan,
}