import { DeviceModel } from "../models";

class DeviceService {
    private DeviceModel: DeviceModel;
    
    // コンストラクタ
    constructor(deviceModel: DeviceModel) {
        this.DeviceModel = deviceModel;
    }

    public getDevices() {
        // モデルからデバイスのリストを取得する処理を実装する
        return this.DeviceModel.getDevices();
    }
}

export default DeviceService;
