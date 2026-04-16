import {EnvLogService,EnvLog} from "../service";

class EnvLogController {
    // コンストラクタ
    private envLogService: EnvLogService = new EnvLogService();

    constructor(envLogService: EnvLogService) {
        this.envLogService = envLogService;
    }

    // 追加のログをプッシュする関数
    public PostEnvLog(data: EnvLog) {
        this.envLogService.PostEnvLog(data);
    }

    // 全てのログを返す
    public GetEnvLogs(): EnvLog[] {
        return this.envLogService.GetEnvLogs();
    }
}

export default EnvLogController;
