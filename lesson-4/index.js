const inquirer = require('inquirer')
const questions = require('./questions')
const streams = require('./streams')

inquirer
  .prompt(questions)
  .then(streams.filter)
  .catch((error) => {
    console.log(error)
  })
