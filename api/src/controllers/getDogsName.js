const axios = require('axios');
require('dotenv').config();
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;

const getDogsName = async (name) => {
  try {
    const dogsBDD = await Dog.findAll ({
      include:{
        model: Temperament,
        atributes: ["name"],
        through:{
          atributes:[],
        },
      },
    });
  
    const response =  ( await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;

    const dogsAPI = response.map( (dog) => {
      return {
        id: dog.id,
        imagen: dog.reference_image_id,
        nombre: dog.name,
        altura: dog.height.metric,
        peso: dog.weight.metric,
        vida: dog.life_span,
        temperamento: dog.temperament,
      }
    });

    const allDogs = [...dogsAPI,...dogsBDD];

    const toLowerCaseName = name.toLowerCase();
    const dogsMatchingName = allDogs.find((dog) => dog.name.toLowerCase()
    .includes(toLowerCaseName));
    const maxResults = 5;
    const limitedResults = dogsMatchingName.slice(0, maxResults);

    if(limitedResults.length > 0) {
      return limitedResults;
    }else{
      throw "Nombre de perro no encontrado";
    }
  } catch (error) {
    throw "Error en la solicitud";
  }
}

module.exports = {getDogsName};