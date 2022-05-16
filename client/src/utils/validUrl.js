function validUrl(str) {
  var pattern = new RegExp(
    "http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+"
  ); // fragment locator
  return pattern.test(str);
}

export default validUrl;
