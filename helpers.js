exports.returnError = (res, errorMessages) => {
  let errors;

  if (typeof errorMessages === "string") {
    errors = [errorMessages];
  } else if (Array.isArray(errorMessages)) {
    errors = errorMessages;
  } else if (errorMessages.message) {
    errors = [errorMessages.message];
  }

  return res.status(400).json({errors});
};
