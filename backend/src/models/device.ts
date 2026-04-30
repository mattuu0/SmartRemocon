import { PrismaClient } from "../../generated/prisma/client"; // 出力先に合わせる

export class DeviceModel {
    private prisma: PrismaClient;
    
    // コンストラクタ
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    // デバイスのリストを取得する処理を実装する
    public async getDevices() {
        return await this.prisma.device.findMany();
    }
}
