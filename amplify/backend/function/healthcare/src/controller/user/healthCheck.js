/*
 * ファイル名: healthCheck.js
 * 作成日: 2021/10/01
 * 作成者: hara
 * 作成内容: 新規作成
 * 修正日: 2021/10/04
 * 修正者: xiaomei.zhou
 * 修正内容:
 * ver:1.0.0
 */
const express = require('express')
const router = express.Router()
const { query, body, validationResult } = require('express-validator')
const moment = require('moment')
const ExtensibleCustomError = require('extensible-custom-error')
class BadRequestError extends ExtensibleCustomError {} // 400
// class NotFoundError extends ExtensibleCustomError {} // 404

const HealthCheckModel = require(process.env.AWS_REGION ? '/opt/model/healthCheck' : '../../../../healthcarelayerOne/opt/model/healthCheck')
const HealthCheckPerHourModel = require(process.env.AWS_REGION ? '/opt/model/healthCheckPerHour' : '../../../../healthcarelayerOne/opt/model/healthCheckPerHour')
const EatLogModel = require(process.env.AWS_REGION ? '/opt/model/eatLog' : '../../../../healthcarelayerOne/opt/model/eatLog')
const ActionGoalLogModel = require(process.env.AWS_REGION ? '/opt/model/actionGoalLog' : '../../../../healthcarelayerOne/opt/model/actionGoalLog')
const ActionGoalEvaluationModel = require(process.env.AWS_REGION ? '/opt/model/actionGoalEvaluation' : '../../../../healthcarelayerOne/opt/model/actionGoalEvaluation')
const comFunc = require(process.env.AWS_REGION ? '/opt/common/common-function' : '../../../../healthcarelayerOne/opt/common/common-function')

const responseInitial = {
  recordedAt: null,
  weight: null,
  abdominal: null,
  dbp: null,
  sbp: null,
  stepsPerDayAuto: null,
  stepsPerHourAuto: null,
  stepsPerDayManual: null,
  acquiredAt: null,
  recent: {
    weight: {value: null, recordedAt: null},
    abdominal: {value: null, recordedAt: null},
  },
}

const healthCheckBodyInitial = {
  recordedAt: null,
  weight: null,
  abdominal: null,
  dbp: null,
  sbp: null,
  stepsPerDayManual: null,
  acquiredAt: null
}

const healthCheckPerHourBodyInitial = {
  recordedAt: null,
  hour: null,
  totalCalorie: null,
  nonExerciseCalorie: null,
  exerciseCalorie: null,
  stepsPerHourAuto: null,
  acquiredAt: null
}

/**
 * @swagger
 * 
 * /user/health-check:
 *   get:
 *     tags:
 *     - 保険対象者_健康情報
 *     summary: 健康情報取得
 *     description: 指定された登録日の健康情報を取得する
 *     parameters:
 *     - name: recordedAt
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *       description: |  
 *         記録日  
 *         - ISOフォーマット(YYYY-MM-DD)とする  
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
 *               $ref: '#/components/schemas/HealthCheckForResponse'
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
 *   post:
 *     tags:
 *     - 保険対象者_健康情報
 *     summary: 健康情報の作成
 *     description: 健康情報を作成する
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
 *             $ref: '#/components/schemas/HealthCheckForPost'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/HealthCheckForResponse'
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
 * /user/health-check/autoUpdateItems:
 *   post:
 *     tags:
 *     - 保険対象者_健康情報
 *     summary: ホーム画面データ自動登録(歩数、カロリー、睡眠時間)
 *     description: デバイスより自動取得した歩数、カロリー、睡眠時間情報を登録します
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
 *             $ref: '#/components/schemas/HealthCheckPerHours'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: success
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
 *     HealthCheck:
 *       description: ユーザ関連情報
 *       type: object
 *       required:
 *         - recordedAt
 *       properties:
 *         recordedAt:
 *           type: string
 *           description: |  
 *             記録日    
 *             - ISOフォーマット(YYYY-MM-DD)とする  
 *         weight:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *           maximum: 999.99
 *           description: 体重
 *         abdominal:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *           maximum: 999.9
 *           description: 腹囲
 *         dbp:
 *           type: integer
 *           minimum: 0
 *           maximum: 999
 *           description: 血圧(拡張期)
 *         sbp:
 *           type: integer
 *           minimum: 0
 *           maximum: 999
 *           description: 血圧(収縮期)
 *         stepsPerDayManual:
 *           type: integer
 *           minimum: 0
 *           maximum: 999999
 *           description: 一日あたり歩数(手動)
 *     HealthCheckForPost:
 *       allOf:
 *         - $ref: '#/components/schemas/HealthCheck'
 *         - type: object
 *           properties:
 *             actionGoalEvaluations:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/actionGoalEvaluation'
 *     HealthCheckForResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/HealthCheck'
 *         - type: object
 *           properties:
 *             stepsPerDayAuto:
 *               type: integer
 *               minimum: 0
 *               maximum: 999999
 *               description: 一日あたり歩数(自動)
 *             stepsPerHourAuto:
 *               type: integer
 *               minimum: 0
 *               maximum: 999999
 *               description: 一時間あたり歩数(自動)
 *             acquiredAt:
 *               type: string
 *               description: |  
 *                 デバイスからの取得日時    
 *                 - ISOフォーマット(YYYY-MM-DDTHH:MI:SS+09:00)とする  
 *             recent:
 *               type: object
 *               description: 最新情報
 *               properties:
 *                 weight:
 *                   type: object
 *                   description: 最新情報(体重)
 *                   properties:
 *                     value:
 *                       type: number
 *                       description: 体重
 *                     recordedAt:
 *                       type: string
 *                       description: 記録日
 *                 abdominal:
 *                   type: object
 *                   description: 最新情報(腹囲)
 *                   properties:
 *                     value:
 *                       type: number
 *                       description: 腹囲
 *                     recordedAt:
 *                       type: string
 *                       description: 記録日
 *                 acquiredAt:
 *                   type: string
 *                   description: |  
 *                     デバイスからの最新取得日時    
 *                     - ISOフォーマット(YYYY-MM-DDTHH:MI:SS+09:00)とする  
 *             eatLogCount:
 *               type: integer
 *               minimum: 0
 *               maximum: 9999
 *               description: 食事レコード数  
 *             actionGoals:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/actionGoalItem'
 *     HealthCheckPerHours:
 *       description: 一時間あたり歩数情報
 *       type: object
 *       properties:
 *         autoUpdateItems:
 *           type: array
 *           description: |  
 *             デバイスより取得した歩数情報を一時間単位に集計した歩数情報をリストにて設定    
 *           items:
 *             type: object
 *             required:
 *               - recordedAt
 *             properties:
 *               recordedAt:
 *                 type: string
 *                 description: |  
 *                   記録日    
 *                   - ISOフォーマット(YYYY-MM-DD)とする  
 *               acquiredAt:
 *                 type: string
 *                 description: |  
 *                   デバイスからの取得日時    
 *                   - ISOフォーマット(YYYY-MM-DDTHH:MI:SS+09:00)とする  
 *               sleepTimePerDayAuto:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 1440
 *                 description: 睡眠時間(分単位)
 *               stepPerHours:
 *                 type: array
 *                 description: 一時間あたり自動取得歩数
 *                 items:
 *                   type: object
 *                   description: |  
 *                     デバイスより取得した歩数情報の履歴  
 *                     更新対象となる記録日以外の日付の歩数情報を取得した場合に更新対象日を設定と歩数を送信する  
 *                   properties:
 *                     hour:
 *                       type: integer
 *                       minimum: 0
 *                       maximum: 23
 *                       description: 時(0時台～23時台)
 *                     stepsAuto:
 *                       type: integer
 *                       minimum: 0
 *                       maximum: 999999
 *                       description: 一時間あたり自動取得歩数
 *               nonExerciseCaloriePerHours:
 *                 type: array
 *                 description: 一時間あたり自動取得安静時消費カロリー
 *                 items:
 *                   type: object
 *                   description: |  
 *                     デバイスより取得した安静時消費カロリー情報の履歴
 *                   properties:
 *                     hour:
 *                       type: integer
 *                       minimum: 0
 *                       maximum: 23
 *                       description: 時(0時台～23時台)
 *                     nonExerciseCalorieAuto:
 *                       type: integer
 *                       minimum: 0
 *                       maximum: 9999
 *                       description: 一時間あたり自動取得安静時消費カロリー
 *               exerciseCaloriePerHours:
 *                 type: array
 *                 description: 一時間あたり自動取得運動消費カロリー
 *                 items:
 *                   type: object
 *                   description: |  
 *                     デバイスより取得した運動消費カロリー情報の履歴 
 *                   properties:
 *                     hour:
 *                       type: integer
 *                       minimum: 0
 *                       maximum: 23
 *                       description: 時(0時台～23時台)
 *                     exerciseCalorieAuto:
 *                       type: integer
 *                       minimum: 0
 *                       maximum: 9999
 *                       description: 一時間あたり自動取得運動消費カロリー
 * 
 *     actionGoalEvaluation:
 *       description: 行動目標評価
 *       type: object
 *       required:
 *         - goalSettingNo
 *         - actionGoalResult
 *       properties:
 *         goalSettingNo:
 *           type: integer
 *           description: 行動目標枝番
 *         actionGoalResult:
 *           type: integer
 *           description: |
 *             实施结果  
 *             ・1: 達成
 *             ・0: 未達成
 *     actionGoalItem:
 *       allOf:
 *       - $ref: '#/components/schemas/actionGoal'
 *       - type: object
 *         properties:
 *           actionGoalResult:
 *             type: integer
 *             description: |
 *               实施结果  
 *               ・1: 達成
 *               ・0: 未達成 (デフォルト)
 *           achieveCount:
 *             type: string
 *             description: 達成回数
 */
router.get('/', [
  query('recordedAt').not().isEmpty().withMessage('recordedAt(YYYY-MM-DD) is required'),
  query('recordedAt').isISO8601().withMessage('recordedAt is not DateFormat(YYYY-MM-DD)'),
  query('recordedAt').custom(value=>{return comFunc.checkDate(value, 'recordedAt(YYYY-MM-DD)')}),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    return res.json(await getResponse(req.userId, req.query.recordedAt))
  })().catch(e => next(e))
  
})

router.post('/', [
  body('recordedAt').not().isEmpty().withMessage('recordedAt(YYYY-MM-DD) is required'),
  body('recordedAt').isISO8601().withMessage('recordedAt is not DateFormat(YYYY-MM-DD)'),
  body('recordedAt').custom(value=>{return comFunc.checkDate(value, 'recordedAt(YYYY-MM-DD)')}),
  body('weight').optional({nullable:true}).isFloat({min:0, max:999.99}).withMessage('weight should be in range(0-999.99)'),
  body('weight').optional({nullable:true}).custom((value,{req})=>{
    // 整数及び小数点第2位まで許可
    if (String(req.body.weight).indexOf('.') > 0) {
      let numbers = String(req.body.weight).split('.')
      if (numbers[1].length > 2) throw new Error('weight is invalid')
    }
    return true
  }),
  body('abdominal').optional({nullable:true}).isFloat({min:0, max:999.9}).withMessage('abdominal should be in range(0-999.9)'),
  body('abdominal').optional({nullable:true}).custom((value,{req})=>{
    // 整数及び小数点第1位まで許可
    if (String(req.body.abdominal).indexOf('.') > 0) {
      let numbers = String(req.body.abdominal).split('.')
      if (numbers[1].length > 1) throw new Error('abdominal is invalid')
    }
    return true
  }),
  body('dbp').optional({nullable:true}).isInt({min:0, max:999}).withMessage('dbp should be INT and in range(0-999)'),
  body('sbp').optional({nullable:true}).isInt({min:0, max:999}).withMessage('sbp should be INT and in range(0-999)'),
  body('stepsPerDayManual').optional({nullable:true}).isInt({min:0, max:999999}).withMessage('stepsPerDayManual should be in range(0-999999)'),
  body('actionGoalEvaluations.*.goalSettingNo').not().isEmpty().withMessage('actionGoalEvaluations.*.goalSettingNo is required'),
  body('actionGoalEvaluations.*.goalSettingNo').isInt().withMessage('actionGoalEvaluations.*.goalSettingNo must be integer type'),
  body('actionGoalEvaluations.*.actionGoalResult').not().isEmpty().withMessage('actionGoalEvaluations.*.actionGoalResult is required'),
  body('actionGoalEvaluations.*.actionGoalResult').isInt({min:0, max:1}).withMessage('actionGoalEvaluations.*.actionGoalResult must be integer type'),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    const healthCheckModel = new HealthCheckModel()
    const currentData = await healthCheckModel.GetData(req.userId, req.body.recordedAt)

    const startDate = moment(req.body.recordedAt).startOf('week').add(1, 'days').format('YYYY-MM-DD')
    const endDate = moment(req.body.recordedAt).endOf('week').add(1, 'days').format('YYYY-MM-DD')
    const actionDateInput = { between: [startDate, endDate] }
    const actionGoalEvaluationModel = new ActionGoalEvaluationModel()
    const actionGoalEvaluationResult = await actionGoalEvaluationModel.listActionGoalEvaluationUserIdActionDate(req.userId, actionDateInput)
    const actionGoalEvaluations = actionGoalEvaluationResult.data.listActionGoalEvaluationUserIdActionDate.items

    const actionGoalEvaluationBody = req.body.actionGoalEvaluations
    if (actionGoalEvaluationBody.length > 0) {
      //行動目標設定枝番でソートする
      actionGoalEvaluationBody.sort((a,b) =>{
        return a.goalSettingNo > b.goalSettingNo ? 1 : -1
      })

      const actionGoalLogModel = new ActionGoalLogModel()
      const actionGoalLogResult = await actionGoalLogModel.listActionGoalLogs(req.userId)
      let actionGoalLogs = actionGoalLogResult.data.listActionGoalLogs.items
      if (actionGoalLogs.length == 0) {
        //データを取得できない場合
        return next(new BadRequestError('ActionGoalLog data does not exist.'))
      } else {
        actionGoalLogs = actionGoalLogs.filter(ag => ag.historyContent != 'delete' && (ag.startDate <= req.body.recordedAt && req.body.recordedAt <= ag.endDate))
        if (actionGoalLogs.length == 0) {
          //データを取得できない場合
          return next(new BadRequestError('ActionGoalLog data does not exist.'))
        }
      }

      for (var actionGoalEvaluation of actionGoalEvaluationBody) {
        const checkActionGoalLog = actionGoalLogs.filter(ag => ag.goalSettingNo== actionGoalEvaluation.goalSettingNo)
        if (checkActionGoalLog.length == 0) {
          //データを取得できない場合
          return next(new BadRequestError('ActionGoalLog data does not exist for goalSettingNo: ' + actionGoalEvaluation.goalSettingNo))
        }
        if (checkActionGoalLog[0].frequencyDayOfWeek != null && checkActionGoalLog[0].frequencyDayOfWeek.trim() != '') {
          let dayOfTheWeekNum = ['日', '月', '火', '水', '木', '金', '土'][moment(req.body.recordedAt).format('d')]
          //曜日チェック
          const dayOfWeeks = checkActionGoalLog[0].frequencyDayOfWeek.split('|')
          if (dayOfWeeks.indexOf(dayOfTheWeekNum) == -1) {
            return next(new BadRequestError('recordedAt must be in (' + dayOfWeeks + ')'))
          }
        } else if (checkActionGoalLog[0].frequencyCount != null) {
          //回数チェック
          const goalWeeklyCount = checkActionGoalLog[0].frequencyCount
          let realWeeklyCount = 0
          if (actionGoalEvaluations.length > 0) {
            let checkActionGoalEvaluation = actionGoalEvaluations.filter(ag => ag.goalSettingNo == actionGoalEvaluation.goalSettingNo)
            if (checkActionGoalEvaluation.length > 0) {
              checkActionGoalEvaluation = checkActionGoalEvaluation.filter(ag => ag.actionGoalResult == 1)
              realWeeklyCount = checkActionGoalEvaluation.length
            }
          }
          if (realWeeklyCount == goalWeeklyCount) {
            return next(new BadRequestError('frequencyCount has already been achieved'))
          }
        }
      }
    }

    //行動目標評価結果登録・更新
    for (actionGoalEvaluation of actionGoalEvaluationBody) {
      let achieveWeeklyCount = 0
      //当日行動目標評価結果件数取得
      if (actionGoalEvaluations.length > 0) {
        const actionGoalEvaluationItem = actionGoalEvaluations.filter(ag => ag.goalSettingNo == actionGoalEvaluation.goalSettingNo && ag.actionDate == req.body.recordedAt)
        achieveWeeklyCount = actionGoalEvaluationItem.length
      }

      const dataActionGoalEvaluation = {
        ...actionGoalEvaluation,
        actionDate: req.body.recordedAt,
        userId: req.userId,
      }

      if (achieveWeeklyCount == 0){
        //行動目標評価結果登録
        dataActionGoalEvaluation.createdAt = moment().unix()
        dataActionGoalEvaluation.updatedAt = moment().unix()
        await actionGoalEvaluationModel.createActionGoalEvaluation(dataActionGoalEvaluation)
      } else {
        //行動目標評価結果更新
        dataActionGoalEvaluation.updatedAt = moment().unix()
        await actionGoalEvaluationModel.updateActionGoalEvaluation(dataActionGoalEvaluation)
      }
    }

    delete req.body.actionGoalEvaluations
    const data = {
      ...healthCheckBodyInitial,  //初期フィールドにてデフォルトnull設定
      ...currentData.data.getHealthCheck,
      ...req.body,
      userId: req.userId,
    }
    delete data.__typename

    if (currentData.data.getHealthCheck){
      data.updatedAt = moment().unix()
      await healthCheckModel.UpdateData(data)
    } else {
      data.createdAt = moment().unix()
      await healthCheckModel.CreateData(data)
    }

    return res.json(await getResponse(req.userId, req.body.recordedAt))

  })().catch(e => next(e))
})

router.post('/autoUpdateItems', [
  body('autoUpdateItems.*.recordedAt').not().isEmpty().withMessage('autoUpdateItems.*.recordedAt(YYYY-MM-DD) is required'),
  body('autoUpdateItems.*.recordedAt').isISO8601().withMessage('autoUpdateItems.*.recordedAt is not DateFormat(YYYY-MM-DD)'),
  body('autoUpdateItems.*.recordedAt').custom(value=>{return comFunc.checkDate(value, 'recordedAt(YYYY-MM-DD)')}),
  body('autoUpdateItems.*.acquiredAt').optional({nullable:true}).isISO8601().withMessage('autoUpdateItems.*.acquiredAt is not DateFormat(YYYY-MM-DDTHH24:MI:SSZ)'),
  body('autoUpdateItems.*.sleepTimePerDayAuto').not().isEmpty().withMessage('autoUpdateItems.*.sleepTimePerDayAuto is required'),
  body('autoUpdateItems.*.sleepTimePerDayAuto').isInt({min:0, max:1440}).withMessage('autoUpdateItems.*.sleepTimePerDayAuto should be in range(0-1440)'),
  body('autoUpdateItems.*.stepPerHours.*.hour').not().isEmpty().withMessage('autoUpdateItems.*.stepPerHours.*.hour is required'),
  body('autoUpdateItems.*.stepPerHours.*.hour').isInt({min:0, max:23}).withMessage('autoUpdateItems.*.stepPerHours.*.hour should be in range(0-23)'),
  body('autoUpdateItems.*.stepPerHours.*.stepsAuto').not().isEmpty().withMessage('autoUpdateItems.*.stepPerHours.*.stepsAuto is required'),
  body('autoUpdateItems.*.stepPerHours.*.stepsAuto').isInt({min:0, max:999999}).withMessage('autoUpdateItems.*.stepPerHours.*.stepsAuto should be in range(0-999999)'),
  body('autoUpdateItems.*.nonExerciseCaloriePerHours.*.hour').not().isEmpty().withMessage('autoUpdateItems.*.nonExerciseCaloriePerHours.*.hour is required'),
  body('autoUpdateItems.*.nonExerciseCaloriePerHours.*.hour').isInt({min:0, max:23}).withMessage('autoUpdateItems.*.nonExerciseCaloriePerHours.*.hour should be in range(0-23)'),
  body('autoUpdateItems.*.nonExerciseCaloriePerHours.*.nonExerciseCalorieAuto').not().isEmpty().withMessage('autoUpdateItems.*.nonExerciseCaloriePerHours.*.nonExerciseCalorieAuto is required'),
  body('autoUpdateItems.*.nonExerciseCaloriePerHours.*.nonExerciseCalorieAuto').isInt({min:0, max:9999}).withMessage('autoUpdateItems.*.nonExerciseCaloriePerHours.*.nonExerciseCalorieAuto should be in range(0-9999)'),
  body('autoUpdateItems.*.exerciseCaloriePerHours.*.hour').not().isEmpty().withMessage('autoUpdateItems.*.exerciseCaloriePerHours.*.hour is required'),
  body('autoUpdateItems.*.exerciseCaloriePerHours.*.hour').isInt({min:0, max:23}).withMessage('autoUpdateItems.*.exerciseCaloriePerHours.*.hour should be in range(0-23)'),
  body('autoUpdateItems.*.exerciseCaloriePerHours.*.exerciseCalorieAuto').not().isEmpty().withMessage('autoUpdateItems.*.exerciseCaloriePerHours.*.exerciseCalorieAuto is required'),
  body('autoUpdateItems.*.exerciseCaloriePerHours.*.exerciseCalorieAuto').isInt({min:0, max:9999}).withMessage('autoUpdateItems.*.exerciseCaloriePerHours.*.exerciseCalorieAuto should be in range(0-9999)')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }

    const hcItems = req.body.autoUpdateItems

    //歩数、安静時消費カロリー、運動消費カロリーのチェック
    for (let hcItem of hcItems) { 
      //記録日の重複チェック
      var autoUpdateItems = hcItems.filter(item => item.recordedAt == hcItem.recordedAt)
      if (autoUpdateItems.length > 1) {
        return next(new BadRequestError('recordedAt duplicate(recordedAt: ' + hcItem.recordedAt + ')'))
      }
      
      for (var hour = 0; hour < 24; hour++) {
        //歩数の重複チェック
        var steps = hcItem.stepPerHours.filter(item => item.hour == hour) 
        if (steps.length > 1) {
          return next(new BadRequestError('stepPerHours duplicate(recordedAt: ' + hcItem.recordedAt + ' hour: ' + hour + ')'))
        }
        //安静時消費カロリー
        var nonExerciseCalories = hcItem.nonExerciseCaloriePerHours.filter(item => item.hour == hour) 
        if (nonExerciseCalories.length > 1) {
          return next(new BadRequestError('nonExerciseCaloriePerHours duplicate(recordedAt: ' + hcItem.recordedAt + ' hour: ' + hour + ')'))
        }
        //運動消費カロリー
        var exerciseCalories = hcItem.exerciseCaloriePerHours.filter(item => item.hour == hour) 
        if (exerciseCalories.length > 1) {
          return next(new BadRequestError('exerciseCaloriePerHours duplicate(recordedAt: ' + hcItem.recordedAt + ' hour: ' + hour + ')'))
        }
      }
    }

    const healthCheckModel = new HealthCheckModel()

    for (let hcItem of req.body.autoUpdateItems) {
      const currentHealthCheck = await healthCheckModel.GetData(req.userId, hcItem.recordedAt)

      //１日あたり歩数(自動)
      let stepsPerDay = 0
      //１時間あたり歩数(自動)
      let stepsPerHour = 0
      //１日あたりトータル消費カロリー(自動)
      let totalCaloriePerDay = 0
      //１日あたり安静時消費カロリー(自動)
      let nonExerciseCaloriePerDay = 0
      //１日あたり運動消費カロリー(自動)
      let exerciseCaloriePerDay = 0

      //歩数
      if (hcItem.stepPerHours.length > 0) {
        hcItem.stepPerHours.forEach(item => stepsPerDay += item.stepsAuto)
        stepsPerHour = parseInt(stepsPerDay / hcItem.stepPerHours.length)
      }
      //安静時消費カロリー
      if (hcItem.nonExerciseCaloriePerHours.length > 0) {
        hcItem.nonExerciseCaloriePerHours.forEach(item => nonExerciseCaloriePerDay += item.nonExerciseCalorieAuto)
      }
      //運動消費カロリー
      if (hcItem.exerciseCaloriePerHours.length > 0) {
        hcItem.exerciseCaloriePerHours.forEach(item => exerciseCaloriePerDay += item.exerciseCalorieAuto)
      }
      //トータル消費カロリー
      totalCaloriePerDay = nonExerciseCaloriePerDay + exerciseCaloriePerDay
    
      const data = {
        ...healthCheckBodyInitial,  //初期フィールドにてデフォルトnull設定
        ...currentHealthCheck.data.getHealthCheck,
        ...hcItem,
        userId: req.userId,
        stepsPerDayAuto: stepsPerDay == 0 ? null : stepsPerDay,
        stepsPerHourAuto: stepsPerHour == 0 ? null : stepsPerHour,
        totalCaloriePerDayAuto: totalCaloriePerDay,
        nonExerciseCaloriePerDayAuto: nonExerciseCaloriePerDay,
        exerciseCaloriePerDayAuto: exerciseCaloriePerDay
      }
      delete data.__typename
      delete data.stepPerHours
      delete data.nonExerciseCaloriePerHours
      delete data.exerciseCaloriePerHours

      if (currentHealthCheck.data.getHealthCheck){
        data.updatedAt = moment().unix()
        await healthCheckModel.UpdateData(data)
      } else {
        data.createdAt = moment().unix()
        await healthCheckModel.CreateData(data)
      }
      // 時間帯別
      const params = {
        userId: req.userId,
        recordedAt: hcItem.recordedAt,
        acquiredAt: hcItem.acquiredAt
      }

      //歩数
      await setStepPerHours(params, hcItem.stepPerHours)
      //安静時消費カロリー
      await setNonExerciseCaloriePerHours(params, hcItem.nonExerciseCaloriePerHours)
      //運動消費カロリー
      await setExerciseCaloriePerHoursPerHours(params, hcItem.exerciseCaloriePerHours)

    }

    return res.json({message: 'success'})

  })().catch(e => next(e))
})

/**
レスポンス取得
@param {string} userId ユーザーID
@param {string} recordedAt 日付
@returns レスポンス結果
*/
async function getResponse(userId, recordedAt) {

  const healthCheckModel = new HealthCheckModel()
  const healthCheckPerHourModel = new HealthCheckPerHourModel()
  const currentHealthCheck = await healthCheckModel.GetData(userId, recordedAt)
  const perHours = await healthCheckPerHourModel.ListHealthCheckPerHourUserIdRecordAt(userId, {eq: recordedAt})

  const eatLogModel = new EatLogModel()
  const getEatLogResult = await eatLogModel.ListEatLogByUserIdMealDate(userId, {eq: recordedAt})
  const eatLogsOfDB = getEatLogResult.data.listEatLogByUserIdMealDate.items

  let actionGoalLogs = null
  const actionGoalLogModel = new ActionGoalLogModel()
  const actionGoalLogResult = await actionGoalLogModel.listActionGoalLogs(userId)
  actionGoalLogs = actionGoalLogResult.data.listActionGoalLogs.items
  if (actionGoalLogs.length > 0) {
    actionGoalLogs = actionGoalLogs.filter(ag => ag.historyContent != 'delete' && (ag.startDate <= recordedAt && recordedAt <= ag.endDate))
    if (actionGoalLogs.length > 0) {
      //行動目標設定枝番でソートする
      actionGoalLogs.sort((a,b) =>{
        return a.goalSettingNo > b.goalSettingNo ? 1 : -1
      })

      const startDate = moment(recordedAt).startOf('week').add(1, 'days').format('YYYY-MM-DD')
      const endDate = moment(recordedAt).endOf('week').add(1, 'days').format('YYYY-MM-DD')
      const actionDateInput = { between: [startDate, endDate] }

      const actionGoalEvaluationModel = new ActionGoalEvaluationModel()
      const actionGoalEvaluationResult = await actionGoalEvaluationModel.listActionGoalEvaluationUserIdActionDate(userId, actionDateInput)
      const actionGoalEvaluations = actionGoalEvaluationResult.data.listActionGoalEvaluationUserIdActionDate.items

      for (var actionGoalLog of actionGoalLogs) {
        delete actionGoalLog.userId
        delete actionGoalLog.__typename
        delete actionGoalLog.createdAt
        delete actionGoalLog.updatedAt

        let goalWeeklyCount = 0
        let achieveWeeklyCount = 0
        //行動目標評価結果から当日評価結果を取得
        let actionGoalResult = 0
        if (actionGoalEvaluations.length > 0) {
          const actionGoalEvaluationItems = actionGoalEvaluations.filter(ag => ag.goalSettingNo == actionGoalLog.goalSettingNo)
          if (actionGoalEvaluationItems.length > 0) {
            const actionGoalEvaluationItem = actionGoalEvaluationItems.filter(ag => ag.actionDate == recordedAt)
            if (actionGoalEvaluationItem.length > 0) {
              actionGoalResult = actionGoalEvaluationItem[0].actionGoalResult
            }
          }
        }
        actionGoalLog.actionGoalResult = actionGoalResult

        if (actionGoalLog.frequencyDayOfWeek != null) {
          //目標頻度（曜日指定）から目標回数取得
          const dayOfWeeks = actionGoalLog.frequencyDayOfWeek.split('|')
          goalWeeklyCount = dayOfWeeks.length
        } else if (actionGoalLog.frequencyCount != null) {
          //目標頻度（日数）から目標回数取得
          goalWeeklyCount = actionGoalLog.frequencyCount
        }
        //行動目標評価結果から達成回数取得
        if (actionGoalEvaluations.length > 0) {
          let actionGoalEvaluationItems = actionGoalEvaluations.filter(ag => ag.goalSettingNo == actionGoalLog.goalSettingNo)
          if (actionGoalEvaluationItems.length > 0) {
            actionGoalEvaluationItems = actionGoalEvaluationItems.filter(ag => ag.actionGoalResult == 1)
            achieveWeeklyCount = actionGoalEvaluationItems.length
          }
        }
        actionGoalLog.achieveCount = achieveWeeklyCount + '/' + goalWeeklyCount
      }
    } else {
      actionGoalLogs = null      
    }
  } else {
    actionGoalLogs = null
  }

  let stepsPerDay = 0
  let stepsPerHour = 0
  if (perHours.data.listHealthCheckPerHourUserIdRecordAt.items.length > 0) {
    perHours.data.listHealthCheckPerHourUserIdRecordAt.items.forEach(item => stepsPerDay += item.stepsPerHourAuto)
    stepsPerHour = parseInt(stepsPerDay / perHours.data.listHealthCheckPerHourUserIdRecordAt.items.length)
  }

  // 現在値の取得（体重・腹囲）
  const recentHealthChecks = await comFunc.getRecentHealthCheckData(userId, recordedAt)
  let weight = {value: recentHealthChecks.weight, recordedAt: recentHealthChecks.weightRecordedAt}
  let abdominal = {value: recentHealthChecks.abdominal, recordedAt: recentHealthChecks.abdominalRecordedAt}

  // 現在値の取得（歩数取得日時）
  const recentAccquiredAt = await comFunc.getRecentHealthCheckData(userId, moment().format('YYYY-MM-DD'))
  let acquiredAt = recentAccquiredAt.acquiredAt

  if (currentHealthCheck.data.getHealthCheck) {
    delete currentHealthCheck.data.getHealthCheck.userId
    delete currentHealthCheck.data.getHealthCheck.__typename
    delete currentHealthCheck.data.getHealthCheck.createdAt
    delete currentHealthCheck.data.getHealthCheck.updatedAt
  }

  const response = {
    ...responseInitial,
    recordedAt: recordedAt,
    ...currentHealthCheck.data.getHealthCheck,
    stepsPerDayAuto: stepsPerDay==0 ? null : stepsPerDay,
    stepsPerHourAuto: stepsPerHour==0 ? null : stepsPerHour,
    recent: {
      weight: {...weight},
      abdominal: {...abdominal},
      acquiredAt: acquiredAt
    },
    eatLogCount: eatLogsOfDB.length,
    actionGoals: actionGoalLogs
  }

  return response
}

/**
 * 歩数データの登録
 * @param {object}} params 時間帯別
 * @param {object}} stepPerHours デバイストークン
 * @returns 実行結果
 */
async function setStepPerHours(params, stepPerHours) {

  const healthCheckPerHourModel = new HealthCheckPerHourModel()

  //歩数
  if (stepPerHours.length > 0) {
    for (let stepPerHour of stepPerHours) {
      const currentResult = await healthCheckPerHourModel.GetHealthCheckPerHour(params.userId, params.recordedAt, stepPerHour.hour)
      const hcPerHour = currentResult.data.getHealthCheckPerHour

      const data = {
        ...healthCheckPerHourBodyInitial,  //初期フィールドにてデフォルトnull設定
        ...hcPerHour,
        stepsPerHourAuto: stepPerHour.stepsAuto,
        hour: stepPerHour.hour,
        ...params,
      }
      delete data.__typename
  
      if (hcPerHour){
        data.updatedAt = moment().unix()
        await healthCheckPerHourModel.UpdateHealthCheckPerHour(data)
      } else {
        data.createdAt = moment().unix()
        await healthCheckPerHourModel.CreateHealthCheckPerHour(data)
      }
    }
  }
}

/**
 * 安静時消費カロリーデータの登録
 * @param {object}} params 時間帯別
 * @param {object}} nonExerciseCaloriePerHours 安静時消費カロリーデータ
 * @returns 実行結果
 */
async function setNonExerciseCaloriePerHours(params, nonExerciseCaloriePerHours) {

  const healthCheckPerHourModel = new HealthCheckPerHourModel()

  //安静時消費カロリー
  if (nonExerciseCaloriePerHours.length > 0) {
    for (let nonExerciseCaloriePerHour of nonExerciseCaloriePerHours) {
      const currentResult = await healthCheckPerHourModel.GetHealthCheckPerHour(params.userId, params.recordedAt, nonExerciseCaloriePerHour.hour)
      const hcPerHour = currentResult.data.getHealthCheckPerHour

      const data = {
        ...healthCheckPerHourBodyInitial,  //初期フィールドにてデフォルトnull設定
        ...hcPerHour,
        nonExerciseCalorie: nonExerciseCaloriePerHour.nonExerciseCalorieAuto,
        totalCalorie: (nonExerciseCaloriePerHour.nonExerciseCalorieAuto + (hcPerHour != null ? hcPerHour.exerciseCalorie : 0)),
        hour: nonExerciseCaloriePerHour.hour,
        ...params,
      }
      delete data.__typename
  
      if (hcPerHour){
        data.updatedAt = moment().unix()
        await healthCheckPerHourModel.UpdateHealthCheckPerHour(data)
      } else {
        data.createdAt = moment().unix()
        await healthCheckPerHourModel.CreateHealthCheckPerHour(data)
      }
    }
  }
}

/**
 * 運動消費カロリーデータの登録
 * @param {object}} params 時間帯別
 * @param {object}} exerciseCaloriePerHours 運動消費カロリーデータ
 * @returns 実行結果
 */
async function setExerciseCaloriePerHoursPerHours(params, exerciseCaloriePerHours) {

  const healthCheckPerHourModel = new HealthCheckPerHourModel()

  //運動消費カロリー
  if (exerciseCaloriePerHours.length > 0) {
    for (let exerciseCaloriePerHour of exerciseCaloriePerHours) {
      const currentResult = await healthCheckPerHourModel.GetHealthCheckPerHour(params.userId, params.recordedAt, exerciseCaloriePerHour.hour)
      const hcPerHour = currentResult.data.getHealthCheckPerHour

      const data = {
        ...healthCheckPerHourBodyInitial,  //初期フィールドにてデフォルトnull設定
        ...hcPerHour,
        exerciseCalorie: exerciseCaloriePerHour.exerciseCalorieAuto,
        totalCalorie: (exerciseCaloriePerHour.exerciseCalorieAuto + (hcPerHour != null ? hcPerHour.nonExerciseCalorie : 0)),
        hour: exerciseCaloriePerHour.hour,
        ...params,
      }
      delete data.__typename
  
      if (hcPerHour){
        data.updatedAt = moment().unix()
        await healthCheckPerHourModel.UpdateHealthCheckPerHour(data)
      } else {
        data.createdAt = moment().unix()
        await healthCheckPerHourModel.CreateHealthCheckPerHour(data)
      }
    }
  }
}

module.exports = router