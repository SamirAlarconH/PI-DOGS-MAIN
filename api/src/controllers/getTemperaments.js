const axios = require('axios');
const { API_KEY } = process.env;
const { Temperament } = require('../db.js');

const getTemperaments = async () => {
  try {

    const response = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const data = response.data;

    const allTemperaments = data.map((dog) => dog.temperament).join(', ').split(', ');

    const unicosTemperamentos = Array.from(new Set(allTemperaments));
    await Temperament.bulkCreate(unicosTemperamentos.map(name => ({ name })));

    return "Temperamentos obtenidos y guardados en la base de datos"
  } catch (error) {
    throw new Error("Error al obtener y guardar los temperamentos");
  }
}

const getAllTemperaments = async (req, res) => {
  try {
    const temperaments = await Temperament.findAll({
      attributes: ['name'], // Asegúrate de que el nombre del campo sea el correcto
    });

    res.status(200).json(temperaments);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los temperamentos' });
  }
};

module.exports = { getTemperaments, getAllTemperaments };