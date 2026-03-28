import { ObjectId } from 'mongodb';

export const getAllTourists = async (req, res) => {
    try {
        const db = req.app.locals.db;        
        const tourists = await db.collection('tourists').find().toArray();        
        res.status(200).json(tourists);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getSingleTouristById = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const touristId = new ObjectId(req.params.id);        
        const db = req.app.locals.db;
        const tourist = await db.collection('tourists').findOne({ _id: touristId });
        
        if (!tourist) {
            return res.status(404).json({ message: "Tourist place not found" });
        }

        res.status(200).json(tourist);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getTouristsByCountryId = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.countryId)) {
            return res.status(400).json({ message: "Invalid Country ID format" });
        }

        const countryId = req.params.countryId;
        const db = req.app.locals.db;        
        const touristsByCountry = await db.collection('tourists').find({ countryId }).toArray();        
        
        res.status(200).json(touristsByCountry);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const createTourist = async (req, res) => {
    try {
        const tourist = {
            name: req.body.name,
            description: req.body.description,
            city: req.body.city,
            rating: req.body.rating,
            annualVisitors: req.body.annualVisitors,
            isUNESCO: req.body.isUNESCO,
            category: req.body.category,
            countryId: req.body.countryId
        };

        const db = req.app.locals.db;
        const response = await db.collection('tourists').insertOne(tourist);

        if (response.acknowledged) {
            const createdTourist = {
                _id: response.insertedId,
                ...tourist
            };
            
            res.status(200).json({
                message: "Tourist place successfully created",
                tourist: createdTourist
            });
        } else {
            res.status(400).json({ message: "Failed to create tourist place" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const updateTourist = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const touristId = new ObjectId(req.params.id);
        
        const tourist = {
            name: req.body.name,
            description: req.body.description,
            city: req.body.city,
            rating: req.body.rating,
            annualVisitors: req.body.annualVisitors,
            isUNESCO: req.body.isUNESCO,
            category: req.body.category,
            countryId: req.body.countryId
        };

        const db = req.app.locals.db;
        const response = await db.collection('tourists').replaceOne({ _id: touristId }, tourist);

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: "Tourist place not found" });
        }

        if (response.modifiedCount > 0) {
            const updatedTourist = {
                _id: touristId,
                ...tourist
            };
            
            res.status(200).json({
                message: "Tourist place successfully updated",
                tourist: updatedTourist
            });
        } else {
            res.status(200).json({ message: "No changes made to the tourist place" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const deleteTourist = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const touristId = new ObjectId(req.params.id);
        const db = req.app.locals.db;
        const response = await db.collection('tourists').findOneAndDelete({ _id: touristId });

        const deletedTourist = response?.value || response;
        
        if (!deletedTourist) {
            return res.status(404).json({ message: "Tourist place not found" });
        }

        res.status(200).json({
            message: "Tourist place successfully deleted",
            tourist: deletedTourist
        });
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};