module.exports = class ApiExeptions extends Error {
  constructor(status, message) {
    super(message);

    this.status = status;
  }

  static BadRequest(message = 'Bad Request') {
    return new ApiExeptions(400, message);
  }

  static UnauthorizedError() {
    return new ApiExeptions(401, 'UnauthorizedError');
  }

  static InvalidToken() {
    return new ApiExeptions(401, 'InvalidToken');
  }
}
