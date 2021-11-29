/*
 * ファイル名: common-function.js
 * 作成日: 2021/10/01
 * 作成者: wei.cheng
 * 作成内容: 新規作成
 * 修正日: 2021/10/14
 * 修正者: bochao.zhang
 * 修正内容: 行動目標の達成率計算部品を追加
 * ver:1.0.0
 */
const HealthCheckModel = require('../model/healthCheck')
const ActionGoalModel = require('../model/actionGoal')
const ActionGoalLogModel = require('../model/actionGoalLog')
const ActionGoalEvaluationModel = require('../model/actionGoalEvaluation')
const UserModel = require('../model/user')
const SupportQuestionnaireLogModel = require('../model/supportQuestionNaireLog')
const moment = require('moment')
exports.GuidanceState = {
  BEFORE: 'beforeguidence', //指導開始前
  FIRST: 'afterfirstguidence', //初回面談後
  AFTERFIRSTSUPPORT: 'afterfirstsupport', //1回目中間支援後
  AFTERSECONDSUPPORT: 'aftersecondsupport', //2回目中間支援後
  AFTER: 'afterguidence', //最後面談終了
}

exports.checkDate = function (value, field) {
  const matches = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  const dt = new Date(value)
  if(!matches || isNaN(dt) || (matches[2] != dt.getMonth()+1)) {
    throw new Error(field + ' is invalid')
  }
  return true    
}

exports.getRecentHealthCheckData = async function(userId, endDate) {
  const healthCheckModel = new HealthCheckModel() 

  const response = {
    weight: null,
    weightRecordedAt: null,
    abdominal: null,
    abdominalRecordedAt: null,
    acquiredAt: null
  }

  const list = async function (userId) {
    let startDate = moment(endDate).subtract(3,'M').format('YYYY-MM-DD')
    let durations = { between: [ startDate, endDate ] }
    const listHealthResult = await healthCheckModel.ListHealthCheckUserIdRecordAt(userId, durations)
    const healthChecks =  listHealthResult.data.listHealthCheckUserIdRecordAt.items

    // 年月日で降順ソートする
    healthChecks.sort((a,b) =>{
      return a.recordedAt > b.recordedAt ? -1 : 1
    })

    // 現在値の設定(体重)
    const currentWeights = healthChecks.filter(hc => hc.weight != null)
    if (currentWeights.length > 0){
      response.weight = currentWeights[0].weight
      response.weightRecordedAt = currentWeights[0].recordedAt 
    }

    // 現在値の設定(腹囲)
    const currentAbdominals = healthChecks.filter(hc => hc.abdominal != null)
    if (currentAbdominals.length > 0){
      response.abdominal = currentAbdominals[0].abdominal
      response.abdominalRecordedAt = currentAbdominals[0].recordedAt
    }

    // 現在値の設定(歩数取得日時)
    const acquiredAt = healthChecks.filter(hc => hc.acquiredAt != null)
    if (acquiredAt.length > 0){
      response.acquiredAt = acquiredAt[0].acquiredAt
    }
  }

  await list(userId)
  return response
}

/**
   * 達成回数、目標回数つき行動目標リストを取得
   * @param {string} userId ユーザId
   * @param {string} recordedAt 指定された日付まで行動目標履歴を抽出
   * @param {integer} supportCount 支援回目
   * @returns list
   */
exports.getActionGoalsInfo = async function(userId, recordedAt, supportCount) {
  let actionGoals = null
  let actionGoalLogs = null
  let actionGoalsSettingNo = []
  const actionGoalModel = new ActionGoalModel()
  const actionGoalLogModel = new ActionGoalLogModel()

  // アクティブになっている行動目標を取得
  const actionGoalResult = await actionGoalModel.listActionGoals(userId)
  actionGoals = actionGoalResult.data.listActionGoals.items
  if (actionGoals.length > 0) {
    for (var actionGoal of actionGoals) {
      // アクティブになっている行動目標枝番を保存
      actionGoalsSettingNo.push(actionGoal.goalSettingNo)
    }
    // ユーザの行動目標履歴を取得
    const actionGoalLogResult = await actionGoalLogModel.listActionGoalLogs(userId)
    actionGoalLogs = actionGoalLogResult.data.listActionGoalLogs.items
    if (actionGoalLogs.length > 0) {
      // アクティブになっている行動目標履歴を抽出
      actionGoalLogs = actionGoalLogs.filter(ag => ag.historyContent != 'delete' && moment(recordedAt).isBetween(ag.startDate, ag.endDate, null, '[]') && actionGoalsSettingNo.indexOf(ag.goalSettingNo) > -1)
      if (actionGoalLogs.length > 0) {
        // 行動目標開始日でソートする
        actionGoalLogs.sort((a,b) =>{
          return a.startDate > b.startDate ? 1 : -1
        })

        // 計算期間の設定
        let startDate = null
        let endDate = null
        switch (supportCount) {
        // 初回面談後の場合
        case 1: {
          // Userから初回指導日時を取得
          const userModel = new UserModel()
          const userModelResult = await userModel.GetUser(userId)
          startDate = moment(userModelResult.data.getUser.guidanceDate).format('YYYY-MM-DD')
          endDate = moment(recordedAt).format('YYYY-MM-DD')
          break
        }
        // 1回目中間支援後の場合
        case 2: {
          // SupportQuestionNaireLogから初回回答日を取得
          const supportQuestionnaireLogModel = new SupportQuestionnaireLogModel()
          const supportQuestionnaireLogModelResult = supportQuestionnaireLogModel.getSupportQuestionNaireLog(userId, 1)
          startDate = supportQuestionnaireLogModelResult.recordDate
          endDate = moment(recordedAt).format('YYYY-MM-DD')
          break
        }
        // デフォルトは一週間
        default:
          startDate = moment(recordedAt).startOf('week').add(1, 'days').format('YYYY-MM-DD')
          endDate = moment(recordedAt).endOf('week').add(1, 'days').format('YYYY-MM-DD')
          break
        }

        // ActionGoalEvaluationから期間内の行動目標評価結果を取得
        const actionDateInput = {between: [startDate, endDate]}
        const actionGoalEvaluationModel = new ActionGoalEvaluationModel()
        const actionGoalEvaluationResult = await actionGoalEvaluationModel.listActionGoalEvaluationUserIdActionDate(userId, actionDateInput)
        const actionGoalEvaluations = actionGoalEvaluationResult.data.listActionGoalEvaluationUserIdActionDate.items
        for (var actionGoalLog of actionGoalLogs) {
          delete actionGoalLog.userId
          delete actionGoalLog.user
          delete actionGoalLog.__typename
          delete actionGoalLog.createdAt
          delete actionGoalLog.updatedAt
          delete actionGoalLog.historyContent
          delete actionGoalLog.settingAt
          delete actionGoalLog.endDate

          // 目標回数と達成回数
          let goalCount = 0
          let achieveCount = 0
          // 目標頻度（曜日指定）の場合
          if (actionGoalLog.frequencyDayOfWeek != null) {
            // 曜日取得
            let dayOfWeeks = actionGoalLog.frequencyDayOfWeek.split('|')
            // 曜日変換
            for (let i = 0; i < dayOfWeeks.length; i++) {
              switch (dayOfWeeks[i]) {
              case '月':
                dayOfWeeks[i] = 1
                break
              case '火':
                dayOfWeeks[i] = 2
                break
              case '水':
                dayOfWeeks[i] = 3
                break
              case '木':
                dayOfWeeks[i] = 4
                break
              case '金':
                dayOfWeeks[i] = 5
                break
              case '土':
                dayOfWeeks[i] = 6
                break
              case '日':
                dayOfWeeks[i] = 0
                break
              default:
                break
              }
            }

            // 目標日付保存
            let result = []
            for (let targetDay of dayOfWeeks) {
              // 行動目標開始日付
              let currentDate = moment(actionGoalLog.startDate).clone()
              // 行動目標開始した最初の週に該当曜日が存在する場合
              if (!currentDate.day(targetDay).isBefore(actionGoalLog.startDate) && !currentDate.day(targetDay).isAfter(endDate)) {
                result.push(currentDate.clone().format('YYYY-MM-DD'))
              }
              // 行動目標開始した翌週から終了日まで該当曜日が存在する場合
              while (!currentDate.day(targetDay + 7).isAfter(endDate)) {
                result.push(currentDate.clone().format('YYYY-MM-DD'))
              }
            }
            goalCount = result.length
          }
          // 目標頻度（日数）の場合
          else if (actionGoalLog.frequencyCount != null) {
            // 開始日と終了日の日付差分を計算
            let numberDays = moment(endDate).diff(moment(actionGoalLog.startDate), 'days') + 1
            // 差分が一週間以上の場合
            if (numberDays >= 7) {
              // 開始日と終了日の週差分を計算
              let numberWeeks = moment(endDate).startOf('week').diff(moment(actionGoalLog.startDate).startOf('week'), 'week')
              // 最終週の前週まで目標回数を計算
              goalCount += numberWeeks * actionGoalLog.frequencyCount
              // 最終週に残りの日数を差分として計算
              numberDays = numberDays % 7 + 1
            }
            // 差分が頻度日数より大きい場合
            if (numberDays > actionGoalLog.frequencyCount) {
              // 頻度日数を計算
              goalCount += actionGoalLog.frequencyCount
            }
            // 差分が頻度日数より小さい場合
            else {
              // 差分を計算
              goalCount += numberDays
            }
          }

          // 行動目標評価結果の計算
          if (actionGoalEvaluations.length > 0) {
            // 同じ行動目標枝番かつ開始日以後の評価結果を抽出
            let actionGoalEvaluationItems = actionGoalEvaluations.filter(ag => ag.goalSettingNo == actionGoalLog.goalSettingNo && !moment(ag.actionDate).isBefore(actionGoalLog.startDate))
            if (actionGoalEvaluationItems.length > 0) {
              // 達成した結果を抽出
              actionGoalEvaluationItems = actionGoalEvaluationItems.filter(ag => ag.actionGoalResult == 1)
              achieveCount = actionGoalEvaluationItems.length
            }
          }
          // 達成回数を設定
          actionGoalLog.achieveWeeklyCount = achieveCount
          // 目標回数を設定
          actionGoalLog.goalWeeklyCount = goalCount
        }
      } else {
        actionGoalLogs = null      
      }
    } else {
      actionGoalLogs = null
    }
  } else {
    actionGoalLogs = null
  }
  return actionGoalLogs
}