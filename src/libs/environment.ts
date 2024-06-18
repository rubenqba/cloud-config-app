import "server-only"
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

function isRuntimeEnabled() {
  return process.env.RUNTIME === 'true';
}
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    CLOUD_CONFIG_URL: z.string().url(),
    CLOUD_CONFIG_USERNAME: z.string(),
    CLOUD_CONFIG_PASSWORD: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    CLOUD_CONFIG_URL: process.env.CLOUD_CONFIG_URL,
    CLOUD_CONFIG_USERNAME: process.env.CLOUD_CONFIG_USERNAME,
    CLOUD_CONFIG_PASSWORD: process.env.CLOUD_CONFIG_PASSWORD,
  },
  skipValidation: false, //!isRuntimeEnabled(),
  emptyStringAsUndefined: true
});
