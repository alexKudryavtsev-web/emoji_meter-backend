class ApiError extends Error {
  status;
  errors;

  constructor(message, status, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new ApiError(message, 400, errors);
  }

  static UnathorizedError() {
    return new ApiError("Unathorized error", 401);
  }
}

export default ApiError;
