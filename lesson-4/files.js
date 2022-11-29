const fs = require('fs')

module.exports = {
  getFiles: async (path) => {
    const list = await fs.promises.readdir(path, {withFileTypes: true})
    const files = list.filter((file) => file.isFile())

    return files
  }
}
