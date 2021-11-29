const gql = require('graphql-tag')

const AppSync = require('./appSync')

module.exports = class Patients extends AppSync {
  constructor() {
    super()
  }

  async GetQuestionNaireAnswerResult(userId, questionNaireId, questionNaireAnswerId) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetQuestionNaireAnswerResult(
        $userId: ID!
        $questionNaireId: ID!
        $questionNaireAnswerId: ID!
      ) {
        getQuestionNaireAnswerResult(
          userId: $userId
          questionNaireId: $questionNaireId
          questionNaireAnswerId: $questionNaireAnswerId
        ) {
          userId
          questionNaireId
          questionNaireAnswerId
          questionNaireType
          inputType
          questionNaireFreeAnswer
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        userId,
        questionNaireId,
        questionNaireAnswerId
      },
    })
  }
  async CreateQuestionNaireAnswerResult(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateQuestionNaireAnswerResult(
        $input: CreateQuestionNaireAnswerResultInput!
        $condition: ModelQuestionNaireAnswerResultConditionInput
      ) {
        createQuestionNaireAnswerResult(input: $input, condition: $condition) {
          userId
          questionNaireId
          questionNaireAnswerId
          questionNaireType
          inputType
          questionNaireFreeAnswer
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
  async UpdateQuestionNaireAnswerResult(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateQuestionNaireAnswerResult(
        $input: UpdateQuestionNaireAnswerResultInput!
        $condition: ModelQuestionNaireAnswerResultConditionInput
      ) {
        updateQuestionNaireAnswerResult(input: $input, condition: $condition) {
          userId
          questionNaireId
          questionNaireAnswerId
          questionNaireType
          inputType
          questionNaireFreeAnswer
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
  async DeleteQuestionNaireAnswerResult(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation DeleteQuestionNaireAnswerResult(
        $input: DeleteQuestionNaireAnswerResultInput!
        $condition: ModelQuestionNaireAnswerResultConditionInput
      ) {
        deleteQuestionNaireAnswerResult(input: $input, condition: $condition) {
          userId
          questionNaireId
          questionNaireAnswerId
          questionNaireType
          inputType
          questionNaireFreeAnswer
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
  async ListQuestionNaireAnswerResults(filter) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListQuestionNaireAnswerResults(
        $userId: ID
        $questionNaireIdQuestionNaireAnswerId: ModelQuestionNaireAnswerResultPrimaryCompositeKeyConditionInput
        $filter: ModelQuestionNaireAnswerResultFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listQuestionNaireAnswerResults(
          userId: $userId
          questionNaireIdQuestionNaireAnswerId: $questionNaireIdQuestionNaireAnswerId
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            userId
            questionNaireId
            questionNaireAnswerId
            questionNaireType
            inputType
            questionNaireFreeAnswer
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
  async ListQuestionNaireAnswerResultUserId(userId) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListQuestionNaireAnswerResultUserId(
        $userId: ID
        $sortDirection: ModelSortDirection
        $filter: ModelQuestionNaireAnswerResultFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listQuestionNaireAnswerResultUserId(
          userId: $userId
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            userId
            questionNaireId
            questionNaireAnswerId
            questionNaireType
            inputType
            questionNaireFreeAnswer
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
}
