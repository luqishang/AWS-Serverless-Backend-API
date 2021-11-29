const gql = require('graphql-tag')
const AppSync = require('./appSync')

module.exports = class Patients extends AppSync {
  constructor() {
    super()
  }

  async GetData(userId, recordedAt) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetHealthCheck($userId: ID!, $recordedAt: AWSDate!) {
        getHealthCheck(userId: $userId, recordedAt: $recordedAt) {
          userId
          recordedAt
          weight
          abdominal
          dbp
          sbp
          stepsPerDayAuto
          stepsPerHourAuto
          stepsPerDayManual
          totalCaloriePerDayAuto
          nonExerciseCaloriePerDayAuto
          exerciseCaloriePerDayAuto
          sleepTimePerDayAuto
          acquiredAt
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
  async GetDatas(userId) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListHealthChecks(
        $userId: ID
        $recordedAt: ModelStringKeyConditionInput
        $filter: ModelHealthCheckFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listHealthChecks(
          userId: $userId
          recordedAt: $recordedAt
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            userId
            recordedAt
            weight
            abdominal
            dbp
            sbp
            stepsPerDayAuto
            stepsPerHourAuto
            stepsPerDayManual
            totalCaloriePerDayAuto
            nonExerciseCaloriePerDayAuto
            exerciseCaloriePerDayAuto
            sleepTimePerDayAuto
            acquiredAt
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
  async CreateData(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateHealthCheck(
        $input: CreateHealthCheckInput!
        $condition: ModelHealthCheckConditionInput
      ) {
        createHealthCheck(input: $input, condition: $condition) {
          userId
          recordedAt
          weight
          abdominal
          dbp
          sbp
          stepsPerDayAuto
          stepsPerHourAuto
          stepsPerDayManual
          totalCaloriePerDayAuto
          nonExerciseCaloriePerDayAuto
          exerciseCaloriePerDayAuto
          sleepTimePerDayAuto
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
  async UpdateData(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateHealthCheck(
        $input: UpdateHealthCheckInput!
        $condition: ModelHealthCheckConditionInput
      ) {
        updateHealthCheck(input: $input, condition: $condition) {
          userId
          recordedAt
          weight
          abdominal
          dbp
          sbp
          stepsPerDayAuto
          stepsPerHourAuto
          stepsPerDayManual
          totalCaloriePerDayAuto
          nonExerciseCaloriePerDayAuto
          exerciseCaloriePerDayAuto
          sleepTimePerDayAuto
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
  async ListHealthCheckUserIdRecordAt(userId, recordedAt) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListHealthCheckUserIdRecordAt(
        $userId: ID
        $recordedAt: ModelStringKeyConditionInput
        $sortDirection: ModelSortDirection
        $filter: ModelHealthCheckFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listHealthCheckUserIdRecordAt(
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
            weight
            abdominal
            dbp
            sbp
            stepsPerDayAuto
            stepsPerHourAuto
            stepsPerDayManual
            totalCaloriePerDayAuto
            nonExerciseCaloriePerDayAuto
            exerciseCaloriePerDayAuto
            sleepTimePerDayAuto
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
  async GetListDatas(userId, limit, nextToken, sortDirection) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListHealthChecks(
        $userId: ID
        $recordedAt: ModelStringKeyConditionInput
        $filter: ModelHealthCheckFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listHealthChecks(
          userId: $userId
          recordedAt: $recordedAt
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            userId
            recordedAt
            weight
            abdominal
            dbp
            sbp
            stepsPerDayAuto
            stepsPerHourAuto
            stepsPerDayManual
            totalCaloriePerDayAuto
            nonExerciseCaloriePerDayAuto
            exerciseCaloriePerDayAuto
            sleepTimePerDayAuto
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
        limit,
        nextToken,
        sortDirection
      },
    })
  }
}
