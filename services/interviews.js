const { Interview } = require("../models");

/**
 * Retrieves the corresponding interview given an interview id
 * @param interviewId - _id of interview
 * @param interviewStage - stage of interview
 */
function getInterview(interviewId, interviewStage) {
  return Interview.findOne({ _id: interviewId, stage: interviewStage }).exec();
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
