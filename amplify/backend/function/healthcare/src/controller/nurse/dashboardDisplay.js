/*
 * ファイル名: nurseDisplay.js
 * 作成日: 2021/10/01
 * 作成者: wei.cheng
 * 作成内容: 新規作成
 * 修正日:2021/10/14
 * 修正者:ze.zhang
 * 修正内容:腹囲と血圧の実装
 * ver:1.0.0
 */
const express = require('express')
const router = express.Router()
const { query, validationResult } = require('express-validator')
const ExtensibleCustomError = require('extensible-custom-error')
class BadRequestError extends ExtensibleCustomError {} // 400
const moment = require('moment')
const math = require('mathjs')
const comFunc = require(process.env.AWS_REGION ? '/opt/common/common-function' : '../../../../healthcarelayerOne/opt/common/common-function')
const HealthCheckModel = require(process.env.AWS_REGION ? '/opt/model/healthCheck' : '../../../../healthcarelayerOne/opt/model/healthCheck')
const EatLogModel = require(process.env.AWS_REGION ? '/opt/model/eatLog' : '../../../../healthcarelayerOne/opt/model/eatLog')
const UNIT = ['day', 'month']

/**
 * @swagger
 * /nurse/dashboard:
 *   get:
 *     tags:
 *     - 保健師_ダッシュボード
 *     summary: 保健師用のダッシュボード一覧表示
 *     description: 指定したユーザの体重、腹囲などの情報がダッシュボード画面に表示する
 *     parameters:
 *     - name: userId
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *       description: ユーザID
 *     - name: startDate
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *       description: |  
 *             開始日付   
 *             - ISOフォーマット(YYYY-MM-DD)とする
 *     - name: endDate
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *       description: |  
 *             終了日付   
 *             - ISOフォーマット(YYYY-MM-DD)とする
 *     - name: unit
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *         enum:
 *         - day
 *         - month
 *       description: |
 *             単位  
 *             ・day: 日単位  
 *             ・month: 月単位
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
 *               $ref: '#/components/schemas/healthnurseDashboard'
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
 *     healthnurseDashboard:
 *       description: 保健師用のダッシュボード
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ユーザID
 *         unit:
 *           type: string
 *           enum:
 *           - day
 *           - month
 *           description: |
 *             単位  
 *             ・day: 日単位  
 *             ・month: 月単位
 *         weightItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/weightItem'
 *         abdominalItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/abdominalItem'
 *         bpItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/bpItem'
 *         stepItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/stepItem'
 *         calorieItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/calorieItem'
 *         eatLogItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/eatLogResponse'
 */
router.get('/',[
  query('userId').not().isEmpty().withMessage('userId is required'),
  query('startDate').not().isEmpty().withMessage('startDate is required'),
  query('startDate').isISO8601().withMessage('startDate is not DateFormat(YYYY-MM-DD)'),
  query('startDate').custom(value=>{return comFunc.checkDate(value, 'startDate(YYYY-MM-DD)')}),
  query('endDate').not().isEmpty().withMessage('endDate is required'),
  query('endDate').isISO8601().withMessage('endDate is not DateFormat(YYYY-MM-DD)'),
  query('endDate').custom(value=>{return comFunc.checkDate(value, 'endDate(YYYY-MM-DD)')}),
  query('unit').isIn(UNIT).withMessage('unit must be day or month only')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    let userId = req.query.userId
    let unit = req.query.unit
    let startDate = req.query.startDate
    let endDate = req.query.endDate
    let dayFrom = moment(startDate)
    let dayTo = moment(endDate)
    const days = dayTo.diff(dayFrom, 'day')
    
    if (days <= 0) {
      return next(new BadRequestError('startDate must be less than endDate'))
    }
    
    const healthCheckModel = new HealthCheckModel()
    let recordedAtInput = { between: [startDate, endDate] } 
    const getHealthCheckResult = await healthCheckModel.ListHealthCheckUserIdRecordAt(userId, recordedAtInput) 
    const healthChecks = getHealthCheckResult.data.listHealthCheckUserIdRecordAt.items
    
    //年月日で昇順ソートする
    healthChecks.sort((a,b) =>{
      return a.recordedAt > b.recordedAt ? 1 : -1
    })

    //体重のデータ
    var weights = [] 
    if (req.query.unit == 'day') {
      for(var day = moment(startDate); dayTo.diff(day, 'day') >= 0; day.add(1, 'days') ) {
        const recordedAt = day.format('YYYY-MM-DD')
        const healths = healthChecks.filter(item => item.recordedAt == recordedAt)
        //体重のデータ
        const weightItem = {
          date: recordedAt,
          weight: null
        }
        if (healths.length > 0) {
          weightItem.weight = healths[0].weight
        } 
        weights.push(weightItem)
      }
    } else if (req.query.unit == 'month') {
      var weightDays = []
      for (var healthCheck of healthChecks) {
        let day = moment(healthCheck.recordedAt)
        const weightDay = {
          month: day.month(),
          weight: healthCheck.weight
        }
        weightDays.push(weightDay)
      }
      for (var i = 0; i < 12; i++) {
        var weightMonth = weightDays.filter(weightDay => weightDay.month == i && weightDay.weight != null  && weightDay.weight != 0)
        if (weightMonth.length > 0) {
          var weightNum = 0
          for (var detail of weightMonth) {
            weightNum += detail.weight
          }
          const weightItem = {
            month: i+1,
            weight: math.round(weightNum / weightMonth.length, 1)
          }
          weights.push(weightItem)
        } else {
          const weightItem = {
            month: i+1,
            weight: null
          }
          weights.push(weightItem)
        }        
      }
    }

    //歩数のデータを取得する
    var steps = [] 
    if (req.query.unit == 'day') {
      for(day = moment(startDate); dayTo.diff(day, 'day') >= 0; day.add(1, 'days') ) {
        const recordedAt = day.format('YYYY-MM-DD')
        const healths = healthChecks.filter(item => item.recordedAt == recordedAt)
        const stepItem = {
          date: recordedAt,
          step: null
        }
        if (healths.length > 0) {
          stepItem.step = healths[0].stepsPerDayManual != null ? healths[0].stepsPerDayManual : healths[0].stepsPerDayAuto
        } 
        steps.push(stepItem)
      }
    } else if (req.query.unit == 'month') {
      var stepDays = []
      for (healthCheck of healthChecks) {
        let day = moment(healthCheck.recordedAt)
        const stepDay = {
          month: day.month(),
          step: healthCheck.stepsPerDayManual != null ? healthCheck.stepsPerDayManual : healthCheck.stepsPerDayAuto
        }
        stepDays.push(stepDay)
      }
      for (i = 0; i < 12; i++) {
        var stepMonth = stepDays.filter(stepDay => stepDay.month == i && stepDay.step != null && stepDay.step != 0)
        if (stepMonth.length > 0) {
          var stepNum = 0
          for (detail of stepMonth) {
            stepNum += detail.step
          }
          const stepItem = {
            month: i+1,
            step: parseInt(stepNum / stepMonth.length)
          }
          steps.push(stepItem)
        } else {
          const stepItem = {
            month: i+1,
            step: null
          }
          steps.push(stepItem)
        }        
      }
    }

    //カロリーのデータ
    var calories = [] 
    if (req.query.unit == 'day') {
      for(day = moment(startDate); dayTo.diff(day, 'day') >= 0; day.add(1, 'days') ) {
        const recordedAt = day.format('YYYY-MM-DD')
        const healths = healthChecks.filter(item => item.recordedAt == recordedAt)
        const calorie = {
          date: recordedAt,
          exerciseCalorie: null
        }
        if (healths.length > 0) {
          calorie.exerciseCalorie = healths[0].exerciseCaloriePerDayAuto
        } 
        calories.push(calorie)
      }
    } else if (req.query.unit == 'month') {
      var calorieDays = []
      for (healthCheck of healthChecks) {
        let day = moment(healthCheck.recordedAt)
        const calorieDay = {
          month: day.month(),
          exerciseCalorie: healthCheck.exerciseCaloriePerDayAuto
        }
        calorieDays.push(calorieDay)
      }
      for (i = 0; i < 12; i++) {
        var calorieMonth = calorieDays.filter(item => item.month == i && item.exerciseCalorie != null && item.exerciseCalorie != 0)
        if (calorieMonth.length > 0) {
          var exerciseCalorieNum = 0
          for (detail of calorieMonth) {
            exerciseCalorieNum += detail.exerciseCalorie
          }
          const calorieItem = {
            month: i+1,
            exerciseCalorie: parseInt(exerciseCalorieNum / calorieMonth.length)
          }
          calories.push(calorieItem)
        } else {
          const calorieItem = {
            month: i+1,
            exerciseCalorie: null
          }
          calories.push(calorieItem)
        }        
      }
    }
    
    //食事摂取ログのデータ
    const eatLogModel = new EatLogModel()
    let mealDateInput = { between: [startDate, endDate ] } 
    const getEatLogResult = await eatLogModel.ListEatLogByUserIdMealDate(userId, mealDateInput) 
    const eatLogs = getEatLogResult.data.listEatLogByUserIdMealDate.items

    //食事日付,食事時間30分おきのデータ,枝番で昇順ソートする
    eatLogs.sort((a,b) =>{
      if (a.mealDate == b.mealDate) {
        if (a.mealTime == b.mealTime) {
          return a.mealNo > b.mealNo ? 1 : -1
        }
        return a.mealTime > b.mealTime ? 1 : -1
      }
      return a.mealDate > b.mealDate ? 1 : -1
    })
    for(var eatLog of eatLogs) {
      delete eatLog.__typename
    }
    
    //腹囲のデータ
    var abdominals = []    
    if (req.query.unit == 'day') {
      for( day = dayFrom; dayTo.diff(day, 'day') >= 0; day.add(1, 'days') ) {
        const recordedAt = day.format('YYYY-MM-DD')
        const healths = healthChecks.filter(item => item.recordedAt == recordedAt)
        const abdominalItem = {
          date: recordedAt,
          abdominal: null
        }
        if (healths.length > 0) {
          abdominalItem.abdominal = healths[0].abdominal
        } 
        abdominals.push(abdominalItem)
      }
    } else if (req.query.unit == 'month') {
      var abdominalDays = []
      for ( healthCheck of healthChecks) {
        let day = moment(healthCheck.recordedAt)
        const abdominalDay = {
          month: day.month(),
          abdominal: healthCheck.abdominal
        }
        abdominalDays.push(abdominalDay)
      }
      for ( i = 0; i < 12; i++) {
        var abdominalMonth = abdominalDays.filter(abdominalDay => abdominalDay.month == i && abdominalDay.abdominal != null  && abdominalDay.abdominal != 0)
        if (abdominalMonth.length > 0) {
          var abdominalNum = 0
          for ( detail of abdominalMonth) {
            abdominalNum += detail.abdominal
          }
          //腹囲を計算して、四捨五入を行う
          const abdominalItem = {
            month: i+1,
            abdominal: math.round(abdominalNum / abdominalMonth.length, 1)
          }
          abdominals.push(abdominalItem)
        } else {
          const abdominalItem = {
            month: i+1,
            abdominal: null
          }
          abdominals.push(abdominalItem)
        }        
      }
    }

    //血圧のデータ
    var bps = []
    if (req.query.unit == 'day') {
      for(day = moment(startDate); dayTo.diff(day, 'day') >= 0; day.add(1, 'days') ) {        
        const recordedAt = day.format('YYYY-MM-DD')
        const healths = healthChecks.filter(item => item.recordedAt == recordedAt)
        const bpItem = {
          date: recordedAt,
          dbp : null,
          sbp : null
        }
        if (healths.length > 0) {
          bpItem.dbp = healths[0].dbp
          bpItem.sbp = healths[0].sbp
        } 
        bps.push(bpItem)
      }
    } else if (req.query.unit == 'month') {
      var bpDays = []
      for ( healthCheck of healthChecks) {
        let day = moment(healthCheck.recordedAt)
        const bpDay = {
          month: day.month(),
          dbp: healthCheck.dbp,
          sbp: healthCheck.sbp
        }
        bpDays.push(bpDay)
      }
      for ( i = 0; i < 12; i++) {
        var dbpMonth = bpDays.filter(bpDay => bpDay.month == i && bpDay.dbp != null  && bpDay.dbp != 0)
        var sbpMonth = bpDays.filter(bpDay => bpDay.month == i && bpDay.sbp != null  && bpDay.sbp != 0)
        var dbpNum = null
        var sbpNum = null

        if (dbpMonth.length > 0) {
          for (var dbpdetail of dbpMonth) {
            dbpNum += dbpdetail.dbp               
          } 
          var dbpItem = {
            month: i+1,
            dbp: parseInt(dbpNum / dbpMonth.length)        
          }
        } else {
          dbpItem = {
            month: i+1,
            dbp: null
          }
        }
        
        if (sbpMonth.length > 0) {
          for (var sbpdetail of sbpMonth) {
            sbpNum += sbpdetail.sbp               
          } 
          var sbpItem = {
            month: i+1,
            sbp: parseInt(sbpNum / sbpMonth.length)        
          }
        } else {
          sbpItem = {
            month: i+1,
            sbp: null
          }
        }
        const bpItem = {
          month: i+1,
          dbp: dbpItem.dbp,
          sbp: sbpItem.sbp         
        }
        bps.push(bpItem)
      }
    }
    
    //体重、歩数、カロリー、食事摂取ログ、血圧、腹囲は実装済
    const response = {
      userId: userId,
      unit: unit,
      weightItems: weights,
      abdominalItems: abdominals,
      bpItems: bps,
      stepItems: steps,
      calorieItems: calories,
      eatLogItems: eatLogs
    }
    return res.json(response)

  })().catch(e => next(e))
})

module.exports = router