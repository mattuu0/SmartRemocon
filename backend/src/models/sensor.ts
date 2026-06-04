import { PrismaClient } from "../../generated/prisma/client";
import { IrSensorValue } from "./type";

class IrSensorModel {
    private prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    // デバイスの一覧を取得する処理
    async GetIrSensors(): Promise<IrSensorValue[]> {
        // デバイスの一覧を取得する処理を実装する
        const sensors = await this.prisma.irSensorValue.findMany();

        return sensors;
    }

    public async CreateIrSensor(deviceID: string, name: string, data: string): Promise<IrSensorValue> {
        // センサーを作成する処理を実装する
        const irSensorValue: IrSensorValue = await this.prisma.irSensorValue.create({
            data: {
                deviceId: deviceID,
                name: name,
                data: data,
            },
        });

        return irSensorValue;
    }

    public async DeleteIrSensor(id: string): Promise<IrSensorValue> {
        // センサーを削除する処理を実装する
        const irSensorValue: IrSensorValue = await this.prisma.irSensorValue.delete({
            where: {
                id: Number(id),
            },
        });

        return irSensorValue;
    }

    public async UpdateIrSensor(id: string, name?: string, data?: string): Promise<IrSensorValue> {
        // 更新用のオブジェクトを動的に作成する
        const updateData: any = {};

        // 値が入っている（空文字でも null でもない）場合のみ追加
        if (name) updateData.name = name;
        if (data) updateData.data = data;

        const irSensorValue: IrSensorValue = await this.prisma.irSensorValue.update({
            where: {
                id: Number(id),
            },
            data: updateData, // 構築したオブジェクトを渡す
        });

        return irSensorValue;
    }

    public async GetIrSensor(id: string): Promise<IrSensorValue> {
        // センサーを取得する処理を実装する
        const irSensorVal = await this.prisma.irSensorValue.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!irSensorVal) {
            throw new Error("センサーが見つかりません");
        }

        return {
            id: irSensorVal.id,
            deviceId: irSensorVal.deviceId,
            name: irSensorVal.name,
            data: irSensorVal.data,
            createdAt: irSensorVal.createdAt,
            updatedAt: irSensorVal.updatedAt
        };
    }
}

export default IrSensorModel;
