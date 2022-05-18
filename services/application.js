const { Application } = require("../models");

/**
 * Convert object to dot notation
 * Modified from https://stackoverflow.com/a/66853185
 * @param object - object to convert
 */
function changeObjectToDotNotationFormat(inputObject, current, prefinalObject) {
  const result = prefinalObject || {};
  Object.keys(inputObject).forEach((key) => {
    const value = inputObject[key];
    const newKey = current ? `${current}.${key}` : key;
    if (value && typeof value === "object") {
      changeObjectToDotNotationFormat(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  });
  return result;
}

/**
 * Returns a specific application according to provided application id
 * @param applicationId - _id of application
 */
function getApplication(applicationId) {
  return Application.findById(applicationId).exec();
}

/**
 * Create a application
 * @param rawApplicationProfile - application to create
 */
async function createApplication(rawApplicationProfile) {
  const application = await new Application(rawApplicationProfile).save();
  return application;
}

/**
 * Update a application
 * @param applicationId - id of application to update
 * @param updatedApplicationProfile - updated application
 */
async function updateApplication(applicationId, updatedApplicationProfile) {
  const updatedApplication = await Application.findByIdAndUpdate(
    applicationId,
    changeObjectToDotNotationFormat(updatedApplicationProfile),
    {
      new: true,
    }
  ).exec();

  return updatedApplication;
}

module.exports = {
  getApplication,
  createApplication,
  updateApplication,
};
