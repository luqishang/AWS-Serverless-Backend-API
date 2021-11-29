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
const AWS = require('aws-sdk')
AWS.config.update({
  region: process.env['REGION']
}) 

module.exports = class S3Strage {
  constructor() {
    this.s3 = new AWS.S3({apiVersion: '2006-03-01'})
  }
  upload (name, data) {
    const params = {
      Bucket: process.env['STORAGE_S35F4002E8_BUCKETNAME'],
      Key: name,
      Body: data
    }
    const that = this
    return new Promise(function (resolve, reject) {
      that.s3.upload (params, function (err, data) {
        if (err) {
          reject(err)
        } if (data) {
          resolve(data)
        }
      })
    })
  }
  delete (name) {
    const params = {
      Bucket: process.env['STORAGE_S35F4002E8_BUCKETNAME'],
      Key: name
    }
    const that = this
    return new Promise(function (resolve, reject) {
      that.s3.deleteObject (params, function (err, data) {
        if (err) {
          reject(err)
        } if (data) {
          resolve(data)
        }
      })
    })
  }  
}