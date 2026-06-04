import IrSensorService from "../service/sensor";
import { Device } from "../service/types";

class IrSensorController {
    private IrSensorServiceInstance: IrSensorService

    constructor(IrSensorService: IrSensorService) {
        this.IrSensorServiceInstance = IrSensorService;
    }

    // デバイスの一覧を取得するエンドポイント
    async GetIrSensors(req: any, res: any): Promise<void> {
        // デバイスの一覧を取得する処理を実装する
        const IrSensors = await this.IrSensorServiceInstance.GetIrSensors();

        const responseDatas = IrSensors.map((IrSensor) => {
            return {
                id: IrSensor.id,
                device: {
                    "id": IrSensor.deviceId,
                },
                name: IrSensor.name,
                data: IrSensor.data,
                createdAt: IrSensor.createdAt,
                updatedAt: IrSensor.updatedAt
            };
        })

        // 一旦からの配列を返す
        return res.json(responseDatas);
    }

    // 新規センサーオブジェクトを作成する関数
    async CreateIrSensor(req: any, res: any): Promise<void> {
        // リクエストボディからセンサー情報を取得
        const sensorData = req.body;

        // デバイス方を取得
        const device: Device = sensorData["device"];

        // 名前を取得
        const name: String = sensorData["name"];

        // データを取得
        const data: String = sensorData["data"];

        // センサーを作成
        const NewSensor = await this.IrSensorServiceInstance.CreateIrSensor(device, name, data);

        // 一旦からの配列を返す
        return res.json({"device" : {"id": NewSensor.deviceId}, "name" : name, "createdAt" : NewSensor.createdAt,"updatedAt" : NewSensor.updatedAt, "data" : NewSensor.data,"id": NewSensor.id});
    }

    async DeleteIrSensor(req: any, res: any): Promise<void> {
        // センサーIDを取得
        const sensorId = req.params.id;

        // センサーを削除
        const deletedSensor = await this.IrSensorServiceInstance.DeleteIrSensor(sensorId);

        // 一旦からの配列を返す
        return res.json(deletedSensor);
    }

    async UpdateIrSensor(req: any, res: any): Promise<void> {
        // センサーIDを取得
        const sensorId = req.params.id;

        // リクエストボディからセンサー情報を取得
        const sensorData = req.body;

        // 名前を取得
        const name: string = sensorData["name"];

        // センサーを更新
        const updatedSensor = await this.IrSensorServiceInstance.UpdateIrSensor(sensorId, name,"");

        // 一旦からの配列を返す
        return res.json(updatedSensor);
    }

    // リモコンの情報を学習するエンドポイント
    async LearnEnvLog(req: any, res: any): Promise<void> {
        // リクエストボディからセンサー情報を取得
        const sensorData = req.body;

        // センサーIDを取得
        const sensorId: Number = sensorData["sensorId"];

        // サービスを呼び出す
        const result = await this.IrSensorServiceInstance.LearnIrSensor(sensorId);

        // 一旦からの配列を返す
        return res.json(result);
    }

    async SendIrSensor(req: any, res: any): Promise<void> {
        // リクエストボディからセンサー情報を取得
        const sensorData = req.body;

        // センサーIDを取得
        const sensorId: Number = sensorData["sensorId"];

        // サービスを呼び出す
        const result = await this.IrSensorServiceInstance.SendIrSensor(sensorId);

        // 一旦からの配列を返す
        return res.json(result);
    }

}

export default IrSensorController;
