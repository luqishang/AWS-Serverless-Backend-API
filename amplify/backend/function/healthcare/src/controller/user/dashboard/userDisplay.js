/*
 * ファイル名: display.js
 * 作成日: 2021/10/01
 * 作成者: wei.cheng
 * 作成内容: 新規作成
 * 修正日: 2021/10/08
 * 修正者: bochao.zhang
 * 修正内容: 睡眠時間を追加
 * 修正日: 2021/10/11
 * 修正者: bochao.zhang
 * 修正内容: 血圧データを追加
 * 修正日: 2021/10/11
 * 修正者: ze.zhang
 * 修正内容: 社食を追加
 * 修正日: 2021/10/19
 * 修正者: wei.cheng
 * 修正内容: 一週間の中、データがなければ、日付とnullを返す
 * ver:1.0.0
 */
const express = require('express')
const router = express.Router()
const { query, validationResult } = require('express-validator')
const ExtensibleCustomError = require('extensible-custom-error')
class BadRequestError extends ExtensibleCustomError {} // 400
const moment = require('moment')

const HealthCheckModel = require(process.env.AWS_REGION ? '/opt/model/healthCheck' : '../../../../../healthcarelayerOne/opt/model/healthCheck')
const SpecificHealthGoalModel = require(process.env.AWS_REGION ? '/opt/model/specificHealthGoal' : '../../../../../healthcarelayerOne/opt/model/specificHealthGoal')
const EatLogModel = require(process.env.AWS_REGION ? '/opt/model/eatLog' : '../../../../../healthcarelayerOne/opt/model/eatLog')
const ActionGoalModel = require(process.env.AWS_REGION ? '/opt/model/actionGoal' : '../../../../../healthcarelayerOne/opt/model/actionGoal')
const comFunc = require(process.env.AWS_REGION ? '/opt/common/common-function' : '../../../../../healthcarelayerOne/opt/common/common-function')

/**
 * @swagger
 * /user-dashboard/display:
 *   get:
 *     tags:
 *     - 保険対象者_ダッシュボード
 *     summary: ダッシュボード一覧表示
 *     description: 体重、腹囲などの情報がダッシュボード画面に表示する
 *     parameters:
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
 *               $ref: '#/components/schemas/dashboard'
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
 *     weightDetail:
 *       description: 体重詳細
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           description: |  
 *             日付   
 *             - ISOフォーマット(YYYY-MM-DD)とする
 *         weight:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *           maximum: 999.99
 *           description: 体重
 *     abdominalDetail:
 *       description: 腹囲詳細
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           description: |  
 *             日付   
 *             - ISOフォーマット(YYYY-MM-DD)とする
 *         abdominal:
 *           type: number
 *           format: decimal
 *           minimum: 0
 *           maximum: 999.9
 *           description: 腹囲
 *     stepsDetail:
 *       description: 歩数詳細
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           description: |  
 *             日付   
 *             - ISOフォーマット(YYYY-MM-DD)とする
 *         steps:
 *           type: integer
 *           minimum: 0
 *           maximum: 999999
 *           description: 歩数
 *     bpDetail:
 *       description: 血圧詳細
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           description: |  
 *             日付   
 *             - ISOフォーマット(YYYY-MM-DD)とする
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
 *    
 *     exerciseCalorieDetail:
 *       description: 運動消費カロリー詳細
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           description: |  
 *             日付   
 *             - ISOフォーマット(YYYY-MM-DD)とする
 *         exerciseCalorie:
 *           type: integer
 *           minimum: 0
 *           maximum: 9999
 *           description: 運動消費カロリー
 *     mealDetail:
 *       description: 社食詳細
 *       type: object
 *       properties:
 *         mealDate:
 *           type: string
 *           description: |  
 *             食事日付    
 *             - ISOフォーマット(YYYY-MM-DD)とする  
 *         mealTime:
 *           type: string
 *           description: |  
 *             食事時間30分おきのデータ    
 *             - ISOフォーマット(HH:mm)とする
 *         mealNo:
 *           type: integer
 *           description: 枝番 
 *         energy:
 *           type: integer
 *           minimum: 0
 *           maximum: 9999
 *           description: エネルギー(kcal)
 *         protein:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 9999.9
 *           description: たんぱく質(g)
 *         lipid:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 9999.9
 *           description: 脂質(g)
 *         carbohydrate:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 9999.9
 *           description: 炭水化物(g) 
 *         salinity:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 99.9
 *           description: 塩分(g) 
 *     sleepTimeDetail:
 *       description: 睡眠時間詳細
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           description: |  
 *             日付   
 *             - ISOフォーマット(YYYY-MM-DD)とする
 *         sleepTime:
 *           type: integer
 *           minimum: 0
 *           maximum: 1440
 *           description: 睡眠時間
 * 
 *     dashboard:
 *       description: ダッシュボード
 *       type: object
 *       properties:
 *         weights:
 *           type: object
 *           description: 体重
 *           properties:
 *             recentWeight:
 *               type: number
 *               format: decimal
 *               minimum: 0
 *               maximum: 999.99
 *               description: 体重の現在値（当日に最も近い過去日付の値）
 *             goalWeight:
 *               type: number
 *               format: decimal
 *               minimum: 0
 *               maximum: 999.99
 *               description: 体重の目標値
 *             weightWeek:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/weightDetail'
 *         abdominals:
 *           type: object
 *           description: 腹囲
 *           properties:
 *             recentAbdominal:
 *               type: number
 *               format: decimal
 *               minimum: 0
 *               maximum: 999.9
 *               description: 腹囲の現在値（当日に最も近い過去日付の値）
 *             goalAbdominal:
 *               type: number
 *               format: decimal
 *               minimum: 0
 *               maximum: 999.9
 *               description: 腹囲の目標値
 *             abdominalWeek:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/abdominalDetail'
 *         steps:
 *           type: object
 *           description: 歩数
 *           properties:
 *             recentSteps:
 *               type: integer
 *               minimum: 0
 *               maximum: 999999
 *               description: 歩数の現在値（当日）
 *             goalSteps:
 *               type: integer
 *               minimum: 0
 *               maximum: 999999
 *               description: 歩数の目標値
 *             stepsWeek:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/stepsDetail'
 *         bps:
 *           type: object
 *           description: 血圧
 *           properties:
 *             recentDbp:
 *               type: integer
 *               minimum: 0
 *               maximum: 999
 *               description: 血圧(拡張期)の現在値（当日）
 *             recentSbp:
 *               type: integer
 *               minimum: 0
 *               maximum: 999
 *               description: 血圧(収縮期)の現在値（当日）
 *             bpWeek:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/bpDetail'
 *         
 *         exerciseCalories:
 *           type: object
 *           description: 運動消費カロリー
 *           properties:
 *             recentExerciseCalorie:
 *               type: integer
 *               minimum: 0
 *               maximum: 9999
 *               description: 運動消費カロリーの当日の値
 *             exerciseCalorieWeek:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/exerciseCalorieDetail'
 *         mealPhotos:
 *           type: array
 *           description: 食事写真(直近の3枚)
 *           items: 
 *             type: string
 *         companyMeals:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/mealDetail'
 *         sleepTimes:
 *           type: object
 *           description: 睡眠時間
 *           properties:
 *             recentSleepTime:
 *               type: integer
 *               minimum: 0
 *               maximum: 1440
 *               description: 睡眠時間の当日の値
 *             sleepTimeWeek:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/sleepTimeDetail'
 * 
 */
router.get('/',[
  query('startDate').not().isEmpty().withMessage('startDate is required'),
  query('startDate').isISO8601().withMessage('startDate is not DateFormat(YYYY-MM-DD)'),
  query('startDate').custom(value=>{return comFunc.checkDate(value, 'startDate(YYYY-MM-DD)')}),
  query('endDate').not().isEmpty().withMessage('endDate is required'),
  query('endDate').isISO8601().withMessage('endDate is not DateFormat(YYYY-MM-DD)'),
  query('endDate').custom(value=>{return comFunc.checkDate(value, 'endDate(YYYY-MM-DD)')}),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    let dayFrom = moment(req.query.startDate)
    let dayTo = moment(req.query.endDate)
    const days = dayTo.diff(dayFrom, 'day')
    
    if (days <= 0) {
      return next(new BadRequestError('startDate must be less than endDate'))
    }
    
    // 期間範囲値の取得
    const healthCheckModel = new HealthCheckModel()
    let recordedAtInput = { between: [req.query.startDate, req.query.endDate] }
    const getHealthCheckResult = await healthCheckModel.ListHealthCheckUserIdRecordAt(req.userId, recordedAtInput)
    const healthChecks = getHealthCheckResult.data.listHealthCheckUserIdRecordAt.items
    
    //年月日時で昇順ソートする
    healthChecks.sort((a,b) =>{
      return a.recordedAt > b.recordedAt ? 1 : -1
    })

    // 現在値の取得（体重・腹囲）
    const recentHealthChecks = await comFunc.getRecentHealthCheckData(req.userId, moment().format('YYYY-MM-DD'))

    // 現在値の取得（歩数）
    const currentHealthCheckResult = await healthCheckModel.GetData(req.userId, moment().format('YYYY-MM-DD'))
    const currentHealthCheck  = currentHealthCheckResult.data.getHealthCheck

    // 目標値の取得
    const specificHealthGoal = new SpecificHealthGoalModel()
    const healthGoal =  await specificHealthGoal.getRecentSpecificHealthGoal(req.userId)

    // 目標値の取得（歩数・運動消費カロリー）
    const actionGoalModel = new ActionGoalModel()
    const actionGoals = await actionGoalModel.listActionGoals(req.userId)
    const actionGoal = actionGoals.data.listActionGoals.items.filter(ag => ag.goalId == 38)
    let goalStep = null
    if(actionGoal.length > 0){
      goalStep = actionGoal[0].goalQuantity != null ? actionGoal[0].goalQuantity : null
    }

    // 現在値の設定(歩数)
    let currentStep = null
    // 現在値の設定(拡張期血圧)
    let currentDbp = null
    // 現在値の設定(収縮期血圧)
    let currentSbp = null
    // 現在値の設定(カロリー)
    let currentExerciseCalorie = null
    // 現在値の設定(睡眠時間)
    let currentSleepTime = null
    if (currentHealthCheck != null) {
      currentStep = currentHealthCheck.stepsPerDayManual
      currentDbp = currentHealthCheck.dbp
      currentSbp = currentHealthCheck.sbp
      currentExerciseCalorie = currentHealthCheck.exerciseCaloriePerDayAuto
      currentSleepTime = currentHealthCheck.sleepTimePerDayAuto
    }

    // 期間範囲値の設定(体重・腹囲・血圧・歩数・運動消費カロリー・睡眠時間)
    const weekWeightArry = []
    const weekAbdominalArry = []
    const weekBpsArry = []
    const weekStepsArry = []
    const weekExerciseCalorieArry = []
    const weekSleepTiemArry = []

    for(var day = dayFrom; dayTo.diff(day, 'day') >= 0; day.add(1, 'days') ) {
      const recordedAt = day.format('YYYY-MM-DD')
      const healths = healthChecks.filter(item => item.recordedAt == recordedAt)
      const weightItem = {
        date: recordedAt,
        weight: null
      }
      const abdominalItem = {
        date: recordedAt,
        abdominal: null
      }
      const bpsItem = {
        date: recordedAt,
        dbp: null,
        sbp: null
      }
      const stepsItem = {
        date: recordedAt,
        steps: null
      }
      const exerciseCalorieItem = {
        date: recordedAt,
        exerciseCalorie: null
      }
      const sleepTimeItem = {
        date: recordedAt,
        sleepTime: null
      }

      if (healths.length > 0) {
        const health = healths[0]
        weightItem.weight = health.weight
        abdominalItem.abdominal = health.abdominal
        bpsItem.dbp = health.dbp
        bpsItem.sbp = health.sbp
        stepsItem.steps = health.stepsPerDayManual != null ? health.stepsPerDayManual : health.stepsPerDayAuto
        exerciseCalorieItem.exerciseCalorie = health.exerciseCaloriePerDayAuto
        sleepTimeItem.sleepTime = health.sleepTimePerDayAuto
      }

      weekWeightArry.push(weightItem)
      weekAbdominalArry.push(abdominalItem)
      weekBpsArry.push(bpsItem)
      weekStepsArry.push(stepsItem)
      weekExerciseCalorieArry.push(exerciseCalorieItem)
      weekSleepTiemArry.push(sleepTimeItem)
    }
    
    // 体重・腹囲・血圧・歩数・運動消費カロリー・睡眠時間
    let weights = {
      recentWeight: recentHealthChecks.weight,
      goalWeight: healthGoal != null ? healthGoal.goalWeight : null,
      weightWeek: [...weekWeightArry]
    }
    let abdominals = {
      recentAbdominal: recentHealthChecks.abdominal,
      goalAbdominal: healthGoal != null ? healthGoal.goalAbdominal : null,
      abdominalWeek: [...weekAbdominalArry]
    }
    let bps = {
      recentDbp: currentDbp,
      recentSbp: currentSbp,
      bpWeek: [...weekBpsArry]
    }
    let steps = {
      recentSteps: currentStep,
      goalSteps: goalStep,  
      stepsWeek: [...weekStepsArry]
    }
    let exerciseCalories = {
      recentexerciseCalorie: currentExerciseCalorie,
      exerciseCalorieWeek: [...weekExerciseCalorieArry]
    }
    let sleepTimes = {
      recentSleepTime: currentSleepTime,
      sleepTimeWeek: [...weekSleepTiemArry]
    }

    //食事写真関連取得
    let mealPhotos = []
    const eatLogModel = new EatLogModel()
    let mealDateInput = { between: [req.query.startDate, req.query.endDate ] } 
    const getEatLogResult = await eatLogModel.ListEatLogByUserIdMealDate(req.userId, mealDateInput) 
    let eatLogs = getEatLogResult.data.listEatLogByUserIdMealDate.items
    if (!eatLogs.length) {
      //データを取得できない場合
      mealPhotos = null
    } else {
      eatLogs = eatLogs.filter(eatLog => eatLog.photoPath != null && eatLog.photoPath.trim() != '')
      if (!eatLogs.length) {
        mealPhotos = null    
      } else {
        //食事日付,食事時間30分おきのデータ,枝番で降順ソートする
        eatLogs.sort((a,b) =>{
          if (a.mealDate == b.mealDate) {
            if (a.mealTime == b.mealTime) {
              return a.mealNo > b.mealNo ? -1 : 1
            }
            return a.mealTime > b.mealTime ? -1 : 1
          }
          return a.mealDate > b.mealDate ? -1 : 1
        })
        if (eatLogs.length > 3) {
          for (var i=0; i<3; i++) {
            mealPhotos.push(eatLogs[i].photoPath)
          } 
        } else {
          for (var eatLog of eatLogs) {
            mealPhotos.push(eatLog.photoPath)            
          }
        }
      }
    }

    //社食実装
    let companyMealArray = []
    eatLogs = getEatLogResult.data.listEatLogByUserIdMealDate.items
    if (eatLogs.length > 0 ) {
      const companyMeals = eatLogs.filter(eatLog => eatLog.importedBy == 'companyfood')
      companyMeals.sort((a,b) =>{
        if (a.mealDate == b.mealDate) {
          if (a.mealTime == b.mealTime) {
            return a.mealNo > b.mealNo ? 1 : -1
          }
          return a.mealTime > b.mealTime ? 1 : -1
        }
        return a.mealDate > b.mealDate ? 1 : -1
      })

      for (var companyMeal of companyMeals){
        const companyMealDay = {
          mealDate: companyMeal.mealDate,
          mealTime: companyMeal.mealTime,
          mealNo: companyMeal.mealNo,
          carbohydrate: companyMeal.carbohydrate,
          energy: companyMeal.energy,
          protein: companyMeal.protein,
          lipid: companyMeal.lipid,
          salinity: companyMeal.salinity
        }
        companyMealArray.push(companyMealDay)          
      }
    } else{
      //データを取得できない場合
      companyMealArray = null
    }

    //体重、腹囲、血圧、歩数、食事写真、睡眠時間、社食は実装済 
    const response = {
      weights: weights,
      abdominals: abdominals,
      steps: steps,
      bps: bps,
      exerciseCalories: exerciseCalories,
      mealPhotos: mealPhotos,
      companyMeals: companyMealArray,
      sleepTimes: sleepTimes
    }
    return res.json(response)

  })().catch(e => next(e))
})

module.exports = router