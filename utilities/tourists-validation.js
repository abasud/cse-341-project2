import { check, validationResult } from 'express-validator';

export const validateTourist = [
    check("name")
        .notEmpty().withMessage("Name is required").bail()
        .isString().withMessage("Name must be a string text").bail()
        .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters"),

    check("description")
        .notEmpty().withMessage("Description is required").bail()
        .isString().withMessage("Description must be a string text").bail()
        .isLength({ min: 10, max: 1000 }).withMessage("Description must be between 10 and 1000 characters"),

    check("city")
        .notEmpty().withMessage("City is required").bail()
        .isString().withMessage("City must be a string text").bail()
        .isLength({ min: 2, max: 80 }).withMessage("City must be between 2 and 80 characters"),

    check("rating")
        .notEmpty().withMessage("Rating is required").bail()
        .isFloat({ min: 0, max: 5 }).withMessage("Rating must be a number between 0 and 5"),

    check("annualVisitors")
        .notEmpty().withMessage("Annual visitors is required").bail()
        .isInt({ min: 0 }).withMessage("Annual visitors must be a positive integer"),

    check("isUNESCO")
        .notEmpty().withMessage("isUNESCO field is required").bail()
        .isBoolean().withMessage("isUNESCO must be a boolean value (true or false)"),

    check("category")
        .notEmpty().withMessage("Category is required").bail()
        .isString().withMessage("Category must be a string text"),

    check("countryId")
        .notEmpty().withMessage("Country ID is required").bail()
        .isMongoId().withMessage("Invalid Country ID format"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            });
        }
        next();
    }
];