class ApiError extends Error {
  constructor(statusCodeOrObject, message, errors = [], stack = "") {
    // case 1 → object passed
    if (typeof statusCodeOrObject === "object" && statusCodeOrObject !== null) {
      const { statusCode, message, errors = [], stack = "" } = statusCodeOrObject;
      super(message || "Something went wrong");
      this.statusCode = statusCode;
      this.message = message || "Something went wrong";
      this.errors = errors;
      this.success = false;
      if (stack) this.stack = stack;
      else Error.captureStackTrace(this, this.constructor);
    }
    // case 2 → normal args passed
    else {
      super(message || "Something went wrong");
      this.statusCode = statusCodeOrObject;
      this.message = message || "Something went wrong";
      this.errors = errors;
      this.success = false;
      if (stack) this.stack = stack;
      else Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
