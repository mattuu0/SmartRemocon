import { EnvLoggerModel } from "../models";

// 環境情報
export type EnvLog = {
    temperatureSht: number;
    humidity: number;
    pressure: number;
    createdAt: Date; // number → Date に変更
};

export class EnvLogService {
    private EnvLoggerModel: EnvLoggerModel;

    // コンストラクタ
    constructor(envLoggerModel: EnvLoggerModel) {
        this.EnvLoggerModel = envLoggerModel;
    }

    // 一時的にデータを保存する json
    public datas: EnvLog[] = [];

    // 追加のログをプッシュする関数
    public PostEnvLog(data: EnvLog) {
        // json に追加  
        this.EnvLoggerModel.postEnvLog(data);
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
