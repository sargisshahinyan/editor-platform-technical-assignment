import { z } from "zod";

const EnvVarsSchema = z.object({
  VITE_PEXEL_API_KEY: z.string(),
});

const parsedEnvVars = EnvVarsSchema.safeParse({
  VITE_PEXEL_API_KEY: import.meta.env.VITE_PEXEL_API_KEY,
});

if (!parsedEnvVars.success) {
  console.error("There is an error with your environment variables.", parsedEnvVars.error.errors);
  throw parsedEnvVars.error;
}

export const config = {
  pexelsApiKey: parsedEnvVars.data.VITE_PEXEL_API_KEY,
};
