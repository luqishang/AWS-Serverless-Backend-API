/*
 * ファイル名: bloodPressure.js
 * 作成日: 2021/10/07
 * 作成者: wei.cheng
 * 作成内容: 新規作成
 * 修正日: 2021/10/11
 * 修正者: ze.zhang
 * 修正内容: 血圧データ閲覧画面に遷移して、血圧データを表示の実装
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
 * /user-dashboard/bloodpressure:
 *   get:
 *     tags:
 *     - 保険対象者_ダッシュボード
 *     summary: 血圧データ閲覧表示
 *     description: ダッシュボード画面に血圧をタップすると、血圧データ閲覧画面に遷移して、血圧データを表示
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
 *               $ref: '#/components/schemas/dashboardBp'
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
 *     bpItem:
 *       description: 血圧詳細
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
 *     dashboardBp:
 *       description: ダッシュボード血圧
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
 *         bpItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/bpItem'
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
    var bps = []     
    if (unit == 'day') {
      for(var day = dayFrom; dayTo.diff(day, 'day') >= 0; day.add(1, 'days') ) {
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
    } else if (unit == 'month') {
      var bpDays = []
      for (var healthCheck of healthChecks) {
        let day = moment(healthCheck.recordedAt)
        const bpDay = {
          month: day.month(),
          dbp: healthCheck.dbp,
          sbp: healthCheck.sbp
        }
        bpDays.push(bpDay)
      }
      for (var i = 0; i < 12; i++) {
        var dbpMonth = bpDays.filter(bpDay => bpDay.month == i && bpDay.dbp != null  && bpDay.dbp != 0)
        var sbpMonth = bpDays.filter(bpDay => bpDay.month == i && bpDay.sbp != null  && bpDay.sbp != 0)
        var dbpNum = 0
        var sbpNum = 0

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
    const response = {
      unit: unit,
      bpItems: bps
    }
    return res.json(response)
  })().catch(e => next(e))
})

module.exports = router