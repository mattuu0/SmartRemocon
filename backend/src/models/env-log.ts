import { PrismaClient } from "../../generated/prisma"; // 出力先に合わせる
import { EnvLog } from "../service";

export class EnvLoggerModel {
    private prisma: PrismaClient;

    constructor(prism: PrismaClient) {
        this.prisma = prism;
    }

    public async postEnvLog(envLog: EnvLog) {
        // スキーマ側を deviceId / temperatureSht 等に合わせたため、
        // 型定義の値をそのまま流し込めます。
        const environmentLog = await this.prisma.environmentLog.create({
            data: {
                deviceId: 1, // device_id から変更
                temperatureSht: envLog.temperatureSht,
                humidity: envLog.humidity,
                temperatureQmp: envLog.temperatureSht, // 10 などの固定値も同様
                pressure: envLog.pressure,
            },
        });

        console.log('作成されたEnvironmentLog:', environmentLog);
        return environmentLog;
    }

    public async getEnvLogs(): Promise<EnvLog[]> {
        // model からデータを取得
        // include: { device: true } を使うと Device 型定義にあるリレーションも取得可能です
        const environmentLogs = await this.prisma.environmentLog.findMany({
            include: {
                device: true,
            }
        });

        // Prismaの型とEnvLog型が一致しているため、マッピングが簡潔になります
        return environmentLogs.map((log) => ({
            id: log.id,
            device: log.device,
            temperatureSht: log.temperatureSht,
            humidity: log.humidity,
            temperatureQmp: log.temperatureQmp,
            pressure: log.pressure,
            createdAt: log.createdAt,
            updatedAt: log.updatedAt,
        }));
    }
}
