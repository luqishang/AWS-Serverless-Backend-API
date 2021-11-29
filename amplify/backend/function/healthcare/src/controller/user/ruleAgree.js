/*
 * ファイル名: ruleAgree.js
 * 作成日: 2021/10/01
 * 作成者: wei.cheng
 * 作成内容: 新規作成
 * 修正日:
 * 修正者:
 * 修正内容:
 * ver:1.0.0
 */
const express = require('express')
const router = express.Router()
const { query, body, validationResult } = require('express-validator')
const ExtensibleCustomError = require('extensible-custom-error')
const moment = require('moment')
class BadRequestError extends ExtensibleCustomError {} // 400
const RuleAgreeModel = require(process.env.AWS_REGION ? '/opt/model/ruleAgree' : '../../../../healthcarelayerOne/opt/model/ruleAgree')

/**
 * @swagger
 * /user/rule-agree:
 *   get:
 *     tags:
 *     - 保険対象者_規約同意
 *     summary: 規約同意取得
 *     description: 規約枝番でログインユーザーの最新の規約同意情報を取得する
 *                  最新情報がなければ、規約同意可否：falseを返す
 *     parameters:
 *     - name: ruleNo
 *       in: query
 *       description: 規約枝番
 *       required: true
 *       schema:
 *         type: integer
 *         format: int32
 *     - name: X-Auth-Token
 *       in: header
 *       description: 認証トークン
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: 取得OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ruleAgree'
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
 *     - 保険対象者_規約同意
 *     summary: 規約に関する同意の作成
 *     description: 規約に関する同意情報を新たに作成する
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
 *               - ruleNo
 *               - agreement
 *             properties:
 *               ruleNo:
 *                 type: integer
 *                 format: int32
 *                 description: 規約枝番
 *               agreement:
 *                 type: boolean
 *                 description: |
 *                   同意状況  
 *                   ・true: 同意  
 *                   ・false: 解約
 *     responses:
 *       200:
 *         description: 追加OK
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ruleAgree'
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
 *     ruleAgree:
 *       description: 規約に関する同意
 *       type: object
 *       properties:
 *         agreedAt:
 *           type: string
 *           description: |  
 *             デバイスからの取得日時    
 *             - ISOフォーマット(YYYY-MM-DDTHH:MI:SS+09:00)とする  
 *         agreement:
 *           type: boolean
 *           description: |
 *             同意状況  
 *             ・true: 同意  
 *             ・false: 解約
 */
router.get('/',[
  query('ruleNo').not().isEmpty().withMessage('ruleNo is required'),
  query('ruleNo').isInt().withMessage('ruleNo must be integer type')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    } 
    const response = {
      agreedAt: null,
      agreement: false
    }
    let ruleNoInput =  {eq: req.query.ruleNo } 
    const ruleAgreeModel = new RuleAgreeModel()
    // ユーザーIDはCognito認証にてすでに取得済み
    const getRuleAgreeResult = await ruleAgreeModel.ListRuleAgreeByUserIdRuleNo(req.userId, ruleNoInput) 
    const ruleAgreeItems = getRuleAgreeResult.data.listRuleAgreeByUserIdRuleNo.items
    if (!ruleAgreeItems.length) {
      //指定した規約枝番でデータを取得できない場合
      return res.json(response)
    }
    //同意日時でソートする
    const ruleAgreeItemsSort = ruleAgreeItems.sort((a,b) =>{
      return b.agreedAt - a.agreedAt
    })
    response.agreement = ruleAgreeItemsSort[0].agreement
    response.agreedAt = moment.unix(ruleAgreeItemsSort[0].agreedAt).format('YYYY-MM-DD HH:mm:ssZ')
    return res.json(response)
  })().catch(e => next(e))
})

router.post('/', [
  body('ruleNo').not().isEmpty().withMessage('ruleNo is required'),
  body('ruleNo').isInt().withMessage('ruleNo must be integer type'),
  body('agreement').not().isEmpty().withMessage('agreement is required'),
  body('agreement').isBoolean().withMessage('agreement must be boolean type')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    const ruleAgree = {
      userId: req.userId,
      ruleNo: req.body.ruleNo,
      agreedAt: moment().unix(),
      agreement: req.body.agreement,
      updatedAt: moment().unix(),
      createdAt: moment().unix()
    }
    const ruleAgreeModel = new RuleAgreeModel()
    const createRuleAgreeResult = await ruleAgreeModel.CreateRuleAgree(ruleAgree)
    const response = {
      agreedAt: moment.unix(ruleAgree.agreedAt).format('YYYY-MM-DD HH:mm:ssZ'),
      agreement: createRuleAgreeResult.data.createRuleAgree.agreement
    }
    return res.json(response)
  })().catch(e => next(e))
})

module.exports = router