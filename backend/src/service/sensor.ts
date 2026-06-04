import IrSensorModel from "../models/sensor";
import { Device } from "./types";
import { type IrSensorValue } from "../models/type";
import { MqttSend } from "./mqtt";
import { Server } from "socket.io";

class IrSensorService {
    private IrSensorModel: IrSensorModel;
    private io: Server;

    constructor(IrSensorModel: IrSensorModel, io: Server) {
        this.IrSensorModel = IrSensorModel;
        this.io = io;
    }

    // デバイスの一覧を取得する処理
    async GetIrSensors(): Promise<IrSensorValue[]> {
        // デバイスの一覧を取得する処理を実装する
        const sensors = await this.IrSensorModel.GetIrSensors();

        return sensors;
    }

    public async CreateIrSensor(device: Device, name: String, data: String): Promise<IrSensorValue> {
        console.log("CreateIrSensor");
        console.log(device);
        console.log(name);
        console.log(data);
        // センサーを作成する処理を実装する
        return await this.IrSensorModel.CreateIrSensor(device.id.toString(), name.toString(), data.toString());
    }

    public async DeleteIrSensor(id: string): Promise<IrSensorValue> {
        console.log("DeleteIrSensor");
        console.log(id);
        // センサーを削除する処理を実装する
        return await this.IrSensorModel.DeleteIrSensor(id);
    }

    public async UpdateIrSensor(id: string, name: string, data: string): Promise<IrSensorValue> {
        console.log("UpdateIrSensor");
        console.log(id);
        console.log(name);
        console.log(data);
        // センサーを更新する処理を実装する
        return await this.IrSensorModel.UpdateIrSensor(id, name, data);
    }

    public async UpdateFromIot(id: string, name: string, data: string): Promise<IrSensorValue> {
        console.log("UpdateFromIot");
        console.log(id);
        console.log(name);
        console.log(data);

        // センサーを更新する処理を実装する
        const sensorVal = await this.IrSensorModel.UpdateIrSensor(id, name, data);

        
        // 全てのクライアントに通知
        this.io.emit("ir_sensor_update", {
            id: sensorVal.id,
            name: sensorVal.name,
            data: sensorVal.data,
            device: {"id": sensorVal.deviceId},
            createdAt: sensorVal.createdAt,
            updatedAt: sensorVal.updatedAt
        });

        return sensorVal;
    }

    // 学習を開始することを伝える
    public async LearnIrSensor(id: Number): Promise<void> {
        // MQTTで送信する
        MqttSend("learn", id.toString());
    }

    // 送信を開始することを伝える
    public async SendIrSensor(id: Number): Promise<void> {
        // モデルからセンサーデータ取得
        const sensorVal = await this.IrSensorModel.GetIrSensor(id.toString());

        // MQTTで送信する
        MqttSend("send", sensorVal.data);
    }
}

export default IrSensorService;
