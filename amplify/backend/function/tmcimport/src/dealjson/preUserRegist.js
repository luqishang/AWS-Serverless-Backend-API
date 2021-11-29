/*
 * ファイル名: preUserRegist.js
 * 作成日: 2021/11/01
 * 作成者: cheng.wei
 * 作成内容: アプリコース候補者リストの新規作成
 * 修正日:
 * 修正者:
 * 修正内容:
 * ver:1.0.0
 */

//const moment = require(process.env.AWS ? '/opt/nodejs/node_modules/moment' : '../../lib/nodejs/node_modules/moment')
const moment = require('moment')
const AWS = require('aws-sdk')
AWS.config.update({
  region: process.env['REGION']
})
const Cognito = require('/opt/service/cognito')
const UserModel = require('/opt/model/user')
const comFunc = require('/opt/common/common-function')

module.exports = class PreUserRegist {
  constructor() {
  }

  async readJson (data) {
    const preUsers = data

    try {
      const userModel = new UserModel()
      const cognito = new Cognito()
      for(var preUser of preUsers) {

        if (preUser.updFlg == '1') {
          //1.追加
          //Cognitoにユーザーを登録する
          let result = await cognito.registUser(preUser.anonymousID, preUser.password)
          console.log(result)
          const userId = result.User.Attributes[0].Value
          //usrグループにユーザを追加する
          result = await cognito.addUserToGroup(preUser.anonymousID, 'user')

          //ユーザー情報にデータを登録する
          //userId,supportType
          const data = {
            id: userId,
            account: preUser.anonymousID,
            supportType: preUser.supportType,
            guidanceState: comFunc.GuidanceState.BEFORE,
            updatedAt: moment().unix(),
            createdAt: moment().unix()
          }
          await userModel.CreateUser(data)
        } else if (preUser.updFlg == '2') {
          //2.削除
          //
        }
      }      
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }

}