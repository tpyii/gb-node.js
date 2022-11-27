const fs = require('fs')
const { Transform } = require('stream')
const { filter: filterStream } = require('./streams')
const ips = ['89.123.1.41', '34.48.240.111']
const readStream = fs.createReadStream('./access_tmp.log', 'utf8')

ips.forEach((ip) => {
  readStream
    .pipe(new Transform(filterStream(ip)))
    .pipe(fs.createWriteStream(`./${ip}_requests.log`))
})
