const { Router } = require('express');
const { getDogs } = require("../controllers/getDogs")
const { getDogDetail } = require("../controllers/getDogDetail");
const { getDogsName } = require("../controllers/getDogsName");
const { getTemperaments, getAllTemperaments } = require("../controllers/getTemperaments");
const { createDog } = require("../controllers/createDog");

const router = Router();

router.get("/dogs", getDogs);

router.post("/dogs", createDog);

router.get('/dogs/name', getDogsName);

router.get("/temperaments", getTemperaments);

router.get("/dogs/temperaments", getAllTemperaments);

router.get("/dogs/:id", getDogDetail);


module.exports = router;
