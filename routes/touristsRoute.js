import express from 'express';
const router = express.Router();
import { validateTourist } from '../utilities/tourists-validation.js';
import { isAuthenticated } from '../utilities/auth.js';

import * as touristsController from '../controllers/touristsController.js';

router.get('/', touristsController.getAllTourists);
router.get('/:id', touristsController.getSingleTouristById);
router.get('/country/:countryId', touristsController.getTouristsByCountryId);

router.post(
    '/',
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Tourist data',
        required: true,
        schema: { $ref: '#/definitions/Tourist' }
    } */
    isAuthenticated,
    validateTourist, 
    touristsController.createTourist
);

router.put(
    '/:id',
    /* #swagger.parameters['id'] = { description: 'Unique ID of the tourist' },
        #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated tourist data',
        required: true,
        schema: { $ref: '#/definitions/Tourist' }
    } */
    isAuthenticated,
    validateTourist, 
    touristsController.updateTourist
);

router.delete('/:id', isAuthenticated, touristsController.deleteTourist);

export default router;