const createResponse = (success, statusCode, message, data) => {
  return {
    success,
    status: statusCode,
    message,
    data: data || null,
  };
};
export default createResponse;
