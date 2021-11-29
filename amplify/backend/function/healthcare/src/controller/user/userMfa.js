/*
 * ファイル名: userMfa.js
 * 作成日: 2021/11/11
 * 作成者: bochao.zhang
 * 作成内容: 多要素認証新規作成
 * 修正日: 
 * 修正者: 
 * 修正内容: 
 * ver:1.0.0
 */
const express = require('express')
const router = express.Router()
const { body, query, validationResult } = require('express-validator')
const ExtensibleCustomError = require('extensible-custom-error')
class BadRequestError extends ExtensibleCustomError {} // 400
class UnauthorizedError extends ExtensibleCustomError {} // 401
class UserNotFoundError extends ExtensibleCustomError{} // 410
class BadVerificationCodeError extends ExtensibleCustomError{} // 411
class UserSessionError extends ExtensibleCustomError{} // 412

const CognitoService = require(process.env.AWS_REGION ? '/opt/service/cognito' : '../../../../healthcarelayerOne/opt/service/cognito')
/**
* @swagger
* /user/mfa/status:
*   get:
*     summary: 多要素認証状態取得
*     description: 多要素認証としてユーザのメールアドレスや、電話番号の認証状態を取得する
*     tags:
*       - 保険対象者_多要素認証
*     parameters:
*     - name: account
*       in: query
*       required: true
*       schema:
*         type: string
*       description: アカウント名
*     - name: X-Auth-Token
*       in: header
*       description: 認証トークン
*       required: true
*       schema:
*         type: string
*     responses:
*       200:
*         description: ユーザ多要素認証状態取得OK
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 account:
*                   type: string
*                   description: アカウント名
*                 userAttributes:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/userMFAAttributes'
*       400:
*         $ref: '#/components/responses/400'
*       401:
*         $ref: '#/components/responses/401'
*       403:
*         $ref: '#/components/responses/403'
*       404:
*         $ref: '#/components/responses/404'
*       405:
*         $ref: '#/components/responses/405'
*       410:
*         $ref: '#/components/responses/410'
*       500:
*         $ref: '#/components/responses/500'
* /user/mfa/registration:
*   post:
*     summary: 多要素認証仮登録
*     description: 多要素認証としてユーザのメールアドレスや、電話番号を仮登録する
*     tags:
*       - 保険対象者_多要素認証
*     parameters:
*     - name: X-Auth-Token
*       in: header
*       description: 認証トークン
*       required: true
*       schema:
*         type: string
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*             - account
*             - attributeName
*             - attributeValue
*             properties:
*               account:
*                 type: string
*                 description: アカウント名
*                 minLength: 8
*                 maxLength: 64
*               attributeName:
*                 type: string
*                 description: ユーザ属性名（email、phone_number）
*                 minLength: 1
*                 maxLength: 32
*               attributeValue:
*                 type: string
*                 description: ユーザ属性値（例：example@test.com、+819012345678）
*     responses:
*       200:
*         description: ユーザ多要素認証仮登録OK
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 account:
*                   type: string
*                   description: アカウント名
*                 userAttributes:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/userMFAAttributes'
*       400:
*         $ref: '#/components/responses/400'
*       401:
*         $ref: '#/components/responses/401'
*       403:
*         $ref: '#/components/responses/403'
*       404:
*         $ref: '#/components/responses/404'
*       405:
*         $ref: '#/components/responses/405'
*       410:
*         $ref: '#/components/responses/410'
*       500:
*         $ref: '#/components/responses/500'
* /user/mfa/verify:
*   post:
*     summary: 多要素認証確認
*     description: 多要素認証として仮登録で送信した認証コードを確認する
*     tags:
*       - 保険対象者_多要素認証
*     parameters:
*     - name: X-Auth-Token
*       in: header
*       description: 認証トークン
*       required: true
*       schema:
*         type: string
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*             - account
*             - attributeName
*             - confirmationCode
*             properties:
*               account:
*                 type: string
*                 description: アカウント名
*                 minLength: 8
*                 maxLength: 64
*               attributeName:
*                 type: string
*                 description: ユーザ属性名（email、phone_number）
*                 minLength: 1
*                 maxLength: 32
*               confirmationCode:
*                 type: string
*                 description: 認証コード
*     responses:
*       200:
*         description: 認証コード確認OK
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 account:
*                   type: string
*                   description: アカウント名
*                   minLength: 8
*                   maxLength: 64
*                 attributeName:
*                   type: string
*                   description: ユーザ属性名（email、phone_number）
*                   minLength: 1
*                   maxLength: 32
*       400:
*         $ref: '#/components/responses/400'
*       401:
*         $ref: '#/components/responses/401'
*       403:
*         $ref: '#/components/responses/403'
*       404:
*         $ref: '#/components/responses/404'
*       405:
*         $ref: '#/components/responses/405'
*       411:
*         $ref: '#/components/responses/411'
*       412:
*         $ref: '#/components/responses/412'
*       500:
*         $ref: '#/components/responses/500'
* components:
*   schemas:
*     userMFAAttributes:
*       type: object
*       description: ユーザー属性を表す名前と値のペア
*       required:
*       - name
*       properties:
*         name:
*           type: string
*           description: ユーザー属性名（email、email_verified、phone_number、phone_number_verified）
*           minLength: 1
*           maxLength: 32
*         value:
*           type: string
*           description: ユーザー属性値（例：example@test.com、false、+819012345678、true）
*/
router.get('/status', [
  query('account').not().isEmpty().withMessage('account is required'),
  query('account').isLength({min:8, max:64}).withMessage('account must be between 8 and 64 characters'),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    
    const cognitoService = new CognitoService()
    try {
      const getUserAttributesResult = await cognitoService.getUserAttributes(req.query.account)
      const userAttributesList = await getUserMFAAttributes(getUserAttributesResult)

      return res.json({
        account: req.query.account,
        userAttributes: [...userAttributesList]
      })
    } catch (e) {
      if (e.name === 'UserNotFoundError') {
        return next(new UserNotFoundError(e.message))
      }
      return next(new UnauthorizedError(e.message))
    }

  })().catch(e => next(e))
})

router.post('/registration', [
  body('account').not().isEmpty().withMessage('account is required'),
  body('account').isLength({min:8, max:64}).withMessage('account must be between 8 and 64 characters'),
  body('attributeName').not().isEmpty().withMessage('attributeName is required'),
  body('attributeName').isLength({min:1, max:32}).withMessage('attributeName must be between 1 and 32 characters'),
  body('attributeValue').not().isEmpty().withMessage('attributeValue is required'),
  body('attributeValue').if(body('attributeName').equals('email')).isEmail().withMessage('email is invalid format'),
  body('attributeValue').if(body('attributeName').equals('phone_number')).isMobilePhone('ja-JP', {strictMode: true}).withMessage('phone number is invalid format(eg. +819012345678)'),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }

    let userAttributeListUpdate = []
    const userAttribute = {
      Name: req.body.attributeName,
      Value: req.body.attributeValue,
    }
    userAttributeListUpdate.push(userAttribute)

    const cognitoService = new CognitoService()
    try {
      await cognitoService.updateUserAttributes(req.body.account, userAttributeListUpdate)
      const getUserAttributesResult = await cognitoService.getUserAttributes(req.body.account)
      const userAttributesList = await getUserMFAAttributes(getUserAttributesResult)

      return res.json({
        account: req.query.account,
        userAttributes: [...userAttributesList]
      })
    } catch (e) {
      if (e.name === 'UserNotFoundError') {
        return next(new UserNotFoundError(e.message))
      }
      return next(new UnauthorizedError(e.message))
    }

  })().catch(e => next(e))
})

router.post('/verify', [
  body('account').not().isEmpty().withMessage('account is required'),
  body('account').isLength({min:8, max:64}).withMessage('account must be between 8 and 64 characters'),
  body('attributeName').not().isEmpty().withMessage('attributeName is required'),
  body('attributeName').isLength({min:1, max:32}).withMessage('attributeName must be between 1 and 32 characters'),
  body('confirmationCode').not().isEmpty().withMessage('confirmationCode is required'),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }

    const cognitoService = new CognitoService()
    try {
      await cognitoService.verifyUserAttribute(req.body.account, req.body.attributeName, req.body.confirmationCode)

      return res.json({
        account: req.body.account,
        attributeName: req.body.attributeName
      })
    } catch (e) {
      if (e.name === 'UserSessionError') {
        return next(new UserSessionError(e.message))
      }
      if (e.name === 'BadVerificationCodeError') {
        return next(new BadVerificationCodeError(e.message))
      }
      return next(new UnauthorizedError(e.message))
    }
  })().catch(e => next(e))
})

/**
 * 多要素認証状態を取得
 * @param {AdminGetUserResponse} userAttributesResult ユーザ情報取得結果
 * @returns 多要素認証状態の配列
 */
async function getUserMFAAttributes(userAttributesResult) {
  let userAttributesList = []
  let emailAttribute = {
    name: 'email',
    value: ''
  }
  let emailVerifiedAttribute = {
    name: 'email_verified',
    value: 'false'
  }
  let phoneNumberAttribute = {
    name: 'phone_number',
    value: ''
  }
  let phoneNumberVerifiedAttribute = {
    name: 'phone_number_verified',
    value: 'false'
  }

  userAttributesResult.UserAttributes.forEach(element => {
    switch (element.Name) {
    case 'email':
      emailAttribute.value = element.Value ?? ''
      break
    case 'email_verified':
      emailVerifiedAttribute.value = element.Value ?? 'false'
      break
    case 'phone_number':
      phoneNumberAttribute.value = element.Value ?? ''
      break
    case 'phone_number_verified':
      phoneNumberVerifiedAttribute.value = element.Value ?? 'false'
      break
    default:
      break
    }
  })
  userAttributesList.push(emailAttribute)
  userAttributesList.push(emailVerifiedAttribute)
  userAttributesList.push(phoneNumberAttribute)
  userAttributesList.push(phoneNumberVerifiedAttribute)
  return userAttributesList
}

module.exports = router
