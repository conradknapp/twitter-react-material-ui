const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateSearchInput = ({ count, hashtags }) => {
  let errors = {};

  if (isEmpty(hashtags)) {
    errors.hashtags = "Provide at least one hashtag";
  }

  if (!Validator.isInt(count)) {
    errors.count = "Number must be integer";
  }

  if (isEmpty(count)) {
    errors.count = "Must indicate the number of tweets should be displayed";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateSearchInput;
