import type { Config } from 'drizzle-kit';
import * as dotenv from "dotenv";

dotenv.config({ path: './.env.local' });

if (!process.env.NEON_DATABASE_URL) throw new Error('NEON DATABASE_URL not found in environment');
console.log('NEON_DATABASE_URL: ', process.env.NEON_DATABASE_URL);

export default {
  schema: './src/app/db/schema.ts',
  out: './src/app/db/migrations',
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL,
  },
  strict: true,
} satisfies Config;