/*
 * ファイル名: guidance.js
 * 作成日: 2021/10/15
 * 作成者: wei.cheng
 * 作成内容: 新規作成 指導状態と初回指導日時を更新
 * 修正日: 
 * 修正者: 
 * 修正内容: 
 * ver:1.0.0
 */

const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const ExtensibleCustomError = require('extensible-custom-error')
// const moment = require('moment')
const UserModel = require(process.env.AWS_REGION ? '/opt/model/user' : '../../../../healthcarelayerOne/opt/model/user')
class BadRequestError extends ExtensibleCustomError {} // 400
const GUIDANCESTATE = ['beforeguidence', 'afterfirstguidence', 'afterfirstsupport', 'aftersecondsupport', 'afterguidence']

/**
 * @swagger
 * /user/guidance:
 *   put:
 *     tags:
 *     - 保険対象者_指導状態
 *     summary: 指導状態更新
 *     description: 指導状態を更新する
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
 *             $ref: '#/components/schemas/guidance'
 *     responses:
 *       200:
 *         description: 更新OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/guidance'
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
 *     guidance:
 *       description: 保険対象者_指導状態
 *       type: object
 *       properties:
 *         guidanceDate:
 *           type: string
 *           description: |  
 *             初回指導日時  
 *             - ISOフォーマット(YYYY-MM-DDTHH:MI:SS+09:00)とする *         
 *         guidanceState:
 *           type: string
 *           enum:
 *           - beforeguidence
 *           - afterfirstguidence
 *           - afterfirstsupport
 *           - aftersecondsupport 
 *           - afterguidence
 *           description: |
 *             指導状態  
 *             ・beforeguidence: 指導開始前
 *             ・afterfirstguidence: 初回面談後
 *             ・afterfirstsupport: 1回目中間支援後
 *             ・aftersecondsupport: 2回目中間支援後
 *             ・afterguidence: 最後面談終了
 */
router.put('/', [
  body('guidanceDate').optional({nullable:true}).isISO8601().withMessage('guidanceDate is not DateFormat(YYYY-MM-DDTHH24:MI:SSZ)'),
  body('guidanceState').optional({nullable:true}).isIn(GUIDANCESTATE).withMessage('guidanceState must be beforeguidence or afterfirstguidence or afterfirstsupport or aftersecondsupport or afterguidence only')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }

    const guidanceDate = req.body.guidanceDate
    const guidanceState = req.body.guidanceState
    const userId = req.userId

    const userModel = new UserModel()
    const getUserResult = await userModel.GetUser(userId)
    const user = getUserResult.data.getUser
    if (user == null) {
      return next(new BadRequestError('User data already exists'))
    }
    delete user.__typename
    // const user = {
    //   ...getUserResult.data.getUser,
    //   updatedAt: moment().unix(),
    //   ...req.body
    // }
    user.guidanceDate = guidanceDate
    user.guidanceState = guidanceState
    await userModel.UpdateUser(user)
    
    const response = {
      guidanceDate: guidanceDate,
      guidanceState: guidanceState
    }

    return res.json(response)   
  })().catch(e => next(e))
})
  
module.exports = router