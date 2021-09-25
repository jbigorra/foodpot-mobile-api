// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export default () => ({
  env: process.env.NODE_ENV,
  server: {
    port: 3000
  },
  supabase: {
    apiUrl: process.env.SUPABASE_URL,
    publicApiKey: process.env.SUPABASE_PUBLIC_KEY,
    databaseUrl: process.env.DATABASE_URL
  }
});
