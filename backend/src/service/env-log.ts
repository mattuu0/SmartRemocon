// 環境情報
export type EnvLog = {
    temparature: number;
    humidity: number;
    pressure: number;
    createdAt: number;
};

export class EnvLogService {
    // 一時的にデータを保存する json
    datas: EnvLog[] = [];

    // 追加のログをプッシュする関数
    public PostEnvLog(data: EnvLog) {
        // json に追加  
        this.datas.push(data);
    }

    // 全てのログを返す
    public GetEnvLogs(): EnvLog[] {
        return this.datas;
    }

}
