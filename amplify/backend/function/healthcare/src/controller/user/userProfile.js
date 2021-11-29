/*
 * ファイル名: userProfile.js
 * 作成日: 2021/10/01
 * 作成者: matsumoto
 * 作成内容: 新規作成
 * 修正日:
 * 修正者:
 * 修正内容:
 * ver:1.0.0
 */
const moment = require('moment')

const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const ExtensibleCustomError = require('extensible-custom-error')
// const moment = require('moment')
class BadRequestError extends ExtensibleCustomError {} // 400
class NotFoundError extends ExtensibleCustomError {} // 404

const UserModel = require(process.env.AWS_REGION ? '/opt/model/user' : '../../../../healthcarelayerOne/opt/model/user')
const SNSService = require(process.env.AWS_REGION ? '/opt/service/sns' : '../../../../healthcarelayerOne/opt/service/sns')
const GENDER = ['male', 'female']
/**
 * @swagger
 * /user/profiles:
 *   get:
 *     tags:
 *     - 保険対象者_ユーザープロファイル
 *     summary: ユーザープロファイル取得
 *     description: ログインしたアカウントのユーザー情報を取得する
 *     parameters:
 *     - name: X-Auth-Token
 *       in: header
 *       description: 認証トークン
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userProfileForGet'
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
 *       500:
 *         $ref: '#/components/responses/500'
 *   post:
 *     tags:
 *     - 保険対象者_ユーザープロファイル
 *     summary: ユーザ―プロファイルの作成
 *     description: ログインしたユーザーIDにてユーザー情報を新たに作成する
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
 *             $ref: '#/components/schemas/userProfile'
 *     responses:
 *       200:
 *         description: 追加OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userProfileForGet'
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
 *       500:
 *         $ref: '#/components/responses/500'
 *   put:
 *     tags:
 *     - 保険対象者_ユーザープロファイル
 *     summary: ユーザ―プロファイルの更新
 *     description: ログインしたユーザーIDにてユーザー情報を更新する
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
 *             $ref: '#/components/schemas/userProfile'
 *     responses:
 *       200:
 *         description: 更新OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userProfileForGet'
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
 *       500:
 *         $ref: '#/components/responses/500'
 * /user/profiles/deviceToken:
 *   put:
 *     tags:
 *     - 保険対象者_ユーザープロファイル
 *     summary: ユーザ―デバイストークンの更新
 *     description: ログインしたユーザーIDにてデバイストークンを更新する
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
 *             $ref: '#/components/schemas/userDeviceToken'
 *     responses:
 *       200:
 *         description: 更新OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userProfileForGet'
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
 *       500:
 *         $ref: '#/components/responses/500'
 * components:
 *   schemas:
 *     userProfile:
 *       description: ユーザープロファイル
 *       required:
 *         - firstName
 *         - lastName
 *         - nickName
 *         - birth
 *         - gender
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           maxLength: 64
 *           description: 氏名（名）
 *         lastName:
 *           type: string
 *           maxLength: 64
 *           description: 氏名（姓）
 *         firstKana:
 *           type: string
 *           maxLength: 64
 *           description: カナ氏名（名）
 *         lastKana:
 *           type: string
 *           maxLength: 64
 *           description: カナ氏名（姓）
 *         nickName:
 *           type: string
 *           maxLength: 64
 *           description: 画面表示名
 *         birth:
 *           type: string
 *           description: |
 *             生年月日  
 *             - ISOフォーマット(YYYY-MM-DD)とする  
 *         gender:
 *           type: string
 *           enum:
 *           - male
 *           - female
 *           description: |
 *             性別  
 *             ・male: 男性  
 *             ・female: 女性
 *         tel:
 *           type: string
 *           maxLength: 11
 *           description: |
 *             電話番号  
 *             - ハイフンなし  
 *         email:
 *           type: string
 *           maxLength: 100
 *           description: |
 *             メールアドレス  
 *         deviceToken:
 *           type: string
 *           description: |
 *             デバイストークン
 *     userProfileForGet:
 *       allOf:
 *       - type: object
 *         properties:
 *           userId:
 *             type: string
 *             description: ユーザーID
 *           account:
 *             type: string
 *             description: ログインアカウント名
 *       - $ref: '#/components/schemas/userProfile'
 *     userDeviceToken:
 *       description: ユーザーデバイストークン
 *       required:
 *         - deviceToken
 *       type: object
 *       properties:
 *         deviceToken:
 *           type: string
 *           description: |
 *             デバイストークン
 */
router.get('/',[
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    const userModel = new UserModel()
    // ユーザーIDはCognito認証にてすでに取得済み
    const getUserResult = await userModel.GetUser(req.userId)
    if (!getUserResult.data.getUser) {
      return next(new NotFoundError('User data not found'))
    }
    return res.json(dynamoUser2Response(req, getUserResult.data.getUser))
  })().catch(e => next(e))
})

router.post('/', [
  body('firstName').not().isEmpty().withMessage('firstName is required'),
  body('firstName').isLength({max: 64}).withMessage('tel must be under 64 character length'),
  body('lastName').not().isEmpty().withMessage('lastName is required'),
  body('lastName').isLength({max: 64}).withMessage('lastName must be under 64 character length'),
  body('firstKana').isLength({max: 64}).withMessage('firstKana must be under 64 character length'),
  body('lastKana').isLength({max: 64}).withMessage('lastKana must be under 64 character length'),
  body('nickName').not().isEmpty().withMessage('nickName is required'),
  body('nickName').isLength({max: 64}).withMessage('nickName must be under 64 character length'),
  body('birth').not().isEmpty().withMessage('birth is required'),
  body('birth').isISO8601().withMessage('birth is not DateFormat(YYYY-MM-DD)'),
  body('tel').optional({nullable:true}).isInt().withMessage('tel must be number field'),
  body('tel').optional({nullable:true}).isLength({min: 10, max: 11}).withMessage('tel must be between 10 and 11 character length'),
  body('gender').not().isEmpty().withMessage('gender is required'),
  body('gender').isIn(GENDER).withMessage('gender must be male or female only'),
  body('email').optional({nullable:true}).isEmail().withMessage('email is invalid format')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    const user = {
      id: req.userId,
      account: req.userName,
      createdAt: moment().unix(),
      updatedAt: moment().unix(),
      ...req.body
    }
    const userModel = new UserModel()
    const getUserResult = await userModel.GetUser(req.userId)
    if (getUserResult.data.getUser) {
      return next(new BadRequestError('User data already exists'))
    }
    // SNSエンドポイントの登録
    if (req.body.deviceToken) {
      const snsResult = await SNSService.createSnsEndpoint(req.body.deviceToken)
      if (snsResult) {
        // SNSエンドポイントの有効化
        await SNSService.enableSnsEndpoint(snsResult.EndpointArn)
        user.endpointArn = snsResult.EndpointArn
      }
    }
    const createUserResult = await userModel.CreateUser(user)
    
    return res.json(dynamoUser2Response(req, createUserResult.data.createUser))
  })().catch(e => next(e))
})

router.put('/', [
  body('firstName').not().isEmpty().withMessage('firstName is required'),
  body('firstName').isLength({max: 64}).withMessage('tel must be under 64 character length'),
  body('lastName').not().isEmpty().withMessage('lastName is required'),
  body('lastName').isLength({max: 64}).withMessage('lastName must be under 64 character length'),
  body('firstKana').isLength({max: 64}).withMessage('firstKana must be under 64 character length'),
  body('lastKana').isLength({max: 64}).withMessage('lastKana must be under 64 character length'),
  body('nickName').not().isEmpty().withMessage('nickName is required'),
  body('nickName').isLength({max: 64}).withMessage('nickName must be under 64 character length'),
  body('birth').not().isEmpty().withMessage('birth is required'),
  body('birth').isISO8601().withMessage('birth is not DateFormat(YYYY-MM-DD)'),
  body('tel').optional({nullable:true}).isInt().withMessage('tel must be number field'),
  body('tel').optional({nullable:true}).isLength({min: 10, max: 11}).withMessage('tel must be between 10 and 11 character length'),
  body('gender').not().isEmpty().withMessage('gender is required'),
  body('gender').isIn(GENDER).withMessage('gender must be male or female only'),
  body('email').optional({nullable:true}).isEmail().withMessage('email is invalid format')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    const userModel = new UserModel()
    const getUserResult = await userModel.GetUser(req.userId)
    if (!getUserResult.data.getUser) {
      return next(new NotFoundError('User data not found'))
    }
    delete getUserResult.data.getUser.__typename
    const user = {
      ...getUserResult.data.getUser,
      updatedAt: moment().unix(),
      ...req.body
    }
    // デバイストークンが変更された場合のみSNSの削除登録を行う
    if (req.body.deviceToken && getUserResult.data.getUser.deviceToken !== req.body.deviceToken) {
      await SNSService.deleteSnsEndpoint(getUserResult.data.getUser.endpointArn)
      const snsResult = await SNSService.createSnsEndpoint(req.body.deviceToken)
      if (snsResult) {
        // SNSエンドポイントの有効化
        await SNSService.enableSnsEndpoint(snsResult.EndpointArn)
        user.endpointArn = snsResult.EndpointArn
      }
    }
    const updateUserResult = await userModel.UpdateUser(user)
    return res.json(dynamoUser2Response(req, updateUserResult.data.updateUser))    
  })().catch(e => next(e))
})

function dynamoUser2Response(req, data) {
  const response = {
    userId: req.userId,
    account: req.userName,
    firstName: data.firstName,
    lastName: data.lastName,
    firstKana: data.firstKana,
    lastKana: data.lastKana,
    nickName: data.nickName,
    birth: data.birth,
    gender: data.gender,
    tel: data.tel,
    email: data.email,
    deviceToken: data.deviceToken
  }
  return response  
}

router.put('/deviceToken', [
  body('deviceToken').not().isEmpty().withMessage('deviceToken is required'),
  body('deviceToken').isLength({min:163, max:163}).withMessage('deviceToken must be 163 character length')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    
    const deviceToken = req.body.deviceToken
    const userModel = new UserModel()
    const getUserResult = await userModel.GetUser(req.userId)
    const user = getUserResult.data.getUser
    if (!user) {
      return next(new NotFoundError('User data not found'))
    }
    delete user.__typename
    const data = {
      ...getUserResult.data.getUser,
      updatedAt: moment().unix(),
      ...req.body
    }
    // デバイストークンが変更された場合のみSNSの削除登録を行う
    if (deviceToken && user.deviceToken !== deviceToken) {
      await SNSService.deleteSnsEndpoint(user.endpointArn)
      const snsResult = await SNSService.createSnsEndpoint(deviceToken)
      if (snsResult) {
        // SNSエンドポイントの有効化
        await SNSService.enableSnsEndpoint(snsResult.EndpointArn)
        data.endpointArn = snsResult.EndpointArn
      }
    }
    const updateUserResult = await userModel.UpdateUser(data)
    return res.json(dynamoUser2Response(req, updateUserResult.data.updateUser))    
  })().catch(e => next(e))
})

module.exports = router