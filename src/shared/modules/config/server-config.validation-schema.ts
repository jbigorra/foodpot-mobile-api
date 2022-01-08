import * as Joi from "@hapi/joi";

export const serverConfigValidationSchema = Joi.object({
  env: Joi.string().valid("local", "dev", "prod").default("local"),
  server: {
    port: Joi.number().default(3000),
    apiUrl: Joi.string().required(),
    logLevel: Joi.string()
      .valid("log", "error", "warn", "debug", "verbose")
      .default("debug")
  },
  supabase: {
    apiUrl: Joi.string().required(),
    publicApiKey: Joi.string().required(),
    databaseUrl: Joi.string().required()
  }
});
