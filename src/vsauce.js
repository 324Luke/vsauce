import 'module-alias/register'

import { AkairoClient } from 'discord-akairo'
import { botOwner, commandPrefix, discord, database } from '../data/config'
import logger from './Logger'
import mongoose from 'mongoose'

if (Number(process.version.slice(1).split('.')[0]) < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.')

const client = new AkairoClient({
  ownerID: botOwner,
  prefix: commandPrefix,
  clientUtil: true,
  handleEdits: true,
  defaultCooldown: 2000,
  commandDirectory: './src/commands/',
  inhibitorDirectory: './src/inhibitors',
  listenerDirectory: './src/listeners/'
}, {
  disableEveryone: true
})

logger.wait('logging in ...')

client.login(discord.token)
  .then(async () => {
    logger.wait('logging in to database ...')

    await mongoose.connect(database.url, { useNewUrlParser: true, dbName: 'vsauce' })
      .then(() => {
        logger.ready('connected to database ...')
      })
      .catch(err => {
        throw new Error(logger.error(err))
      })
  })
  .catch((err) => {
    throw new Error(logger.error(err))
  })
