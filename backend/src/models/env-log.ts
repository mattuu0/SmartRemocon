import { PrismaClient } from "../generated/prisma/client";
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
                temperature_sht: 25.5,
                humidity: 60.0,
                temperature_qmp: 25.3,
                pressure: 1013.25,
            },
        });

        console.log('作成されたEnvironmentLog:', environmentLog);
        return environmentLog;
    }

    public async getEnvLogs() {
        // model からデータを取得
        const environmentLogs = await this.prisma.environmentLog.findMany();

        const envLogs: EnvLog[] = environmentLogs.map((log) => ({
            temperatureSht: log.temperature_sht,
            humidity: log.humidity,
            pressure: log.pressure,
            createdAt: new Date(log.created_at), // Dateオブジェクトとして渡す
        }));

        return envLogs;
    }
}

