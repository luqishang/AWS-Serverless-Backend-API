/*
 * ファイル名: nurseQuestionNaire.js
 * 作成日: 2021/10/06
 * 作成者: ze.zhang
 * 作成内容: 新規作成
 * 修正日: 2021/11/11
 * 修正者: cheng.wei
 * 修正内容: API実装
 * ver:1.0.0
 */

const express = require('express')
const router = express.Router()
const { query, validationResult } = require('express-validator')
const ExtensibleCustomError = require('extensible-custom-error')
class BadRequestError extends ExtensibleCustomError {} // 400
const QuestionNaireAnswerResultModel = require(process.env.AWS_REGION ? '/opt/model/questionNaireAnswerResult' : '../../../../healthcarelayerOne/opt/model/questionNaireAnswerResult')
const QuestionNaireModel = require(process.env.AWS_REGION ? '/opt/model/questionNaire' : '../../../../healthcarelayerOne/opt/model/questionNaire')
const POSTQUESTIONNAIRETYPE = ['physicalactivitylevel', 'mealbalance', 'personalitytraits', 'coachingrecommendation', 'hobbycharm', 'gooutmotivation','lifestyle']
const validFlagInput = 1 

/**
 * @swagger
 * /nurse/questionnaire:
 *   get:
 *     tags:
 *     - 保健師_アンケート
 *     summary: アンケート結果一覧取得
 *     description: アンケート結果を取得する
 *     parameters:
 *     - name: userId
 *       in: query
 *       required: true
 *       schema:
 *         type: string
 *       description: ユーザID
 *     - name: questionNaireType
 *       in: query
 *       required: true
 *       schema:
 *         $ref: '#/components/schemas/questionNaireType'
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
 *               $ref: '#/components/schemas/questionNaireForEdit'
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
 */
router.get('/', [ 
  query('userId').not().isEmpty().withMessage('userId is required'),
  query('questionNaireType').not().isEmpty().withMessage('questionNaireType is required'),
  query('questionNaireType').isIn(POSTQUESTIONNAIRETYPE).withMessage('questionNaireType must be lifestyle or personalitytraits or mealbalance or physicalactivitylevel or coachingrecommendation or hobbycharm or gooutmotivation only'),  
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    let userId = req.query.userId
    let type = req.query.questionNaireType

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
    const questionNaireAnswerResult = await questionNaireAnswerResultModel.ListQuestionNaireAnswerResultUserId(userId)
    const answerResults = questionNaireAnswerResult.data.listQuestionNaireAnswerResultUserId.items
    answerResults.forEach(item => {
      delete item.userId
      delete item.__typename
      delete item.settingAt
      delete item.createdAt
      delete item.updatedAt
      delete item.validFlag
    })

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
    
    const response = {
      questionNaireType: type,
      questionNaires: curQuestionNaires,
      questionNaireAnswerResults: curAnswerResults
    }

    return res.json(response)
  })().catch(e => next(e))
})

module.exports = router