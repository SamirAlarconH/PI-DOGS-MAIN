const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getDogs } = require("../controllers/getDogs")
const { getDogDetail } = require("../controllers/getDogDetail");
const { getDogsName } = require("../controllers/getDogsName");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", async (req, res) => {
    try {
        const dogs = await getDogs();
        res.status(200).json(dogs);    
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
});

router.get("/dogs/:idRaza",  async(req, res) => {
    try {
        const dog = await getDogDetail(req.params.idRaza);
        res.json(dog);
    } catch (error) {
        res.status(500).json({error})
    }
});

router.get('/dogs/name', async (req, res) => {
    const name = req.query.name; // Obtén el nombre desde la query de la URL
    try {
      const dog = await getDogsName(name);
      res.status(200).json(dog);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  });

module.exports = router;
