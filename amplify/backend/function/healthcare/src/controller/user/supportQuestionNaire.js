/*
 * ファイル名: supportQuestionNaire.js
 * 作成日:2021/10/13
 * 作成者:bochao.zhang
 * 作成内容:中間支援アンケートを作成
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
const comFunc = require(process.env.AWS_REGION ? '/opt/common/common-function' : '../../../../healthcarelayerOne/opt/common/common-function')
const SupportQuestionnaireLogModel = require(process.env.AWS_REGION ? '/opt/model/supportQuestionNaireLog' : '../../../../healthcarelayerOne/opt/model/supportQuestionNaireLog')
const HealthCheckModel = require(process.env.AWS_REGION ? '/opt/model/healthCheck' : '../../../../healthcarelayerOne/opt/model/healthCheck')
const UserModel = require(process.env.AWS_REGION ? '/opt/model/user' : '../../../../healthcarelayerOne/opt/model/user')
const ActionGoalModel = require(process.env.AWS_REGION ? '/opt/model/actionGoal' : '../../../../healthcarelayerOne/opt/model/actionGoal')
const ACHIEVERATE = [100, 80, 60, 40, 20, 0]
const LIFESTYLE = ['improvement', 'nochange', 'deterioration']
const SMOKINGSTATUS = ['never', 'continue', 'stop', 'nointention']

/**
 * @swagger
 * /user/support-questionnaire:
 *   get:
 *     tags:
 *     - 保険対象者_中間支援
 *     summary: 中間支援のアンケート情報取得
 *     description: 中間支援のアンケート情報を取得する
 *     parameters:
 *     - name: supportCount
 *       in: query
 *       description: 支援回目(1:１回目,2:２回目)
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/supportQuestionnaireGet'
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
 *     - 保険対象者_中間支援
 *     summary: 中間支援のアンケート回答結果登録
 *     description: 中間支援のアンケート回答結果を登録する
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
 *             $ref: '#/components/schemas/supportQuestionnaireEdit'
 *     responses:
 *       200:
 *         description: 追加OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/supportQuestionnaireEdit'
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
 *     supportQuestionnaireGet:
 *       description: 中間支援のアンケート取得
 *       type: object
 *       properties:
 *         weight:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *           maximum: 999.99
 *           description: 現在体重
 *         abdominal:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *           maximum: 999.9
 *           description: 現在腹囲
 *         actionGoals:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/actionGoalSprtQuestRes'
 *     supportQuestionnaireEdit:
 *       description: 中間支援のアンケート回答結果
 *       required:
 *         - supportCount
 *         - weight
 *         - abdominal
 *         - foodLife
 *         - bodyActivity
 *         - smokingStatus
 *       type: object
 *       properties:
 *         supportCount:
 *           type: integer
 *           description: 支援回目(1:１回目,2:２回目)
 *         weight:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *           maximum: 999.99
 *           description: 現在体重
 *         abdominal:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *           maximum: 999.9
 *           description: 現在腹囲
 *         actionGoalsAchieveRate:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/actionGoalSprtQuestPost'
 *         foodLife:
 *           type: string
 *           enum:
 *           - improvement
 *           - nochange
 *           - deterioration
 *           description: |
 *             食生活の改善状況  
 *             ・improvement: 改善
 *             ・nochange: 変化なし
 *             ・deterioration: 悪化
 *         bodyActivity:
 *           type: string
 *           enum:
 *           - improvement
 *           - nochange
 *           - deterioration
 *           description: |
 *             身体活動の改善状況  
 *             ・improvement: 改善
 *             ・nochange: 変化なし
 *             ・deterioration: 悪化
 *         smokingStatus:
 *           type: string
 *           enum:
 *           - never
 *           - continue
 *           - stop
 *           - nointention
 *           description: |
 *             喫煙状況の改善状況  
 *             ・never: 元々吸わない
 *             ・continue: 禁煙継続中
 *             ・stop: 禁煙中断
 *             ・nointention: 禁煙の意思なし
 *         freeInputContent:
 *           type: string
 *           description: 自由入力コメント
 *     actionGoalSprtQuestRes:
 *       description: 達成率を含む行動目標
 *       allOf:
 *       - $ref: '#/components/schemas/actionGoal'
 *       - type: object
 *         properties:
 *           achieveRate:
 *             type: integer
 *             description: |
 *               達成率  
 *               ・0: 0%
 *               ・20: 20%
 *               ・40: 40%
 *               ・60: 60%
 *               ・80: 80%
 *               ・100: 100%
 *     actionGoalSprtQuestPost:
 *       type: object
 *       description: 行動目標達成率
 *       properties:
 *         goalSettingNo:
 *           type: integer
 *           description: 行動目標枝番
 *         achieveRate:
 *           type: integer
 *           description: |
 *             達成率  
 *             ・0: 0%
 *             ・20: 20%
 *             ・40: 40%
 *             ・60: 60%
 *             ・80: 80%
 *             ・100: 100%
 */
router.get('/', [
  query('supportCount').not().isEmpty().withMessage('supportCount is required'),
  query('supportCount').isInt({min:1, max:2}).withMessage('supportCount must be 1 or 2'),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    const response = await getResponse(req.userId, req.query.supportCount)
    return res.json(response)
  })().catch(e => next(e))
})

router.post('/', [
  body('supportCount').not().isEmpty().withMessage('supportCount is required'),
  body('supportCount').isInt({min:1, max:2}).withMessage('supportCount must be 1 or 2'),
  body('weight').not().isEmpty().withMessage('weight is required'),
  body('weight').isFloat({min:0, max:999.99}).withMessage('weight should be in range(0-999.99)'),
  body('weight').optional({nullable:true}).custom((value,{req})=>{
    // 整数及び小数点第2位まで許可
    if (String(req.body.weight).indexOf('.') > 0) {
      let numbers = String(req.body.weight).split('.')
      if (numbers[1].length > 2) throw new Error('weight is invalid')
    }
    return true
  }),
  body('abdominal').not().isEmpty().withMessage('abdominal is required'),
  body('abdominal').isFloat({min:0, max:999.9}).withMessage('abdominal should be in range(0-999.9)'),
  body('abdominal').optional({nullable:true}).custom((value,{req})=>{
    // 整数及び小数点第1位まで許可
    if (String(req.body.abdominal).indexOf('.') > 0) {
      let numbers = String(req.body.abdominal).split('.')
      if (numbers[1].length > 1) throw new Error('abdominal is invalid')
    }
    return true
  }),
  body('actionGoalsAchieveRate.*.goalSettingNo').not().isEmpty().withMessage('actionGoalsAchieveRate.*.goalSettingNo is required'),
  body('actionGoalsAchieveRate.*.goalSettingNo').isInt().withMessage('actionGoalsAchieveRate.*.goalSettingNo must be integer type'),
  body('actionGoalsAchieveRate.*.achieveRate').not().isEmpty().withMessage('actionGoalsAchieveRate.*.achieveRate is required'),
  body('actionGoalsAchieveRate.*.achieveRate').isIn(ACHIEVERATE).withMessage('actionGoalsAchieveRate.*.achieveRate must be 0 or 20 or 40 or 60 or 80 or 100 only'),
  body('foodLife').not().isEmpty().withMessage('foodLife is required'),
  body('foodLife').isIn(LIFESTYLE).withMessage('foodLife must be improvement or nochange or deterioration only'),
  body('bodyActivity').not().isEmpty().withMessage('bodyActivity is required'),
  body('bodyActivity').isIn(LIFESTYLE).withMessage('bodyActivity must be improvement or nochange or deterioration only'),
  body('smokingStatus').not().isEmpty().withMessage('smokingStatus is required'),
  body('smokingStatus').isIn(SMOKINGSTATUS).withMessage('smokingStatus must be never or continue or stop or nointention only'),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    
    // 支援回目、体重、腹囲、食生活、身体活動、喫煙状況、自由入力コメントを設定
    const supportQuestionNaire = {
      userId: req.userId,
      supportCount: req.body.supportCount,
      recordDate: moment().format('YYYY-MM-DD'),
      weight: req.body.weight,
      abdominal: req.body.abdominal,
      foodLife: req.body.foodLife,
      bodyActivity: req.body.bodyActivity,
      smokingStatus: req.body.smokingStatus,
      freeInputContent: req.body.freeInputContent ?? null,
      createdAt: moment().unix(),
      updatedAt: moment().unix(),
    }

    // 行動目標枝番、目標達成率を設定
    const actionGoalsAchieveRate = req.body.actionGoalsAchieveRate
    if (actionGoalsAchieveRate != null && actionGoalsAchieveRate.length > 0) {
      let goalSettingNoList = []

      for (let index = 0; index < actionGoalsAchieveRate.length; index++) {
        goalSettingNoList.push(actionGoalsAchieveRate[index].goalSettingNo)
        switch (index) {
        case 0:
          supportQuestionNaire.goalSettingNoOne = actionGoalsAchieveRate[index].goalSettingNo
          supportQuestionNaire.goalAchieveRateOne = actionGoalsAchieveRate[index].achieveRate
          break
        case 1:
          supportQuestionNaire.goalSettingNoTwo = actionGoalsAchieveRate[index].goalSettingNo
          supportQuestionNaire.goalAchieveRateTwo = actionGoalsAchieveRate[index].achieveRate
          break
        case 2:
          supportQuestionNaire.goalSettingNoThree = actionGoalsAchieveRate[index].goalSettingNo
          supportQuestionNaire.goalAchieveRateThree = actionGoalsAchieveRate[index].achieveRate
          break
        default:
          break
        }
      }

      // 行動目標枝番check
      const actionGoalModel = new ActionGoalModel
      const actionGoalResult = await actionGoalModel.listActionGoals(req.userId)
      const listActionGoals = actionGoalResult.data.listActionGoals.items
      for (let index = 0; index < goalSettingNoList.length; index++) {
        // 行動目標枝番がアクティブな行動目標に存在しない場合
        if (listActionGoals.find(item => item.goalSettingNo == goalSettingNoList[index]) == null) {
          return next(new BadRequestError('GoalSettingNo ' + goalSettingNoList[index] + ' is not exists in active action goals'))
        }
      }
    }

    // 中間支援アンケート回答結果を登録
    const supportQuestionnaireLogModel = new SupportQuestionnaireLogModel()
    // 既に登録したのかcheck
    const supportQuestionnaireLogResult = await supportQuestionnaireLogModel.getSupportQuestionNaireLog(req.userId, req.body.supportCount)
    // 存在しない場合に登録
    if (supportQuestionnaireLogResult.data.getSupportQuestionNaireLog == null) {
      await supportQuestionnaireLogModel.createSupportQuestionNaireLog(supportQuestionNaire)
    }
    // 存在する場合に更新
    else {
      await supportQuestionnaireLogModel.updateSupportQuestionNaireLog(supportQuestionNaire)
    }

    // 身体測定情報に体重、腹囲結果を更新
    const healthCheckModel = new HealthCheckModel()
    const healthCheckModelUpdate = {
      userId: req.userId,
      recordedAt: moment().format('YYYY-MM-DD'),
      weight: req.body.weight,
      abdominal: req.body.abdominal,
      updatedAt: moment().unix(),
    }
    // userIdとrecordedAtで身体測定情報check
    const healthCheckResult = await healthCheckModel.GetData(req.userId, moment().format('YYYY-MM-DD'))
    // 当日の身体測定情報がない場合に登録
    if (healthCheckResult.data.getHealthCheck == null) {
      await healthCheckModel.CreateData(healthCheckModelUpdate)
    }
    // 当日の身体測定情報がある場合に更新
    else {
      await healthCheckModel.UpdateData(healthCheckModelUpdate)
    }

    // Userに指導状態を登録
    const userModel = new UserModel()
    let guidanceState = null
    switch (req.body.supportCount) {
    case 1:
      guidanceState = comFunc.GuidanceState.AFTERFIRSTSUPPORT
      break
    case 2:
      guidanceState = comFunc.GuidanceState.AFTERSECONDSUPPORT
      break
    default:
      break
    }
    const userModelUpdate = {
      id: req.userId,
      guidanceState: guidanceState,
      updatedAt: moment().unix(),
    }
    await userModel.UpdateUser(userModelUpdate)

    const response = {
      supportCount: req.body.supportCount,
      weight: req.body.weight,
      abdominal: req.body.abdominal,
      actionGoalsAchieveRate: actionGoalsAchieveRate ? [...actionGoalsAchieveRate] : null,
      foodLife: req.body.foodLife,
      bodyActivity: req.body.bodyActivity,
      smokingStatus: req.body.smokingStatus,
      freeInputContent: req.body.freeInputContent ?? null,
    }
    return res.json(response)
  })().catch(e => next(e))
})

/**
   * 体重・腹囲・行動目標を取得し、response用データに変換
   * @param {string} userId ユーザId
   * @param {integer} supportCount 支援回目
   * @returns response
   */
async function getResponse(userId, supportCount) {
  // 回答日
  const recordedAt = moment().format('YYYY-MM-DD')
  // 回答日前日
  const recordedBefore = moment().subtract(1, 'days').format('YYYY-MM-DD')

  // 現在値の取得（体重・腹囲）
  const recentHealthChecks = await comFunc.getRecentHealthCheckData(userId, recordedAt)

  // 達成率を含む行動目標の取得
  const actionGoalLogs = await comFunc.getActionGoalsInfo(userId, recordedBefore, Number(supportCount))

  if (actionGoalLogs != null) {
    for (var actionGoalLog of actionGoalLogs) {
      // 達成率を20%単位で丸める
      let achieveRate = actionGoalLog.achieveWeeklyCount / actionGoalLog.goalWeeklyCount * 100
      if (achieveRate >= 100) {
        achieveRate = 100
      } else {
        for (let index = 0; index < ACHIEVERATE.length; index++) {
          if (Math.abs(ACHIEVERATE[index] - achieveRate) <= 10) {
            achieveRate = ACHIEVERATE[index]
            break
          }
        }
      }
  
      delete actionGoalLog.achieveWeeklyCount
      delete actionGoalLog.goalWeeklyCount
  
      actionGoalLog.achieveRate = achieveRate
    }
  }

  const response = {
    weight: recentHealthChecks.weight,
    abdominal: recentHealthChecks.abdominal,
    actionGoals: actionGoalLogs
  }
  return response
}

module.exports = router