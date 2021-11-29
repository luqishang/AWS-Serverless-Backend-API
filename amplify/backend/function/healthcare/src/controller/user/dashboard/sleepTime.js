/*
 * ファイル名: sleepTime.js
 * 作成日: 2021/10/07
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
const UNIT = ['day', 'month']

/**
 * @swagger
 * /user-dashboard/sleeptime:
 *   get:
 *     tags:
 *     - 保険対象者_ダッシュボード
 *     summary: 睡眠時間データ閲覧表示
 *     description: ダッシュボード画面に睡眠時間をタップすると、睡眠時間データ閲覧画面に遷移して、睡眠時間データを表示
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
 *               $ref: '#/components/schemas/dashboardSleepTime'
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
 *     sleepTimeItem:
 *       description: 睡眠時間詳細
 *       type: object
 *       properties:
 *         month:
 *           type: integer
 *           description: 月
 *         date:
 *           type: string
 *           description: |
 *             日付  
 *             - ISOフォーマット(YYYY-MM-DD)とする 
 *         sleepTime:
 *           type: integer
 *           minimum: 0
 *           maximum: 1440
 *           description: 睡眠時間の当日の値
 * 
 *     dashboardSleepTime:
 *       description: ダッシュボード睡眠時間
 *       type: object
 *       properties:
 *         unit:
 *           type: string
 *           enum:
 *           - day
 *           - month
 *           description: |
 *             単位  
 *             ・day: 日単位  
 *             ・month: 月単位
 *         sleepTimeItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/sleepTimeItem'
 */
router.get('/',[
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
    const unit = req.query.unit
    let dayFrom = moment(req.query.startDate)
    let dayTo = moment(req.query.endDate)
    const days = dayTo.diff(dayFrom, 'day')
    if (days < 0) {
      return next(new BadRequestError('startDate must be less than endDate'))
    }
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
    var sleepTimes = []    
    if (unit == 'day') {
      for(var day = dayFrom; dayTo.diff(day, 'day') >= 0; day.add(1, 'days') ) {
        const recordedAt = day.format('YYYY-MM-DD')
        const healths = healthChecks.filter(item => item.recordedAt == recordedAt)
        const sleepTimeItem = {
          date: recordedAt,
          sleepTime: null
        }
        if (healths.length > 0) {
          sleepTimeItem.sleepTime = healths[0].sleepTimePerDayAuto
        } 
        sleepTimes.push(sleepTimeItem)
      }
    } else if (unit == 'month') {
      var sleepTimeDays = []
      for (var healthCheck of healthChecks) {
        let day = moment(healthCheck.recordedAt)
        const sleepTimeDay = {
          month: day.month(),
          sleepTime: healthCheck.sleepTimePerDayAuto
        }
        sleepTimeDays.push(sleepTimeDay)
      }
      for (var i = 0; i < 12; i++) {
        var sleepTimeMonth = sleepTimeDays.filter(sleepTimeDay => sleepTimeDay.month == i && sleepTimeDay.sleepTime != null  && sleepTimeDay.sleepTime != 0)
        if (sleepTimeMonth.length > 0) {
          var sleepTimeNum = 0
          for (var detail of sleepTimeMonth) {
            sleepTimeNum += detail.sleepTime
          }
          //腹囲を計算して、四捨五入を行う
          const sleepTimeItem = {
            month: i+1,
            sleepTime: parseInt(sleepTimeNum / sleepTimeMonth.length)
          }
          sleepTimes.push(sleepTimeItem)
        } else {
          const sleepTimeItem = {
            month: i+1,
            sleepTime: null
          }
          sleepTimes.push(sleepTimeItem)
        }        
      }
    }
    const response = {
      unit: unit,
      sleepTimeItems: sleepTimes
    }
    return res.json(response)
  })().catch(e => next(e))
})

module.exports = router