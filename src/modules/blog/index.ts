import BlogModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const BLOG_MODULE = "brand"

export default Module(BLOG_MODULE, {
  service: BlogModuleService,
})