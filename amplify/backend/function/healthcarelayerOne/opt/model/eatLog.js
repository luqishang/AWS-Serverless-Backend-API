const gql = require('graphql-tag')

const AppSync = require('./appSync')

module.exports = class Patients extends AppSync {
  constructor() {
    super()
  }

  async GetEatLog(userId, mealDate, mealTime, mealNo) {
    return await this.appSyncClient.query({
      query: gql(`
      query GetEatLog(
        $userId: ID!
        $mealDate: AWSDate!
        $mealTime: String!
        $mealNo: Int!
      ) {
        getEatLog(
          userId: $userId
          mealDate: $mealDate
          mealTime: $mealTime
          mealNo: $mealNo
        ) {
          userId
          mealDate
          mealTime
          mealNo
          photoTime
          photoKey
          photoPath
          mealContents
          importedBy
          menuName
          energy
          protein
          lipid
          carbohydrate
          salinity
          createdAt
          updatedAt
        }
      }
      `),
      variables: {
        userId,
        mealDate,
        mealTime,
        mealNo
      },
    })
  }
  async CreateEatLog(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation CreateEatLog(
        $input: CreateEatLogInput!
        $condition: ModelEatLogConditionInput
      ) {
        createEatLog(input: $input, condition: $condition) {
          userId
          mealDate
          mealTime
          mealNo
          photoTime
          photoKey
          photoPath
          mealContents
          importedBy
          menuName
          energy
          protein
          lipid
          carbohydrate
          salinity
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
  async UpdateEatLog(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation UpdateEatLog(
        $input: UpdateEatLogInput!
        $condition: ModelEatLogConditionInput
      ) {
        updateEatLog(input: $input, condition: $condition) {
          userId
          mealDate
          mealTime
          mealNo
          photoTime
          photoKey
          photoPath
          mealContents
          importedBy
          menuName
          energy
          protein
          lipid
          carbohydrate
          salinity
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
  async ListEatLogByUserIdMealDate(userId, mealDate) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListEatLogByUserIdMealDate(
        $userId: ID
        $mealDate: ModelStringKeyConditionInput
        $sortDirection: ModelSortDirection
        $filter: ModelEatLogFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listEatLogByUserIdMealDate(
          userId: $userId
          mealDate: $mealDate
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            mealDate
            mealTime
            mealNo
            photoTime
            photoKey
            photoPath
            mealContents
            importedBy
            menuName
            energy
            protein
            lipid
            carbohydrate
            salinity
          }
          nextToken
        }
      }
      `),
      variables: {
        userId,
        mealDate
      },
    })
  }
  async DeleteEatLog(input) {
    return await this.appSyncClient.mutate({
      mutation: gql(`
      mutation DeleteEatLog(
        $input: DeleteEatLogInput!
        $condition: ModelEatLogConditionInput
      ) {
        deleteEatLog(input: $input, condition: $condition) {
          userId
          mealDate
          mealTime
          mealNo
          photoTime
          photoKey
          photoPath
          mealContents
          importedBy
          menuName
          energy
          protein
          lipid
          carbohydrate
          salinity
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

  async ListEatLogs(userId, limit, nextToken, sortDirection) {
    return await this.appSyncClient.query({
      query: gql(`
      query ListEatLogs(
        $userId: ID
        $filter: ModelEatLogFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listEatLogs(
          userId: $userId
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            userId
            mealDate
            mealTime
            mealNo
            photoTime
            photoPath
            mealContents
            importedBy
            menuName
            energy
            protein
            lipid
            carbohydrate
            salinity
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
  // async getRecentEatlog(userId) {
  //   //この関数は使用禁止
  //   //eatLogテーブルのソートキーはmealDate#mealTime#mealNoなので、ソートできない
  //   //原因はmealNoはInt型ですので、以下の順番でデータを取っている
  //   //mealDate=2021-06-30 mealTime=09:00 mealNo=9
  //   //mealDate=2021-06-30 mealTime=09:00 mealNo=8
  //   //mealDate=2021-06-30 mealTime=09:00 mealNo=7
  //   //mealDate=2021-06-30 mealTime=09:00 mealNo=6
  //   //mealDate=2021-06-30 mealTime=09:00 mealNo=5
  //   //mealDate=2021-06-30 mealTime=09:00 mealNo=4
  //   //mealDate=2021-06-30 mealTime=09:00 mealNo=3
  //   //mealDate=2021-06-30 mealTime=09:00 mealNo=2
  //   //mealDate=2021-06-30 mealTime=09:00 mealNo=15
  //   //mealDate=2021-06-30 mealTime=09:00 mealNo=14
  //   //mealDate=2021-06-30 mealTime=09:00 mealNo=13
  //   //mealDate=2021-06-30 mealTime=09:00 mealNo=12
  //   //mealDate=2021-06-30 mealTime=09:00 mealNo=11
  //   //mealDate=2021-06-30 mealTime=09:00 mealNo=10    
  //   //mealDate=2021-06-30 mealTime=09:00 mealNo=1
  //   const result = []
  //   const eatLogModel = new EatLog() 

  //   const list = async function (userId, nextToken) {
  //     const ModelSortDirection = { ASC: 'ASC', DESC: 'DESC' } 
  //     const listEatLogsResult = await eatLogModel.ListEatLogs(userId, 1, nextToken, ModelSortDirection.DESC)
  //     const eatLogs =  listEatLogsResult.data.listEatLogs.items
  //     if (eatLogs.length) {        
  //       const eatLog = eatLogs[0]
  //       result.push(eatLog)
  //       console.log('userId = ' + eatLog.userId + ' mealDate = ' + eatLog.mealDate + ' mealTime = ' + eatLog.mealTime + ' mealNo = ' + eatLog.mealNo)
  //     }      
  //     if (listEatLogsResult.data.listEatLogs.nextToken) {
  //       await list(userId, listEatLogsResult.data.listEatLogs.nextToken)
  //     }
  //   }
  //   await list(userId, null)
  //   return result
  // }
}
