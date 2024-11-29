import { AbstractEventBusModuleService } from "@medusajs/framework/utils"
import { Message } from "@medusajs/types"

class MyEventService extends AbstractEventBusModuleService {
  async emit<T>(data: Message<T> | Message<T>[], options: Record<string, unknown>): Promise<void> {
    const events = Array.isArray(data) ? data : [data]

    for (const event of events) {
      console.log(`Received the event ${event.name} with data ${event.data}`)

      // TODO push the event somewhere

      
    }
    
  }
  async releaseGroupedEvents(eventGroupId: string): Promise<void> {
    throw new Error("Method not implemented.")
  }
  async clearGroupedEvents(eventGroupId: string): Promise<void> {
    throw new Error("Method not implemented.")
  }
}

export default MyEventService