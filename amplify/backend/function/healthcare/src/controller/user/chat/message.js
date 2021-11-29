/*
 * ファイル名: message.js
 * 作成日: 2021/10/01
 * 作成者: hara
 * 作成内容: 新規作成
 * 修正日: 2021/11/24
 * 修正者: bochao.zhang
 * 修正内容: message一覧、未読件数取得の最終投稿日時をISOからUTCフォーマットに修正
 * ver:1.0.0
 */
const express = require('express')
const router = express.Router()
const { query, body, validationResult } = require('express-validator')
const moment = require('moment-timezone')
const ExtensibleCustomError = require('extensible-custom-error')
class BadRequestError extends ExtensibleCustomError {} // 400

const ChatGroupModel = require(process.env.AWS_REGION ? '/opt/model/chatGroup' : '../../../../../healthcarelayerOne/opt/model/chatGroup')
const ChatMessageModel = require(process.env.AWS_REGION ? '/opt/model/chatMessage' : '../../../../../healthcarelayerOne/opt/model/chatMessage')
const SNSService = require(process.env.AWS_REGION ? '/opt/service/sns' : '../../../../../healthcarelayerOne/opt/service/sns')
/**
 * @swagger
 * 
 *  /user-chat/message:
 *    get:
 *      tags:
 *      - 保険対象者_チャット
 *      summary: チャットメッセージ一覧取得
 *      description: |
 *        指定されたチャットグループのメッセージ一覧を  
 *        指定された最終投稿日からさかのぼって指定メッセージ数分取得する
 *      parameters:
 *      - name: groupId
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *        description: グループID  
 *      - name: length
 *        in: query
 *        schema:
 *          type: integer
 *          default: 20
 *          minimum: 1
 *          maximum: 99
 *        description: 取得するメッセージ数  
 *      - name: lastPostedAt
 *        in: query
 *        schema:
 *          type: string
 *        description: |
 *          最終投稿日時  
 *          - ISOフォーマット(YYYY-MM-DDTHH:MI:SSZ)とする  
 *            (注)JST(+09:00)はQueryParamとして使用できないためUTCへの変換が必要
 *          未指定時は最新のメッセージを対象とする  
 *      - name: X-Auth-Token
 *        in: header
 *        description: 認証トークン
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ChatMessages'
 *        400:
 *          $ref: '#/components/responses/400'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        404:
 *          $ref: '#/components/responses/404'
 *        405:
 *          $ref: '#/components/responses/405'
 *        500:
 *          $ref: '#/components/responses/500'
 *    post:
 *     tags:
 *     - 保険対象者_チャット
 *     summary: チャットメッセージ新規投稿
 *     description: |
 *       チャットメッセージを新規に投稿する
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
 *             $ref: '#/components/schemas/ChatMessage'
 *       required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatMessages'
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
 * /user-chat/message/count:
 *    get:
 *      tags:
 *      - 保険対象者_チャット
 *      summary: チャットメッセージ未読件数取得
 *      description: |
 *        指定されたチャットグループのメッセージより  
 *        指定された最終投稿日以降の件数(これを未読件数として)を取得する
 *      parameters:
 *      - name: groupId
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *        description: グループID  
 *      - name: lastPostedAt
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *        description: |
 *          最終投稿日時  
 *          - ISOフォーマット(YYYY-MM-DDTHH:MI:SSZ)とする  
 *            (注)JST(+09:00)はQueryParamとして使用できないためUTCへの変換が必要
 *      - name: X-Auth-Token
 *        in: header
 *        description: 認証トークン
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ChatMessageCount'
 *        400:
 *          $ref: '#/components/responses/400'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        404:
 *          $ref: '#/components/responses/404'
 *        405:
 *          $ref: '#/components/responses/405'
 *        500:
 *          $ref: '#/components/responses/500'
 * 
 * components:
 *   schemas:
 *     ChatMessages:
 *       description: チャットメッセージ一覧
 *       type: object
 *       properties:
 *         groupId:
 *           type: string
 *           description: グループID  
 *         messages:
 *           type: array
 *           description: |  
 *             指定されたグループIDのチャットメッセージの一覧    
 *           items:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 description: メッセージ内容  
 *               postedAt:
 *                 type: string
 *                 description: |  
 *                   投稿日時  
 *                   - ISOフォーマット(YYYY-MM-DDTHH:MI:SS+09:00)とする  
 *               postedId:
 *                 type: string
 *                 description: 投稿者のユーザーID
 *               postedBy:
 *                 type: string
 *                 description: 投稿者の表示名
 *     ChatMessage:
 *       description: チャットメッセージ
 *       type: object
 *       required:
 *         - groupId
 *         - body
 *         - postedAt
 *       properties:
 *         groupId:
 *           type: string
 *           description: |  
 *             グループID  
 *         body:
 *           type: string
 *           description: |  
 *             チャットメッセージ    
 *         postedAt:
 *           type: string
 *           description: |  
 *             投稿日時  
 *             - ISOフォーマット(YYYY-MM-DDTHH:MI:SS+09:00)とする  
 *     ChatMessageCount:
 *       description: チャットメッセージ件数
 *       type: object
 *       properties:
 *         groupId:
 *           type: string
 *           description: |  
 *             グループID  
 *         messages:
 *           type: integer
 *           description: |  
 *             チャットメッセージ件数    
*/

router.get('/', [
  query('groupId').not().isEmpty().withMessage('groupId is required'),
  query('length').optional({nullable:true}).isInt({min: 1, max:99}).withMessage('length shoud be Integer(1-99)'),
  query('lastPostedAt').optional({nullable:true}).isISO8601().withMessage('lastPostedAt is not DateFormat(YYYY-MM-DDTHH:mm:SSZ)'),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }

    // lengthのDefault値の設定
    let targetLength = 20
    if (req.query.length) targetLength = req.query.length
    // lastPostedAtのDefault値の設定
    // let targetLastPostedAt = new Date
    // if (req.query.lastPostedAt) targetLastPostedAt = moment.parseZone(req.query.lastPostedAt).local().toLocaleString()
    // targetLastPostedAt = moment(targetLastPostedAt).tz('Asia/Tokyo').format()

    return res.json(await getResponse(req.query.groupId, targetLength, req.query.lastPostedAt))

  })().catch(e => next(e))
  
})

router.get('/count', [
  query('groupId').not().isEmpty().withMessage('groupId is required'),
  query('lastPostedAt').not().isEmpty().withMessage('lastPostedAt is required'),
  query('lastPostedAt').isISO8601().withMessage('lastPostedAt is not DateFormat(YYYY-MM-DDTHH:mm:SSZ)'),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }

    // lastPostedAtのDefault値の設定
    // let targetLastPostedAt = new Date
    // if (req.query.lastPostedAt) targetLastPostedAt = moment.parseZone(req.query.lastPostedAt).local().toLocaleString()
    // targetLastPostedAt = moment(targetLastPostedAt).tz('Asia/Tokyo').format()

    const chatMessageModel = new ChatMessageModel()
    const messageHistory = await chatMessageModel.ListChatMessageGroupId(req.query.groupId, {gt: req.query.lastPostedAt})
  
    const response = {
      groupId: req.query.groupId,
      messages: messageHistory.data.listChatMessageGroupId.items.length
    }
  
    return res.json(response)

  })().catch(e => next(e))
  
})

router.post('/', [
  body('groupId').not().isEmpty().withMessage('groupId is required'),
  body('body').not().isEmpty().withMessage('body is required'),
  body('postedAt').not().isEmpty().withMessage('postedAt is required'),
  body('postedAt').isISO8601().withMessage('postedAt is not DateFormat(YYYY-MM-DDTHH24:MI:SSZ)'),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    const chatMessageModel = new ChatMessageModel()
    const data = {
      groupId: req.body.groupId,
      body: req.body.body,
      postedAt: req.body.postedAt,
      postedId: req.userId,
    }
    data.createdAt = moment().unix()
    await chatMessageModel.CreateChatMessage(data)
    // グループデータの取得
    const chatGroupModel = new ChatGroupModel()
    const getChatGroupResult = await chatGroupModel.GetChatGroup(req.body.groupId)
    console.log(getChatGroupResult)
    // SNSのトピックにメッセージ送信(TODO: ※タイミングがここでない場合は変えてください)
    if (getChatGroupResult.data.getChatGroup.topicArn) {
      SNSService.publish(getChatGroupResult.data.getChatGroup.topicArn, 'ヘルスケア', req.body.body)
    }
    return res.json(await getResponse(req.body.groupId, 1, moment(new Date).tz('Asia/Tokyo').format()))

  })().catch(e => next(e))
})

async function getResponse(groupId, length, lastPostedAt) {

  const chatMessageModel = new ChatMessageModel()
  const messageHistory = await chatMessageModel.ListChatMessageGroupId(groupId, {le: lastPostedAt}, null, 'DESC', length)

  let messages = []

  const history = messageHistory.data.listChatMessageGroupId.items

  history.sort(function(a, b){
    if (a.postedAt < b.postedAt) return 1
    if (a.postedAt > b.postedAt) return -1
    return 0
  })

  history.forEach(element => {
    const message = {
      // groupId: element.groupId,
      body: element.body,
      postedAt: element.postedAt,
      postedId: element.postedId,
      postedBy: element.postedUser.items[0].nickName
    }
    messages.unshift(message)
  })

  const response = {
    groupId: groupId,
    messages: messages
  }

  return response
}

module.exports = router