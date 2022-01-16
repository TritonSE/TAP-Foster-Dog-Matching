const { Interview } = require("../models");

/**
 * Retrieves the corresponding interview given an interview id
 * @param interviewId - _id of interview
 */
function getInterview(interviewId) {
  return Interview.findById(interviewId).exec();
}

/**
 * Create an interview
 * @param rawInterview - details of interview to create
 */
async function createInterview(rawInterview) {
  const interview = await new Interview(rawInterview).save();
  return interview;
}

module.exports = {
  getInterview,
  createInterview,
};
