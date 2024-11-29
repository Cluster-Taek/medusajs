// other imports...
import { Module } from "@medusajs/framework/utils"
import helloWorldLoader from "./loaders/hello-world"
import HelloServiceModule from "./service"

export default Module("hello", {
  service: HelloServiceModule,
  loaders: [helloWorldLoader],
})