import nextConnect from 'next-connect'
import database from './database'

const all = nextConnect()

all.use(database)

export default all