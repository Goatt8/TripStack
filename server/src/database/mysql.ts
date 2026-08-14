import mysql from 'mysql2/promise';
import { loadLocalEnvironment } from './env.js';
import { mysqlSchemaStatements } from './mysqlSchema.js';

loadLocalEnvironment();

export function createMySqlPool() {
  return mysql.createPool({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'tripstack',
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT ?? 10),
    namedPlaceholders: true,
  });
}

export async function initializeMySqlDatabase() {
  const pool = createMySqlPool();

  for (const statement of mysqlSchemaStatements) {
    await pool.execute(statement);
  }

  return pool;
}
