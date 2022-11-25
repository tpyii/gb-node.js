module.exports = class Timer {
  timer

  constructor(data, emitter) {
    this.end = new Date(data.year, data.month - 1, data.day, data.hour)
    this.emitter = emitter
  }

  start() {
    const remaining = this.end - Date.now()

    if (Number.isNaN(remaining)) {
      clearInterval(this.timer)
      this.emitter.emit('print', 'Invalid value')
    } else if (remaining < 0) {
      clearInterval(this.timer)
      this.emitter.emit('print', 'Timer finished')
    } else {
      this.emitter.emit('print', 'Timer started')
      this.timer = setInterval(() => this.print(), 1000)
    }
  }

  print() {
    this.emitter.emit('print', this._getRemainingString())
  }

  _getRemainingString() {
    const remaining = new Date(this.end - Date.now())
    const years = remaining.getUTCFullYear() - 1970
    const months = remaining.getUTCMonth()
    const days = remaining.getUTCDate() - 1
    const hours = remaining.getUTCHours()
    const minutes = remaining.getUTCMinutes()
    const seconds = remaining.getUTCSeconds()

    return `${years} years ${months} months ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
  }
}
