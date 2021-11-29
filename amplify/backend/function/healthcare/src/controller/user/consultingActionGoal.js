/*
 * ファイル名: consultingActionGoal.js
 * 作成日: 2021/10/01
 * 作成者: xiaomei.zhou
 * 作成内容: 新規作成
 * 修正日: 2021/10/04
 * 修正者: xiaomei.zhou
 * 修正内容:
 * ver:1.0.0
 */
const express = require('express')
const router = express.Router()
const { query, body, validationResult } = require('express-validator')
const ExtensibleCustomError = require('extensible-custom-error')
const moment = require('moment')
class BadRequestError extends ExtensibleCustomError {} // 400
const ActionGoalModel = require(process.env.AWS_REGION ? '/opt/model/actionGoal' : '../../../../healthcarelayerOne/opt/model/actionGoal')
const ActionGoalLogModel = require(process.env.AWS_REGION ? '/opt/model/actionGoalLog' : '../../../../healthcarelayerOne/opt/model/actionGoalLog')
const ActionGoalMasterModel = require(process.env.AWS_REGION ? '/opt/model/actionGoalMaster' : '../../../../healthcarelayerOne/opt/model/actionGoalMaster')
const PRIMARYID = ['1', '2', '3']
const SECONDARYID = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
const DAYOFWEEK = ['月', '火', '水', '木', '金', '土', '日']
const ACTION = ['reduce','change']
const GOALTYPE = ['foodtemplate', 'foodfree', 'exercisetemplate', 'exercisefree', 'otherstemplate', 'othersfree']
const today = moment().format('YYYY-MM-DD')
/**
 * @swagger
 * /user/consulting-actiongoal:
 *   get:
 *     tags:
 *     - 保険対象者_行動目標
 *     summary: 行動目標取得
 *     description: ログインユーザーの行動目標を取得する
 *     parameters:
 *     - name: primaryId
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *       description: 大分類ID
 *     - name: secondaryId
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *       description: 中分類ID
 *     - name: goalSettingNo
 *       in: query
 *       schema:
 *         type: integer
 *       description: 行動目標設定枝番
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
 *               $ref: '#/components/schemas/actionGoalForEdit'
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
 *     - 保険対象者_行動目標
 *     summary: 行動目標の作成
 *     description: 行動目標を新たに作成する
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
 *             $ref: '#/components/schemas/actionGoalForPost'
 *     responses:
 *       200:
 *         description: 追加OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/actionGoal'
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
 *     - 保険対象者_行動目標
 *     summary: 行動目標の更新
 *     description: ログインしたユーザーの行動目標を更新する
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
 *             $ref: '#/components/schemas/actionGoal'
 *     responses:
 *       200:
 *         description: 更新OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/actionGoal'
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
 *     - 保険対象者_行動目標
 *     summary: 行動目標の削除
 *     description: 行動目標を削除する
 *     parameters:
 *     - name: goalSettingNo
 *       in: query
 *       required: true
 *       schema:
 *         type: integer
 *         format: int32
 *       description: 行動目標設定枝番
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
 *               $ref: '#/components/schemas/actionGoal'
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
 *     actionGoalForPost:
 *       description: 行動目標
 *       type: object
 *       required:
 *         - goalType
 *         - primaryId
 *         - secondaryId
 *       properties:
 *         goalType:
 *           type: string
 *           enum:
 *           - foodtemplate
 *           - foodfree
 *           - exercisetemplate
 *           - exercisefree
 *           - otherstemplate
 *           - othersfree
 *           description: |
 *             行動目標種類  
 *             ・foodtemplate: 食事template 
 *             ・foodfree: 食事自由入力
 *             ・exercisetemplate: 運動template
 *             ・exercisefree: 運動自由入力
 *             ・otherstemplate: その他template
 *             ・othersfree: その他自由入力
 *         goalId:
 *           type: integer
 *           description: 行動目標ID
 *         primaryId:
 *           type: string
 *           description: 大分類ID
 *         secondaryId:
 *           type: string
 *           description: 中分類ID
 *         goalContent:
 *           type: string
 *           description: 行動目標内容
 *         calorie:
 *           type: integer
 *           minimum: 0
 *           maximum: 999
 *           description: カロリー消費
 *         goalTime:
 *           type: integer
 *           minimum: 0
 *           maximum: 1440
 *           description: 目標時間
 *         goalQuantity:
 *           type: integer
 *           minimum: 0
 *           maximum: 99999
 *           description: 目標量
 *         exerciseUnit:
 *           type: string
 *           description: 運動単位
 *         frequencyCount:
 *           type: integer
 *           minimum: 1
 *           maximum: 7
 *           description: 目標頻度（日数）「週 △ 日」
 *         frequencyDayOfWeek:
 *           type: string
 *           description: 目標頻度（曜日指定） '|'で区切り 月|火|水|木
 *         action:
 *           type: string
 *           enum:
 *           - reduce
 *           - change
 *           description: |
 *             行為  
 *             ・reduce: 減らす  
 *             ・change: 変える
 *         foodOne:
 *           type: string
 *           description: 食品1
 *         foodQuantityOne:
 *           type: string
 *           description: 食量1
 *         foodUnitOne:
 *           type: string
 *           description: 食品单位1
 *         foodTwo:
 *           type: string
 *           description: 食品2
 *         foodQuantityTwo:
 *           type: string
 *           description: 食量2
 *         foodUnitTwo:
 *           type: string
 *           description: 食品单位2
 *     actionGoal:
 *       allOf:
 *       - type: object
 *         properties:
 *           goalSettingNo:
 *             type: integer
 *             description: 行動目標枝番
 *       - $ref: '#/components/schemas/actionGoalForPost'
 *     tertiaryItem:
 *       description: 小分類項目
 *       type: object
 *       properties:
 *         tertiaryId:
 *           type: string
 *           description: 小分類ID
 *         tertiaryContent:
 *           type: string
 *           description: 小分類内容
 *     actionGoalMaster:
 *       description: 行動目標マスタ
 *       type: object
 *       properties:
 *         goalId:
 *           type: integer
 *           description: 行動目標ID
 *         primaryId:
 *           type: string
 *           description: 大分類ID
 *         secondaryId:
 *           type: string
 *           description: 中分類ID
 *         secondaryContent:
 *           type: string
 *           description: 中分類内容
 *         tertiaryId:
 *           type: string
 *           description: 小分類ID
 *         tertiaryContent:
 *           type: string
 *           description: 小分類内容
 *         goalContent:
 *           type: string
 *           description: 行動目標内容
 *         exerciseUnit:
 *           type: string
 *           description: 運動単位
 *         foodUnit:
 *           type: string
 *           description: 食事単位
 *         defaultTime:
 *           type: integer
 *           description: デフォルトの目標時間(分)
 *         defaultQuantity:
 *           type: integer
 *           description: デフォルトの目標量
 *         defaultFrequency:
 *           type: integer
 *           description: デフォルトの頻度
 *         calorie:
 *           type: integer
 *           description: カロリー消費
 *     actionGoalForEdit:
 *       description: 行動目標編集
 *       type: object
 *       properties:
 *         primaryId:
 *           type: string
 *           description: 大分類ID
 *         secondaryId:
 *           type: string
 *           description: 中分類ID
 *         foodTypeOne:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/tertiaryItem'
 *         foodGoalMasterOne:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/actionGoalMaster'
 *         foodTypeTwo:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/tertiaryItem'
 *         foodGoalMasterTwo:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/actionGoalMaster'
 *         exerciseType:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/tertiaryItem'
 *         exerciseGoalMaster:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/actionGoalMaster'
 *         othersGoalMaster:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/actionGoalMaster'
 *         actionGoal:
 *           type: object
 *           description: 行動目標設定
 *           $ref: '#/components/schemas/actionGoal'
 */
router.get('/', [ 
  query('primaryId').not().isEmpty().withMessage('primaryId is required'),
  query('primaryId').isIn(PRIMARYID).withMessage('primaryId must be 1 or 2 or 3 only'),
  query('secondaryId').not().isEmpty().withMessage('secondaryId is required'),
  query('secondaryId').isIn(SECONDARYID).withMessage('secondaryId must be A or B or C or D or E or F or G or H or I or J or K only')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    const actionGoalModel = new ActionGoalModel()
    const actionGoalMasterModel = new ActionGoalMasterModel()
    const primaryId =  req.query.primaryId
    const secondaryId = req.query.secondaryId
    const goalSettingNo = req.query.goalSettingNo
    
    const secondaryIdInput = { eq: secondaryId } 
    const actionGoalMasterResult = await actionGoalMasterModel.listActionGoalMasterPrimaryIdSecondaryId(primaryId, secondaryIdInput)
    const actionGoalMasters = actionGoalMasterResult.data.listActionGoalMasterPrimaryIdSecondaryId.items
    if(actionGoalMasters.length == 0) {
      //データを取得できない場合
      return next(new BadRequestError('ActionGoalMaster data does not exist'))
    }
    for(var master of actionGoalMasters) {
      delete master.__typename
      delete master.createdAt
      delete master.updatedAt
    }

    const response = {
      primaryId: primaryId,
      secondaryId: secondaryId,
      foodTypeOne: null,
      foodGoalMasterOne: null,
      foodTypeTwo: null,
      foodGoalMasterTwo: null,
      exerciseType: null,
      exerciseGoalMaster: null,
      othersGoalMaster: null,
      actionGoal : null
    }

    if (primaryId == '2') {              // 大分類：食事目標
      // foodGoalMasterOne
      const foodGoalMasterOne = actionGoalMasters.filter(hc => hc.foodOneFlg == true)
      //行動目標IDでソートする
      foodGoalMasterOne.sort((a,b) =>{
        return a.goalId > b.goalId ? 1 : -1
      })
      // foodGoalMasterOneからfoodTypeOneを取得する
      let tertiaryId = null
      const foodTypeOne = []
      for(master of foodGoalMasterOne) {
        if (master.tertiaryId != tertiaryId) {
          tertiaryId = master.tertiaryId
          const tertiaryItem = {
            tertiaryId: master.tertiaryId,
            tertiaryContent: master.tertiaryContent
          }
          foodTypeOne.push(tertiaryItem)
        }
      }
      // foodGoalMasterTwo
      const foodGoalMasterTwo = actionGoalMasters.filter(hc => hc.foodTwoFlg == true)
      //行動目標IDでソートする
      foodGoalMasterTwo.sort((a,b) =>{
        return a.goalId > b.goalId ? 1 : -1
      })
      // foodGoalMasterTwoからfoodTypeTwoを取得する
      tertiaryId = null
      const foodTypeTwo = []
      for(master of foodGoalMasterTwo) {
        if (master.tertiaryId != tertiaryId) {
          tertiaryId = master.tertiaryId
          const tertiaryItem = {
            tertiaryId: master.tertiaryId,
            tertiaryContent: master.tertiaryContent
          }
          foodTypeTwo.push(tertiaryItem)
        }
      }
      response.foodTypeOne = foodTypeOne
      response.foodGoalMasterOne = foodGoalMasterOne
      response.foodTypeTwo = foodTypeTwo
      response.foodGoalMasterTwo = foodGoalMasterTwo     
    } else if (primaryId == '1') {       // 大分類：運動目標
      //行動目標IDでソートする
      actionGoalMasters.sort((a,b) =>{
        return a.goalId > b.goalId ? 1 : -1
      })
      let tertiaryId = null
      const exerciseType = []
      for(master of actionGoalMasters) {
        if (master.tertiaryId != tertiaryId) {
          tertiaryId = master.tertiaryId
          const tertiaryItem = {
            tertiaryId: master.tertiaryId,
            tertiaryContent: master.tertiaryContent
          }
          exerciseType.push(tertiaryItem)
        }
      }
      response.exerciseType = exerciseType
      response.exerciseGoalMaster = actionGoalMasters   
    } else {                                          // 大分類：その他
      //行動目標IDでソートする
      actionGoalMasters.sort((a,b) =>{
        return a.goalId > b.goalId ? 1 : -1
      })
      response.othersGoalMaster = actionGoalMasters
    }
    let actionGoal = null
    if (goalSettingNo != null && goalSettingNo.trim() != '') {
      const actionGoalResult = await actionGoalModel.getActionGoal(req.userId, goalSettingNo)
      actionGoal = actionGoalResult.data.getActionGoal
      if (!actionGoal) {
        return next(new BadRequestError('ActionGoal data does not exist'))
      }
      delete actionGoal.userId
      delete actionGoal.__typename 
      delete actionGoal.createdAt 
      delete actionGoal.updatedAt
    }

    response.actionGoal = actionGoal
    return res.json(response)
  })().catch(e => next(e))
})

router.post('/', [
  body('goalType').not().isEmpty().withMessage('goalType is required'),
  body('goalType').isIn(GOALTYPE).withMessage('goalType must be foodtemplate or foodfree or exercisetemplate or exercisefree or otherstemplate or othersfree only'),
  body('goalId').optional({nullable:true}).isInt().withMessage('goalId must be integer type'),
  body('primaryId').not().isEmpty().withMessage('primaryId is required'),
  body('primaryId').isIn(PRIMARYID).withMessage('primaryId must be 1 or 2 or 3 only'),
  body('secondaryId').not().isEmpty().withMessage('secondaryId is required'),
  body('secondaryId').isIn(SECONDARYID).withMessage('secondaryId must be A or B or C or D or E or F or G or H or I or J or K only'),  body('calorie').optional({nullable:true}).isInt({min:0, max:999}).withMessage('calorie must be integer type in range(0-999)'),
  body('goalTime').optional({nullable:true}).isInt({min:0, max:1440}).withMessage('goalTime must be integer type in range(0-1440)'),
  body('goalQuantity').optional({nullable:true}).isInt({min:0, max:99999}).withMessage('goalQuantity must be integer type in range(0-99999)'),
  body('frequencyCount').optional({nullable:true}).isInt({min:1, max:7}).withMessage('frequencyCount must be integer type in range(1-7)'),
  body('action').optional({nullable:true}).isIn(ACTION).withMessage('action must be reduce or change only')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    const actionGoalMasterModel = new ActionGoalMasterModel()
    const actionGoalModel = new ActionGoalModel()
    const actionGoalLogModel = new ActionGoalLogModel()

    // 行動目標設定枝番採番
    const actionGoalResult = await actionGoalModel.listActionGoals(req.userId)
    const actionGoals = actionGoalResult.data.listActionGoals.items
    if (actionGoals.length >= 3) {
      return next(new BadRequestError('More than three records have been registered'))
    }

    let goalSettingNoNew = null
    // 行動目標設定履歴から枝番採番
    const actionGoalLogResult = await actionGoalLogModel.listActionGoalLogs(req.userId)
    const actionGoalLogs = actionGoalLogResult.data.listActionGoalLogs.items
    if (actionGoalLogs.length == 0) {
      goalSettingNoNew = 1
    } else {
      actionGoalLogs.sort((a,b) =>{
        return a.goalSettingNo > b.goalSettingNo ? -1 : 1
      })
      goalSettingNoNew = actionGoalLogs[0].goalSettingNo + 1
    }

    if (req.body.goalId != null) {
      // 行動目標ID存在チェック
      const actionGoalMasterResult = await actionGoalMasterModel.getActionGoalMaster(req.body.goalId)
      const actionGoalMaster = actionGoalMasterResult.data.getActionGoalMaster
      if (!actionGoalMaster) {
        //データを取得できない場合
        return next(new BadRequestError('ActionGoalMaster data does not exist for goalId: ' + req.body.goalId))
      }
    }

    if (req.body.primaryId == '2') {           // 食事目標の場合
      // 目標時間，目標量チェック
      if (req.body.goalTime != null || req.body.goalQuantity != null) {
        //空でない場合
        return next(new BadRequestError('GoalTime or goalQuantity is not null when primary goal is food'))
      }
    } 

    // 目標頻度（日数）、目標頻度（曜日指定）チェック
    if (req.body.frequencyCount == null && req.body.frequencyDayOfWeek == null) {
      // 両方Nullの場合
      return next(new BadRequestError('FrequencyCount and frequencyDayOfWeek are null'))
    } else if (req.body.frequencyCount != null && req.body.frequencyDayOfWeek != null) {
      // 両方Nullでない場合
      return next(new BadRequestError('FrequencyCount and frequencyDayOfWeek are both not null'))
    } else {
      if (req.body.frequencyDayOfWeek != null) {
        // 目標頻度（曜日指定）「月 火 水 木 金 土 日」範囲チェック
        const frequencyDayOfWeek = req.body.frequencyDayOfWeek
        let frequencyDayOfWeekItems = frequencyDayOfWeek.split('|')
        frequencyDayOfWeekItems = frequencyDayOfWeekItems.filter((x, i, self) => self.indexOf(x) === i && i !== self.lastIndexOf(x))
        if (frequencyDayOfWeekItems.length > 0) {
          return next(new BadRequestError('FrequencyDayOfWeek has duplicate data: [' + frequencyDayOfWeekItems + ']'))
        }
        //frequencyDayOfWeekItems = frequencyDayOfWeekItems.filter((x, i, self) => self.indexOf(x) === i)
        for(var item of frequencyDayOfWeekItems) {
          if (DAYOFWEEK.indexOf(item) == -1) {
            return next(new BadRequestError('FrequencyDayOfWeek must be in (月, 火, 水, 木, 金, 土, 日)'))
          } 
        }
      }
    }

    const actionGoal = {
      userId: req.userId,
      goalSettingNo: goalSettingNoNew,
      updatedAt: moment().unix(),
      createdAt: moment().unix(),
      ...req.body      
    }
    const actionGoalLog = {
      settingAt: moment().unix(),
      startDate: today,
      endDate: moment('9999-12-31').format('YYYY-MM-DD'),
      historyContent: 'create',
      ...actionGoal
    }

    // TODO整合性のためTransactionが必要
    await actionGoalModel.createActionGoal(actionGoal)
    await actionGoalLogModel.createActionGoalLog(actionGoalLog)

    delete actionGoal.userId
    delete actionGoal.updatedAt
    delete actionGoal.createdAt
    return res.json(actionGoal)
  })().catch(e => next(e))
})

router.put('/', [
  body('goalSettingNo').not().isEmpty().withMessage('goalSettingNo is required'),
  body('goalSettingNo').isInt().withMessage('goalSettingNo must be integer type'),
  body('goalType').not().isEmpty().withMessage('goalType is required'),
  body('goalType').isIn(GOALTYPE).withMessage('goalType must be foodtemplate or foodfree or exercisetemplate or exercisefree or otherstemplate or othersfree only'),
  body('goalId').optional({nullable:true}).isInt().withMessage('goalId must be integer type'),
  body('primaryId').not().isEmpty().withMessage('primaryId is required'),
  body('primaryId').isIn(PRIMARYID).withMessage('primaryId must be 1 or 2 or 3 only'),
  body('secondaryId').not().isEmpty().withMessage('secondaryId is required'),
  body('secondaryId').isIn(SECONDARYID).withMessage('secondaryId must be A or B or C or D or E or F or G or H or I or J or K only'),  body('calorie').optional({nullable:true}).isInt({min:0, max:999}).withMessage('calorie must be integer type in range(0-999)'),
  body('goalTime').optional({nullable:true}).isInt({min:0, max:1440}).withMessage('goalTime must be integer type in range(0-1440)'),
  body('goalQuantity').optional({nullable:true}).isInt({min:0, max:99999}).withMessage('goalQuantity must be integer type in range(0-99999)'),
  body('frequencyCount').optional({nullable:true}).isInt({min:1, max:7}).withMessage('frequencyCount must be integer type in range(1-7)'),
  body('action').optional({nullable:true}).isIn(ACTION).withMessage('action must be reduce or change only')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }

    // 月曜日のみ更新可能チェック
    if (moment().format('d') != 1) {
      return next(new BadRequestError('ActionGoal data can only be updated on Monday'))
    }

    const actionGoalMasterModel = new ActionGoalMasterModel()
    const actionGoalModel = new ActionGoalModel()
    const actionGoalLogModel = new ActionGoalLogModel()
    
    // 行動目標設定が存在するかどうかチェックする
    const actionGoalResult = await actionGoalModel.getActionGoal(req.userId, req.body.goalSettingNo)
    const actionGoalItem = actionGoalResult.data.getActionGoal
    if (!actionGoalItem) {
      return next(new BadRequestError('ActionGoal data does not exist'))
    }

    if (req.body.goalId != null) {
      // 行動目標ID存在チェック
      const actionGoalMasterResult = await actionGoalMasterModel.getActionGoalMaster(req.body.goalId)
      const actionGoalMaster = actionGoalMasterResult.data.getActionGoalMaster
      if (!actionGoalMaster) {
        //データを取得できない場合
        return next(new BadRequestError('ActionGoalMaster data does not exist for goalId: ' + req.body.goalId))
      }
    }

    if (req.body.primaryId == '2') {           // 食事目標の場合
      // 目標時間，目標量チェック
      if (req.body.goalTime != null || req.body.goalQuantity != null) {
        //空でない場合
        return next(new BadRequestError('GoalTime or goalQuantity is not null when primary goal is food'))
      }
    }

    // 目標頻度（日数）、目標頻度（曜日指定）チェック
    if (req.body.frequencyCount == null && req.body.frequencyDayOfWeek == null) {
      // 両方Nullの場合
      return next(new BadRequestError('FrequencyCount and frequencyDayOfWeek are null'))
    } else if (req.body.frequencyCount != null && req.body.frequencyDayOfWeek != null) {
      // 両方Nullでない場合
      return next(new BadRequestError('FrequencyCount and frequencyDayOfWeek are both not null'))
    } else {
      if (req.body.frequencyDayOfWeek != null) {
        // 目標頻度（曜日指定）「月 火 水 木 金 土 日」範囲チェック
        const frequencyDayOfWeek = req.body.frequencyDayOfWeek
        let frequencyDayOfWeekItems = frequencyDayOfWeek.split('|')
        frequencyDayOfWeekItems = frequencyDayOfWeekItems.filter((x, i, self) => self.indexOf(x) === i && i !== self.lastIndexOf(x))
        if (frequencyDayOfWeekItems.length > 0) {
          return next(new BadRequestError('FrequencyDayOfWeek has duplicate data: [' + frequencyDayOfWeekItems + ']'))
        }
        //frequencyDayOfWeekItems = frequencyDayOfWeekItems.filter((x, i, self) => self.indexOf(x) === i)
        for(var item of frequencyDayOfWeekItems) {
          if (DAYOFWEEK.indexOf(item) == -1) {
            return next(new BadRequestError('FrequencyDayOfWeek must be in (月, 火, 水, 木, 金, 土, 日)'))
          } 
        }
      }
    }

    // 行動目標設定履歴最後のデータを取得する
    const actionGoalLogResult = await actionGoalLogModel.listActionGoalLogUserIdGoalSettingNo(req.userId, {eq: req.body.goalSettingNo})
    const actionGoalLogs = actionGoalLogResult.data.listActionGoalLogUserIdGoalSettingNo.items
    if (actionGoalLogs.length == 0) {
      //データを取得できない場合
      return next(new BadRequestError('ActionGoalLog data does not exist for goalSettingNo: ' + req.body.goalSettingNo))
    } 
    actionGoalLogs.sort((a,b) =>{
      return a.settingAt > b.settingAt ? -1 : 1
    })
    const latestActionGoalLog = actionGoalLogs[0]

    const actionGoal = {
      userId: req.userId,
      goalSettingNo: req.goalSettingNo,
      updatedAt: moment().unix(),
      createdAt: actionGoalItem.createdAt,
      ...req.body
    }

    const actionGoalLogLatest = {
      ...latestActionGoalLog,
      endDate: moment().subtract(1, 'days').format('YYYY-MM-DD')
    }
    delete actionGoalLogLatest.__typename

    const actionGoalLog = {
      settingAt: moment().unix(),
      startDate: today,
      endDate: moment('9999-12-31').format('YYYY-MM-DD'),
      historyContent: 'update',
      ...actionGoal
    }

    //当日2回目処理の場合、1回目ログデータを削除
    if (moment.unix(actionGoalLogLatest.settingAt).format('YYYY-MM-DD') == today) {
      if (actionGoalLogLatest.historyContent == 'create') {
        actionGoal.createdAt = actionGoal.updatedAt
        actionGoalLog.createdAt = actionGoal.updatedAt
        actionGoalLog.historyContent = 'create'
      }
      const deleteActionGoalLogInput = {
        userId: req.userId,
        goalSettingNo: req.body.goalSettingNo,
        settingAt: actionGoalLogLatest.settingAt
      }
      await actionGoalModel.updateActionGoal(actionGoal)
      await actionGoalLogModel.deleteActionGoalLog(deleteActionGoalLogInput)
      await actionGoalLogModel.createActionGoalLog(actionGoalLog)
    } else {
      await actionGoalModel.updateActionGoal(actionGoal)
      await actionGoalLogModel.updateActionGoalLog(actionGoalLogLatest)
      await actionGoalLogModel.createActionGoalLog(actionGoalLog)
    }

    delete actionGoal.userId
    delete actionGoal.updatedAt
    delete actionGoal.createdAt
    return res.json(actionGoal)
  })().catch(e => next(e))
})

router.delete('/', [
  query('goalSettingNo').not().isEmpty().withMessage('goalSettingNo is required'),
  query('goalSettingNo').isInt().withMessage('goalSettingNo must be integer type')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    const actionGoalModel = new ActionGoalModel()
    const actionGoalLogModel = new ActionGoalLogModel()
    const userId = req.userId
    const goalSettingNo = req.query.goalSettingNo
    
    // 行動目標設定が存在するかどうかチェックする
    const actionGoalResult = await actionGoalModel.getActionGoal(userId, goalSettingNo)
    const actionGoal = actionGoalResult.data.getActionGoal
    if (!actionGoal) {
      return next(new BadRequestError('ActionGoal data does not exist'))
    }

    // 行動目標設定履歴最後のデータを取得する
    const actionGoalLogResult = await actionGoalLogModel.listActionGoalLogUserIdGoalSettingNo(userId, {eq: goalSettingNo})
    const actionGoalLogs = actionGoalLogResult.data.listActionGoalLogUserIdGoalSettingNo.items
    if (actionGoalLogs.length == 0) {
      //データを取得できない場合
      return next(new BadRequestError('ActionGoalLog data does not exist for goalSettingNo: ' + goalSettingNo))
    } 
    actionGoalLogs.sort((a,b) =>{
      return a.settingAt > b.settingAt ? -1 : 1
    })
    const latestActionGoalLog = actionGoalLogs[0]

    const actionGoalInput = {
      userId: userId,
      goalSettingNo: goalSettingNo
    }
    delete actionGoal.__typename

    const actionGoalLogLatest = {
      ...latestActionGoalLog,
      endDate: moment().subtract(1, 'days').format('YYYY-MM-DD')
    }
    delete actionGoalLogLatest.__typename

    const actionGoalLog = {
      settingAt: moment().unix(),
      startDate: today,
      endDate: today,
      historyContent: 'delete',
      ...actionGoal
    }

    //当日2回目処理の場合、1回目ログデータを削除
    if (moment.unix(actionGoalLogLatest.settingAt).format('YYYY-MM-DD') == today) {
      const deleteActionGoalLogInput = {
        userId: userId,
        goalSettingNo: goalSettingNo,
        settingAt: actionGoalLogLatest.settingAt
      }
      await actionGoalLogModel.deleteActionGoalLog(deleteActionGoalLogInput)
    } else {
      await actionGoalLogModel.updateActionGoalLog(actionGoalLogLatest)
    }
    await actionGoalLogModel.createActionGoalLog(actionGoalLog)
    // 行動目標設定を削除する
    await actionGoalModel.deleteActionGoal(actionGoalInput)

    delete actionGoal.userId
    delete actionGoal.goalSettingNo
    delete actionGoal.createdAt
    delete actionGoal.updatedAt
    return res.json(actionGoal)
  })().catch(e => next(e))
})

module.exports = router