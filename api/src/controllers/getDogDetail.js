const axios = require('axios');
require('dotenv').config();
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;

const getDogDetail = async (idRaza) => {
  try {
    const dogsBDD = await Dog.findAll ({
      include:{
        model: Temperament,
        atributes: ["id"],
        through:{
          atributes:[],
        },
      },
    });
  
    const response = ( await axios (`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
  
    const dogsAPI = response.map((dog) => {
      return {
        id: dog.id,
        imagen: dog.reference_image_id,
        nombre: dog.name,
        altura: dog.height.metric,
        peso: dog.weight.metric,
        vida: dog.life_span,
        temperamento: dog.temperament,
      }
    })
    const allDogs = [...dogsAPI,...dogsBDD];

    const dog = allDogs.find((d) => d.id === parseInt(idRaza, 10));

    if(dog){
      return dog;
    }else{
      throw "Raza no encontrada";
    }
  } catch (error) {
    throw "Error en la solicitud al buscar perros por raza";
  }
}

module.exports = {getDogDetail};