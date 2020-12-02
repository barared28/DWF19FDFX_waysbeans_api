exports.responseSuccess = "Response Success";
exports.handleNotFound = (res, message, status = "resourceNotFound") => {
  return res.status(400).send({
    status: status,
    message: message,
    data: {},
  });
};
exports.handleError = (res, err, message = "Server Error") => {
  console.log(err);
  return res.status(500).send({
    error: {
      message: message,
    },
  });
};