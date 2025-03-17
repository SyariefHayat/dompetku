const { User } = require("../models/index.model");
const { ERROR } = require("./response");

const checkToken = async (req, res, next) => {
    const email = req.body.email || req.params.email;
    const token = req.body.token || req.params.token;

    if (!email || !token) {
        return ERROR(res, 400, "Invalid input: email and token are required.");
    }

    try {
        const user = await User.findOne({ email, token });
        if (!user) {
            return ERROR(res, 401, "Unauthorized: invalid email or token.");
        }
        req.user = user;
        next();
    } catch (error) {
        return ERROR(res, 500, "Error, Internal Server Error");
    }
};

module.exports = { checkToken };
