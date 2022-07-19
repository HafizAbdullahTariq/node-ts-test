import { query } from 'express-validator/check'

const suggestionValidationRule = [
  query('q')
    .isAlpha()
    .withMessage('The "q" search term is required and contain only letters.'),
  query('latitude')
    .optional()
    .isNumeric()
    .withMessage('The "latitude" should be a number'),
  query('longitude')
    .optional()
    .isNumeric()
    .withMessage('The "longitude" should be a number'),
  query('radius')
    .optional()
    .isNumeric()
    .withMessage('The "radius" should be a number')
]

export default suggestionValidationRule
