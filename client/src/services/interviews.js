/**
 *
 * Interviews Service
 *
 * Provides functions for Interviews API
 *
 */

const { getData, sendData } = require("./data");

/**
 * Retrieves the corresponding interview given an interview id
 * @param interviewId - _id of interview
 * @param interviewStage - stage of interview
 */
export async function getInterview(interviewId, interviewStage) {
  return getData(`interviews/${interviewId}?stage=${interviewStage}`);
}

export async function getInterviews(interviewDate) {
  return getData(`interviews/?date=${interviewDate}`);
}

/**
 * Create an interview
 * @param rawInterview - details of interview to create
 */
export async function createInterview(newInterview) {
  return sendData("interviews", "POST", newInterview);
}
