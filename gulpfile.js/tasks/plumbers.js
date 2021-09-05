exports.notifyHandler = function (title) {
  return function (err) {
    return {
      title,
      message: err.message,
    }
  }
}
