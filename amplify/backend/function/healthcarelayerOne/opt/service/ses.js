/*
 * ファイル名: ses.js
 * 作成日: 2021/10/27
 * 作成者: lipei
 * 作成内容: 新規作成
 * 修正日:
 * 修正者:
 * 修正内容:
 * ver:1.0.0
 */
const AWS = require('aws-sdk')
AWS.config.update({region: 'ap-northeast-1'})
const ses = new AWS.SES({apiVersion: '2010-12-01'})

module.exports = class ServiceSES {
  /**
   * メールの送信
   * @param {string} toAddresses 受信先のアドレス
   * @param {string} messageBody メール本文の内容
   * @param {string} title メールタイトルの内容
   * @returns 実行結果
   */
  static async sendEmail (toAddresses, messageBody, title) {
    const params = {
      Destination: {
        ToAddresses: toAddresses
      },
      Message: {
        Body: {
          Text: {
            Data: messageBody,
            Charset: 'utf-8'
          }
        },
        Subject: {
          Data: title,
          Charset: 'utf-8'
        }          
      },
      Source: 'li.pei@woven-planet.global'
    }

    var sendPromise = ses.sendEmail(params).promise()
    return sendPromise(function (resolve, reject) {
      ses.sendEmail (params, function (err, data) {
        if (err) {
          reject(err)
        } if (data) {
          resolve(data)
        }
      })
    })   
  }
}
