exports.returnError = (res, error) => {
  return res.status(400).json({errors: [error.message]});
};
