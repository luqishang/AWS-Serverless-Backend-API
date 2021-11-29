/*
 * ファイル名: eatLog.js
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
const EatLogModel = require(process.env.AWS_REGION ? '/opt/model/eatLog' : '../../../../healthcarelayerOne/opt/model/eatLog')
const comFunc = require(process.env.AWS_REGION ? '/opt/common/common-function' : '../../../../healthcarelayerOne/opt/common/common-function')
const S3Strage = require(process.env.AWS_REGION ? '/opt/service/s3' : '../../../../healthcarelayerOne/opt/service/s3')
const IMPORTEDBY = ['user', 'companyfood']

/**
 * @swagger
 * /user/eat-log:
 *   get:
 *     tags:
 *     - 保険対象者_食事摂取ログ
 *     summary: 食事摂取ログ取得
 *     description: 開始日付と終了日付でログインユーザーの食事摂取ログを取得する
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/eatLogResponse'
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
 *     - 保険対象者_食事摂取ログ
 *     summary: 食事摂取ログの作成
 *     description: 食事摂取ログを新たに作成する
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
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/eatLogRequest'
 *     responses:
 *       200:
 *         description: 取得OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/eatLogResponse'
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
 *   put:
 *     tags:
 *     - 保険対象者_食事摂取ログ
 *     summary: 食事摂取ログの更新
 *     description: 食事摂取ログの食事内容を更新する
 *     parameters:
 *     - name: mealDate
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *       description: |  
 *             食事日付   
 *             - ISOフォーマット(YYYY-MM-DD)とする
 *     - name: mealTime
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *       description: |  
 *             食事時間30分おきのデータ   
 *             - ISOフォーマット(HH:mm)とする
 *     - name: mealNo
 *       in: query
 *       required: true
 *       schema:
 *         type: integer
 *         format: int32
 *       description: 枝番
 *     - name: mealContents
 *       in: query
 *       schema:
 *         type: string
 *       description: 食事内容
 *     - name: X-Auth-Token
 *       in: header
 *       description: 認証トークン
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: 更新OK
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/eatLogResponse'
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
*   delete:
 *     tags:
 *     - 保険対象者_食事摂取ログ
 *     summary: 食事摂取ログの削除
 *     description: 食事摂取ログを削除する
 *     parameters:
 *     - name: mealDate
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *       description: |  
 *             食事日付   
 *             - ISOフォーマット(YYYY-MM-DD)とする
 *     - name: mealTime
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *       description: |  
 *             食事時間30分おきのデータ   
 *             - ISOフォーマット(HH:mm)とする
 *     - name: mealNo
 *       in: query
 *       required: true
 *       schema:
 *         type: integer
 *         format: int32
 *       description: 枝番
 *     - name: X-Auth-Token
 *       in: header
 *       description: 認証トークン
 *       required: true
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: 更新OK
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/eatLogResponse'
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
 *     eatLog:
 *       description: 食事摂取ログ
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
 *         photoTime:
 *           type: string
 *           description: |  
 *             撮影時間    
 *             - ISOフォーマット(YYYY-MM-DDTHH:MI:SS+09:00)とする
 *         mealContents:
 *           type: string
 *           description: 食事内容
 *         importedBy:
 *           type: string
 *           enum:
 *           - user
 *           - companyfood
 *           description: |
 *             入手元  
 *             ・user: ユーザ入力  
 *             ・companyfood: 社食
 *         menuName:
 *           type: string
 *           description: メニュー名
 *         energy:
 *           type: integer
 *           format: int32
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
 *     eatLogRequest:
 *       allOf:
 *       - type: object       
 *       - required:
 *         - mealDate
 *         - mealTime
 *         - importedBy
 *         properties:
 *           photo:
 *             type: string
 *             format: byte
 *             description: BASE64エンコードされた画像データ
 *           photoName:
 *             type: string
 *             description: 画像名
 *       - $ref: '#/components/schemas/eatLog'
 *     eatLogResponse:
 *       allOf:
 *       - type: object
 *         properties:
 *           mealNo:
 *             type: integer
 *             description: 枝番
 *           photoPath:
 *             type: string
 *             description: 画像URL           
 *           photoKey:
 *             type: string
 *             description: 画像キー
 *       - $ref: '#/components/schemas/eatLog'
 * 
 */
router.get('/',[
  query('startDate').not().isEmpty().withMessage('startDate is required'),
  query('startDate').isISO8601().withMessage('startDate is not DateFormat(YYYY-MM-DD)'),
  query('startDate').custom(value=>{return comFunc.checkDate(value, 'startDate(YYYY-MM-DD)')}),
  query('endDate').not().isEmpty().withMessage('endDate is required'),
  query('endDate').isISO8601().withMessage('endDate is not DateFormat(YYYY-MM-DD)'),
  query('endDate').custom(value=>{return comFunc.checkDate(value, 'endDate(YYYY-MM-DD)')})
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
    const eatLogModel = new EatLogModel()
    let mealDateInput = { between: [req.query.startDate, req.query.endDate ] } 
    const getEatLogResult = await eatLogModel.ListEatLogByUserIdMealDate(req.userId, mealDateInput) 
    const eatLogs = getEatLogResult.data.listEatLogByUserIdMealDate.items
    if (!eatLogs.length) {
      //データを取得できない場合
      return next(new BadRequestError('EatLog data does not exist'))
    }
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
    return res.json(eatLogs)
  })().catch(e => next(e))
})

router.post('/', [
  body().isArray(),
  body('*.mealDate').not().isEmpty().withMessage('mealDate(YYYY-MM-DD) is required'),
  body('*.mealDate').isISO8601().withMessage('mealDate is not DateFormat(YYYY-MM-DD)'),
  body('*.mealDate').custom(value=>{return comFunc.checkDate(value, 'mealDate(YYYY-MM-DD)')}),  
  body('*.mealTime').not().isEmpty().withMessage('mealTime(HH:mm) is required'),
  body('*.mealTime').matches('^(0[0-9]|1[0-9]|2[0-3]):[0,3]0$').withMessage('mealTime(HH:mm) is not every 30 minutes value'),
  body('*.importedBy').not().isEmpty().withMessage('importedBy is required'),
  body('*.importedBy').isIn(IMPORTEDBY).withMessage('importedBy must be user or companyfood only'),
  body('*.photoTime').optional({nullable:true}).isISO8601().withMessage('photoTime is not DateFormat(YYYY-MM-DDTHH24:MI:SSZ)'),
  body('*.energy').optional({nullable:true}).isInt({min:0, max:9999}).withMessage('energy must be integer type in range(0-9999)'),
  body('*.protein').optional({nullable:true}).isDecimal({force_decimal:false, decimal_digits:'1'}).withMessage('protein is invalid'),  // eslint-disable-line
  body('*.protein').optional({nullable:true}).isFloat({min:0, max:9999.9}).withMessage('protein should be in range(0-9999.9)'),
  body('*.lipid').optional({nullable:true}).isDecimal({force_decimal:false, decimal_digits:'1'}).withMessage('lipid is invalid'),  // eslint-disable-line
  body('*.lipid').optional({nullable:true}).isFloat({min:0, max:9999.9}).withMessage('lipid should be in range(0-9999.9)'),
  body('*.carbohydrate').optional({nullable:true}).isDecimal({force_decimal:false, decimal_digits:'1'}).withMessage('carbohydrate is invalid'),  // eslint-disable-line
  body('*.carbohydrate').optional({nullable:true}).isFloat({min:0, max:9999.9}).withMessage('carbohydrate should be in range(0-9999.9)'),
  body('*.salinity').optional({nullable:true}).isDecimal({force_decimal:false, decimal_digits:'1'}).withMessage('salinity is invalid'),  // eslint-disable-line
  body('*.salinity').optional({nullable:true}).isFloat({min:0, max:99.9}).withMessage('salinity should be in range(0-99.9)')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    const eatLogs = req.body
    //食事日付,食事時間30分おきのデータでソートする
    eatLogs.sort((a,b) =>{
      if (a.mealDate == b.mealDate) {
        return a.mealTime > b.mealTime ? 1 : -1
      }
      return a.mealDate > b.mealDate ? 1 : -1
    })
    const preMealDate = eatLogs[0].mealDate
    const preMealTime = eatLogs[0].mealTime
    let mealNo = 0
    const eatLogModel = new EatLogModel()
    const s3 = new S3Strage()
    const response = []
    for (let i = 0; i < eatLogs.length; i++) {
      const eatLog = eatLogs[i]
      if (i == 0 || !(preMealDate == eatLog.mealDate && preMealTime == eatLog.mealTime)) {
        //最大枝番を取得する
        let mealDateInput = {eq: eatLog.mealDate}
        const getEatLogResult = await eatLogModel.ListEatLogByUserIdMealDate(req.userId, mealDateInput) 
        const eatLogsOfDB = getEatLogResult.data.listEatLogByUserIdMealDate.items.filter(eat => eat.mealTime == eatLog.mealTime)
        //枝番で降順する
        eatLogsOfDB.sort((a,b) =>{
          return a.mealNo > b.mealNo ? -1 : 1
        })
        if (!eatLogsOfDB.length) {
          mealNo = 1
        } else {
          mealNo = eatLogsOfDB[0].mealNo + 1
        } 
      } else {
        mealNo++
      }
      //画像があれば、S3にアップロードして保存する
      let photoName = null
      let photoURL = null
      if (eatLog.photoName != null && eatLog.photo != null
        && eatLog.photoName.trim() != '' && eatLog.photo.trim() != '' ) {
        photoName = req.userId + '/' + eatLog.mealDate + '/' + eatLog.mealTime + '/' + mealNo + '/' + eatLog.photoName
        const encodedData = eatLog.photo
        const fileData = encodedData.replace(/^data:\w+\/\w+;base64,/, '')
        const dataBuffer = new Buffer.from(fileData, 'base64')        
        try {
          const uploadResult = await s3.upload(photoName, dataBuffer)
          photoURL = uploadResult.Location // アップロードされたフルパス
        } catch (e) {
          next(e)
        }
      }
      delete eatLog.photoName
      delete eatLog.photo
      const data = {
        userId: req.userId,
        mealNo: mealNo,
        createdAt: moment().unix(),
        updatedAt: moment().unix(),
        photoPath: photoURL,
        photoKey: photoName,
        ...eatLog
      }
      await eatLogModel.CreateEatLog(data)
      delete data.userId
      delete data.createdAt
      delete data.updatedAt
      response.push(data)
    }
    return res.json(response)
  })().catch(e => next(e))
})

router.put('/', [
  query('mealDate').not().isEmpty().withMessage('mealDate(YYYY-MM-DD) is required'),
  query('mealDate').isISO8601().withMessage('mealDate is not DateFormat(YYYY-MM-DD)'),
  query('mealDate').custom(value=>{return comFunc.checkDate(value, 'mealDate(YYYY-MM-DD)')}),
  query('mealTime').not().isEmpty().withMessage('mealTime(HH:mm) is required'),
  query('mealTime').matches('^(0[0-9]|1[0-9]|2[0-3]):[0,3]0$').withMessage('mealTime(HH:mm) is not every 30 minutes value'),
  query('mealNo').not().isEmpty().withMessage('mealNo is required'),
  query('mealNo').isInt().withMessage('mealNo must be integer type')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    const eatLogModel = new EatLogModel()
    //食事摂取ログが存在するかどうかチェックする
    const getEatLogResult = await eatLogModel.GetEatLog(req.userId, req.query.mealDate,req.query.mealTime,req.query.mealNo)
    if (!getEatLogResult.data.getEatLog) {
      return next(new BadRequestError('EatLog data does not exist'))
    }
    const eatLog = getEatLogResult.data.getEatLog
    //更新する時、不要な項目を削除
    delete eatLog.__typename
    //更新項目を設定
    eatLog.mealContents = req.query.mealContents
    eatLog.updatedAt = moment().unix()
    await eatLogModel.UpdateEatLog(eatLog)
    //responseの不要な項目を削除
    delete eatLog.userId
    delete eatLog.createdAt
    delete eatLog.updatedAt
    return res.json(eatLog)
  })().catch(e => next(e))
})

router.delete('/', [
  query('mealDate').not().isEmpty().withMessage('mealDate(YYYY-MM-DD) is required'),
  query('mealDate').isISO8601().withMessage('mealDate is not DateFormat(YYYY-MM-DD)'),
  query('mealDate').custom(value=>{return comFunc.checkDate(value, 'mealDate(YYYY-MM-DD)')}),
  query('mealTime').not().isEmpty().withMessage('mealTime(HH:mm) is required'),
  query('mealTime').matches('^(0[0-9]|1[0-9]|2[0-3]):[0,3]0$').withMessage('mealTime(HH:mm) is not every 30 minutes value'),
  query('mealNo').not().isEmpty().withMessage('mealNo is required'),
  query('mealNo').isInt().withMessage('mealNo must be integer type')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    const eatLogModel = new EatLogModel()
    //食事摂取ログが存在するかどうかチェックする
    const getEatLogResult = await eatLogModel.GetEatLog(req.userId, req.query.mealDate,req.query.mealTime,req.query.mealNo)
    if (!getEatLogResult.data.getEatLog) {
      return next(new BadRequestError('EatLog data does not exist'))
    }
    const eatLog = getEatLogResult.data.getEatLog
    if (eatLog.photoKey != null) {
      const s3 = new S3Strage()
      //S3の画像を削除する
      try {
        await s3.delete(eatLog.photoKey)
      } catch (e) {
        next(e)
      }
    }
    //食事摂取ログが存在する場合、削除処理を行う
    const eatLogInput = {
      userId: req.userId,
      mealDate: req.query.mealDate,
      mealTime: req.query.mealTime,
      mealNo: req.query.mealNo
    }
    await eatLogModel.DeleteEatLog(eatLogInput)
    delete eatLog.__typename
    delete eatLog.userId
    delete eatLog.createdAt
    delete eatLog.updatedAt
    return res.json(eatLog)
  })().catch(e => next(e))
})

module.exports = router