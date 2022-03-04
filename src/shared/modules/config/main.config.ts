// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export default () => ({
  env: process.env.NODE_ENV,
  server: {
    port: process.env.PORT || 3000,
    apiUrl: process.env.API_HOST_URL,
    logLevel: process.env.LOG_LEVEL || "debug",
    swaggerPass: process.env.SWAGGER_DOCS_PASSWORD
  },
  supabase: {
    apiUrl: process.env.SUPABASE_URL,
    publicApiKey: process.env.SUPABASE_PUBLIC_KEY,
    databaseUrl: process.env.DATABASE_URL
  },
  mongodb: {
    databaseUrl: process.env.MONGO_DB_URL
  }
});
