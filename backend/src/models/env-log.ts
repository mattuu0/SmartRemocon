import { PrismaClient } from "../../generated/prisma/client"; // 出力先に合わせる
import { DeviceEnvLog } from "../service/types";
import { DeviceEnvLogRecord } from "./type";

export class EnvLoggerModel {
    private prisma: PrismaClient;

    constructor(prism: PrismaClient) {
        this.prisma = prism;
    }

    async RegsiterDevice(deviceId: string, macAddress: string, ipAddress: string) {
        await this.prisma.device.create({
            data: {
                id: deviceId,
                macAddress: macAddress,
                ipAddress: ipAddress,
                name: "unknown",
                collectMetrics: true,
                registeredAt: new Date(),
            },
        });
    }

    public async postEnvLog(envLog: DeviceEnvLogRecord): Promise<void> {
        // 先にデバイスを登録してみる
        try {
            await this.RegsiterDevice(envLog.deviceId, "unknown", "unknown");
        } catch (error) {
            // デバイスの登録に失敗しても、ログの保存は続行する
            // console.warn(`Device registration failed for deviceId: ${envLog.deviceId}. Error: ${error}`);
        }

        await this.prisma.environmentLog.create({
            data: {
                deviceId: envLog.deviceId,
                temperatureSht: envLog.temperatureSht,
                humidity: envLog.humidity,
                pressure: envLog.pressure,
                createdAt: envLog.createdAt,
            },
        });
    }

    public async getEnvLogs(): Promise<DeviceEnvLogRecord[]> {
        const logs = await this.prisma.environmentLog.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        // 返せる形に変換
        const deviceLogs: DeviceEnvLogRecord[] = logs.map(log => ({
            deviceId: log.deviceId,
            ip_address: "unknown", // デバイス情報がないため、固定値を使用
            mac_address: log.deviceId, // デバイス情報がないため、固定値を使用
            temperatureSht: log.temperatureSht,
            humidity: log.humidity,
            pressure: log.pressure,
            createdAt: log.createdAt,
        }));

        return deviceLogs;
    }
}
