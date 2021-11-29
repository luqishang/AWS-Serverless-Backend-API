const gql = require('graphql-tag')
const AppSync = require('./appSync')

module.exports = class Patients extends AppSync {
  constructor() {
    super()
  }
  async GetHealthCheckPerHour(userId, recordedAt, hour) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetHealthCheckPerHour(
        $userId: ID!
        $recordedAt: AWSDate!
        $hour: Int!
      ) {
        getHealthCheckPerHour(
          userId: $userId
          recordedAt: $recordedAt
          hour: $hour
        ) {
          userId
          recordedAt
          hour
          totalCalorie
          nonExerciseCalorie
          exerciseCalorie
          stepsPerHourAuto
          acquiredAt
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        userId,
        recordedAt,
        hour
      },
    })
  }
  
  async CreateHealthCheckPerHour(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateHealthCheckPerHour(
        $input: CreateHealthCheckPerHourInput!
        $condition: ModelHealthCheckPerHourConditionInput
      ) {
        createHealthCheckPerHour(input: $input, condition: $condition) {
          userId
          recordedAt
          hour
          totalCalorie
          nonExerciseCalorie
          exerciseCalorie
          stepsPerHourAuto
          acquiredAt
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
  async UpdateHealthCheckPerHour(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateHealthCheckPerHour(
        $input: UpdateHealthCheckPerHourInput!
        $condition: ModelHealthCheckPerHourConditionInput
      ) {
        updateHealthCheckPerHour(input: $input, condition: $condition) {
          userId
          recordedAt
          hour
          totalCalorie
          nonExerciseCalorie
          exerciseCalorie
          stepsPerHourAuto
          acquiredAt
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
  async ListHealthCheckPerHourUserIdRecordAt(userId, recordedAt) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListHealthCheckPerHourUserIdRecordAt(
        $userId: ID
        $recordedAt: ModelStringKeyConditionInput
        $sortDirection: ModelSortDirection
        $filter: ModelHealthCheckPerHourFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listHealthCheckPerHourUserIdRecordAt(
          userId: $userId
          recordedAt: $recordedAt
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            userId
            recordedAt
            hour
            totalCalorie
            nonExerciseCalorie
            exerciseCalorie
            stepsPerHourAuto
            acquiredAt
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      `),
      variables: {
        userId,
        recordedAt
      },
    })
  }  
}
