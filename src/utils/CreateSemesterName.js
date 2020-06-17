function createSemesterName () {
  if (new Date(Date.now()).getMonth() >= 0 &&
      new Date(Date.now()).getMonth() < 6) {
    return new Date(Date.now()).getFullYear().toString() + '/1º SEM'
  } else {
    return new Date(Date.now()).getFullYear().toString() + '/2º SEM'
  }
}

module.exports = createSemesterName
