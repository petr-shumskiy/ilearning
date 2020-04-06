const errorHandler = (res, status, errorMessage, e) => {
  const response = {
    message: e ? 'Server error': 'Client error',
    error: errorMessage
  }
  if (e) {
    response.info  = e.message
  }
  return res.status(status).json(response)
}

module.exports = errorHandler