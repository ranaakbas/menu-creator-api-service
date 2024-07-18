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

// res.status(400).json({errors: XXXX});

// XXXX = [error.message];
// XXXX = ["name is required"];
// XXXX = ["name is required", "category is required"];

// catch error
// returnError(res,error)
// returnError(res,["name is required", "category is required"])
// returnError(res,"name is required")
