const axios = require('axios');
require('dotenv').config();
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;

const getDogDetail = async (req, res) => {
  try {
    const dogsBDD = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["id"],
        through: {
          attributes: [],
        },
      },
    });

    const response = (await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;

    const dogsAPI = response.map((dog) => {
      return {
        id: dog.id,
        image: dog.reference_image_id,
        name: dog.name,
        height: dog.height.metric,
        weight: dog.weight.metric,
        life: dog.life_span,
        temperament: dog.temperament,
      }
    })
    const allDogs = [...dogsAPI, ...dogsBDD];

    const dogID = parseInt(req.params.id, 10);//Id raza por parámetro
    const dog = allDogs.find((d) => d.id === dogID);

    if (dog) {
      return res.json(dog);
    } else {
      return res.status(404).json({ message: "Raza no encontrada" });
    }
  } catch (error) {
     return res.status(500).json({ message: "Error en la solicitud al buscar perros por raza" });
  }
}

module.exports = { getDogDetail };