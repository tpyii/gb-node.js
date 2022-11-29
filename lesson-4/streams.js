const fs = require('fs')
const { Transform } = require('stream')
const transforms = require('./transforms')

module.exports = {
  filter: (answers) => {
    fs.createReadStream(answers.file, 'utf8')
      .pipe(new Transform(transforms.filter(answers.search)))
      .pipe(fs.createWriteStream(`./${answers.search}_requests.log`))
  }
}
