const gql = require('graphql-tag')
const AppSync = require('./appSync')

module.exports = class Chat extends AppSync {
  constructor() {
    super()
  }

  async ListChatGroupUsers(groupId) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListChatGroupUsers(
        $groupId: ID
        $userId: ModelIDKeyConditionInput
        $filter: ModelChatGroupUserFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listChatGroupUsers(
          groupId: $groupId
          userId: $userId
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            groupId
            userId
            subscriptionArn
            user {
              items {
                id
                nickName
              }
            }
          }
          nextToken
        }
      }
      `),
      variables: {
        groupId
      },
    })
  }

  async ListChatGroupUserUserId(userId) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListChatGroupUserUserId(
        $userId: ID
        $sortDirection: ModelSortDirection
        $filter: ModelChatGroupUserFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listChatGroupUserUserId(
          userId: $userId
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            groupId
            group {
              items {
                name
              }
            }
            userId
            user {
              items {
                nickName
              }
            }
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

  async CreateChatGroupUser(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateChatGroupUser(
        $input: CreateChatGroupUserInput!
        $condition: ModelChatGroupUserConditionInput
      ) {
        createChatGroupUser(input: $input, condition: $condition) {
          groupId
          group {
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
          userId
          subscriptionArn
          user {
            items {
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
              createdAt
              updatedAt
              deletedAt
            }
            nextToken
          }
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
  async UpdateChatGroupUser(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateChatGroupUser(
        $input: UpdateChatGroupUserInput!
        $condition: ModelChatGroupUserConditionInput
      ) {
        updateChatGroupUser(input: $input, condition: $condition) {
          groupId
          group {
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
          userId
          subscriptionArn
          user {
            items {
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
              createdAt
              updatedAt
              deletedAt
            }
            nextToken
          }
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
  async DeleteChatGroupUser(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation DeleteChatGroupUser(
        $input: DeleteChatGroupUserInput!
        $condition: ModelChatGroupUserConditionInput
      ) {
        deleteChatGroupUser(input: $input, condition: $condition) {
          groupId
          group {
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
          userId
          subscriptionArn
          user {
            items {
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
              createdAt
              updatedAt
              deletedAt
            }
            nextToken
          }
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
