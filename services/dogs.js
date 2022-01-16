const { Dog } = require("../models");

/**
 * Returns an array of all dogs profiles
 */
function getDogs() {
  return Dog.find().exec();
}

/**
 * Returns a specific dog profile according to provided dog_id
 * @param dog_id - _id of dog
 */
function getDog(dog_id) {
  return Dog.findById(dog_id).exec();
}

/**
 * Create a dog profile
 * @param rawDogProfile - profile of dog to create
 */
async function createDog(rawDogProfile) {
  const dog = await new Dog(rawDogProfile).save();
  return dog;
}

/**
 * Update a dog profile
 * @param dogId - id of dog to update
 * @param updatedDogProfile - profile of updated dog
 */
async function updateDog(dogId, updatedDogProfile) {
  const updatedDog = await Dog.findByIdAndUpdate(dogId, updatedDogProfile, {
    new: true,
  }).exec();
  return updatedDog;
}

module.exports = {
  getDogs,
  getDog,
  createDog,
  updateDog,
};
