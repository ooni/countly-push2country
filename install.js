'use strict'

/* eslint no-console: 'off' */

const pkgJson = require('./package.json')
const pluginManager = require('../pluginManager.js')
const dbConnection = pluginManager.dbConnection()

const log = (message) => {
  console.log(`[push2country] ${message}`)
}

log(`Installing plugin: ${pkgJson.title}`)

const getDb = () => {
  return new Promise( resolve => {
    dbConnection.onOpened(() => {
      resolve(dbConnection._native)
    })
  })
}

const install = async () => {
  const db = await getDb()
  log('Checking if push pluign is enabled...')

  db.collection('plugins').findOne({}, (err, plugins) => {
    if (err) {
      log('Fetching plugins failed')
      throw new Error('could not fetch plugins collection')
      return
    }
    log('Plugins inspection')
    console.dir(plugins)
  })
}

install().then(() => {
  log('Installation successful')
  dbConnection.close()
}, (e) => {
  log('Installation failed')
  log(e)
  dbConnection.close()
})
