const os = require('os')

module.exports = {
  filter: (searchElement) => (
    {
      transform(chunk) {
        const filteredChunk = chunk
          .toString()
          .split(os.EOL)
          .filter((element) => element.includes(searchElement))
          .join(os.EOL)

        this.push(filteredChunk)
      },
    }
  )
}
