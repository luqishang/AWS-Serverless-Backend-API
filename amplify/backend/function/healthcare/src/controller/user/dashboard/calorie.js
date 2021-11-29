/*
 * ファイル名: calorie.js
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
const moment = require('moment')
const { query, validationResult } = require('express-validator')
const ExtensibleCustomError = require('extensible-custom-error')
class BadRequestError extends ExtensibleCustomError {} // 400
const HealthCheckModel = require(process.env.AWS_REGION ? '/opt/model/healthCheck' : '../../../../../healthcarelayerOne/opt/model/healthCheck')
const comFunc = require(process.env.AWS_REGION ? '/opt/common/common-function' : '../../../../../healthcarelayerOne/opt/common/common-function')
const HealthCheckPerHourModel = require(process.env.AWS_REGION ? '/opt/model/healthCheckPerHour' : '../../../../../healthcarelayerOne/opt/model/healthCheckPerHour')
const UNIT = ['hour','day', 'month']


/**
 * @swagger
 * /user-dashboard/calorie:
 *   get:
 *     tags:
 *     - 保険対象者_ダッシュボード
 *     summary: 消費カロリーデータ閲覧表示
 *     description: ダッシュボード画面に消費カロリーをタップすると、消費カロリーデータ閲覧画面に遷移して、消費カロリーデータを表示
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
 *     - name: unit
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *         enum:
 *         - hour
 *         - day
 *         - month
 *       description: |
 *             単位  
 *             ・hour: 時間単位
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
 *               $ref: '#/components/schemas/dashboardCalorie'
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
 *     calorieItem:
 *       description: カロリー詳細
 *       type: object
 *       properties:
 *         hour:
 *           type: integer
 *           description: 時間
 *         month:
 *           type: integer
 *           description: 月
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
 * 
 *     dashboardCalorie:
 *       description: ダッシュボードカロリー
 *       type: object
 *       properties:
 *         unit:
 *           type: string
 *           enum:
 *           - hour
 *           - day
 *           - month
 *           description: |
 *             単位  
 *             ・hour: 時間単位 
 *             ・day: 日単位  
 *             ・month: 月単位
 *         calorieItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/calorieItem'
 */
router.get('/',[
  query('startDate').not().isEmpty().withMessage('startDate is required'),
  query('startDate').isISO8601().withMessage('startDate is not DateFormat(YYYY-MM-DD)'),
  query('startDate').custom(value=>{return comFunc.checkDate(value, 'startDate(YYYY-MM-DD)')}),
  query('endDate').not().isEmpty().withMessage('endDate is required'),
  query('endDate').isISO8601().withMessage('endDate is not DateFormat(YYYY-MM-DD)'),
  query('endDate').custom(value=>{return comFunc.checkDate(value, 'endDate(YYYY-MM-DD)')}),
  query('unit').isIn(UNIT).withMessage('unit must be hour or day or month only') 
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    } 
    let dayFrom = moment(req.query.startDate)
    let dayTo = moment(req.query.endDate)
    const days = dayTo.diff(dayFrom, 'day')
    if (days < 0) {
      return next(new BadRequestError('startDate must be less than endDate'))
    }
      
    var calories = [] 
    if (req.query.unit == 'hour') {
      if (req.query.startDate != req.query.endDate) {
        return next(new BadRequestError('startDate must be equal to endDate'))
      }
      const healthCheckPerHourModel = new HealthCheckPerHourModel()
      let recordedAtInput = { eq: req.query.startDate } 
      const getHealthCheckPerHourResult = await healthCheckPerHourModel.ListHealthCheckPerHourUserIdRecordAt(req.userId, recordedAtInput) 
      const healthCheckPerHours = getHealthCheckPerHourResult.data.listHealthCheckPerHourUserIdRecordAt.items
      for (var i = 0; i < 24; i++) {
        var hourItems = healthCheckPerHours.filter(item => item.hour == i)
        const calorie = {
          hour: i,
          exerciseCalorie: !hourItems.length ? null : hourItems[0].exerciseCalorie
        }
        calories.push(calorie)     
      }
    } else {
      const healthCheckModel = new HealthCheckModel()
      let recordedAtInput = { between: [req.query.startDate, req.query.endDate] } 
      const getHealthCheckResult = await healthCheckModel.ListHealthCheckUserIdRecordAt(req.userId, recordedAtInput) 
      const healthChecks = getHealthCheckResult.data.listHealthCheckUserIdRecordAt.items
      if (healthChecks.length > 0) {
        //年月日で昇順ソートする
        healthChecks.sort((a,b) =>{
          return a.recordedAt > b.recordedAt ? 1 : -1
        })
      }
      if (req.query.unit == 'day') {
        for(var day = dayFrom; dayTo.diff(day, 'day') >= 0; day.add(1, 'days') ) {
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
        for (var healthCheck of healthChecks) {
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
            for (var detail of calorieMonth) {
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
    }
    const response = {
      unit: req.query.unit ,
      calorieItems: calories
    }
    return res.json(response)
  })().catch(e => next(e))
})
  
module.exports = router
