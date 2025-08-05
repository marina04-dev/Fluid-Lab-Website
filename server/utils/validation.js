const { body } = require('express-validator');

// Email validation
const validateEmail = () => body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address');

// Password validation
const validatePassword = () => body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number');

// Name validation
const validateName = (field = 'name') => body(field)
    .isLength({ min: 2, max: 50 })
    .trim()
    .escape()
    .withMessage(`${field} must be between 2 and 50 characters`);

// Text content validation
const validateText = (field, minLength = 1, maxLength = 1000) => body(field)
    .isLength({ min: minLength, max: maxLength })
    .trim()
    .withMessage(`${field} must be between ${minLength} and ${maxLength} characters`);

// URL validation
const validateUrl = (field) => body(field)
    .optional()
    .isURL()
    .withMessage(`${field} must be a valid URL`);

// Date validation
const validateDate = (field) => body(field)
    .isISO8601()
    .withMessage(`${field} must be a valid date`);

// Array validation
const validateArray = (field, minItems = 1) => body(field)
    .isArray({ min: minItems })
    .withMessage(`${field} must be an array with at least ${minItems} item(s)`);

// Enum validation
const validateEnum = (field, allowedValues) => body(field)
    .isIn(allowedValues)
    .withMessage(`${field} must be one of: ${allowedValues.join(', ')}`);

// MongoDB ObjectId validation
const validateObjectId = (field) => body(field)
    .isMongoId()
    .withMessage(`${field} must be a valid ID`);

module.exports = {
    validateEmail,
    validatePassword,
    validateName,
    validateText,
    validateUrl,
    validateDate,
    validateArray,
    validateEnum,
    validateObjectId
};