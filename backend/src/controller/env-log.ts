import {EnvLogService,EnvLog} from "../service";

class EnvLogController {
    // コンストラクタ
    private envLogService: EnvLogService;

    constructor(envLogService: EnvLogService) {
        this.envLogService = envLogService;
    }

    // 追加のログをプッシュする関数
    public PostEnvLog(req: any, res: any) {
        // 温度取得
        const temperatureSht = req.body.temperatureSht;

        // 湿度取得
        const humidity = req.body.humidity;

        // 圧力取得
        const pressure = req.body.pressure;

        // 日時取得
        const createdAt = req.body.createdAt;

        // json に追加
        const data: EnvLog = {
            temperatureSht: temperatureSht,
            humidity: humidity,
            pressure: pressure,
            createdAt: createdAt
        };

        this.envLogService.PostEnvLog(data);

        // json を返す
        res.json(data);
    }

    // 全てのログを返す
    public async GetEnvLogs(req: any, res: any) {
        // model からデータを取得
        const result = await this.envLogService.GetEnvLogs();
        
        // json を返す
        res.json(result);
    }
}

export default EnvLogController;
