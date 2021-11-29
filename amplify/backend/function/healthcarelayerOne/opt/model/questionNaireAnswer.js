const gql = require('graphql-tag')

const AppSync = require('./appSync')

module.exports = class Patients extends AppSync {
  constructor() {
    super()
  }

  async GetQuestionNaireAnswer(questionNaireAnswerId) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetQuestionNaireAnswer($questionNaireAnswerId: ID!) {
        getQuestionNaireAnswer(questionNaireAnswerId: $questionNaireAnswerId) {
          questionNaireAnswerId
          questionNaireAnswerContents
          questionNaireId
          validFlag
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        questionNaireAnswerId
      },
    })
  }
  async CreateQuestionNaireAnswer(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateQuestionNaireAnswer(
        $input: CreateQuestionNaireAnswerInput!
        $condition: ModelQuestionNaireAnswerConditionInput
      ) {
        createQuestionNaireAnswer(input: $input, condition: $condition) {
          questionNaireAnswerId
          questionNaireAnswerContents
          questionNaireId
          validFlag
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
  async UpdateQuestionNaireAnswer(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateQuestionNaireAnswer(
        $input: UpdateQuestionNaireAnswerInput!
        $condition: ModelQuestionNaireAnswerConditionInput
      ) {
        updateQuestionNaireAnswer(input: $input, condition: $condition) {
          questionNaireAnswerId
          questionNaireAnswerContents
          questionNaireId
          validFlag
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
  async DeleteQuestionNaireAnswer(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation DeleteQuestionNaireAnswer(
        $input: DeleteQuestionNaireAnswerInput!
        $condition: ModelQuestionNaireAnswerConditionInput
      ) {
        deleteQuestionNaireAnswer(input: $input, condition: $condition) {
          questionNaireAnswerId
          questionNaireAnswerContents
          questionNaireId
          validFlag
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
  async ListQuestionNaireAnswers(filter) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListQuestionNaireAnswers(
        $questionNaireAnswerId: ID
        $filter: ModelQuestionNaireAnswerFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listQuestionNaireAnswers(
          questionNaireAnswerId: $questionNaireAnswerId
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            questionNaireAnswerId
            questionNaireAnswerContents
            questionNaireId
            validFlag
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
  async ListQuestionNaireAnswerFlg(validFlag, limit) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListQuestionNaireAnswerFlg(
        $validFlag: Int
        $sortDirection: ModelSortDirection
        $filter: ModelQuestionNaireAnswerFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listQuestionNaireAnswerFlg(
          validFlag: $validFlag
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            questionNaireAnswerId
            questionNaireAnswerContents
            questionNaireId
            validFlag
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      `),
      variables: {
        validFlag,
        limit
      },
    })
  }
}
