/*
 * ファイル名: auth.js
 * 作成日: 2021/10/01
 * 作成者: matsumoto
 * 作成内容: 新規作成
 * 修正日: 2021/11/11
 * 修正者: bochao.zhang
 * 修正内容: 多要素認証のAPIをuserMfaに移行
 * ver:1.0.0
 */
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const ExtensibleCustomError = require('extensible-custom-error')
class BadRequestError extends ExtensibleCustomError {} // 400
class UnauthorizedError extends ExtensibleCustomError {} // 401
class NewPasswordRequiredError extends ExtensibleCustomError {} // 401でパスワード再設定が必要
class ForbiddenError extends ExtensibleCustomError {} // 403
class UserNotFoundError extends ExtensibleCustomError{} // 410
class BadVerificationCodeError extends ExtensibleCustomError{} // 411

const CognitoService = require(process.env.AWS_REGION ? '/opt/service/cognito' : '../../../healthcarelayerOne/opt/service/cognito')
/**
* @swagger
* /user/auth:
*   post:
*     summary: ユーザーログイン
*     description: ログインID,パスワードで認証を行いトークンを返却します。
*         パスワードの再設定が必要な場合はmessageが'New Password Required'コードが202のエラーで返却しその他は通常のエラーコードで返却します。
*     tags:
*       - 認証
*     requestBody:
*       content:
*         application/json:
*           schema:
*             required:
*             - account
*             - password
*             type: object
*             properties:
*               account:
*                 type: string
*                 description: アカウント名
*                 minLength: 8
*                 maxLength: 64
*               password:
*                 type: string
*                 description: パスワード
*                 minLength: 8
*                 maxLength: 64
*     responses:
*       200:
*         description: 認証OK
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 userId:
*                   type: string
*                   description: ユーザーID
*                 token:
*                   type: string
*                   description: アクセストークン（有効期限：1日）
*                 refreshToken:
*                   type: string
*                   description: リフレッシュトークン（有効期限：30日）
*       202:
*         $ref: '#/components/responses/202'
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
* /user/auth/change-password:
*   post:
*     summary: パスワードの変更
*     description: パスワードの変更を行います。初期パスワード変更時もこのAPIを利用します。
*     tags:
*       - 認証
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*             - account
*             - oldPassword
*             - newPassword
*             properties:
*               account:
*                 type: string
*                 description: アカウント名
*                 minLength: 8
*                 maxLength: 64
*               oldPassword:
*                 type: string
*                 description: 旧パスワード
*                 minLength: 8
*                 maxLength: 64
*               newPassword:
*                 type: string
*                 description: 新パスワード
*                 minLength: 8
*                 maxLength: 64
*     responses:
*       200:
*         description: 認証OK
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 userId:
*                   type: string
*                   description: ユーザーID
*                 token:
*                   type: string
*                   description: アクセストークン（有効期限：1日）
*                 refreshToken:
*                   type: string
*                   description: リフレッシュトークン（有効期限：30日）
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
* /user/auth/forgot-password:
*   post:
*     summary: 認証コード送信
*     description: パスワード忘れた場合、パスワードリセットのため、確認済みの電話番号に認証コードを送信する
*     tags:
*       - 認証
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*             - account
*             properties:
*               account:
*                 type: string
*                 description: アカウント名
*                 minLength: 8
*                 maxLength: 64
*     responses:
*       200:
*         description: 認証コード送信OK
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 attributeName:
*                   type: string
*                   description: 属性名（phone_numberなど）
*                   maxLength: 32
*                 deliveryMedium:
*                   type: string
*                   description: |
*                     配信媒体（電子メールまたは電話番号）
*                     ・SMS
*                     ・EMAIL
*                 destination:
*                   type: string
*                   description: コード配信詳細の宛先
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
*       410:
*         $ref: '#/components/responses/410'
*       500:
*         $ref: '#/components/responses/500'
* /user/auth/reset-password:
*   post:
*     summary: パスワードのリセット
*     description: 認証コードと新パスワードを入力し、忘れたパスワードをリセットできる
*     tags:
*       - 認証
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*             - account
*             - verificationCode
*             - newPassword
*             properties:
*               account:
*                 type: string
*                 description: アカウント名
*                 minLength: 8
*                 maxLength: 64
*               verificationCode:
*                 type: string
*                 description: 認証コード
*               newPassword:
*                 type: string
*                 description: 新パスワード
*                 minLength: 8
*                 maxLength: 64
*     responses:
*       200:
*         description: リセットOK
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 account:
*                   type: string
*                   description: アカウント名
*                 newPassword:
*                   type: string
*                   description: 新パスワード
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
*       411:
*         $ref: '#/components/responses/411'
*       500:
*         $ref: '#/components/responses/500'
* /user/auth/verify:
*   post:
*     summary: トークン認証、トークン再発行
*     description: トークンが有効か認証を行います。トークンの期限が切れていた場合はリフレッシュトークンにより新たなトークを発行します
*     tags:
*       - 認証
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*             - token
*             - refreshToken
*             properties:
*               token:
*                 type: string
*                 description: アクセストークン
*               refreshToken:
*                 type: string
*                 description: リフレッシュトークン
*     responses:
*       200:
*         description: 認証OK
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 result:
*                   type: string
*                   description: ok：認証OK、refresh：新トークン発行
*                 token:
*                   type: string
*                   description: アクセストークン(有効期限切れの場合は新しいトークン)
*                 refreshToken:
*                   type: string
*                   description: リフレッシュトークン
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
* /health-nurse/auth:
*   post:
*     summary: 保健師用ログイン
*     description: ログインID,パスワードで認証を行いトークンを返却します
*     tags:
*       - 認証
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*             - account
*             - password
*             properties:
*               account:
*                 type: string
*                 description: アカウント名
*                 maxLength: 64
*               password:
*                 type: string
*                 description: パスワード
*                 maxLength: 64
*     responses:
*       200:
*         description: 認証OK
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 userId:
*                   type: string
*                   description: ユーザーID
*                 token:
*                   type: string
*                   description: アクセストークン（有効期限：1時間）
*                 refreshToken:
*                   type: string
*                   description: リフレッシュトークン（有効期限：30日）
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
router.post('/', [
  body('account').not().isEmpty().withMessage('account is required'),
  body('account').isLength({min:8, max:64}).withMessage('account must be between 8 and 64 characters'),
  body('password').not().isEmpty().withMessage('password is required'),
  body('password').isLength({min:8, max:64}).withMessage('password must be between 8 and 64 characters'),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    // Cognitoへの認証
    try {
      const cognitoService = new CognitoService()
      // ID,PWの認証
      const authenticateUserResult = await cognitoService.authenticateUser(req.body.account, req.body.password)
      // 所属グループの検証
      if (!authenticateUserResult.idToken.payload['cognito:groups']
        || authenticateUserResult.idToken.payload['cognito:groups'].indexOf(req.group) === -1) {
        return next(new ForbiddenError('Permission denied'))
      }
      return res.json({
        userId: authenticateUserResult.idToken.payload.sub,
        token: authenticateUserResult.idToken.jwtToken,
        refreshToken: authenticateUserResult.refreshToken.token
      })
    } catch (e) {
      if (e.name === 'NewPasswordRequiredException') {
        return next(new NewPasswordRequiredError(e.message))
      }
      return next(new UnauthorizedError(e.message))
    }
  })().catch(e => next(e))
})

router.post('/change-password', [
  body('account').not().isEmpty().withMessage('account is required'),
  body('account').isLength({min:8, max:64}).withMessage('account must be between 8 and 64 characters'),
  body('oldPassword').not().isEmpty().withMessage('oldPassword is required'),
  body('oldPassword').isLength({min:8, max:64}).withMessage('oldPassword must be between 8 and 64 characters'),
  body('newPassword').not().isEmpty().withMessage('newPassword is required'),
  body('newPassword').isLength({min:8, max:64}).withMessage('newPassword must be between 8 and 64 characters'),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    // Cognitoへの認証
    try {
      const cognitoService = new CognitoService()
      // ID,PWの認証
      const authenticateUserResult = await cognitoService.changePassword(req.body.account, req.body.oldPassword, req.body.newPassword)
      return res.json({
        userId: authenticateUserResult.idToken.payload.sub,
        token: authenticateUserResult.idToken.jwtToken,
        refreshToken: authenticateUserResult.refreshToken.token
      })
    } catch (e) {
      return next(new UnauthorizedError(e.message))
    }
  })().catch(e => next(e))
})

router.post('/forgot-password', [
  body('account').not().isEmpty().withMessage('account is required'),
  body('account').isLength({min:8, max:64}).withMessage('account must be between 8 and 64 characters'),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    // 認証コードを発行する
    const cognitoService = new CognitoService()
    try {
      const forgotPasswordResult = await cognitoService.forgotPassword(req.body.account)
      return res.json({
        attributeName: forgotPasswordResult.CodeDeliveryDetails.AttributeName,
        deliveryMedium: forgotPasswordResult.CodeDeliveryDetails.DeliveryMedium,
        destination: forgotPasswordResult.CodeDeliveryDetails.Destination
      })
    } catch (e) {
      if (e.name === 'UserNotFoundError') {
        return next(new UserNotFoundError(e.message))
      }
      return next(new UnauthorizedError(e.message))
    }
  })().catch(e => next(e))
})

router.post('/reset-password', [
  body('account').not().isEmpty().withMessage('account is required'),
  body('account').isLength({min:8, max:64}).withMessage('account must be between 8 and 64 characters'),
  body('verificationCode').not().isEmpty().withMessage('verificationCode is required'),
  body('newPassword').not().isEmpty().withMessage('newPassword is required'),
  body('newPassword').isLength({min:8, max:64}).withMessage('newPassword must be between 8 and 64 characters'),
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    // パスワードをリセットする
    const cognitoService = new CognitoService()
    try {
      await cognitoService.confirmPassword(req.body.account, req.body.verificationCode, req.body.newPassword)
      return res.json({
        account: req.body.account,
        newPassword: req.body.newPassword
      })
    } catch (e) {
      if (e.name === 'BadVerificationCodeError') {
        return next(new BadVerificationCodeError(e.message))
      }
      return next(new UnauthorizedError(e.message))
    }
  })().catch(e => next(e))
})

router.post('/verify',[
  body('token').not().isEmpty().withMessage('token is required'),
  body('refreshToken').not().isEmpty().withMessage('refreshToken is required')
], (req, res, next) => {
  (async () => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg))
    }
    // Cognitoへの認証
    const cognitoService = new CognitoService()
    try {
      await cognitoService.verifyToken(req.body.token)
      return res.json({
        result: 'ok',
        token: req.body.token,
        refreshToken: req.body.refreshToken
      })
    } catch (e) {
      if (e.name == 'TokenExpiredError') { // トークン有効期限切れ
        try {
          const refreshResult = await cognitoService.refreshToken(req.body.refreshToken)
          return res.json({
            result: 'refresh',
            token: refreshResult.AuthenticationResult.IdToken,
            refreshToken: req.body.refreshToken
          })
        } catch(e2) {
          return next(new UnauthorizedError(e2))
        }
      } else {
        return next(new UnauthorizedError(e))
      }
    }
  })().catch(e => next(e))
})

module.exports = router
