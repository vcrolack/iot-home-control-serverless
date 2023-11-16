
const errorHandler = (error) => {
  console.log(error);

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  return {
    statusCode, 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      status: 'Error',
      message
    })
  }
}

module.exports = {errorHandler};