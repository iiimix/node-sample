

const fs = require('fs')

let file = fs.readFileSync('./package.json')

console.log(file.length)