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
  
    const response = ( await axios (`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
  
    const dogsAPI = response.map((dog) => {
      return {
        id: dog.id,
        image: dog.image,
        name: dog.name.toLowerCase(),
        height: dog.height.metric,
        weight: dog.weight.metric,
        life: dog.life,
      }
    })
    const allDogs = [...dogsAPI,...dogsBDD];

    const toLowerCaseName = name.toLowerCase();
    const dog = allDogs.find((d) => d.name === (toLowerCaseName));

    if(dog){
      return dog;
    }else{
      throw "Nombre de perro no encontrado";
    }
  } catch (error) {
    throw "Error en la solicitud";
  }
}

module.exports = {getDogsName};