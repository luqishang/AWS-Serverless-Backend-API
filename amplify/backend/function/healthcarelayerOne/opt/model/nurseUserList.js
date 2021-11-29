const gql = require('graphql-tag')

const AppSync = require('./appSync')

module.exports = class Patients extends AppSync {
  constructor() {
    super()
  }

  async getNurseUserGroup(nurseId, userId) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetNurseUserGroup($nurseId: ID!, $userId: ID!) {
        getNurseUserGroup(nurseId: $nurseId, userId: $userId) {
          nurseId
          group {
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
              guidanceDate
              guidanceState
              organizationCd
              organizationName
              createdAt
              updatedAt
              deletedAt
            }
            nextToken
          }
          userId
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
              guidanceDate
              guidanceState
              organizationCd
              organizationName
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
        nurseId,
        userId
      },
    })
  }

  async listNurseUserGroups() {
    return await this.appSyncClient.query({
      query: gql(`
      query ListNurseUserGroups(
        $nurseId: ID
        $userId: ModelIDKeyConditionInput
        $filter: ModelNurseUserGroupFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listNurseUserGroups(
          nurseId: $nurseId
          userId: $userId
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            nurseId
            group {
              nextToken
            }
            userId
            user {
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      `),
      variables: {
      },
    })
  }

  async listNurseUserGroupNurseId(nurseId) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListNurseUserGroupNurseId(
        $nurseId: ID
        $sortDirection: ModelSortDirection
        $filter: ModelNurseUserGroupFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listNurseUserGroupNurseId(
          nurseId: $nurseId
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            nurseId
            group {
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
                guidanceDate
                guidanceState
                organizationCd
                organizationName
                createdAt
                updatedAt
                deletedAt
              }
              nextToken
            }
            userId
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
                guidanceDate
                guidanceState
                organizationCd
                organizationName
                createdAt
                updatedAt
                deletedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      `),
      variables: {
        nurseId
      },
    })
  }
}