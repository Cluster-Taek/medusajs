import {
  LoaderOptions,
} from "@medusajs/framework/types"
import { 
  ContainerRegistrationKeys,
} from "@medusajs/framework/utils"

export default async function helloWorldLoader({
  container,
}: LoaderOptions) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  logger.info("[helloWorldLoader]: Hello, World!")
}