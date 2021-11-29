const gql = require('graphql-tag')

const AppSync = require('./appSync')

module.exports = class Patients extends AppSync {
  constructor() {
    super()
  }

  async getActionGoalMaster(goalId) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetActionGoalMaster($goalId: Int!) {
        getActionGoalMaster(goalId: $goalId) {
          goalId
          primaryId
          secondaryId
          secondaryContent
          tertiaryId
          tertiaryContent
          goalContent
          exerciseUnit
          foodUnit
          defaultTime
          defaultQuantity
          defaultFrequency
          foodOneFlg
          foodTwoFlg
          calorie
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        goalId
      },
    })
  }
  async createActionGoalMaster(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateActionGoalMaster(
        $input: CreateActionGoalMasterInput!
        $condition: ModelActionGoalMasterConditionInput
      ) {
        createActionGoalMaster(input: $input, condition: $condition) {
          goalId
          primaryId
          secondaryId
          secondaryContent
          tertiaryId
          tertiaryContent
          goalContent
          exerciseUnit
          foodUnit
          defaultTime
          defaultQuantity
          defaultFrequency
          foodOneFlg
          foodTwoFlg
          calorie
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
  async updateActionGoalMaster(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateActionGoalMaster(
        $input: UpdateActionGoalMasterInput!
        $condition: ModelActionGoalMasterConditionInput
      ) {
        updateActionGoalMaster(input: $input, condition: $condition) {
          goalId
          primaryId
          secondaryId
          secondaryContent
          tertiaryId
          tertiaryContent
          goalContent
          exerciseUnit
          foodUnit
          defaultTime
          defaultQuantity
          defaultFrequency
          foodOneFlg
          foodTwoFlg
          calorie
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
  async deleteActionGoalMaster(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation DeleteActionGoalMaster(
        $input: DeleteActionGoalMasterInput!
        $condition: ModelActionGoalMasterConditionInput
      ) {
        deleteActionGoalMaster(input: $input, condition: $condition) {
          goalId
          primaryId
          secondaryId
          secondaryContent
          tertiaryId
          tertiaryContent
          goalContent
          exerciseUnit
          foodUnit
          defaultTime
          defaultQuantity
          defaultFrequency
          foodOneFlg
          foodTwoFlg
          calorie
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
  async listActionGoalMasters(filter) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListActionGoalMasters(
        $goalId: Int
        $filter: ModelActionGoalMasterFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listActionGoalMasters(
          goalId: $goalId
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            goalId
            primaryId
            secondaryId
            secondaryContent
            tertiaryId
            tertiaryContent
            goalContent
            exerciseUnit
            foodUnit
            defaultTime
            defaultQuantity
            defaultFrequency
            foodOneFlg
            foodTwoFlg
            calorie
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      `),
      variables: {
        filter
      },
    })
  }
  async listActionGoalMasterPrimaryIdSecondaryId(primaryId, secondaryId) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListActionGoalMasterPrimaryIdSecondaryId(
        $primaryId: String
        $secondaryId: ModelStringKeyConditionInput
        $sortDirection: ModelSortDirection
        $filter: ModelActionGoalMasterFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listActionGoalMasterPrimaryIdSecondaryId(
          primaryId: $primaryId
          secondaryId: $secondaryId
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            goalId
            primaryId
            secondaryId
            secondaryContent
            tertiaryId
            tertiaryContent
            goalContent
            exerciseUnit
            foodUnit
            defaultTime
            defaultQuantity
            defaultFrequency
            foodOneFlg
            foodTwoFlg
            calorie
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      `),
      variables: {
        primaryId,
        secondaryId
      },
    })
  }
}
