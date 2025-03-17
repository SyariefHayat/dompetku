const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    orderId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    transactionToken: { 
        type: String, 
    },
    transactionType: { 
        type: String, 
        enum: ["income", "expense", "transfer"], 
    },
    paymentType: {
        type: String,
    },
    vaNumbers: {
        va_number: { 
            type: String 
        },
        bank: { 
            type: String 
        },
    },
    issuer : { 
        type: String 
    },
    senderId: {
        type: String, 
        required: function() { return this.transactionType === "transfer"; } 
    },
    recipientId: { 
        type: String, 
        required: function() { return this.transactionType === "transfer"; } 
    },
    category: {
        type: String,
        required: function() { return this.transactionType === "expense"; }
    },
    status: { 
        type: String, 
        enum: ["pending", "settlement", "capture", "deny", "cancel", "expire", "refund"], 
        default: "pending" 
    },
}, { timestamps: true });

const notificationSchema = mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: function () { return this.type === "note"; },
    },
    type: {
        type: String,
        enum: ['note', 'task', 'list'],
        required: true,
    },
    subTasks: [
        {
            text: { type: String, required: true },
            isChecked: { type: Boolean, default: false },
        },
    ],
    listItems: [
        {
            text: { type: String, required: true },
        },
    ],
    color: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const PlanSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
    // targetAmount: {
    //     type: Number,
    //     required: function() { return this.type === "Nabung" },
    // },
    // endPlanning: {
    //     type: Date,
    //     required: true,
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0,
    },
    token: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    notes: [NoteSchema],
    plans: [PlanSchema],
    transactions: [TransactionSchema],
    notifications: [notificationSchema],
});

module.exports = {
    User: mongoose.model("User", UserSchema),
};