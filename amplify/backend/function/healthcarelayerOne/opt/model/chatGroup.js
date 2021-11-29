const gql = require('graphql-tag')
const AppSync = require('./appSync')

module.exports = class Chat extends AppSync {
  constructor() {
    super()
  }

  async GetChatGroup(id) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetChatGroup($id: ID!) {
        getChatGroup(id: $id) {
          id
          name
          topicArn
          deletedAt
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        id
      },
    })
  }

  async ListChatGroups(filter) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListChatGroups(
        $filter: ModelChatGroupFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listChatGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
          items {
            id
            name
            topicArn
            deletedAt
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

  async CreateChatGroup(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateChatGroup(
        $input: CreateChatGroupInput!
        $condition: ModelChatGroupConditionInput
      ) {
        createChatGroup(input: $input, condition: $condition) {
          id
          name
          topicArn
          deletedAt
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
  async UpdateChatGroup(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateChatGroup(
        $input: UpdateChatGroupInput!
        $condition: ModelChatGroupConditionInput
      ) {
        updateChatGroup(input: $input, condition: $condition) {
          id
          name
          topicArn
          deletedAt
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
  async DeleteChatGroup(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation DeleteChatGroup(
        $input: DeleteChatGroupInput!
        $condition: ModelChatGroupConditionInput
      ) {
        deleteChatGroup(input: $input, condition: $condition) {
          id
          name
          topicArn
          deletedAt
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
}
