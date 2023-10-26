require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.DOG_API_KEY;


const getDogs = async () => {
  try {
    const response = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const data = response.data;

    const dogPromises = data.map(async (perro) => {
      return {
        id: perro.id,
        imagen: perro.reference_image_id,
        nombre: perro.name,
        altura: perro.height.metric, // Ajusta a la propiedad correcta de altura
        peso: perro.weight.metric, // Ajusta a la propiedad correcta de peso
        vida: perro.life_span,
        temperamento: perro.temperament,
      };
    });

    const dogs = await Promise.all(dogPromises);

    return dogs;
  } catch (error) {
    throw new Error(" Error al obtener las razas de perros desde la API ");
  }
};

module.exports = {getDogs};
