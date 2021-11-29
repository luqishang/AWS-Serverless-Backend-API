/*
 * ファイル名: specificHealthGoal.js
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
const { body, validationResult } = require('express-validator')
const ExtensibleCustomError = require('extensible-custom-error')
const moment = require('moment')
class BadRequestError extends ExtensibleCustomError {} // 400
const SpecificHealthGoalModel = require(process.env.AWS_REGION ? '/opt/model/specificHealthGoal' : '../../../../healthcarelayerOne/opt/model/specificHealthGoal')
const comFunc = require(process.env.AWS_REGION ? '/opt/common/common-function' : '../../../../healthcarelayerOne/opt/common/common-function')
const ActionGoalModel = require(process.env.AWS_REGION ? '/opt/model/actionGoal' : '../../../../healthcarelayerOne/opt/model/actionGoal')

/**
 * @swagger
 * /user/specific-healthgoal:
 *   get:
 *     tags:
 *     - 保険対象者_特定保健指導目標
 *     summary: 特定保健指導目標取得
 *     description: ログインユーザーの最新の特定保健指導目標を取得する
 *     parameters:
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
 *               $ref: '#/components/schemas/specificHealthGoal'
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
 *     - 保険対象者_特定保健指導目標
 *     summary: 特定保健指導目標の作成
 *     description: 特定保健指導目標を新たに作成する
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
 *             $ref: '#/components/schemas/specificHealthGoalPost'
 *     responses:
 *       200:
 *         description: 追加OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/specificHealthGoal'
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
 *     specificHealthGoal:
 *       description: 特定保健指導目標
 *       required:
 *         - period
 *         - goalWeight
 *         - goalAbdominal
 *       type: object
 *       properties:
 *         recentWeight:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *           maximum: 999.99
 *           description: 現在体重
 *         recentAbdominal:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *           maximum: 999.9
 *           description: 現在腹囲
 *         period:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *           maximum: 12
 *           description: 期間
 *         goalWeight:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *           maximum: 999.99
 *           description: 目標体重
 *         goalAbdominal:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *           maximum: 999.9
 *           description: 目標腹囲
 *         actionGoals:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/actionGoal'
 *     specificHealthGoalPost:
 *       description: 特定保健指導目標
 *       required:
 *         - period
 *         - goalWeight
 *         - goalAbdominal
 *       type: object
 *       properties:
 *         period:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *           maximum: 12
 *           description: 期間
 *         goalWeight:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *           maximum: 999.99
 *           description: 目標体重
 */
router.get('/', [ 
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    return res.json(await getResponse(req.userId))
  })().catch(e => next(e))
})

router.post('/', [
  body('period').not().isEmpty().withMessage('period is required'),
  body('period').isInt({min:1, max:12}).withMessage('period should be INT and in range(1-12)'),
  body('goalWeight').not().isEmpty().withMessage('goalWeight is required'),
  body('goalWeight').isFloat({min:0, max:999.99}).withMessage('goalWeight should be in range(0-999.99)'),
  body('goalWeight').custom((value,{req})=>{
    // 整数及び小数点第2位まで許可
    if (String(req.body.goalWeight).indexOf('.') > 0) {
      let numbers = String(req.body.goalWeight).split('.')
      if (numbers[1].length > 2) throw new Error('goalWeight is invalid')
    }
    return true
  })
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }

    const specificHealthGoalModel = new SpecificHealthGoalModel()
    let date = { between: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD') ] }
    const specificHealthGoalResults = await specificHealthGoalModel.ListSpecificHealthGoalUserIdSettingDate(req.userId, date)
    const specificHealthGoalResult = specificHealthGoalResults.data.listSpecificHealthGoalUserIdSettingDate.items

    // 現在値の取得（体重・腹囲）
    const recentHealthChecks = await comFunc.getRecentHealthCheckData(req.userId, moment().format('YYYY-MM-DD'))
    let tragetAbdominal = parseFloat(recentHealthChecks.abdominal - (recentHealthChecks.weight - req.body.goalWeight)).toFixed(1)
    
    const specificHealthGoal = {
      userId: req.userId,
      settingDate: null,
      period: req.body.period,
      goalWeight: req.body.goalWeight,
      goalAbdominal: tragetAbdominal > 0 ? tragetAbdominal : null,
      updatedAt: null,
      createdAt: null
    }

    if (specificHealthGoalResult.length > 0){
      specificHealthGoal.updatedAt = moment().unix()
      specificHealthGoal.settingDate = specificHealthGoalResult[0].settingDate
      specificHealthGoal.createdAt = specificHealthGoalResult[0].createdAt
      await specificHealthGoalModel.UpdateSpecificHealthGoal(specificHealthGoal)
    } else {
      specificHealthGoal.createdAt = moment().unix()
      specificHealthGoal.settingDate = moment().format('YYYY-MM-DD')
      await specificHealthGoalModel.CreateSpecificHealthGoal(specificHealthGoal)
    }

    return res.json(await getResponse(req.userId))
  })().catch(e => next(e))
})

async function getResponse(userId) {
  
  // 目標値の取得（期間・体重）
  const specificHealthGoalModel = new SpecificHealthGoalModel()
  const specificHealthGoalResults = await specificHealthGoalModel.getRecentSpecificHealthGoal(userId)

  // 現在値の取得（体重・腹囲）
  const recentHealthChecks = await comFunc.getRecentHealthCheckData(userId, moment().format('YYYY-MM-DD'))
 
  //行動目標を取得する
  const actionGoalModel = new ActionGoalModel()
  const actionGoalResult = await actionGoalModel.listActionGoals(userId)
  const actionGoals = actionGoalResult.data.listActionGoals.items
  for(var actionGoal of actionGoals){
    delete actionGoal.userId
    delete actionGoal.createdAt
    delete actionGoal.updatedAt
    delete actionGoal.__typename
  }
  
  const response = {
    recentWeight: recentHealthChecks.weight,
    recentAbdominal : recentHealthChecks.abdominal,
    period : specificHealthGoalResults.period,
    goalWeight : specificHealthGoalResults.goalWeight,
    goalAbdominal : specificHealthGoalResults.goalAbdominal > 0 ? specificHealthGoalResults.goalAbdominal : null,
    actionGoals: actionGoals
  }
  return response
}

module.exports = router