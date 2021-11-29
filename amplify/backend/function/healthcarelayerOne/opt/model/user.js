const gql = require('graphql-tag')

const AppSync = require('./appSync')

module.exports = class Patients extends AppSync {
  constructor() {
    super()
  }

  async GetUser(id) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetUser($id: ID!) {
        getUser(id: $id) {
          id
          account
          lastName
          firstName
          lastKana
          firstKana
          nickName
          birth
          tel
          email
          gender
          deviceToken
          endpointArn
          guidanceDate
          guidanceState
          organizationCd
          organizationName
          hcDate
          hckWeight
          hcAbdominal
          appFirstAt
          supportType
          createdAt
          updatedAt
          deletedAt
        }
      }
      `),
      variables: {
        id
      },
    })
  }
  async CreateUser(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateUser(
        $input: CreateUserInput!
        $condition: ModelUserConditionInput
      ) {
        createUser(input: $input, condition: $condition) {
          id
          account
          lastName
          firstName
          lastKana
          firstKana
          nickName
          birth
          tel
          email
          gender
          deviceToken
          endpointArn
          guidanceDate
          guidanceState
          organizationCd
          organizationName
          hcDate
          hckWeight
          hcAbdominal
          appFirstAt
          supportType
          createdAt
          updatedAt
          deletedAt
        }
      }
      `),
      variables: {
        input: input
      },
    })
  }
  async UpdateUser(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateUser(
        $input: UpdateUserInput!
        $condition: ModelUserConditionInput
      ) {
        updateUser(input: $input, condition: $condition) {
          id
          account
          lastName
          firstName
          lastKana
          firstKana
          nickName
          birth
          tel
          email
          gender
          deviceToken
          endpointArn
          guidanceDate
          guidanceState
          organizationCd
          organizationName
          hcDate
          hckWeight
          hcAbdominal
          appFirstAt
          supportType
          createdAt
          updatedAt
          deletedAt
        }
      }
      `),
      variables: {
        input: input
      },
    })
  }
}
