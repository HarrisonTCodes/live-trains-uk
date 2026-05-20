import { PrismaClient } from './prisma/client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool as PgPool } from 'pg';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Set up WebSocket constructor for Neon adapter in Node environments
if (typeof globalThis.WebSocket === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in environment variables.');
}

const isNeon = databaseUrl.includes('neon.tech') || databaseUrl.includes('neondatabase');

const createAdapter = () => {
  if (isNeon) {
    return new PrismaNeon({ connectionString: databaseUrl });
  } else {
    const pool = new PgPool({ connectionString: databaseUrl });
    return new PrismaPg(pool);
  }
};

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter: createAdapter() });
};

const globalForPrisma = globalThis as unknown as { prismaGlobal?: PrismaClient };

const prisma = globalForPrisma.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaGlobal = prisma;
}

export default prisma;
