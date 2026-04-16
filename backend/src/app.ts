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
import { Any } from 'typeorm';

// expressアプリケーションのインスタンスを作成
const app = express();

// HTTPサーバーをexpressアプリを基に作成
const server = http.createServer(app);

// 受信するリクエストのボディをJSONとして自動的に解析するミドルウェアを追加
app.use(express.json());

// サーバーがリッスンするポート番号を指定
const port = 8000;

// 一時的にデータを保存する json
const datas: any = [];

// api グループを作成する
const apiRouter = express.Router();

// 音頭を返すエンドポイントを実装する
apiRouter.get("/env-logs",(req,res) => {
  // console.log("hello world");
  //
  
  res.json(datas);
})

// 音頭を更新するエンドポイントを実装する
apiRouter.post("/post-env-log",(req,res) => {
  // 音頭
  const temparature = req.body.temperatureSht;
  
  // 湿度
  const humidity = req.body.humidity;

  // 気圧
  const pressure = req.body.pressure;

  // 現在時刻取得
  const createdAt = new Date();

  console.log(temparature,humidity,pressure,createdAt);

  // datas に追加
  datas.push({
    temparature,
    humidity,
    pressure,
    createdAt
  });

  res.json([
    {
      "temperatureSht" : "20",
      "humidity" : "100",
      "pressure" : "100",
      "createdAt" : 0
    }
  ])
})



// api ルーターを適用する
app.use('/api', apiRouter);

// 指定したポートでHTTPサーバーを起動し、起動成功時にメッセージを出力
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
