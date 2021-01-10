// validators
const {body, } = require('express-validator');
const User = require('../models/user');

// email validator
exports.registerValidators = [
    body('email')
        .isEmail().withMessage('insert correct email')
        .custom(async (value, {req}) => {
            try {
                const user = await User.findOne({email: value});
                if (user) {
                    return Promise.reject('User with this email already exist');
                }
            } catch (e) {
                console.log(e);
            }
        }),
    body('password', 'Password must have at least 6 symbols an contain at leat 1 number')
        .isLength({min: 6, max: 52})
        .isAlphanumeric()
        .trim(),
    body('confirm')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Passwords need to be equal');
            }
            return true;
        })
        .trim(),
    body('name')
        .isLength({min: 3}).withMessage('Name must be at least 3 symbols')
        .trim(),
]

// course validator
exports.courseValidators = [
    body('title').isLength({min: 3}).withMessage('Name must be long at least 3 symbols')
        .trim(),
    body('price').isNumeric().withMessage('Insert correct price'),
    body('img', 'insert correct image url').isURL(),
]