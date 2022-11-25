const EventEmitter = require('events')
const Timer = require('./Timer')
const Handler = require('./Handler')
const [hour, day, month, year] = process.argv[2].split('-')
const timerEventsEmitter = new EventEmitter()

timerEventsEmitter.on('print', Handler.print)

const CountDown = new Timer({year, month, day, hour}, timerEventsEmitter)

CountDown.start()
