const colors = require("colors/safe")
const color = ['green', 'yellow', 'red']
const digits = []
const [from, to] = process.argv.slice(2)
let colorIndex = 0

if (isNaN(from) || isNaN(to)) console.log(colors.red('Incorrect numbers'))

nextPrime:
for (let i = from; i <= to; i++) {
  for (let n = 2; n < i; n++) {
    if (i % n === 0) continue nextPrime
  }

  digits.push(i)
  console.log(colors[color[(colorIndex++) % 3]](i))
}

if (!digits.length) console.log(colors.red('No digits in diapason'))
