/*
 * ファイル名: s3.js
 * 作成日: 2021/10/01
 * 作成者: matsumoto
 * 作成内容: 新規作成
 * 修正日:
 * 修正者:
 * 修正内容:
 * ver:1.0.0
 */
/* eslint-disable */
const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-northeast-1' })
const sns = new AWS.SNS()
const snsPlatformApplicationArn = 'arn:aws:sns:ap-northeast-1:379914488656:app/GCM/healthcare-firebase'

module.exports = class ServiceSNS {
  /**
   * エンドポイントの作成
   * @param {string}} token デバイストークン
   * @returns 実行結果
   */
  static async createSnsEndpoint (token) {
    const params = {
      PlatformApplicationArn: snsPlatformApplicationArn,
      Token: token
    }
    return await sns.createPlatformEndpoint(params).promise()
  }

  /**
   * エンドポイントの有効化
   * @param {string} endpointArn エンドポイントARN
   * @returns 実行結果
   */
  static async enableSnsEndpoint (endpointArn) {
    const params = {
      Attributes: {
        Enabled: 'true'
      },
      EndpointArn: endpointArn
    }
    return await sns.setEndpointAttributes(params).promise()
  }

  /**
   * エンドポイントの削除
   * @param {string}} endpointArn 
   * @returns 
   */
  static async deleteSnsEndpoint (endpointArn) {
    const params = {
      EndpointArn: endpointArn
    }
    return await sns.deleteEndpoint(params)
  }

  /**
   * トピックのサブスクリプション
   * @param {string} topicArn トピックARN
   * @param {string} endpointArn エンドポイントARN
   * @returns 実行結果
   */
  static async createSnsSubscription (topicArn, endpointArn) {
    const params = {
      Protocol: 'application',
      TopicArn: topicArn,
      Endpoint: endpointArn
    }
    return await sns.subscribe(params).promise()
  }

  /**
   * トピックからの削除
   * @param {string} subscriptionArn サブスクリプションARN
   * @returns 実行結果
   */
  static async unsubscribe(subscriptionArn) {
    const params = {
      SubscriptionArn: subscriptionArn
    }
    return await sns.unsubscribe(params).promise()
  }

  /**
   * トピックの作成
   * @param {string} topicId トピックID
   * @returns 実行結果
   */
  static async createSnsTopic (topicId) {
    const params = {
      Name: topicId
    }
    return await sns.createTopic(params).promise()
  }

  /**
   * トピックへのメッセージを投稿
   * @param {string} topicArn トピックARN
   * @param {string} title 標題
   * @param {string} message メッセージ
   * @returns 実行結果
   */
  static async publish (topicArn, title, message) {
    
    const body = {
      default: message,
      GCM: "{ \"notification\": {\"body\": \"" + message + "\", \"title\":\"" + title +  "\"} }"
    }
    console.log(body)
    console.log(JSON.stringify(body))
    const params = {
      TopicArn: topicArn,
      MessageStructure: 'json',
      Message: JSON.stringify(body)
    }
    return await sns.publish(params).promise()
  }

  /**
   * エンドポイントへのメッセージ送信
   *  ダイレクトメッセージなど直接送信する必要が出てきた場合に利用する。
   * @param {string} endpointArn エンドポイントARN
   * @param {string} title 標題
   * @param {string} message メッセージ
   * @returns 実行結果
   */
  static async send (endpointArn, title, message) {
    //const body = `{"GCM":"{"notification":{"body":"${message}","title":"${title}"}}}`
    const body = {
      GCM: "{ \"notification\": {\"body\": \"" + message + "\", \"title\":\"" + title +  "\"} }"
    }
    const params = {
      TargetArn: endpointArn,
      MessageStructure: 'json',
      Subject: title,
      Message: JSON.stringify(body),
    }
    return await sns.publish(params).promise()
  }
}
