/*
 * ファイル名: step.js
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
 * /user-dashboard/step:
 *   get:
 *     tags:
 *     - 保険対象者_ダッシュボード
 *     summary: 歩数データ閲覧表示
 *     description: ダッシュボード画面に歩数をタップすると、歩数データ閲覧画面に遷移して、歩数データを表示
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
 *               $ref: '#/components/schemas/dashboardStep'
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
 *     stepItem:
 *       description: 歩数詳細
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
 *         step:
 *           type: integer
 *           description: 歩数
 * 
 *     dashboardStep:
 *       description: ダッシュボード歩数
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
 *         stepItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/stepItem'
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
    
    var steps = [] 
    if (req.query.unit == 'hour') {
      if (req.query.startDate != req.query.endDate) {
        return next(new BadRequestError('startDate must be equal to endDate'))
      }
      const healthCheckPerHourModel = new HealthCheckPerHourModel()
      let recordedAtInput = { eq: req.query.startDate } 
      const getHealthCheckPerHourResult = await healthCheckPerHourModel.ListHealthCheckPerHourUserIdRecordAt(req.userId, recordedAtInput) 
      const healthCheckPerHours = getHealthCheckPerHourResult.data.listHealthCheckPerHourUserIdRecordAt.items
      for (var i = 0; i < 24; i++) {
        var stepHours = healthCheckPerHours.filter(stepHour => stepHour.hour == i)
        const stepHour = {
          hour: i,
          step: !stepHours.length ? null : stepHours[0].stepsPerHourAuto
        }
        steps.push(stepHour)     
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
        for (var healthCheck of healthChecks) {
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
            for (var detail of stepMonth) {
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
    }
    const response = {
      unit: req.query.unit ,
      stepItems: steps
    }
    return res.json(response)
  })().catch(e => next(e))
})

module.exports = router