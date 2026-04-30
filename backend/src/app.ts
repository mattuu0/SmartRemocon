/**
 * サーバー起動スクリプト
 * 
 * このスクリプトは、Expressを使用して基本的なHTTPサーバーを起動します。
 * JSONリクエストボディの解析ミドルウェアを設定し、指定されたポートで待ち受けます。
 * 
 * 使用技術:
 * - Express（Webフレームワーク）
 * - Node.js httpモジュール
 * 
 *  Date : 2025/04/01 - 2025/07/31
 *  Author : K.Murakami
 */


// Expressライブラリをインポート（Node.jsのWebアプリケーションフレームワーク）
import express from 'express';

// httpモジュールをインポート（Node.jsの標準モジュール、HTTPサーバーを作成するために使用）
import http from 'http';

// socket.ioをインポート
import { Server } from "socket.io";


// サービスをインポートする
import { EnvLogService } from './service';
import EnvLogController from './controller/env-log';
import { prisma } from './models/prisma';
import { EnvLoggerModel } from './models';

// expressアプリケーションのインスタンスを作成
const app = express();

// HTTPサーバーをexpressアプリを基に作成
const server = http.createServer(app);

// 受信するリクエストのボディをJSONとして自動的に解析するミドルウェアを追加
app.use(express.json());

// サーバーがリッスンするポート番号を指定
const port = 8000;

// model を初期化する
const env_log_model = new EnvLoggerModel(prisma);

// socket.io のサーバーを初期化する
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');
});

// サービスを初期化する
const env_log_service = new EnvLogService(env_log_model, io);

// コントローラーを初期化する
const env_log_controller = new EnvLogController(env_log_service);

// api グループを作成する
const apiRouter = express.Router();

// 音頭を返すエンドポイントを実装する
apiRouter.get("/env-logs",(req,res) => env_log_controller.GetEnvLogs(req,res));

// デバイス

// api ルーターを適用する
app.use('/api', apiRouter);

// mqtt を起動する
import { MqttInit } from './service/mqtt';
MqttInit(env_log_service);

// 指定したポートでHTTPサーバーを起動し、起動成功時にメッセージを出力
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
