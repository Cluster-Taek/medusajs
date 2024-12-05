import { defineConfig, loadEnv } from '@medusajs/framework/utils';

loadEnv(process.env.NODE_ENV || 'development', process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    },
    workerMode: process.env.MEDUSA_WORKER_MODE as 'shared' | 'worker' | 'server',
    redisUrl: process.env.REDIS_URL,
  },

  modules: [
    {
      resolve: './src/modules/blog',
    },
    {
      resolve: './src/modules/brand',
    },
    {
      resolve: './src/modules/hello',
    },
    {
      resolve: './src/modules/mongo',
      options: {
        connection_url: process.env.MONGO_CONNECTION_URL,
        db_name: process.env.MONGO_DB_NAME,
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
      },
    },
    {
      resolve: '@medusajs/medusa/event-bus-local',
    },
    {
      resolve: './src/modules/my-event',
    },
  ],
});
