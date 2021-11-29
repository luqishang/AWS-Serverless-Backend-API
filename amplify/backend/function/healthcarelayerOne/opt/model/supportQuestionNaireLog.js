const gql = require('graphql-tag')

const AppSync = require('./appSync')

module.exports = class Patients extends AppSync {
  constructor() {
    super()
  }

  async getSupportQuestionNaireLog(userId, supportCount) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetSupportQuestionNaireLog($userId: ID!, $supportCount: Int!) {
        getSupportQuestionNaireLog(userId: $userId, supportCount: $supportCount) {
          userId
          supportCount
          recordDate
          weight
          abdominal
          goalSettingNoOne
          goalAchieveRateOne
          goalSettingNoTwo
          goalAchieveRateTwo
          goalSettingNoThree
          goalAchieveRateThree
          foodLife
          bodyActivity
          smokingStatus
          freeInputContent
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        userId,
        supportCount
      },
    })
  }

  async listSupportQuestionNaireLogs(userId, supportCount) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListSupportQuestionNaireLogs(
        $userId: ID
        $supportCount: ModelIntKeyConditionInput
        $filter: ModelSupportQuestionNaireLogFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listSupportQuestionNaireLogs(
          userId: $userId
          supportCount: $supportCount
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            userId
            supportCount
            recordDate
            weight
            abdominal
            goalSettingNoOne
            goalAchieveRateOne
            goalSettingNoTwo
            goalAchieveRateTwo
            goalSettingNoThree
            goalAchieveRateThree
            foodLife
            bodyActivity
            smokingStatus
            freeInputContent
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      `),
      variables: {
        userId,
        supportCount
      },
    })
  }

  async listSupportQuestionNaireLogUserId(userId) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListSupportQuestionNaireLogUserId(
        $userId: ID
        $sortDirection: ModelSortDirection
        $filter: ModelSupportQuestionNaireLogFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listSupportQuestionNaireLogUserId(
          userId: $userId
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            userId
            supportCount
            recordDate
            weight
            abdominal
            goalSettingNoOne
            goalAchieveRateOne
            goalSettingNoTwo
            goalAchieveRateTwo
            goalSettingNoThree
            goalAchieveRateThree
            foodLife
            bodyActivity
            smokingStatus
            freeInputContent
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

  async createSupportQuestionNaireLog(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateSupportQuestionNaireLog(
        $input: CreateSupportQuestionNaireLogInput!
        $condition: ModelSupportQuestionNaireLogConditionInput
      ) {
        createSupportQuestionNaireLog(input: $input, condition: $condition) {
          userId
          supportCount
          recordDate
          weight
          abdominal
          goalSettingNoOne
          goalAchieveRateOne
          goalSettingNoTwo
          goalAchieveRateTwo
          goalSettingNoThree
          goalAchieveRateThree
          foodLife
          bodyActivity
          smokingStatus
          freeInputContent
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        input
      },
    })
  }

  async updateSupportQuestionNaireLog(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateSupportQuestionNaireLog(
        $input: UpdateSupportQuestionNaireLogInput!
        $condition: ModelSupportQuestionNaireLogConditionInput
      ) {
        updateSupportQuestionNaireLog(input: $input, condition: $condition) {
          userId
          supportCount
          recordDate
          weight
          abdominal
          goalSettingNoOne
          goalAchieveRateOne
          goalSettingNoTwo
          goalAchieveRateTwo
          goalSettingNoThree
          goalAchieveRateThree
          foodLife
          bodyActivity
          smokingStatus
          freeInputContent
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        input
      },
    })
  }

  async deleteSupportQuestionNaireLog(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation DeleteSupportQuestionNaireLog(
        $input: DeleteSupportQuestionNaireLogInput!
        $condition: ModelSupportQuestionNaireLogConditionInput
      ) {
        deleteSupportQuestionNaireLog(input: $input, condition: $condition) {
          userId
          supportCount
          recordDate
          weight
          abdominal
          goalSettingNoOne
          goalAchieveRateOne
          goalSettingNoTwo
          goalAchieveRateTwo
          goalSettingNoThree
          goalAchieveRateThree
          foodLife
          bodyActivity
          smokingStatus
          freeInputContent
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        input
      },
    })
  }
}