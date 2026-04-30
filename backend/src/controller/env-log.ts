import {EnvLogService} from "../service";
import { DeviceEnvLog } from "../service/types";

class EnvLogController {
    // コンストラクタ
    private envLogService: EnvLogService;

    constructor(envLogService: EnvLogService) {
        this.envLogService = envLogService;
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
