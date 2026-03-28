import { ObjectId } from 'mongodb';

export const getAllCountries = async (req, res) => {
    try {
        const db = req.app.locals.db;        
        const countries = await db.collection('countries').find().toArray();        
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getSingleCountry = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const countryId = new ObjectId(req.params.id);        
        const db = req.app.locals.db;
        const country = await db.collection('countries').findOne({ _id: countryId });
        
        if (!country) {
            return res.status(404).json({ message: "Country not found" });
        }

        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const createCountry = async (req, res) => {
    try {
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
        } else {
            res.status(400).json({ message: "Failed to create country" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const updateCountry = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

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

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: "Country not found" });
        }

        if (response.modifiedCount > 0) {
            const updatedCountry = {
                _id: countryId,
                ...country
            };
            
            res.status(200).json({
                message: "Country successfully updated",
                country: updatedCountry
            });
        } else {
            res.status(200).json({ message: "No changes made to the country" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const deleteCountry = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const countryId = new ObjectId(req.params.id);
        const db = req.app.locals.db;

        const response = await db.collection('countries').findOneAndDelete({ _id: countryId });

        const deletedCountry = response?.value || response;
        
        if (!deletedCountry) {
            return res.status(404).json({ message: "Country not found" });
        }

        res.status(200).json({
            message: "Country successfully deleted",
            country: deletedCountry
        });
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};