import { check, validationResult } from "express-validator";

export const validateCountry = [
  check("name").notEmpty().isString().isLength({ min: 2, max: 60 }),
  check("capital").notEmpty().isString().isLength({ min: 2, max: 60 }),
  check("population").notEmpty().isInt({ min: 1 }),
  check("officialLanguage").notEmpty().isString(),
  check("currency").notEmpty().isString(),
  check("region").isIn([
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "Central America",
    "South America",
    "Oceania"
  ]),
  check("areaKm2").notEmpty().isInt({ min: 1 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];