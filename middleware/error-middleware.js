import ApiError from "../errors/api-error.js";

export default function errorMiddleware(error, req, res, next) {
  if (error instanceof ApiError) {
    return res
      .status(error.status)
      .json({ message: error.message, errors: error.errors });
  }
  return res.json({ message: "unrecognized error" });
}
