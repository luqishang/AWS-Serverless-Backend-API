const gql = require('graphql-tag')
const AppSync = require('./appSync')

module.exports = class Chat extends AppSync {
  constructor() {
    super()
  }

  async GetChatMessage(userId, recordedAt) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetChatMessage($id: ID!) {
        getChatMessage(id: $id) {
          id
          groupId
          chatGroup {
            items {
              id
              name
              deletedAt
              createdAt
              updatedAt
            }
            nextToken
          }
          body
          postedAt
          postedId
          postedUser {
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
              createdAt
              updatedAt
              deletedAt
            }
            nextToken
          }
          deletedAt
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        userId,
        recordedAt
      },
    })
  }
  async ListChatMessageGroupId(groupId, postedAt, filter, sortDirection, limit) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListChatMessageGroupId(
        $groupId: ID
        $postedAt: ModelStringKeyConditionInput
        $sortDirection: ModelSortDirection
        $filter: ModelChatMessageFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listChatMessageGroupId(
          groupId: $groupId
          postedAt: $postedAt
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            id
            groupId
            chatGroup {
              items {
                name
              }
            }
            body
            postedAt
            postedId
            postedUser {
              items {
                nickName
              }
            }
            deletedAt
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      `),
      variables: {
        groupId,
        postedAt, 
        filter, 
        limit,
        sortDirection 
      },
    })
  }
  async CreateChatMessage(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateChatMessage(
        $input: CreateChatMessageInput!
        $condition: ModelChatMessageConditionInput
      ) {
        createChatMessage(input: $input, condition: $condition) {
          id
          groupId
          chatGroup {
            items {
              id
              name
              deletedAt
              createdAt
              updatedAt
            }
            nextToken
          }
          body
          postedAt
          postedId
          postedUser {
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
              createdAt
              updatedAt
              deletedAt
            }
            nextToken
          }
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
  async UpdateData(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateChatMessage(
        $input: UpdateChatMessageInput!
        $condition: ModelChatMessageConditionInput
      ) {
        updateChatMessage(input: $input, condition: $condition) {
          id
          groupId
          chatGroup {
            items {
              id
              name
              deletedAt
              createdAt
              updatedAt
            }
            nextToken
          }
          body
          postedAt
          postedId
          postedUser {
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
              createdAt
              updatedAt
              deletedAt
            }
            nextToken
          }
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
  async DeleteChatMessage(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation DeleteChatMessage(
        $input: DeleteChatMessageInput!
        $condition: ModelChatMessageConditionInput
      ) {
        deleteChatMessage(input: $input, condition: $condition) {
          id
          groupId
          chatGroup {
            items {
              id
              name
              deletedAt
              createdAt
              updatedAt
            }
            nextToken
          }
          body
          postedAt
          postedId
          postedUser {
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
              createdAt
              updatedAt
              deletedAt
            }
            nextToken
          }
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
