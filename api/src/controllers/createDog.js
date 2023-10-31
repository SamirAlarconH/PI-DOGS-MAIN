const { Dog, Temperament } = require("../db");

const createDog = async (req, res) => {
    
    try {
        const {
            name,
            image,
            height,
            weight,
            life,
            temperament
        } = req.body;

        if (!name || !image || !height || !weight) {
            return res.status(400).json({ error: "Los campos nombre, imagen, altura y peso son requeridos." });
        }

        const newDog = await Dog.create({
            name,
            image,
            height,
            weight,
            life,
        });

        const dogId = newDog.id;
        let associatedTemperaments = [];
        if (temperament) {
            const temperamentoArray = temperament.split(',').map((t) => t.trim());

            for(const nombreTemperamento of temperamentoArray){
                const temperamentoInstance = await Temperament.findOne({ where : { name : nombreTemperamento}});

                if(temperamentoInstance){
                    associatedTemperaments.push(temperamentoInstance);
                }
            }
            associatedTemperaments = await Temperament.findAll({
                where: {
                    name: temperament
                }
            });
        }
        await newDog.setTemperaments(associatedTemperaments);

        res.status(201).json(newDog);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { createDog };
