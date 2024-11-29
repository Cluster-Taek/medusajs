import { logger } from "@medusajs/framework"
import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"

type SendOrderConfirmationWorkflowInput = {
  id: string
}

const sendOrderConfirmationStep = createStep(
  // step name
  "send-order-confirmation",
  // step handler
  async ({ id }: SendOrderConfirmationWorkflowInput, { container }) => {
    
    logger.info(`sendOrderConfirmationStep ${id}`)
    return new StepResponse()
  },
)

export const sendOrderConfirmationWorkflow = createWorkflow(
  "send-order-confirmation",
  (sendOrderConfirmationInput: SendOrderConfirmationWorkflowInput) => {
    const sendOrderConfirmation = sendOrderConfirmationStep(sendOrderConfirmationInput)
    return new WorkflowResponse(sendOrderConfirmation)
  }
)