const { Application } = require("../models");

/**
 * Convert object to dot notation
 * Modified from https://stackoverflow.com/a/66853185
 * @param inputObject - object to convert
 * @param current - used to track object through recursive calls
 * @param prefinalObject - used to track eventual result through recursive calls
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
 * Returns all applications
 *  - Filter options
 *   - pending (boolean): true (returns all pending applications) or false
 *   - ambassador (string): filter by ambassador id 
 */
function getApplications({ pending, ambassador } = {}) {
  const filter = {};
  if (pending) {
    filter.pending = { $ne: "done" };
  }
  if (ambassador) {
    filter.ambassador = ambassador;
  }
  return Application.find(filter)
    .populate("user")
    .populate("coordinator")
    .populate("ambassador")
    .exec();
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
  getApplications,
  createApplication,
  updateApplication,
};
