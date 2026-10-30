import { Pool } from 'pg';
const g = globalThis;
const connectionString = (process.env.DATABASE_URL || '').replace(/sslmode=(prefer|require|verify-ca)/gi, 'sslmode=verify-full');
export const pool = g.__pgPool || (g.__pgPool = new Pool({
  connectionString,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
}));
