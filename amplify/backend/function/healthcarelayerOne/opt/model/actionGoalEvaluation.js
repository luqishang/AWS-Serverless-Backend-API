const gql = require('graphql-tag')

const AppSync = require('./appSync')

module.exports = class Patients extends AppSync {
  constructor() {
    super()
  }

  async getActionGoalEvaluation(userId, goalSettingNo, actionDate) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetActionGoalEvaluation(
        $userId: ID!
        $goalSettingNo: Int!
        $actionDate: AWSDate!
      ) {
        getActionGoalEvaluation(
          userId: $userId
          goalSettingNo: $goalSettingNo
          actionDate: $actionDate
        ) {
          userId
          goalSettingNo
          actionDate
          actionGoalResult
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        userId,
        goalSettingNo,
        actionDate
      },
    })
  }
  async createActionGoalEvaluation(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateActionGoalEvaluation(
        $input: CreateActionGoalEvaluationInput!
        $condition: ModelActionGoalEvaluationConditionInput
      ) {
        createActionGoalEvaluation(input: $input, condition: $condition) {
          userId
          goalSettingNo
          actionDate
          actionGoalResult
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
  async updateActionGoalEvaluation(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateActionGoalEvaluation(
        $input: UpdateActionGoalEvaluationInput!
        $condition: ModelActionGoalEvaluationConditionInput
      ) {
        updateActionGoalEvaluation(input: $input, condition: $condition) {
          userId
          goalSettingNo
          actionDate
          actionGoalResult
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
  async deleteActionGoalEvaluation(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation DeleteActionGoalEvaluation(
        $input: DeleteActionGoalEvaluationInput!
        $condition: ModelActionGoalEvaluationConditionInput
      ) {
        deleteActionGoalEvaluation(input: $input, condition: $condition) {
          userId
          goalSettingNo
          actionDate
          actionGoalResult
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
  async listActionGoalEvaluations(userId) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListActionGoalEvaluations(
        $userId: ID
        $goalSettingNoActionDate: ModelActionGoalEvaluationPrimaryCompositeKeyConditionInput
        $filter: ModelActionGoalEvaluationFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listActionGoalEvaluations(
          userId: $userId
          goalSettingNoActionDate: $goalSettingNoActionDate
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            userId
            goalSettingNo
            actionDate
            actionGoalResult
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
  async listActionGoalEvaluationUserIdActionDate(userId, actionDate) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListActionGoalEvaluationUserIdActionDate(
        $userId: ID
        $actionDate: ModelStringKeyConditionInput
        $sortDirection: ModelSortDirection
        $filter: ModelActionGoalEvaluationFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listActionGoalEvaluationUserIdActionDate(
          userId: $userId
          actionDate: $actionDate
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            userId
            goalSettingNo
            actionDate
            actionGoalResult
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      `),
      variables: {
        userId,
        actionDate
      },
    })
  }
}