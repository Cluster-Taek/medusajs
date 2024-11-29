// other imports...
import { Module } from "@medusajs/framework/utils"
import connectionLoader from "./loaders/connection"
import MongoServiceModule from "./service"

export const MOVIE_MODULE = "mongo"

export default Module(MOVIE_MODULE, {
  service: MongoServiceModule,
  loaders: [connectionLoader],
})