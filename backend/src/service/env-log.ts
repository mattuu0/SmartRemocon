import { Server } from "socket.io";
import { EnvLoggerModel } from "../models";

import { type DeviceEnvLog, type Device, type IRSensorValue, type FrontendEnvLog } from "./types";
import { DeviceEnvLogRecord } from "../models/type";

export class EnvLogService {
    private EnvLoggerModel: EnvLoggerModel;
    private io: Server;

    // コンストラクタ
    constructor(envLoggerModel: EnvLoggerModel,io : Server) {
        this.EnvLoggerModel = envLoggerModel;
        this.io = io;
    }

    // 追加のログをプッシュする関数
    public PostEnvLog(data: DeviceEnvLog) {
        // 日時取得
        data.createdAt = new Date();

        // macアドレスをdeviceIdとして使用
        const deviceId = data.mac_address;

        // 追加する ログのレコードを作成
        const envLogRecord: DeviceEnvLogRecord = {
            deviceId: deviceId,
            ip_address: data.ip_address,
            mac_address: data.mac_address,
            temperatureSht: data.temperatureSht,
            humidity: data.humidity,
            pressure: data.pressure,
            createdAt: data.createdAt,
        };

        // json に追加  
        this.EnvLoggerModel.postEnvLog(envLogRecord);

        const emitData: FrontendEnvLog = {
            id:0,
            device: {
                id: 0,
                macAddress: "",
                ipAddress: "",
                name: "",
                location: "",
                collectMetrics: false,
                registeredAt: new Date(),
                envLog: data,
                IRSensorValue: {
                    id: 0,
                    device: {} as Device,
                    name: "",
                    data: "",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            temperatureSht: data.temperatureSht,
            humidity: data.humidity,
            temperatureQmp: data.temperatureSht, // 10 などの固定値も同様
            pressure: data.pressure,
            createdAt: data.createdAt,
            updatedAt: data.createdAt,
        }

        // フロントエンドに送信
        this.io.emit('env_log_update', emitData);
    }

    // 全てのログを返す
    public async GetEnvLogs(): Promise<DeviceEnvLog[]> {
        // 適用なデータを返す
        const logs = await this.EnvLoggerModel.getEnvLogs();

        const deviceLogs: DeviceEnvLog[] = logs.map(log => ({
            temperatureSht: log.temperatureSht,
            humidity: log.humidity,
            pressure: log.pressure,
            ip_address: log.ip_address, // デバイス情報がないため、固定値を使用
            mac_address: log.mac_address, // デバイス情報がないため、固定値を使用
            createdAt: log.createdAt,
        }));

        // フロントエンドに返す形式に変換
        return deviceLogs;
    }
}
