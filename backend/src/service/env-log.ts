import { Server } from "socket.io";
import { EnvLoggerModel } from "../models";

import { type EnvLog, type Device, type IRSensorValue, type FrontendEnvLog } from "./types";

export class EnvLogService {
    private EnvLoggerModel: EnvLoggerModel;
    private io: Server;

    // コンストラクタ
    constructor(envLoggerModel: EnvLoggerModel,io : Server) {
        this.EnvLoggerModel = envLoggerModel;
        this.io = io;
    }

    // 追加のログをプッシュする関数
    public PostEnvLog(data: EnvLog) {
        // 日時取得
        data.createdAt = new Date();

        // json に追加  
        this.EnvLoggerModel.postEnvLog(data);

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
    public async GetEnvLogs(): Promise<EnvLog[]> {
        // model からデータを取得
        const result = await this.EnvLoggerModel.getEnvLogs();

        const datas = result.map((element: any) => {
            return {
                temperatureSht: element.temperatureSht,
                humidity: element.humidity,
                pressure: element.pressure,
                createdAt: element.createdAt
            }
        })

        console.log(datas);

        return datas;
    }
}
