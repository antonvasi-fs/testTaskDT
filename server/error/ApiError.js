class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  static badRequest(message) {
    return new ApiError(message || 'Bad Request', 400);
  }

  static internal(message) {
    return new ApiError(message || 'Internal Server Error', 500);
  }
}

module.exports = ApiError;
