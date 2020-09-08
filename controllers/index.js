// import model index.js
// middlewares
// utilities

exports.welcomeMessage = (req, res) => {
  res.send("This is the e-care backend API index page");
};

exports.successResponse = (data, message = "") => {
  return {
    data,
    message,
    success: true,
  };
};

exports.errorResponse = (data, message = "") => {
  return {
    message,
    success: false,
  };
};
