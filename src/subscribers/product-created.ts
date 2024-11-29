import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { sendOrderConfirmationWorkflow } from "src/workflows/send-order-confirmation"

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(
    ContainerRegistrationKeys.LOGGER
  )

  logger.info("Sending confirmation email...")

  await sendOrderConfirmationWorkflow(container)
    .run({
      input: {
        id: data.id,
      },
    })
}

export const config: SubscriberConfig = {
  event: `order.placed`,
}