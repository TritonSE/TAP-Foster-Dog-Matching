/**
 * validUrl function
 * 
 *  @summary     validUrl function
 *  @author      Parth Patel
 * 
 * Resource function to tell if a given string is a valid url using regex
 * 
 * @param str - string to check
 * 
 */

function validUrl(str) {
  const reg = "http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+";
  const pattern = new RegExp(reg); // fragment locator
  return pattern.test(str);
}

export default validUrl;
