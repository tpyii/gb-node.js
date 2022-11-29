const files = require('./files')

module.exports = [
  {
    name: 'path',
    message: 'Please enter the path to the file: ',
    default: '.',
  },
  {
    name: 'file',
    type: 'list',
    message: 'Choose a file: ',
    choices: (input) => files.getFiles(input.path),
  },
  {
    name: 'search',
    message: `Please enter to search in the file: `,
    default: '127.0.0.1',
  },
]
