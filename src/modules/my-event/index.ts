import MyEventService from "./service"
import { Module } from "@medusajs/framework/utils"

export const MY_EVENT_MODULE = "my-event"

export default Module(MY_EVENT_MODULE, {
  // @ts-ignore
  service: MyEventService,

})