const gql = require('graphql-tag')

const AppSync = require('./appSync')

module.exports = class Patients extends AppSync {
  constructor() {
    super()
  }

  async getActionGoalLog(userId, goalSettingNo, settingAt) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetActionGoalLog(
        $userId: ID!
        $goalSettingNo: Int!
        $settingAt: AWSTimestamp!
      ) {
        getActionGoalLog(
          userId: $userId
          goalSettingNo: $goalSettingNo
          settingAt: $settingAt
        ) {
          userId
          goalSettingNo
          settingAt
          startDate
          endDate
          historyContent
          goalType
          goalId
          primaryId
          secondaryId
          goalContent
          calorie
          goalTime
          goalQuantity
          exerciseUnit
          frequencyCount
          frequencyDayOfWeek
          action
          foodOne
          foodQuantityOne
          foodUnitOne
          foodTwo
          foodQuantityTwo
          foodUnitTwo
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        userId,
        goalSettingNo,
        settingAt
      },
    })
  }
  async createActionGoalLog(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateActionGoalLog(
        $input: CreateActionGoalLogInput!
        $condition: ModelActionGoalLogConditionInput
      ) {
        createActionGoalLog(input: $input, condition: $condition) {
          userId
          goalSettingNo
          settingAt
          startDate
          endDate
          historyContent
          goalType
          goalId
          primaryId
          secondaryId
          goalContent
          calorie
          goalTime
          goalQuantity
          exerciseUnit
          frequencyCount
          frequencyDayOfWeek
          action
          foodOne
          foodQuantityOne
          foodUnitOne
          foodTwo
          foodQuantityTwo
          foodUnitTwo
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        input: input
      },
    })
  }
  async updateActionGoalLog(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateActionGoalLog(
        $input: UpdateActionGoalLogInput!
        $condition: ModelActionGoalLogConditionInput
      ) {
        updateActionGoalLog(input: $input, condition: $condition) {
          userId
          goalSettingNo
          settingAt
          startDate
          endDate
          historyContent
          goalType
          goalId
          primaryId
          secondaryId
          goalContent
          calorie
          goalTime
          goalQuantity
          exerciseUnit
          frequencyCount
          frequencyDayOfWeek
          action
          foodOne
          foodQuantityOne
          foodUnitOne
          foodTwo
          foodQuantityTwo
          foodUnitTwo
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        input: input
      },
    })
  }
  async deleteActionGoalLog(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation DeleteActionGoalLog(
        $input: DeleteActionGoalLogInput!
        $condition: ModelActionGoalLogConditionInput
      ) {
        deleteActionGoalLog(input: $input, condition: $condition) {
          userId
          goalSettingNo
          settingAt
          startDate
          endDate
          historyContent
          goalType
          goalId
          primaryId
          secondaryId
          goalContent
          calorie
          goalTime
          goalQuantity
          exerciseUnit
          frequencyCount
          frequencyDayOfWeek
          action
          foodOne
          foodQuantityOne
          foodUnitOne
          foodTwo
          foodQuantityTwo
          foodUnitTwo
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        input: input
      },
    })
  }
  async listActionGoalLogs(userId) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListActionGoalLogs(
        $userId: ID
        $goalSettingNoSettingAt: ModelActionGoalLogPrimaryCompositeKeyConditionInput
        $filter: ModelActionGoalLogFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listActionGoalLogs(
          userId: $userId
          goalSettingNoSettingAt: $goalSettingNoSettingAt
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            userId
            goalSettingNo
            settingAt
            startDate
            endDate
            historyContent
            goalType
            goalId
            primaryId
            secondaryId
            goalContent
            calorie
            goalTime
            goalQuantity
            exerciseUnit
            frequencyCount
            frequencyDayOfWeek
            action
            foodOne
            foodQuantityOne
            foodUnitOne
            foodTwo
            foodQuantityTwo
            foodUnitTwo
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      `),
      variables: {
        userId
      },
    })
  }
  async listActionGoalLogUserIdHistoryContent(userId, historyContent) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListActionGoalLogUserIdHistoryContent(
        $userId: ID
        $historyContent: ModelStringKeyConditionInput
        $sortDirection: ModelSortDirection
        $filter: ModelActionGoalLogFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listActionGoalLogUserIdHistoryContent(
          userId: $userId
          historyContent: $historyContent
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            userId
            goalSettingNo
            settingAt
            startDate
            endDate
            historyContent
            goalType
            goalId
            primaryId
            secondaryId
            goalContent
            calorie
            goalTime
            goalQuantity
            exerciseUnit
            frequencyCount
            frequencyDayOfWeek
            action
            foodOne
            foodQuantityOne
            foodUnitOne
            foodTwo
            foodQuantityTwo
            foodUnitTwo
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      `),
      variables: {
        userId,
        historyContent
      },
    })
  }
  async listActionGoalLogUserIdGoalSettingNo(userId, goalSettingNo) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListActionGoalLogUserIdGoalSettingNo(
        $userId: ID
        $goalSettingNo: ModelIntKeyConditionInput
        $sortDirection: ModelSortDirection
        $filter: ModelActionGoalLogFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listActionGoalLogUserIdGoalSettingNo(
          userId: $userId
          goalSettingNo: $goalSettingNo
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            userId
            goalSettingNo
            settingAt
            startDate
            endDate
            historyContent
            goalType
            goalId
            primaryId
            secondaryId
            goalContent
            calorie
            goalTime
            goalQuantity
            exerciseUnit
            frequencyCount
            frequencyDayOfWeek
            action
            foodOne
            foodQuantityOne
            foodUnitOne
            foodTwo
            foodQuantityTwo
            foodUnitTwo
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      `),
      variables: {
        userId,
        goalSettingNo
      },
    })
  }
}
