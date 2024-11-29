import BrandModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const BRAND_MODULE = "brand"

export default Module(BRAND_MODULE, {
  service: BrandModuleService,
})