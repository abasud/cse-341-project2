import express from 'express';
const router = express.Router();
import { errorHandler } from '../utilities/error-handling.js';
import { validateCountry } from '../utilities/countries-validation.js';

import * as countriesController from '../controllers/countries.js';

router.get('/', errorHandler(countriesController.getAll));
router.get('/:id', errorHandler(countriesController.getSingle));

router.post(
    '/',
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Country data',
        required: true,
        schema: { $ref: '#/definitions/Country' }
    } */
    validateCountry, 
    errorHandler(countriesController.createCountry)
);

router.put(
    '/:id',
    /* #swagger.parameters['id'] = { description: 'Unique ID of the country' },
       #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated country data',
        required: true,
        schema: { $ref: '#/definitions/Country' }
    } */
    validateCountry, 
    errorHandler(countriesController.updateCountry)
);

router.delete('/:id', errorHandler(countriesController.deleteCountry));

export default router;