const jwt = require('jsonwebtoken');
const User = require('../Modals/UserSchema');
const  JWT_SECRET  = "*mohdAziimbhatti@#12#";

const authorize = async (req, res, next) => {
    console.log("tokeenn" ,req.headers)
    try {
        const token = req?.headers?.authorization?.split(' ')?.pop();
        if (!token) {
            throw { message: "error token missing", statusCode: 400 };
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            throw { message: "Invalid token", statusCode: 401 };
        }

        const user = await User.findById(decoded.id).lean();
        if (!user) {
            throw { message: "Account doesnot exist", statusCode: 401 };
        }
        if (user.isDeleted || !user.isActive) {
            throw { message: "Account Deactivated", statusCode: 401 };
        }
        req.user = user;
        return next();
    } catch (err) {
        console.log('error', err);
        let message = null;
        if (err.name == 'TokenExpiredError') {
            message = "Token expired";
        } else if (err.name == 'JsonWebTokenError') {
            message = "Invalid Token";
        } else {
            message = err.message || "Error";
        }
        let errorObj = {
            message: message,
            error: err,
        };
        return res.status(err.statusCode || 401).json(errorObj);
    }
};

module.exports = authorize;
