import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

import Debug from '@prisma/debug';   // requires `pnpm install @prisma/debug` I think
Debug.enable('prisma:driver-adapter:mariadb');

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5,
    allowPublicKeyRetrieval: true
});
const prisma = new PrismaClient({ adapter });

export { prisma };

