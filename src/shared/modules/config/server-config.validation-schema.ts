import Joi from "@hapi/joi";

export const serverConfigValidationSchema = Joi.object({
  env: Joi.string().valid("local", "dev", "prod").default("local"),
  server: {
    port: Joi.number().default(3000)
  },
  supabase: {
    apiUrl: Joi.string(),
    publicApiKey: Joi.string(),
    databaseUrl: Joi.string()
  }
});
