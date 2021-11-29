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
const AWS = require('aws-sdk')
AWS.config.update({
  region: process.env['REGION']
})
const s3 = new AWS.S3({apiVersion: '2006-03-01'})
var path = require('path')

//アプリコース候補者リストデータservice
const PreUserRegist = require('./dealjson/preUserRegist')

const fileType = {
  PRE_USERLIST: 'import/pre_userlist/', //アプリコース候補者リストデータ
  INITIAL_DATA: 'import/initial_data/', //初回送信データ(人事・健診・問診・喫食)
  INITIAL_INTERVIEW: 'import/initial_interview', //初回面談データ
  UPDATED_DATA: 'import/updated_data/', //人事修正データ
  MEALCHECK: 'import/mealcheck/', //喫食データ
  HEALTH_NURSE: 'import/health_nurse/', //管理者リストデータ
  AREA_MASTER: 'import/area_master/', //エリアマスタデータ
}

exports.handler = async (event, context) => {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  
  if (event != null && event.Records != null) {
    //S3トリガー
    const bucket = event.Records[0].s3.bucket.name
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '))
    const params = {
      Bucket: bucket,
      Key: key,
    }
    try {
      let response = await s3.getObject(params).promise()
      //let text = response.Body.toString('utf-8')
      const jsonData = JSON.parse(response.Body.toString('utf8'))
      console.log(jsonData)

      if (key.startsWith(fileType.PRE_USERLIST)) {
        //アプリコース候補者リストデータ
        const preUserRegist = new PreUserRegist()
        await preUserRegist.readJson(jsonData)
      } else if (key.startsWith(fileType.INITIAL_DATA)) {
        //初回送信データ(人事・健診・問診・喫食)
        //TODO
      } else if (key.startsWith(fileType.INITIAL_INTERVIEW)) {
        //初回面談データ
        //TODO
      } else if (key.startsWith(fileType.UPDATED_DATA)) {
        //人事修正データ
        //TODO
      } else if (key.startsWith(fileType.MEALCHECK)) {
        //喫食データ
        //TODO
      } else if (key.startsWith(fileType.HEALTH_NURSE)) {
        //管理者リストデータ
        //TODO
      } else if (key.startsWith(fileType.AREA_MASTER)) {
        //エリアマスタデータ
        //TODO
      }

      // //copyのparamsを作成する
      // const copyKey = key.replace('import', 'backup')
      // const copyParams = {
      //   Bucket: bucket, 
      //   CopySource: '/' + bucket + '/' + key , 
      //   Key: copyKey
      // }
      // //処理が終わると、jsonファイルをBackupに移動させる
      // await s3.copyObject(copyParams).promise()
      // // copyが成功したら、jsonファイルを削除する
      // await s3.deleteObject(params).promise()

    } catch (err) {
      console.log(err)
      const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`
      console.log(message)
      throw new Error(message)
    }
  }

}