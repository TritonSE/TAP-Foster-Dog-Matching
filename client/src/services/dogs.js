/**
 *
 * Dogs Service
 *
 * Provides functions for Dogs API
 *
 */

const { getData, sendData, sendRawData } = require("./data");

/**
 * Create a dog
 *
 * @export
 * @param {object} newDog - new dog data
 * @return {object} - newly created dog (as a makeRequest response. see data.js)
 */
export async function createDog(newDog) {
  return sendData("dogs", "POST", newDog);
}

/**
 * Update an dog profile
 *
 * @export
 * @param {string} dogId - dog id to update
 * @param {object} updatedDog - updated dog data
 * @return {object} - updated dog (as a makeRequest response. see data.js)
 */
export async function updateDog(dogId, updatedDog) {
  return sendData(`dogs/${dogId}`, "PUT", updatedDog);
}

/**
 * Get dogs
 *
 * @export
 * @return {object} - dog objects (as a makeRequest response. see data.js)
 */
export async function getDogs() {
  return getData(`dogs`);
}

/**
 * Get a dog
 *
 * @export
 * @param {string} dogId - dog id to get
 * @return {object} - dog object (as a makeRequest response. see data.js)
 */
export async function getDog(dogId) {
  return getData(`dogs/${dogId}`);
}

export async function updateDogProfileImage(dogId, imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);
  return sendRawData(`dogs/photo/${dogId}`, "PUT", {}, formData);
}
