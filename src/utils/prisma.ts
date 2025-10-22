import { PrismaClient } from "@/generated/prisma";

const isProd = process.env.NODE_ENV === "production";
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ log: isProd ? ["warn", "error"] : ["warn", "error"] });
if (!isProd) globalForPrisma.prisma = prisma;

export async function withPrismaRetry<T>(fn: () => Promise<T>, attempts = 2, backoffMs = 200): Promise<T> {
    let lastErr: unknown;
    for (let i = 0; i < attempts; i++) {
        try { return await fn(); } catch (e) {
            const msg = (e as Error)?.message ?? "";
            const transient = /P1017|Server has closed|ECONNRESET|ETIMEDOUT/i.test(msg);
            lastErr = e;
            if (!transient || i === attempts - 1) break;
            await new Promise(r => setTimeout(r, backoffMs * (i + 1)));
        }
    }
    throw lastErr as Error;
}