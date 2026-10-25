import { Pool } from 'pg';
const g = globalThis;
export const pool = g.__pgPool || (g.__pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
}));
