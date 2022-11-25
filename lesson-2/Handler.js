module.exports = class Handler {
  static print(payload) {
    console.log('Print request')
    console.log(payload)
  }
}
