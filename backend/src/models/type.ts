export type DeviceEnvLogRecord = {
    deviceId: string;   // デバイスのID
    ip_address: string; // デバイスのIPアドレス
    mac_address: string; // デバイスのMACアドレス
    temperatureSht: number;  // 温度
    humidity: number;       // 湿度
    pressure: number;       // 圧力
    createdAt: Date; // number → Date に変更
};
