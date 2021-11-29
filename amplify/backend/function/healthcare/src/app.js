/* Amplify Params - DO NOT EDIT
	API_HEALTHCAREGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
	API_HEALTHCAREGRAPHQL_GRAPHQLAPIIDOUTPUT
	AUTH_HEALTHCARE_USERPOOLID
	ENV
	REGION
	STORAGE_S35F4002E8_BUCKETNAME
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	API_HEALTHCAREGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
	API_HEALTHCAREGRAPHQL_GRAPHQLAPIIDOUTPUT
	AUTH_HEALTHCARE_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
const fs = require('fs')
const html = require('html')
const markdown = require('markdown')
var express = require('express')
var cors = require('cors')
// var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// const config = require('config')
global.fetch = require('node-fetch')
const ExtensibleCustomError = require('extensible-custom-error')
class BadRequestError extends ExtensibleCustomError {} // 400
class UnauthorizedError extends ExtensibleCustomError {} // 401
class ForbiddenError extends ExtensibleCustomError {} // 403
// const { Router } = require('express')

const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const yaml = require('js-yaml')
const CognitoService = require(process.env.AWS_REGION ? '/opt/service/cognito' : '../../healthcarelayerOne/opt/service/cognito')

//const { SERVFAIL } = require('dns')
//const S3Strage = require('./service/s3')

// 認証関連
const AuthController = require('./controller/auth')

//保険対象者用のController
// チャット関連
const ChatMessageController = require('./controller/user/chat/message')
const ChatGroupController = require('./controller/user/chat/group')
// ダッシュボード関連
const DashboardAbdominalController  = require('./controller/user/dashboard/abdominal')
const DashboardBloodPressureController  = require('./controller/user/dashboard/bloodPressure')
const DashboardCalorieController  = require('./controller/user/dashboard/calorie')
const DashboardDisplayController = require('./controller/user/dashboard/userDisplay')
const DashboardSleeptimeController  = require('./controller/user/dashboard/sleepTime')
const DashboardStepController  = require('./controller/user/dashboard/step')
const DashboardWeightController  = require('./controller/user/dashboard/weight')
// アンケート関連
const QuestionNaireController = require('./controller/user/questionNaire')
// 行動目標関連
const ConsultingActionGoalController = require('./controller/user/consultingActionGoal')
// 食事摂取ログ
const EatLogController = require('./controller/user/eatLog')
// 健康情報
const HealthCheckController = require('./controller/user/healthCheck')
// 規約同意
const RuleAgreeController = require('./controller/user/ruleAgree')
// 特定保健指導
const SpecificHealthGoalController = require('./controller/user/specificHealthGoal')
// 指導状態
const GuidanceController = require('./controller/user/guidance')
// ユーザープロファイル
const UserProfileController = require('./controller/user/userProfile')
// 中間支援
const SupportQuestionNaireController = require('./controller/user/supportQuestionNaire')
//アプリ初回登録日時
const AppFirstLoginController = require('./controller/user/appFirstLogin')
// 多要素認証
const MfaController = require('./controller/user/userMfa')

//保健師用のController
// ダッシュボード
const NurseDashboardDisplayController = require('./controller/nurse/dashboardDisplay')
// ホーム画面のユーザ一覧
const NurseUserListController = require('./controller/nurse/userList')
//アンケート結果一覧
const NurseQuestionNaireController = require('./controller/nurse/nurseQuestionNaire')

const USER_GROUP_NAME = 'user'
const HEALTH_NURSE_GROUP_NAME = 'nurse'

// declare a new express app
var app = express()
// app.use(bodyParser.json())
app.use(express.json({ extended: true, limit: '100mb' }))
//app.use(express.json())
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(cors())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  //req.header('Access-Control-Allow-Origin', '*')
  //req.header('Access-Control-Allow-Headers', 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Auth-Token')
  next()
})

/**
 * トークン認証
 */
const auth = async (req, res, next) => {
  (async () => {
    if(!req.header('X-Auth-Token')) throw new UnauthorizedError('Token not Found')
    const token = req.header('X-Auth-Token')
    const cognitoService = new CognitoService()
    const verifyResult = await cognitoService.verifyToken(token)
    req.userId = verifyResult['sub']
    req.userName = verifyResult['cognito:username']
    if (req.group && verifyResult['cognito:group'].indexOf(req.group) === -1) {
      throw new ForbiddenError('Permission denied')
    }
    next()
  })().catch(e => {
    switch(e.name) {
    // 不正なトークン
    case 'TokenNotFound':
    case 'InvalidTokenUse':
    case 'UserNotFoundException':
      next(new BadRequestError(e.message))
      break
    // 期限切れ
    case 'TokenExpiredError':
      next(new UnauthorizedError(e.message))
      break
    default:
      // InvalidUserPool
      next(e)
    }
  })
}

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Woven Healthcare API',
      version: '0.0.1'
    },
    //basePath: '/v1'
  },
  apis: ['./app.js','./controller/*.js','./controller/*/*.js','./controller/*/*/*.js']
}

/* Swagger共通部分記述 */
/**
 * @swagger
 * components:
 *   schemas:
 *     errorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: エラーメッセージ
 *           example: Bad Request
 *         detail:
 *           type: string
 *           description: エラー内容詳細
 *           example: account is required
 *   responses:
 *     202:
 *       description: New Password Required (パスワードの再設定が必要)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/errorResponse'
 *     400:
 *       description: Bad Request(パラメーターまたはリクエストボディが不正)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/errorResponse'
 *     401:
 *       description: Unauthorized(トークンが不正、有効期限切れ、認証エラー)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/errorResponse'
 *     403:
 *       description: Forbidden(指定のユーザIDでのアクセス不可)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/errorResponse'
 *     404:
 *       description: Not Found(存在しないURLへのアクセスまたは指定条件にてレスポンスすべきデータがない)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/errorResponse'
 *     405:
 *       description: Method Not Allowed(要求メソッドが対応していない場合)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/errorResponse'
 *     410:
 *       description: User Not Found(アカウント名が存在しない)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/errorResponse'
 *     411:
 *       description: Bad Verification Code(認証コードが不正)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/errorResponse'
 *     412:
 *       description: User Session Error(未認証アカウント)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/errorResponse'
 *     500:
 *       description: Internal Server Error(サーバ内部エラー（処理継続不能なエラーが発生した場合）)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/errorResponse'
 */

/* ここから認証不要 */
app.use('/v1/spec', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)))
app.get('/v1/spec-docs.yaml', function(req, res) {
  const swaggerSpecYaml = yaml.dump(swaggerJSDoc(options))
  res.setHeader('Content-Type', 'text/plain')
  res.send(swaggerSpecYaml)
})
app.get('/v1/change-log', function(req, res) {
  console.log(process.cwd())
  const contents = fs.readFileSync(process.cwd() + '/CHANGELOG.md', {encoding:'utf-8'})
  let output = '<html lang="ja"><head><meta charset="UTF-8"><title>更新履歴</title></head><body>'
  output += html.prettyPrint(markdown.markdown.toHTML(contents))
  output += '</body></html>'
  res.setHeader('Content-Type', 'text/html')
  output
  res.send(output)
})

app.use(function (req, res, next) {
  // 認証へのアクセスのURLでグループを算出する
  const auth = req.url.match(/\/v1\/(.*?)\/auth/)
  if (auth) {
    req.group = auth[1] === 'user'?USER_GROUP_NAME:HEALTH_NURSE_GROUP_NAME
  }
  next()
})
app.use('/v1/user/auth', AuthController)
app.use('/v1/health-nurse/auth', AuthController)
/* ここまで認証不要 */

// トークン認証
app.use('/', auth)

/* ここから認証が必要なルーティング */
/* 保健対象者用API */
// チャット関連
app.use('/v1/user-chat/message', ChatMessageController)
app.use('/v1/user-chat/group', ChatGroupController)
// ダッシュボード関連
app.use('/v1/user-dashboard/abdominal', DashboardAbdominalController)
app.use('/v1/user-dashboard/bloodpressure', DashboardBloodPressureController)
app.use('/v1/user-dashboard/calorie', DashboardCalorieController)
app.use('/v1/user-dashboard/display', DashboardDisplayController)
app.use('/v1/user-dashboard/sleeptime', DashboardSleeptimeController)
app.use('/v1/user-dashboard/step', DashboardStepController)
app.use('/v1/user-dashboard/weight', DashboardWeightController)
// 行動目標
app.use('/v1/user/consulting-actiongoal', ConsultingActionGoalController)
// 食事摂取ログ
app.use('/v1/user/eat-log', EatLogController)
// 健康情報
app.use('/v1/user/health-check', HealthCheckController)
// アンケート関連
app.use('/v1/user/questionnaire', QuestionNaireController)
// 規約同意
app.use('/v1/user/rule-agree', RuleAgreeController)
// 特定保健指導
app.use('/v1/user/specific-healthgoal', SpecificHealthGoalController)
// 指導状態
app.use('/v1/user/guidance', GuidanceController)
// ユーザープロファイル
app.use('/v1/user/profiles', UserProfileController)
// 中間支援
app.use('/v1/user/support-questionnaire', SupportQuestionNaireController)
//アプリ初回登録日時
app.use('/v1/user/appfirstlogin', AppFirstLoginController)
// 多要素認証
app.use('/v1/user/mfa', MfaController)

/* 保健師用API */
// ダッシュボード関連
app.use('/v1/nurse/dashboard', NurseDashboardDisplayController)
// ユーザ一覧
app.use('/v1/nurse/userlist', NurseUserListController)
//アンケート結果一覧
app.use('/v1/nurse/questionnaire', NurseQuestionNaireController)

// 404エラー
app.use((req, res) => {
  res.status(404)
  res.json({message: 'URL Not Found', detail: `URL: ${req.originalUrl} is Not Found`})
})

// その他エラー
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  switch(err.name) {
  case 'UnauthorizedError':
    res.status(401).json({message: 'Unauthorized', detail: err.message})
    break
  case 'NewPasswordRequiredError':
    res.status(202).json({message: 'New Password Required', detail: err.message})
    break
  case 'BadRequestError':
    res.status(400).json({message: 'Bad Request', detail: err.message})
    break
  case 'ForbiddenError':
    res.status(403).json({message: 'Forbidden', detail: err.message})
    break
  case 'NotFoundError':
    res.status(404).json({message: 'Not Found', detail: err.message})
    break
  case 'UserNotFoundError':
    res.status(410).json({message: 'User Not Found', detail: err.message})
    break
  case 'BadVerificationCodeError':
    res.status(411).json({message: 'Bad Verification Code', detail: err.message})
    break
  case 'UserSessionError':
    res.status(412).json({message: 'User Session Error', detail: err.message})
    break
  default:
    res.status(err.status || 500).json({message: 'Internal Server Error', detail: err.message})
  }
})

app.listen(3000, function() {
  console.log('App started')
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
