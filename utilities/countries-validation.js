import { check, validationResult } from 'express-validator';

export const validateCountry = [
  check("name")
    .notEmpty().withMessage("Name is required").bail()
    .isString().withMessage("Name must be a string text").bail()
    .isLength({ min: 2, max: 60 }).withMessage("Name must be between 2 and 60 characters"),

  check("capital")
    .notEmpty().withMessage("Capital is required").bail()
    .isString().withMessage("Capital must be a string text").bail()
    .isLength({ min: 2, max: 60 }).withMessage("Capital must be between 2 and 60 characters"),

  check("population")
    .notEmpty().withMessage("Population is required").bail()
    .isInt({ min: 1 }).withMessage("Population must be a positive integer number"),

  check("officialLanguage")
    .notEmpty().withMessage("Official language is required").bail()
    .isString().withMessage("Official language must be a string text"),

  check("currency")
    .notEmpty().withMessage("Currency is required").bail()
    .isString().withMessage("Currency must be a string text"),

  check("region")
    .notEmpty().withMessage("Region is required").bail()
    .isIn([
      "Africa", "Asia", "Europe", "North America", 
      "Central America", "South America", "Oceania"
    ]).withMessage("Invalid region. Must be a valid continent (e.g., South America)"),

  check("areaKm2")
    .notEmpty().withMessage("Area in Km2 is required").bail()
    .isInt({ min: 1 }).withMessage("Area must be a positive integer number"),

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