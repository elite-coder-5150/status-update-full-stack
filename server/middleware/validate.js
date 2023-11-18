const { check, validationResult } = require('express-validator');

export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
        return res.status(422).json({errors: errors.array()});
    }

    next();
}

export const validateNotification =[
    check('notify_id')
        .trim()
        .escape()
        .isRequired()
        .withMessage('id is required'),

    check('notify_by')
        .trim()
        .escape()
        .isLength({min: 4, max: 255})
        .withMessage('notify_by should be between 4 and 255 characters')
        .isRequired()
        .withMessage('notify_by is required'),

    check('type')
        .trim()
        .escape()
        .isMaxLength(255)
        .withMessage('type should be 255 or less')
        .isRequired()
        .withMessage('notify_by is required'),

    validate()
];