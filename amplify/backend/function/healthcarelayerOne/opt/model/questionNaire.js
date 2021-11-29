const gql = require('graphql-tag')

const AppSync = require('./appSync')

module.exports = class Patients extends AppSync {
  constructor() {
    super()
  }

  async GetQuestionNaire(questionNaireId) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetQuestionNaire($questionNaireId: ID!) {
        getQuestionNaire(questionNaireId: $questionNaireId) {
          questionNaireId
          questionNaireDate
          questionNaireContents
          questionNaireType
          interviewType
          inputType
          primaryId
          secondaryId
          displayOrder
          validFlag
          createdAt
          updatedAt
          questionNaireAnswers {
            items {
              questionNaireAnswerId
              questionNaireAnswerContents
              questionNaireId
              createdAt
              updatedAt
            }
            nextToken
          }
        }
      }
      `),
      variables: {
        questionNaireId
      },
    })
  }
  async CreateQuestionNaire(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateQuestionNaire(
        $input: CreateQuestionNaireInput!
        $condition: ModelQuestionNaireConditionInput
      ) {
        createQuestionNaire(input: $input, condition: $condition) {
          questionNaireId
          questionNaireDate
          questionNaireContents
          questionNaireType
          interviewType
          inputType
          primaryId
          secondaryId
          displayOrder
          validFlag
          createdAt
          updatedAt
          questionNaireAnswers {
            items {
              questionNaireAnswerId
              questionNaireAnswerContents
              questionNaireId
              createdAt
              updatedAt
            }
            nextToken
          }
        }
      }
      `),
      variables: {
        input: input
      },
    })
  }
  async UpdateQuestionNaire(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateQuestionNaire(
        $input: UpdateQuestionNaireInput!
        $condition: ModelQuestionNaireConditionInput
      ) {
        updateQuestionNaire(input: $input, condition: $condition) {
          questionNaireId
          questionNaireDate
          questionNaireContents
          questionNaireType
          interviewType
          inputType
          primaryId
          secondaryId
          displayOrder
          validFlag
          createdAt
          updatedAt
          questionNaireAnswers {
            items {
              questionNaireAnswerId
              questionNaireAnswerContents
              questionNaireId
              createdAt
              updatedAt
            }
            nextToken
          }
        }
      }
      `),
      variables: {
        input: input
      },
    })
  }
  async DeleteQuestionNaire(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation DeleteQuestionNaire(
        $input: DeleteQuestionNaireInput!
        $condition: ModelQuestionNaireConditionInput
      ) {
        deleteQuestionNaire(input: $input, condition: $condition) {
          questionNaireId
          questionNaireDate
          questionNaireContents
          questionNaireType
          interviewType
          inputType
          primaryId
          secondaryId
          displayOrder
          validFlag
          createdAt
          updatedAt
          questionNaireAnswers {
            items {
              questionNaireAnswerId
              questionNaireAnswerContents
              questionNaireId
              createdAt
              updatedAt
            }
            nextToken
          }
        }
      }
      `),
      variables: {
        input: input
      },
    })
  }
  async ListQuestionNaires(filter) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListQuestionNaires(
        $questionNaireId: ID
        $filter: ModelQuestionNaireFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listQuestionNaires(
          questionNaireId: $questionNaireId
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            questionNaireId
            questionNaireDate
            questionNaireContents
            questionNaireType
            interviewType
            inputType
            primaryId
            secondaryId
            displayOrder
            validFlag
            createdAt
            updatedAt
            questionNaireAnswers {
              nextToken
            }
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
  async ListQuestionNaireValidFlg(validFlag) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListQuestionNaireValidFlg(
        $validFlag: Int
        $sortDirection: ModelSortDirection
        $filter: ModelQuestionNaireFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listQuestionNaireValidFlg(
          validFlag: $validFlag
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            questionNaireId
            questionNaireDate
            questionNaireContents
            questionNaireType
            interviewType
            inputType
            primaryId
            secondaryId
            displayOrder
            validFlag
            createdAt
            updatedAt
            questionNaireAnswers {
              items {
                questionNaireAnswerId
                questionNaireAnswerContents
                questionNaireId
              }
              nextToken
            }
          }
          nextToken
        }
      }
      `),
      variables: {
        validFlag
      },
    })
  }
}
