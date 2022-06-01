const { Dog } = require("../models");

/**
 * Returns an array of all dogs profiles
 */
function getDogs() {
  return Dog.find().exec();
}

/**
 * Returns a specific dog profile according to provided dog id
 * @param dogId - _id of dog
 */
function getDog(dogId) {
  return Dog.findById(dogId).exec();
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
