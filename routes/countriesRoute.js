import express from 'express';
const router = express.Router();
import { validateCountry } from '../utilities/countries-validation.js';

import * as countriesController from '../controllers/countriesController.js';

router.get('/', countriesController.getAllCountries);
router.get('/:id', countriesController.getSingleCountry);

router.post(
    '/',
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Country data',
        required: true,
        schema: { $ref: '#/definitions/Country' }
    } */
    validateCountry, 
    countriesController.createCountry
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
    countriesController.updateCountry
);

router.delete('/:id', countriesController.deleteCountry);

export default router;