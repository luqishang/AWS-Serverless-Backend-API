const gql = require('graphql-tag')

const AppSync = require('./appSync')

module.exports = class Patients extends AppSync {
  constructor() {
    super()
  }

  async GetRuleAgree(userId, ruleNo, agreedAt) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetRuleAgree($userId: ID!, $ruleNo: Int!, $agreedAt: AWSTimestamp!) {
        getRuleAgree(userId: $userId, ruleNo: $ruleNo, agreedAt: $agreedAt) {
          userId
          ruleNo
          agreedAt
          agreement
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        userId,
        ruleNo,
        agreedAt
      },
    })
  }
  async CreateRuleAgree(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateRuleAgree(
        $input: CreateRuleAgreeInput!
        $condition: ModelRuleAgreeConditionInput
      ) {
        createRuleAgree(input: $input, condition: $condition) {
          userId
          ruleNo
          agreedAt
          agreement
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
  async UpdateRuleAgree(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateRuleAgree(
        $input: UpdateRuleAgreeInput!
        $condition: ModelRuleAgreeConditionInput
      ) {
        updateRuleAgree(input: $input, condition: $condition) {
          userId
          ruleNo
          agreedAt
          agreement
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
  async ListRuleAgrees(filter) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListRuleAgrees(
        $userId: ID
        $ruleNoAgreedAt: ModelRuleAgreePrimaryCompositeKeyConditionInput
        $filter: ModelRuleAgreeFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listRuleAgrees(
          userId: $userId
          ruleNoAgreedAt: $ruleNoAgreedAt
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            userId
            ruleNo
            agreedAt
            agreement
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
  async ListRuleAgreeByUserIdRuleNo(userId, ruleNo) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListRuleAgreeByUserIdRuleNo(
        $userId: ID
        $ruleNo: ModelIntKeyConditionInput
        $sortDirection: ModelSortDirection
        $filter: ModelRuleAgreeFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listRuleAgreeByUserIdRuleNo(
          userId: $userId
          ruleNo: $ruleNo
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            userId
            ruleNo
            agreedAt
            agreement
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      `),
      variables: {
        userId,
        ruleNo
      },
    })
  }
}
