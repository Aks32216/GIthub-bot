import { z } from 'zod';

// z.coerce.boolean() treats the string "false" as true, so parse explicitly.
const booleanString = z
  .enum(['true', 'false'])
  .transform((value) => value === 'true');

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  DATABASE_URL: z.url(),
  DATABASE_SSL: booleanString.default(false),
});

export type Env = z.infer<typeof envSchema>;

// Used as ConfigModule's `validate`. Error messages list only variable names
// and reasons, never their values, so secrets can't leak into startup logs.
export function validateEnv(config: Record<string, unknown>): Env {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    throw new Error(`Invalid environment variables: ${details}`);
  }
  return result.data;
}
