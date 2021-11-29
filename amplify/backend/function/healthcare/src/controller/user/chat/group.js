/*
 * ファイル名: group.js
 * 作成日: 2021/10/01
 * 作成者: hara
 * 作成内容: 新規作成
 * 修正日:
 * 修正者:
 * 修正内容:
 * ver:1.0.0
 */
const express = require('express')
const router = express.Router()
const { query, validationResult } = require('express-validator')
const moment = require('moment')
const ExtensibleCustomError = require('extensible-custom-error')
class BadRequestError extends ExtensibleCustomError {} // 400
// class NotFoundError extends ExtensibleCustomError {} // 404

const ChatGroupModel = require(process.env.AWS_REGION ? '/opt/model/chatGroup' : '../../../../../healthcarelayerOne/opt/model/chatGroup')
const ChatGroupUserModel = require(process.env.AWS_REGION ? '/opt/model/chatGroupUser' : '../../../../../healthcarelayerOne/opt/model/chatGroupUser')
const UserModel = require(process.env.AWS_REGION ? '/opt/model/user' : '../../../../../healthcarelayerOne/opt/model/user')
const SNSService = require(process.env.AWS_REGION ? '/opt/service/sns' : '../../../../../healthcarelayerOne/opt/service/sns')

/**
 * @swagger
 * 
 * /user-chat/group:
 *    get:
 *      tags:
 *      - 保険対象者_チャット
 *      summary: チャットグループ一覧取得
 *      description: ログインユーザの属するチャットグループ一覧を取得する
 *      parameters:
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
 *                $ref: '#/components/schemas/ChatGroups'
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
 * /user-chat/group/users:
 *    get:
 *      tags:
 *      - 保険対象者_チャット
 *      summary: チャットグループ情報取得
 *      description: 指定したチャットグループの情報を取得する
 *      parameters:
 *      - name: groupId
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *        description: グループID  
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
 *                $ref: '#/components/schemas/ChatGroup'
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
 *    post:
 *      tags:
 *      - 保険対象者_チャット
 *      summary: チャットグループ情報更新
 *      description: 指定したチャットグループの生成や更新を行う
 *      parameters:
 *      - name: X-Auth-Token
 *        in: header
 *        description: 認証トークン
 *        required: true
 *        schema:
 *          type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ChatGroup'
 *        required: true
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ChatGroup'
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
 *     ChatGroup:
 *       description: チャットグループ情報
 *       type: object
 *       properties:
 *         groupId:
 *           type: string
 *           description: |  
 *             グループID  
 *             post時にnullの場合は新規にチャットグループを生成する
 *         groupName:
 *           type: string
 *           description: |  
 *             グループ名    
 *             １対１のチャットの場合は不要  
 *             ３名以上のユーザが居る場合には必須とする  
 *         users:
 *           type: array
 *           description: |  
 *             指定グループに属するユーザ一覧    
 *           items:
 *             type: string
 *     ChatGroups:
 *       description: チャットグループ一覧
 *       type: object
 *       properties:
 *         groups:
 *           type: array
 *           description: |  
 *             ログインユーザの属するチャットグループの一覧    
 *           items:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *                 description: グループID  
 *               groupName:
 *                 type: string
 *                 description: |  
 *                   グループ名    
 *                   １対１のチャットの場合はチャット相手の表示名  
 */

router.get('/', [
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    return res.json(await getChatGroups(req.userId))
  })().catch(e => next(e))
  
})

router.get('/users', [
  query('groupId').not().isEmpty().withMessage('groupId is required'),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    return res.json(await getChatGroup(req.query.groupId))
  })().catch(e => next(e))
  
})

router.post('/users', [
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    const chatGroupModel = new ChatGroupModel()
    const chatGroupUserModel = new ChatGroupUserModel()
    const userModel = new UserModel()

    let users = req.body.users
    for (let user of users) {
      const getUserResult = await userModel.GetUser(user)
      const targetUser = getUserResult.data.getUser
      if (targetUser == null) {
        return next(new BadRequestError('userId: ' + user + ' does not exist'))
      }
    }

    const data = {
      id: req.body.groupId ? req.body.groupId : null,
      name: req.body.groupName,
    }

    let targetGroupId = null
    let topicArn = null
    if (data.id){
      data.updatedAt = moment().unix()
      const groupData = await chatGroupModel.UpdateChatGroup(data)
      targetGroupId = groupData.data.updateChatGroup.id
      topicArn = groupData.data.updateChatGroup.topicArn
    } else {
      data.createdAt = moment().unix()
      const groupData = await chatGroupModel.CreateChatGroup(data)
      targetGroupId = groupData.data.createChatGroup.id
      // SNSトピックの作成(TODO: ※タイミングがここでない場合は変えてください)
      const createSnsTopicResult = await SNSService.createSnsTopic(targetGroupId)
      topicArn = createSnsTopicResult.TopicArn
      await chatGroupModel.UpdateChatGroup({id: targetGroupId, topicArn: topicArn})
    }
    
    const userList = await chatGroupUserModel.ListChatGroupUsers(targetGroupId)

    for (let user of userList.data.listChatGroupUsers.items) {
      const data = {
        groupId: user.groupId,
        userId: user.userId,
      }
      await chatGroupUserModel.DeleteChatGroupUser(data)
      // SNSトピックからの削除 (TODO: ※タイミングがここでない場合は変えてください)
      if (user.subscriptionArn) {
        await SNSService.unsubscribe(user.subscriptionArn)
      }
    }
    
    if (users) {      
      for (let user of users) {
        const data = {
          groupId: targetGroupId,
          userId: user
        }
        // SNSトピックへのサブスクリプション(TODO: ※タイミングがここでない場合は変えてください)
        const getUserResult = await userModel.GetUser(user)
        if (getUserResult.data.getUser.endpointArn) {
          const result = await SNSService.createSnsSubscription(topicArn, getUserResult.data.getUser.endpointArn)
          data.subscriptionArn = result.SubscriptionArn
        }
        await chatGroupUserModel.CreateChatGroupUser(data)
      }
    }

    return res.json(await getChatGroup(targetGroupId))

  })().catch(e => next(e))
})

async function getChatGroups(userId) {

  try{
    const chatGroupUserModel = new ChatGroupUserModel()
    const myChatGroups = await chatGroupUserModel.ListChatGroupUserUserId(userId)

    let groups = []

    for (let element of myChatGroups.data.listChatGroupUserUserId.items) {
      // グループの登録人数が２人の場合、自分以外のユーザ名をグループ名として取得
      const chatGroup = await chatGroupUserModel.ListChatGroupUsers(element.groupId)
      let group = {}
      if (chatGroup.data.listChatGroupUsers.items.length == 2) {
        const partner = chatGroup.data.listChatGroupUsers.items.filter(item=>item.user.items[0].id != userId)
        group = {
          groupId: element.groupId,
          groupName: partner[0].user.items[0].nickName
        }
      } else {
        group = {
          groupId: element.groupId,
          groupName: element.group.items[0].name
        }
      }
      groups.push(group)
    }

    const response = {
      groups: groups
    }

    return response

  } catch (e) {
    console.log(e)
  }
}

async function getChatGroup(groupId) {

  try{
    const chatGroupModel = new ChatGroupModel()
    const chatGroupUserModel = new ChatGroupUserModel()

    const targetChatGroup = await chatGroupModel.GetChatGroup(groupId)
    const targetChatGroupUsers = await chatGroupUserModel.ListChatGroupUsers(groupId)

    let users = []
    targetChatGroupUsers.data.listChatGroupUsers.items.forEach(element => {
      users.push(element.userId)
    })

    const response = {
      groupId: targetChatGroup.data.getChatGroup.id,
      groupName: targetChatGroup.data.getChatGroup.name,
      users: users
    }

    return response

  } catch (e) {
    console.log(e)
  }
}

module.exports = router