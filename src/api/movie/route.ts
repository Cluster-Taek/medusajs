import { container } from '@medusajs/framework';
import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { MOVIE_MODULE } from 'src/modules/mongo';
import MongoModuleService from 'src/modules/mongo/service';
import { MY_EVENT_MODULE } from 'src/modules/my-event';
import MyEventService from 'src/modules/my-event/service';

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const blogModuleService: MongoModuleService = container.resolve(MOVIE_MODULE);
  const MyEventService: MyEventService = container.resolve(MY_EVENT_MODULE);
  const { result: post } = await blogModuleService.createMovie({
    title: 'My Post',
  });
  await MyEventService.emit(
    {
      data: post,
      name: 'order.placed',
    },
    {}
  );

  res.json({
    post,
  });
}
