import { NowRequest, NowResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb'

import url from 'url'

let cachedDb: Db = null

async function connectToDatabase(uri: string) {
    if(cachedDb) {
        return cachedDb
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const dbName = url.parse(uri).pathname.substr(1)

    const db = client.db(dbName)

    cachedDb = db

    return db
}

export default async function (request: NowRequest, response: NowResponse) {
    const db = await connectToDatabase(process.env.MONGODB_URI)

    const collection = await db.collection('subscribers').find({}).toArray()

    return response.json(collection)
}