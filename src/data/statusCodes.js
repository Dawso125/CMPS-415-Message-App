const statusCodes = {
  OK: { code: 200, message: "OK" },
  CREATED: { code: 201, message: "Created" },
  BAD_REQUEST: { code: 400, message: "Bad Request" },
  UNAUTHORIZED: { code: 401, message: "Unauthorized" },
  FORBIDDEN: { code: 403, message: "Forbidden" },
  NOT_FOUND: { code: 404, message: "Not Found" },
  INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
  SERVICE_UNAVAILABLE: { code: 503, message: "Service Unavailable" },
};

module.exports = statusCodes;
