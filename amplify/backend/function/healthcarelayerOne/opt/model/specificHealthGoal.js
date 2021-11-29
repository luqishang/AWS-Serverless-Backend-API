const gql = require('graphql-tag')

const AppSync = require('./appSync')

module.exports = class Patients extends AppSync {
  constructor() {
    super()
  }

  async GetSpecificHealthGoal(userId, settingDate) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetSpecificHealthGoal($userId: ID!, $settingDate: AWSDate!) {
        getSpecificHealthGoal(userId: $userId, settingDate: $settingDate) {
          userId
          settingDate
          period
          goalWeight
          goalAbdominal
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        userId,
        settingDate
      },
    })
  }
  async GetSpecificHealthGoals(userId) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListSpecificHealthGoals(
        $userId: ID
        $settingDate: ModelStringKeyConditionInput
        $filter: ModelSpecificHealthGoalFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listSpecificHealthGoals(
          userId: $userId
          settingDate: $settingDate
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            userId
            settingDate
            period
            goalWeight
            goalAbdominal
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
  async CreateSpecificHealthGoal(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateSpecificHealthGoal(
        $input: CreateSpecificHealthGoalInput!
        $condition: ModelSpecificHealthGoalConditionInput
      ) {
        createSpecificHealthGoal(input: $input, condition: $condition) {
          userId
          settingDate
          period
          goalWeight
          goalAbdominal
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
  async UpdateSpecificHealthGoal(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateSpecificHealthGoal(
        $input: UpdateSpecificHealthGoalInput!
        $condition: ModelSpecificHealthGoalConditionInput
      ) {
        updateSpecificHealthGoal(input: $input, condition: $condition) {
          userId
          settingDate
          period
          goalWeight
          goalAbdominal
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
  
  async ListSpecificHealthGoalUserIdSettingDate(userId, settingDate) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListSpecificHealthGoalUserIdSettingDate(
        $userId: ID
        $settingDate: ModelStringKeyConditionInput
        $sortDirection: ModelSortDirection
        $filter: ModelSpecificHealthGoalFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listSpecificHealthGoalUserIdSettingDate(
          userId: $userId
          settingDate: $settingDate
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            userId
            settingDate
            period
            goalWeight
            goalAbdominal
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      `),
      variables: {
        userId,
        settingDate
      },
    })
  }
  async GetListSpecificHealthGoals(userId, limit, nextToken, sortDirection) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListSpecificHealthGoals(
        $userId: ID
        $settingDate: ModelStringKeyConditionInput
        $filter: ModelSpecificHealthGoalFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listSpecificHealthGoals(
          userId: $userId
          settingDate: $settingDate
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            userId
            settingDate
            period
            goalWeight
            goalAbdominal
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      `),
      variables: {
        userId,
        limit,
        nextToken,
        sortDirection
      },
    })
  }

  async getRecentSpecificHealthGoal(userId) {
    let result = []
    const specificHealthGoalModel = new Patients() 

    const ModelSortDirection = { ASC: 'ASC', DESC: 'DESC' } 
    const listHealthGoalResult = await specificHealthGoalModel.GetListSpecificHealthGoals(userId, 1, null, ModelSortDirection.DESC)
    const healthGoals =  listHealthGoalResult.data.listSpecificHealthGoals.items
    if (healthGoals.length > 0) {        
      result = healthGoals[0]
    } else {
      result = null
    }

    return result
  }
}
