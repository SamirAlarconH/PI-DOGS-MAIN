require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.DOG_API_KEY;


const getDogs = async (req, res) => {
  try {
    const response = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const data = response.data;

    const dogPromises = data.map(async (dog) => {
      return {
        id: dog.id,
        name: dog.name,
        image: dog.reference_image_id,
        height: dog.height.metric,
        weight: dog.weight.metric,
        life: dog.life_span,
        temperament: dog.temperament,
      };
    });

    const dogs = await Promise.all(dogPromises);

    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ message: " Error al obtener las razas de perros desde la API " });
  }
};

module.exports = { getDogs };
