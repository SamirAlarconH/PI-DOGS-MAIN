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
        image: dog.image,
        name: dog.name,
        height: dog.height.metric,
        weight: dog.weight.metric,
        life: dog.life,
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
    throw "Error en la solicitud";
  }
}

module.exports = {getDogDetail};