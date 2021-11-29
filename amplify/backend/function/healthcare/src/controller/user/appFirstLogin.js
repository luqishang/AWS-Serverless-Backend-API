/*
 * ファイル名: appFirstLogin.js
 * 作成日: 2021/10/26
 * 作成者: ze.zhang
 * 作成内容: 新規作成
 * 修正日: 
 * 修正者: 
 * 修正内容:
 * ver:1.0.0
 */

const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')
const ExtensibleCustomError = require('extensible-custom-error')
const moment = require('moment')
class BadRequestError extends ExtensibleCustomError {} // 400
const today = moment().tz('Asia/Tokyo').format()
const UserModel = require(process.env.AWS_REGION ? '/opt/model/user' : '../../../../healthcarelayerOne/opt/model/user')

/**
 * @swagger
 * /user/appfirstlogin:
 *   get:
 *     tags:
 *     - 保険対象者_アプリ初回登録
 *     summary: アプリ初回登録日時の取得
 *     description: アプリ初回登録日時を取得する
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
 *             $ref: '#/components/schemas/appFirstLoginItem'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/appFirstLoginItem'
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
 *     - 保険対象者_アプリ初回登録
 *     summary: アプリ初回登録日時の登録
 *     description: アプリ初回登録日時を登録する
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
 *               $ref: '#/components/schemas/appFirstLoginItem'
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
 * 
 * components:
 *   schemas:        
 *     appFirstLoginItem:
 *       description: アプリ初回登録日時状態
 *       type: object
 *       properties: 
 *         appFirstAt:
 *           type: string
 *           description: |
 *             アプリ初回登録日時 
 *             - ISOフォーマット(YYYY-MM-DDTHH:MI:SS+09:00)とする
 */

router.get('/', [
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    //user情報を確認、初回ログイン日時を取得する
    const userModel = new UserModel() 
    const getUserResult = await userModel.GetUser(req.userId)
    const user = getUserResult.data.getUser
    if (!user) {
      return next(new BadRequestError('User data not found'))
    }
    const appFirstAt = user.appFirstAt  
    const response = {
      appFirstAt: appFirstAt
    }
    return res.json(response)    
  })().catch(e => next(e))
})

router.post('/', [
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    //user情報を確認、初回ログイン日時を取得する
    const userModel = new UserModel() 
    const getUserResult = await userModel.GetUser(req.userId)
    const user = getUserResult.data.getUser
    if (!user) {
      return next(new BadRequestError('User data not found'))
    }
    const appFirstAt = user.appFirstAt  
    if (appFirstAt != null ){
      return next(new BadRequestError('appFirstAt data already exists'))
    }   
    user.appFirstAt = today
    delete user.__typename 
    await userModel.UpdateUser(user)
    const response = {
      appFirstAt: user.appFirstAt
    }
    return res.json(response)
    
  })().catch(e => next(e))
})

module.exports = router