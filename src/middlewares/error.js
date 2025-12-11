import { IS_PRODUCTION } from "../configs/constants.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode !== 200 ? err.statusCode : 500;
  res.status(statusCode);
  const response = {
    message: err.message,
    stack: IS_PRODUCTION ? null : err.stack,
  };
  console.error("Error:", response);
  res.json(response);
};

export default errorHandler;
