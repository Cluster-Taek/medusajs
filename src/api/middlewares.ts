import { PostAdminCreateBrand } from './admin/brands/validators';
import { defineMiddlewares, validateAndTransformBody } from '@medusajs/framework/http';

export default defineMiddlewares({
  routes: [
    {
      matcher: '/admin/brands',
      method: 'POST',
      middlewares: [validateAndTransformBody(PostAdminCreateBrand)],
    },
  ],
});
