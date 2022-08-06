const { Interview } = require("../models");

/**
 * Retrieves the interview corresponding to the given userId and interviewStage
 * @param userId - _id of interview
 * @param interviewStage - stage of interview
 */
function getInterview(userId, interviewStage) {
  return Interview.findOne({ user: userId, stage: interviewStage }).exec();
}

function getInterviews(interviewDate) {
  return Interview.find({ date: interviewDate }).exec();
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
  getInterviews,
  createInterview,
};
