import { PrismaClient } from "../../generated/prisma/client";
import { EnvLog } from "../service";

export class EnvLoggerModel {
    // prisma ORM
    private prisma: PrismaClient;

    // prisma ORM
    constructor(prism: PrismaClient) {
        this.prisma = prism;
    }

    public async postEnvLog(envLog: EnvLog) {
        // 追加 のログをプッシュする関数
        const environmentLog = await this.prisma.environmentLog.create({
            data: {
                device_id: 1,
                temperature_sht: envLog.temperatureSht,
                humidity: envLog.humidity,
                temperature_qmp: 10,
                pressure: envLog.pressure,
            },
        });

        console.log('作成されたEnvironmentLog:', environmentLog);
        return environmentLog;
    }

    public async getEnvLogs() {
        // model からデータを取得
        const environmentLogs = await this.prisma.environmentLog.findMany();

        const envLogs: EnvLog[] = environmentLogs.map((log: any) => ({
            temperatureSht: log.temperature_sht,
            humidity: log.humidity,
            pressure: log.pressure,
            createdAt: new Date(log.created_at), // Dateオブジェクトとして渡す
        }));

        return envLogs;
    }
}

