const axios = require('axios');
require('dotenv').config();
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;

const getDogsName = async (req, res) => {
  try {
    const dogsBDD = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
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
    });

    const allDogs = [...dogsAPI, ...dogsBDD];

    const toLowerCaseName = req.query.name.toLowerCase();
    const dogsMatchingName = allDogs.filter((dog) => dog.name.toLowerCase().includes(toLowerCaseName));
    const maxResults = 5;

    if (Array.isArray(dogsMatchingName) && dogsMatchingName.length > 0) {
      const limitedResults = dogsMatchingName.slice(0, maxResults);
      res.json(limitedResults);
    } else {
      res.status(404).json({ message: "Nombre de perro no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en la solicitud al buscar perros por nombre" });
  }
}

module.exports = { getDogsName };