// 環境情報
export type EnvLog = {
    temperatureSht: number;
    humidity: number;
    pressure: number;
    createdAt: number;
};

export class EnvLogService {
    // 一時的にデータを保存する json
    public datas: EnvLog[] = [];

    // 追加のログをプッシュする関数
    public PostEnvLog(data: EnvLog) {
        // 日時取得
        data.createdAt = new Date();

        // json に追加  
        this.datas.push(data);
    }

    // 全てのログを返す
    public GetEnvLogs(): EnvLog[] {
        return this.datas;
    }
}
