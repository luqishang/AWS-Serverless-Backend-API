/*
 * ファイル名: cognito.js
 * 作成日: 2021/10/01
 * 作成者: matsumoto
 * 作成内容: 新規作成
 * 修正日: 2021/11/10
 * 修正者: bochao.zhang
 * 修正内容: 携帯電話登録のAPIを追加
 * 修正日: 2021/11/10
 * 修正者: cheng.wei  
 * 修正内容: ユーザーアカウントを作成
 * ver:1.0.0
 */
const cognitoExpress = require('cognito-express')
// const config = require('config');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const AWS = require('aws-sdk')
AWS.config.update({
  region: process.env['REGION']
})
const TOKEN_TYPE_ID = 'id'

module.exports = class Cognito {
  constructor() {
    const params = {
      UserPoolId: process.env['USER_POOL_ID'],
      ClientId: process.env['APP_CLIENT_ID']
    }
    this.userPool = new AmazonCognitoIdentity.CognitoUserPool(params)

    this.cognitoExpress = new cognitoExpress({
      region: process.env['REGION'],
      cognitoUserPoolId: params['UserPoolId'],
      tokenUse: TOKEN_TYPE_ID,
      tokenExpiration: 3600000 //1 hour (3600000 ms)
    })
  }

  verifyToken(token) {
    const that = this
    return new Promise(function(resolve, reject) {
      that.cognitoExpress.validate(token, (err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  }
  
  signUp(id, pass) {
    return new Promise((resolve, reject) => {
      this.userPool.signUp(id, pass, [], null, (err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  }

  signOut(id, pass) {
    return new Promise((resolve, reject) => {
      this.userPool.signOut(id, pass, [], null, (err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  }
  
  confirmRegistration(id, code) {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: id,
        Pool: this.userPool,
      }
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
      cognitoUser.confirmRegistration(code, true, (err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  }

  authenticateUser(id, pass) {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: id,
        Pool: this.userPool,
      }
      const authenticationData = {
        Username: id,
        Password: pass,
      }
      let response = 'success'
      const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData)
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
      const authCallbacks = {
        response: response,
        onSuccess: function(result) {
          result['result'] = response
          return resolve(result)
        },
        onFailure: function (err) {
          return reject(err)
        },
        newPasswordRequired(userAttributes, requiredAttributes) { // eslint-disable-line no-unused-vars
          return reject({code: 'NotAuthorizedException', name:'NewPasswordRequiredException', message: 'New password required'})
          /*
          response = 'newPasswordRequired'
          cognitoUser.completeNewPasswordChallenge(pass, {}, authCallbacks)
          */
        }
      }
      cognitoUser.authenticateUser(authenticationDetails, authCallbacks)
    })
  }

  changePassword(id, oldPass, newPass) {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: id,
        Pool: this.userPool,
      }
      const authenticationData = {
        Username: id,
        Password: oldPass
      }
      const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData)
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
      const authCallbacks = { 
        onSuccess: function(result) {
          return cognitoUser.changePassword(oldPass, newPass, (err, result2) => { // eslint-disable-line no-unused-vars
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          })
        },
        onFailure: function (err) {
          return reject(err)
        },
        newPasswordRequired(userAttributes, requiredAttributes) { // eslint-disable-line no-unused-vars
          return cognitoUser.completeNewPasswordChallenge(newPass, {}, {
            onSuccess: function (result) {
              resolve(result)
            },
            onFailure: function (err) {
              reject(err)
            }
          })
        }
      }
      cognitoUser.authenticateUser(authenticationDetails, authCallbacks)
    })    
  }

  /**
   * 確認済みの携帯電話またはEメールに認証コードを送信する
   * @param {string} id アカウント名
   * @returns 実行結果
   */
  forgotPassword(id) {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: id,
        Pool: this.userPool,
      }
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
      cognitoUser.forgotPassword({
        onSuccess: function(result) {
          resolve(result)
        },
        onFailure: function(err) {
          reject({name:'UserNotFoundError', message: err.message})
        }
      })
    })
  }

  /**
   * 確認コードと新パスワードを入力し、忘れたパスワードをリセットする
   * @param {string} id アカウント名
   * @param {string} verificationCode 認証コード（6桁）
   * @param {string} newPassword 新パスワード
   * @returns 実行結果
   */
  confirmPassword(id, verificationCode, newPassword) {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: id,
        Pool: this.userPool,
      }
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: function(result) {
          resolve(result)
        },
        onFailure: function(err) {
          reject({name:'BadVerificationCodeError', message: err.message})
        }
      })
    })
  }

  refreshToken(refreshToken) {
    const cognito = new AWS.CognitoIdentityServiceProvider({
      apiVersion: '2016-04-18'
    })
    const adminInitiateAuthResult = cognito.adminInitiateAuth({
      UserPoolId: process.env['USER_POOL_ID'],
      ClientId: process.env['APP_CLIENT_ID'],
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    }).promise()
    return adminInitiateAuthResult
  }

  deleteToken(userName) {
    const cognito = new AWS.CognitoIdentityServiceProvider({
      apiVersion: '2016-04-18'
    })
    const adminInitiateAuthResult = cognito.adminUserGlobalSignOut ({
      UserPoolId: process.env['USER_POOL_ID'],
      ClientId: process.env['APP_CLIENT_ID'],
      UserName: userName
    }).promise()
    return adminInitiateAuthResult
  }

  /**
   * ユーザ情報を取得する
   * @param {string} id アカウント名
   * @returns 実行結果
   */
  getUserAttributes(id) {
    return new Promise((resolve, reject) => {
      const cognito = new AWS.CognitoIdentityServiceProvider({
        apiVersion: '2016-04-18'
      })
      cognito.adminGetUser ({
        UserPoolId: process.env['USER_POOL_ID'],
        Username: id,
      }, (err, res) => {
        if (err) return reject({code:err.code, name:'UserNotFoundError', message: err.message})
        resolve(res)
      })
    })
  }

  /**
   * ユーザ情報を更新する
   * @param {string} id アカウント名
   * @param {AttributeListType} userAttributes ユーザーの属性を表す名前と値のペアの配列
   * @returns 実行結果
   */
  updateUserAttributes(id, userAttributes) {
    return new Promise((resolve, reject) => {
      const cognito = new AWS.CognitoIdentityServiceProvider({
        apiVersion: '2016-04-18'
      })
      cognito.adminUpdateUserAttributes ({
        UserPoolId: process.env['USER_POOL_ID'],
        Username: id,
        UserAttributes: userAttributes
      }, (err, res) => {
        if (err) return reject({code:err.code, name:'UserNotFoundError', message: err.message})
        resolve(res)
      })
    })
  }

  /**
   * 携帯電話またはEメールに認証コードを送信する
   * @param {string} id アカウント名
   * @param {string} attributeName ユーザーの属性名
   * @returns 実行結果
   */
  getUserAttributeVerificationCode(id, attributeName) {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: id,
        Pool: this.userPool,
      }
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
      cognitoUser.getSession(
        function(err, session) {
          console.log(session)
          cognitoUser.getAttributeVerificationCode(attributeName, {
            onSuccess: function(result) {
              resolve(result)
            },
            onFailure: function(err) {
              reject({name:'UserNotFoundError', message: err.message})
            }
          })
        }
      )
    })
  }

  /**
   * 携帯電話またはEメールに送信した認証コードを検証する
   * @param {string} id アカウント名
   * @param {string} attributeName ユーザーの属性名
   * @param {string} confirmationCode 認証コード
   * @returns 実行結果
   */
  verifyUserAttribute(id, attributeName, confirmationCode) {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: id,
        Pool: this.userPool,
      }
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
      cognitoUser.getSession(
        function(err, session) {
          if (err) return reject({name:'UserSessionError', message: err.message})
          console.log(session)
          cognitoUser.verifyAttribute(attributeName, confirmationCode, {
            onSuccess: function(result) {
              resolve(result)
            },
            onFailure: function(err) {
              reject({name:'BadVerificationCodeError', message: err.message})
            }
          })
        }
      )
    })
  }

  /**
   * Cognitoにユーザーを登録する
   * @param {string} account アカウント名
   * @param {string} pass パスワード
   * @returns 実行結果
   */
  registUser(account, pass) {
    const cognito = new AWS.CognitoIdentityServiceProvider({
      apiVersion: '2016-04-18'
    })
    
    const params = {
      UserPoolId: process.env['USER_POOL_ID'],
      DesiredDeliveryMediums: ['SMS'],
      ForceAliasCreation: false,
      MessageAction: 'SUPPRESS',
      Username: account, 
      TemporaryPassword: pass
    }

    const response = cognito.adminCreateUser(params).promise()
    return response    
  }

  /**
   * Cognitoにユーザーを登録する
   * @param {string} account アカウント名
   * @param {string} groupName ユーザーの属性名
   * @returns 実行結果
   */
  addUserToGroup(account, groupName) {
    const cognito = new AWS.CognitoIdentityServiceProvider({
      apiVersion: '2016-04-18'
    })
    const params = {
      UserPoolId: process.env['USER_POOL_ID'],
      GroupName: groupName,
      Username: account,
    }
    const response = cognito.adminAddUserToGroup(params).promise()
    return response
  }

  /**
   * Cognitoにユーザーを削除する
   * @param {string} account アカウント名
   * @returns 実行結果
   */
  deleteUser(account) {
    const cognito = new AWS.CognitoIdentityServiceProvider({
      apiVersion: '2016-04-18'
    })
    const params = {
      UserPoolId: process.env['USER_POOL_ID'],
      Username: account
    }
    const response = cognito.adminDeleteUser(params).promise()
    return response
  }

}