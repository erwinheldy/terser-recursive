#!/usr/bin/env node

const fs = require('fs')
const { minify } = require('terser')
const { resolve, join, extname } = require('path')

class compiler {

  constructor() {
    this.files = this.getFiles(this.argv('input'))
    try {
      this.config = require(resolve(this.argv('config') || 'terser-recursive.config.js'))
    } catch (e) {
      this.config = {}
    }
    this.verbose = this.argv('verbose')
  }

  run() {
    this.files.forEach(async file => {
      const target = file.slice(0, -2) + 'min.js'
      this.verbose && console.log('Minifying ' + file + ' to ' + target)
      fs.writeFileSync(
        target,
        (await minify(fs.readFileSync(file, 'utf8'), this.config)).code
      )
    })
  }

  argv(key) {
    const arg = process.argv.filter(val => val.startsWith('--' + key))
    return arg.length ? arg.pop().split('=').pop() : null
  }

  getFiles(dir, arrFiles) {
    arrFiles = arrFiles || []

    fs.readdirSync(dir).forEach(file => {
      const filePath = join(dir, file)
      if (fs.statSync(filePath).isDirectory()) {
        arrFiles = this.getFiles(filePath, arrFiles)
      } else {
        arrFiles.push(filePath)
      }
    })

    return arrFiles.filter(i => extname(i) === '.js' && i.slice(i.length - 7) !== '.min.js')
  }

}

new compiler().run()