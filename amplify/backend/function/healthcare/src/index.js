/*
 * ファイル名: index.js
 * 作成日: 2021/11/16
 * 作成者: cheng.wei
 * 作成内容: S3イベント通知処理の新規作成
 * 修正日:
 * 修正者:
 * 修正内容:
 * ver:1.0.0
 */
const awsServerlessExpress = require('aws-serverless-express')
const app = require('./app')
const server = awsServerlessExpress.createServer(app)

exports.handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)

  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise
  
}
