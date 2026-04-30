// 環境情報
export type DeviceEnvLog = {
    temperatureSht: number;
    humidity: number;
    pressure: number;
    ip_address: string;
    mac_address: string;
    createdAt: Date; // number → Date に変更
};

export type FrontendEnvLog = {
    id: number;
    device: Device;
    temperatureSht: number;
    humidity: number;
    temperatureQmp: number;
    pressure: number;
    createdAt: Date;
    updatedAt: Date;
};

export type Device = {
    id: number;
    macAddress: string;
    ipAddress: string;
    name: string;
    location: string;
    collectMetrics: boolean;
    registeredAt: Date;
    envLog: DeviceEnvLog;
    IRSensorValue: IRSensorValue;
    createdAt: Date;
    updatedAt: Date;
};

export type IRSensorValue = {
    id: number;
    device: Device;
    name: string;
    data: string;
    createdAt: Date;
    updatedAt: Date;
};
