const { Application } = require("../models");

/**
 * Returns a specific application profile according to provided application id
 * @param applicationId - _id of application
 */
function getApplication(applicationId) {
  return Application.findById(applicationId).exec();
}

/**
 * Create a application profile
 * @param rawApplicationProfile - profile of application to create
 */
async function createApplication(rawApplicationProfile) {
  const application = await new Application(rawApplicationProfile).save();
  return application;
}

/**
 * Update a application profile
 * @param applicationId - id of application to update
 * @param updatedApplicationProfile - profile of updated application
 */
async function updateApplication(applicationId, updatedApplicationProfile) {
  const updatedApplication = await Application.findByIdAndUpdate(
    applicationId,
    updatedApplicationProfile,
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
