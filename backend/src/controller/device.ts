import DeviceService from "../service/device";

class DeviceController {
    private deviceService: DeviceService;

    // コンストラクタ
    constructor(deviceService: DeviceService) {
        this.deviceService = deviceService;
    }

    // デバイスの一覧を取得するエンドポイント
    public async GetDevices(req:any, res:any): Promise<void> {
        try {
            // デバイスの一覧を取得するロジックを実装する
            const devices = await this.deviceService.getDevices();
            res.status(200).json(devices);
        } catch (error) {
            console.error("Error fetching devices:", error);
            res.status(500).json({ error: "Failed to fetch devices" });
        }
    }
}

export default DeviceController;
