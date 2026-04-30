import * as mqtt from "mqtt";
import { EnvLogService } from "./env-log";
import { DeviceEnvLog } from "./types";


// 受信データの型定義
interface SensorData {
    ip_address: string;
    mac_address: string;
    temperature: number;
    humidity: number;
    pressure: number;
}

// 接続設定
const BROKER_HOST = "mosquitto";
const BROKER_PORT = 8883;
const TOPIC = "/hello";
const IR_TOPIC = "/ir";

const options: mqtt.IClientOptions = {
    host: BROKER_HOST,
    port: BROKER_PORT,
    protocol: "mqtts",
    // 自己署名証明書のため検証をスキップ
    rejectUnauthorized: false,
    clientId: `ts-subscriber-${Math.random().toString(16).slice(2, 8)}`,
    clean: true,
    reconnectPeriod: 5000, // 5秒ごとに再接続
    connectTimeout: 10000,
};

export function MqttInit(envlogService: EnvLogService) {
    console.log(`Connecting to mqtt://${BROKER_HOST}:${BROKER_PORT} ...`);

    const client = mqtt.connect(options);

    client.on("connect", () => {
        console.log("Connected to MQTT broker");

        client.subscribe(TOPIC, { qos: 0 }, (err) => {
            if (err) {
                console.error("Subscribe error:", err);
                return;
            }
            console.log(`Subscribed to topic: ${TOPIC}`);
            console.log("Waiting for messages...\n");
        });

        client.subscribe(IR_TOPIC, { qos: 0 }, (err) => {
            if (err) {
                console.error("Subscribe error:", err);
                return;
            }
            console.log(`Subscribed to topic: ${IR_TOPIC}`);
        });
    });

    client.on("message", (topic: string, payload: Buffer) => {
        // topic が hello の時センサーとして処理する
        console.log(`[${new Date().toISOString()}] Received message on topic: ${topic}`);

        if (topic == "/hello") {
            const raw = payload.toString();
            console.log(`[${new Date().toISOString()}] topic: ${topic}`);

            try {
                const data: SensorData = JSON.parse(raw);
                console.log(`  Temperature : ${data.temperature} °C`);
                console.log(`  Humidity    : ${data.humidity} %`);
                console.log(`  Pressure    : ${data.pressure} hPa`);
                console.log(`  IP Address  : ${data.ip_address}`);
                console.log(`  MAC Address : ${data.mac_address}`);

                const postData: DeviceEnvLog = {
                    ip_address: data.ip_address,
                    mac_address: data.mac_address,
                    temperatureSht: data.temperature,
                    humidity: data.humidity,
                    pressure: data.pressure,
                    createdAt: new Date()
                };

                // 環境情報を追加
                envlogService.PostEnvLog(postData);
            } catch {
                // JSON以外のメッセージはそのまま表示
                console.log(`  Raw payload : ${raw}`);
            }

            console.log("");
        } else if (topic == "/ir") {
            const raw = payload.toString();

            // パースする
            const data = JSON.parse(raw);

            console.log(`[${new Date().toISOString()}] topic: ${topic}`);
            console.log(`  IR Data : ${data["payload"]}`);
            console.log("");
        }
    });

    client.on("reconnect", () => {
        console.log("Reconnecting...");
    });

    client.on("error", (err: Error) => {
        console.error("MQTT error:", err.message);
    });

    client.on("close", () => {
        console.log("Connection closed");
    });
}
