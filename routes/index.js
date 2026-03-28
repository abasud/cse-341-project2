import express from 'express';
import countriesRouter from './countriesRoute.js';
import touristsRouter from './touristsRoute.js';
import swaggerUi from "swagger-ui-express";
import fs from "fs";
const router = express.Router();

const swaggerDocument = JSON.parse(
  fs.readFileSync("./swagger.json", "utf-8")
);

router.get('/', (req, res) => {
    res.send("Hello world!");
});

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.use('/countries', countriesRouter);
router.use('/tourists', touristsRouter);

export default router;