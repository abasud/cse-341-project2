import { ObjectId } from 'mongodb';

export const getAll = async (req, res) => {
        const db = req.app.locals.db;        
        const countries = await db.collection('countries').find().toArray();        
        res.status(200).json(countries);
};

export const getSingle = async (req, res) => {

        const countryId = new ObjectId(req.params.id);        
        const db = req.app.locals.db;
        const country = await db.collection('countries').findOne({ _id: countryId });
        res.status(200).json(country);
};

export const createCountry = async (req, res) => {
        
        const country = {
            name: req.body.name,
            capital: req.body.capital,
            population: req.body.population,
            officialLanguage: req.body.officialLanguage,
            currency: req.body.currency,
            region: req.body.region,
            areaKm2: req.body.areaKm2
        };

        const db = req.app.locals.db;

        const response = await db.collection('countries').insertOne(country);

        if (response.acknowledged) {
        
            const createdCountry = {
                _id: response.insertedId,
                ...country
            };
            
            res.status(200).json({
                message: "Country successfully created",
                country: createdCountry
            });
        }
    };

export const updateCountry = async (req, res) => {

        const countryId = new ObjectId(req.params.id);
        
        const country = {
            name: req.body.name,
            capital: req.body.capital,
            population: req.body.population,
            officialLanguage: req.body.officialLanguage,
            currency: req.body.currency,
            region: req.body.region,
            areaKm2: req.body.areaKm2
        };

        const db = req.app.locals.db;

        const response = await db.collection('countries').replaceOne({ _id: countryId }, country);

        if (response.modifiedCount > 0) {

            const updatedCountry = {
                _id: countryId,
                ...country
            };
            
            res.status(200).json({
                message: "Country successfully updated",
                country: updatedCountry
            });
        }
};

export const deleteCountry = async (req, res) => {

        const countryId = new ObjectId(req.params.id);

        const db = req.app.locals.db;

        const response = await db.collection('countries').findOneAndDelete({ _id: countryId });

        const deletedCountry = response && response.value ? response.value : response;
        
        if (deletedCountry) {

            res.status(200).json({
                message: "Country successfully deleted",
                country: deletedCountry
            });
        }
};