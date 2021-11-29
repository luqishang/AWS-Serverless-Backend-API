/*
 * ファイル名: questionNaire.js
 * 作成日: 2021/10/06
 * 作成者: xiaomei.zhou
 * 作成内容: 新規作成
 * 修正日:2021/10/15
 * 修正者:ze.zhang
 * 修正内容:swaggerの修正
 * 修正日:2021/10/20
 * 修正者:ze.zhang
 * 修正内容:get,postの修正,putの削除
 * 修正日:2021/10/28
 * 修正者:ze.zhang
 * 修正内容:事前と初回面談のアンケートのquestionNaireTypeの修正
 * ver:1.0.0
 */
const express = require('express')
const router = express.Router()
const { query, body, validationResult } = require('express-validator')
const ExtensibleCustomError = require('extensible-custom-error')
const moment = require('moment')
class BadRequestError extends ExtensibleCustomError {} // 400
const QuestionNaireAnswerResultModel = require(process.env.AWS_REGION ? '/opt/model/questionNaireAnswerResult' : '../../../../healthcarelayerOne/opt/model/questionNaireAnswerResult')
const QuestionNaireAnswerModel = require(process.env.AWS_REGION ? '/opt/model/questionNaireAnswer' : '../../../../healthcarelayerOne/opt/model/questionNaireAnswer')
const QuestionNaireModel = require(process.env.AWS_REGION ? '/opt/model/questionNaire' : '../../../../healthcarelayerOne/opt/model/questionNaire')
const UserModel = require(process.env.AWS_REGION ? '/opt/model/user' : '../../../../healthcarelayerOne/opt/model/user')
const BEFOREHANDQUESTIONNAIRETYPE = ['physicalactivitylevel', 'mealbalance', 'personalitytraits', 'coachingrecommendation', 'hobbycharm', 'gooutmotivation']
const POSTQUESTIONNAIRETYPE = ['physicalactivitylevel', 'mealbalance', 'personalitytraits', 'coachingrecommendation', 'hobbycharm', 'gooutmotivation','lifestyle']
const FIRSTINTERVIEWQUESTIONNAIRETYPE = ['lifestyle']
const validFlagInput = 1 
const INTERVIEWTYPE = ['beforehand', 'firstinterview']
/**
 * @swagger
 * /user/questionnaire:
 *   get:
 *     tags:
 *     - 保険対象者_アンケート
 *     summary: アンケート情報取得
 *     description: アンケート情報を取得する
 *     parameters:
 *     - name: interviewType
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *         enum:
 *         - beforehand
 *         - firstinterview
 *       description: |
 *         面談種類 
 *         ・beforehand: 事前
 *         ・firstinterview: 初回面談
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
 *               $ref: '#/components/schemas/questionNaireInfo'
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
 *     - 保険対象者_アンケート
 *     summary: アンケート回答結果登録
 *     description: アンケート回答結果を登録する
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
 *               $ref: '#/components/schemas/questionNaireAnswerResult'
 *     responses:
 *       200:
 *         description: 追加OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/questionNaireAnswerResult'
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
 *     questionNaireInfo:
 *       description: アンケート情報
 *       type: object
 *       properties:
 *         gender:
 *           type: string
 *           enum:
 *           - male
 *           - female
 *           description: |
 *             性別   ※食事バランス時のみ必要
 *             ・male: 男性  
 *             ・female: 女性
 *         questionNaires:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/questionNaireForEdit'
 *     questionNaireForEdit:
 *       description: アンケート取得
 *       type: object
 *       properties:
 *         questionNaireType:
 *           type: string
 *           $ref: '#/components/schemas/questionNaireType'
 *         questionNaires:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/questionNaireItem'
 *         questionNaireAnswerResults:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/questionNaireAnswerResults'
 *     questionNaireAnswerResults:
 *       description: アンケート回答結果
 *       required:
 *         - questionNaireId
 *         - questionNaireAnswerId
 *         - inputType
 *       type: object
 *       properties:
 *         questionNaireId:
 *           type: string
 *           description: アンケートID
 *         questionNaireAnswerId:
 *           type: string
 *           description: アンケート回答ID
 *         questionNaireFreeAnswer:
 *           type: string
 *           description: アンケート自由回答
 *         inputType:
 *           type: integer
 *           description: |
 *             入力パターン
 *             ・1: 単数選択
 *             ・2: 複数選択
 *             ・3: 自由記載
 *     questionNaireAnswerResult:
 *       description: アンケート回答結果
 *       required:
 *         - questionNaireId
 *         - questionNaireAnswerId
 *         - questionNaireType
 *         - inputType
 *       type: object
 *       properties:
 *         questionNaireId:
 *           type: string
 *           description: アンケートID
 *         questionNaireAnswerId:
 *           type: string
 *           description: アンケート回答ID
 *         questionNaireType:
 *           type: string
 *           $ref: '#/components/schemas/questionNaireType'
 *         questionNaireFreeAnswer:
 *           type: string
 *           description: アンケート自由回答
 *         inputType:
 *           type: integer
 *           description: |
 *             入力パターン
 *             ・1: 単数選択
 *             ・2: 複数選択
 *             ・3: 自由記載
 *     questionNaireItem:
 *       description: アンケートリスト
 *       type: object
 *       properties:
 *         questionNaireId:
 *           type: string
 *           description: アンケートID
 *         questionNaireDate:
 *           type: string
 *           description: |  
 *             アンケート日付    
 *             - ISOフォーマット(YYYY-MM-DD)とする
 *         questionNaireContents:
 *           type: string
 *           description: アンケート内容
 *         questionNaireType:
 *           type: string
 *           $ref: '#/components/schemas/questionNaireType'
 *         inputType:
 *           type: integer
 *           description: |
 *             入力パターン
 *             ・1: 単数選択
 *             ・2: 複数選択
 *             ・3: 自由記載
 *         primaryId:
 *           type: string
 *           description: 大分類ID
 *         secondaryId:
 *           type: string
 *           description: 中分類ID
 *         displayOrder:
 *           type: integer
 *           description: 表示順
 *         questionNaireAnswers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/questionNaireAnswerItem'
 *     questionNaireAnswerItem:
 *       description: アンケート回答リスト
 *       type: object
 *       properties:
 *         questionNaireAnswerId:
 *           type: string
 *           description: アンケート回答ID
 *         questionNaireAnswerContents:
 *           type: string
 *           description: アンケート回答内容
 *         questionNaireId:
 *           type: string
 *           description: アンケートID
 *     questionNaireType:
 *       type: string
 *       enum:
 *       - physicalactivitylevel
 *       - mealbalance
 *       - personalitytraits
 *       - coachingrecommendation
 *       - hobbycharm
 *       - gooutmotivation
 *       - lifestyle
 *       description: |
 *         アンケート種類 
 *         ・physicalactivitylevel: 身体活動レベル（１）
 *         ・mealbalance: 食事バランス（２）
 *         ・personalitytraits: 性格特性（３）
 *         ・coachingrecommendation: コーチングレコメンド（４）
 *         ・hobbycharm: 趣味魅力（５）
 *         ・gooutmotivation: 外出動機（６）
 *         ・lifestyle: 生活習慣（７）
 */
router.get('/', [ 
  query('interviewType').not().isEmpty().withMessage('interviewType is required'),
  query('interviewType').isIn(INTERVIEWTYPE).withMessage('interviewType must be beforehand or firstinterview only')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    var typeArray = []
    if (req.query.interviewType == 'beforehand'){
      typeArray = BEFOREHANDQUESTIONNAIRETYPE
    } else if (req.query.interviewType == 'firstinterview'){
      typeArray = FIRSTINTERVIEWQUESTIONNAIRETYPE
    }
    const questionNaireModel = new QuestionNaireModel()    
    const questionNaireAnswerResultModel = new QuestionNaireAnswerResultModel()
    // 現在有効なアンケート情報を取得する
    const questionNaireResult = await questionNaireModel.ListQuestionNaireValidFlg(validFlagInput)
    const questionNaires = questionNaireResult.data.listQuestionNaireValidFlg.items
    //不要な項目を削除する
    questionNaires.forEach(item =>  {
      delete item.__typename
      delete item.createdAt
      delete item.updatedAt
      delete item.validFlag
      //アンケート情報の子供テーブルアンケート回答情報を取得し、正しいJson形へ変換する
      const questionNaireAnswersResult = item.questionNaireAnswers.items
      const questionNaireAnswers = []
      questionNaireAnswersResult.forEach(detail => {
        const questionNaireAnswerItem = {
          questionNaireAnswerId: detail.questionNaireAnswerId,
          questionNaireAnswerContents: detail.questionNaireAnswerContents,
          questionNaireId: detail.questionNaireId
        }
        questionNaireAnswers.push(questionNaireAnswerItem)
      })
      delete item.questionNaireAnswers
      //アンケート回答IDでソートする
      questionNaireAnswers.sort((a,b) =>{
        return a.questionNaireAnswerId > b.questionNaireAnswerId ? 1 : -1
      })
      item.questionNaireAnswers = questionNaireAnswers
    })
    const questionNaireAnswerResult = await questionNaireAnswerResultModel.ListQuestionNaireAnswerResultUserId(req.userId)
    const answerResults = questionNaireAnswerResult.data.listQuestionNaireAnswerResultUserId.items
    answerResults.forEach(item => {
      delete item.userId
      delete item.__typename
      delete item.settingAt
      delete item.createdAt
      delete item.updatedAt
      delete item.validFlag
    })

    const questionNaireItems = []
    for(var type of typeArray) {
      //typeごとにアンケートデータを作成
      const curQuestionNaires = questionNaires.filter(item => item.questionNaireType == type)
      if (curQuestionNaires.length == 0) {
        //データを取得できない場合
        return next(new BadRequestError('QuestionNaire data(questionNaireType: ' + type + ') does not exist'))
      }
      //表示順でソートする
      curQuestionNaires.sort((a,b) =>{
        return a.displayOrder > b.displayOrder ? 1 : -1
      })

      //該当アンケートに所属するアンケート回答結果を取得する
      const curAnswerResults = []
      curQuestionNaires.forEach(item => {
        const results = answerResults.filter(ag => item.questionNaireId == ag.questionNaireId)
        if (results.length > 0) {
          curAnswerResults.push(results[0])
        }
      })
      
      const questionNaireItem = {
        questionNaireType: type,
        questionNaires: curQuestionNaires,
        questionNaireAnswerResults: curAnswerResults
      }
      questionNaireItems.push(questionNaireItem)
    }

    const userModel = new UserModel()
    const getUserResult = await userModel.GetUser(req.userId)
    const getUser = getUserResult.data.getUser
    var response = {
      gender: getUser.gender,
      questionNaires: questionNaireItems,
    }
    return res.json(response)
  })().catch(e => next(e))
})

router.post('/', [
  body().isArray(),
  body('*.questionNaireId').not().isEmpty().withMessage('questionNaireId is required'),
  body('*.questionNaireAnswerId').not().isEmpty().withMessage('questionNaireAnswerId is required'),
  body('*.questionNaireType').not().isEmpty().withMessage('questionNaireType is required'),
  body('*.questionNaireType').isIn(POSTQUESTIONNAIRETYPE).withMessage('questionNaireType must be lifestyle or personalitytraits or mealbalance or physicalactivitylevel or coachingrecommendation or hobbycharm or gooutmotivation only'),
  body('*.inputType').not().isEmpty().withMessage('inputType is required'),
  body('*.inputType').isInt({min:1, max:3}).withMessage('inputType must be integer type in range(1-3)'),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    const answerResults = req.body
    const userId = req.userId
    //アンケートID、アンケート回答IDでソートする
    answerResults.sort((a,b) =>{
      if (a.questionNaireId == b.questionNaireId) {
        return a.questionNaireAnswerId > b.questionNaireAnswerId ? 1 : -1
      }
      return a.questionNaireId > b.questionNaireId ? 1 : -1
    })

    //postされたデータをチェックする
    const checkResult = await checkRequestData(answerResults)
    if (checkResult != '') {
      return next(new BadRequestError(checkResult))
    }
    
    const questionNaireAnswerResultModel = new QuestionNaireAnswerResultModel()
    // アンケート回答結果登録
    const response = []
    for (var answerResult of answerResults) {
      const currentAnswerResult = 
        await questionNaireAnswerResultModel.GetQuestionNaireAnswerResult(userId, answerResult.questionNaireId, answerResult.questionNaireAnswerId)
      const curAnswerResultItem = currentAnswerResult.data.getQuestionNaireAnswerResult

      const data = {
        userId: userId,
        ...answerResult
      }

      if (curAnswerResultItem) {
        data.updatedAt = moment().unix()
        await questionNaireAnswerResultModel.UpdateQuestionNaireAnswerResult(data)
      } else {
        data.createdAt = moment().unix()
        await questionNaireAnswerResultModel.CreateQuestionNaireAnswerResult(data)
      }

      delete data.userId
      delete data.createdAt
      delete data.updatedAt
      response.push(data)
    }
    return res.json(response)
  })().catch(e => next(e))
})

/**
 * アンケート回答結果をチェック
 * @param {object}} answerResults アンケート回答結果
 * @returns エラーメッセージ
 */
async function checkRequestData(answerResults) {

  const questionNaireModel = new QuestionNaireModel()
  const questionNaireAnswerModel = new QuestionNaireAnswerModel()
  //有効なアンケートID
  const questionNaireResult = await questionNaireModel.ListQuestionNaireValidFlg(validFlagInput)
  const questionNaires = questionNaireResult.data.listQuestionNaireValidFlg.items
  //有効なアンケート回答情報
  //limit=1000を指定しないと、最大100件しか取れない。
  const questionNaireAnswerResult = await questionNaireAnswerModel.ListQuestionNaireAnswerFlg(validFlagInput, 1000)
  const questionNaireAnswers = questionNaireAnswerResult.data.listQuestionNaireAnswerFlg.items
  console.log('data len: ' + questionNaireAnswers.length)
  
  let tmpQuestionNaireId = ''
  let tmpQuestionNaireAnswerId = ''
  for (var answerResult of answerResults) {
    const curQuestionNaires = questionNaires.filter(ag => ag.questionNaireId== answerResult.questionNaireId)
    if (curQuestionNaires.length == 0) {
      //データを取得できない場合
      return 'Valid questionNaire data does not exist for questionNaireId: ' + answerResult.questionNaireId
    }
    //アンケート回答ID存在チェック
    const curQuestionNaireAnswers = questionNaireAnswers.filter(ag => ag.questionNaireAnswerId == answerResult.questionNaireAnswerId && ag.questionNaireId == answerResult.questionNaireId)
    if (curQuestionNaireAnswers.length == 0) {
      //データを取得できない場合
      return 'QuestionNaireAnswer data does not exist for questionNaireId: ' + answerResult.questionNaireId + ' and questionNaireAnswerId: ' + answerResult.questionNaireAnswerId
    }

    if (answerResult.questionNaireId == tmpQuestionNaireId && answerResult.questionNaireAnswerId == tmpQuestionNaireAnswerId) {
      //重複データ存在の場合
      return 'Duplicate questionNaireAnswerResult data exist for questionNaireId: ' + answerResult.questionNaireId + ', questionNaireAnswerId: ' + answerResult.questionNaireAnswerId
    } 
    tmpQuestionNaireId = answerResult.questionNaireId
    tmpQuestionNaireAnswerId = answerResult.questionNaireAnswerId
  }

  return ''
}

module.exports = router