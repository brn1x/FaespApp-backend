function createSemesterName () {
  if (new Date(Date.now()).getMonth() >= 0 &&
      new Date(Date.now()).getMonth() < 6) {
    return new Date(Date.now()).getFullYear().toString() + '/1'
  } else {
    return new Date(Date.now()).getFullYear().toString() + '/2'
  }
}

module.exports = createSemesterName
