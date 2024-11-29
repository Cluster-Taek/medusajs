import type { Db } from "mongodb"

type InjectedDependencies = {
  mongoClient: Db
}

export default class MongoModuleService {
  private mongoClient_: Db

  constructor({ mongoClient }: InjectedDependencies) {
    this.mongoClient_ = mongoClient
  }

  async createMovie({ title }: {
    title: string
  }) {
    const moviesCol = this.mongoClient_.collection("movie")

    const insertedMovie = await moviesCol.insertOne({
      title,
    })

    const movie = await moviesCol.findOne({
      _id: insertedMovie.insertedId,
    })

    return movie
  }

  async deleteMovie(id: string) {
    const moviesCol = this.mongoClient_.collection("movie")

    await moviesCol.deleteOne({
      _id: {
        equals: id,
      },
    })
  }
}