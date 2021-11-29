const gql = require('graphql-tag')

const AppSync = require('./appSync')

module.exports = class Patients extends AppSync {
  constructor() {
    super()
  }

  async getActionGoal(userId, goalSettingNo) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetActionGoal($userId: ID!, $goalSettingNo: Int!) {
        getActionGoal(userId: $userId, goalSettingNo: $goalSettingNo) {
          userId
          goalSettingNo
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
        goalSettingNo
      },
    })
  }
  async createActionGoal(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateActionGoal(
        $input: CreateActionGoalInput!
        $condition: ModelActionGoalConditionInput
      ) {
        createActionGoal(input: $input, condition: $condition) {
          userId
          goalSettingNo
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
  async updateActionGoal(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateActionGoal(
        $input: UpdateActionGoalInput!
        $condition: ModelActionGoalConditionInput
      ) {
        updateActionGoal(input: $input, condition: $condition) {
          userId
          goalSettingNo
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
  async deleteActionGoal(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation DeleteActionGoal(
        $input: DeleteActionGoalInput!
        $condition: ModelActionGoalConditionInput
      ) {
        deleteActionGoal(input: $input, condition: $condition) {
          userId
          goalSettingNo
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
  async listActionGoals(userId) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListActionGoals(
        $userId: ID
        $goalSettingNo: ModelIntKeyConditionInput
        $filter: ModelActionGoalFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listActionGoals(
          userId: $userId
          goalSettingNo: $goalSettingNo
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            userId
            goalSettingNo
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
}