/*
 * ファイル名: userList.js
 * 作成日: 2021/10/15
 * 作成者: bochao.zhang
 * 作成内容: 保健師保険対象者グループのユーザ一覧機能
 * 修正日:
 * 修正者:
 * 修正内容:
 * ver:1.0.0
 */
const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')
const ExtensibleCustomError = require('extensible-custom-error')
class BadRequestError extends ExtensibleCustomError {} // 400
const NurseUserListModel = require(process.env.AWS_REGION ? '/opt/model/nurseUserList' : '../../../../healthcarelayerOne/opt/model/nurseUserList')
/**
 * @swagger
 * /nurse/userlist:
 *   get:
 *     tags:
 *     - 保健師_ユーザ情報
 *     summary: 保健師側ユーザリスト情報取得
 *     description: 保健師が管理しているユーザリスト情報を取得する
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
 *               $ref: '#/components/schemas/userList'
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
 *     userList:
 *       type: object
 *       properties:
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/userItem'
 *         organizations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/organizationItem'
 *     userItem:
 *       description: ユーザ詳細情報
 *       allOf:
 *       - type: object
 *         properties:
 *           endpointArn:
 *             type: string
 *             description: AWS SNSのendpointArn
 *           guidanceDate:
 *             type: string
 *             description: 初回指導日時
 *           guidanceState:
 *             type: string
 *             description: 指導状態
 *           organizationCd:
 *             type: string
 *             description: 組織コード
 *           organizationName:
 *             type: string
 *             description: 組織名称
 *       - $ref: '#/components/schemas/userProfileForGet'
 *     organizationItem:
 *       description: ユーザの属する組織種類情報
 *       type: object
 *       properties:
 *         organizationCd:
 *           type: string
 *           description: 組織コード
 *         organizationName:
 *           type: string
 *           description: 組織名称
 */
router.get('/',[
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    
    // get the nurse and managed users information from NurseUserGroup
    const nurseUserListModel = new NurseUserListModel()
    const listNurseUserResult = await nurseUserListModel.listNurseUserGroupNurseId(req.userId)
    const listNurseUsers = listNurseUserResult.data.listNurseUserGroupNurseId.items
    
    // set users and organizations information
    const users = []
    const organizations = []
    if (listNurseUsers.length > 0) {
      for (var nurseUserItem of listNurseUsers) {
        for (var userItem of nurseUserItem.user.items) {
          delete userItem.createdAt
          delete userItem.updatedAt
          delete userItem.deletedAt
          delete userItem.__typename

          let userItemRes = dynamoUser2Response(userItem)
          users.push(userItemRes)
  
          let organization = {
            organizationCd: userItem.organizationCd,
            organizationName: userItem.organizationName,
          }
          organizations.push(organization)
        }
      }
    }

    // remove organizationName duplicates from organizations array of objects
    const usersList = {
      users: [...users],
      organizations: [...organizations.filter((item, index, self) =>
        self.findIndex(t => t.organizationName === item.organizationName) === index)]
    }
    return res.json(usersList)
  })().catch(e => next(e))
})

/**
   * DynamoDBのデータをresponse用データに変換
   * @param {data} data DynamoDBのデータ
   * @returns response
   */
function dynamoUser2Response(data) {
  const response = {
    endpointArn: data.endpointArn,
    guidanceDate: data.guidanceDate,
    guidanceState: data.guidanceState,
    organizationCd: data.organizationCd,
    organizationName: data.organizationName,
    userId: data.id,
    account: data.account,
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

module.exports = router