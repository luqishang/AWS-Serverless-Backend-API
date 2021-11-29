/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
      areaCode
      hcDate
      hckWeight
      hcAbdominal
      appFirstAt
      supportType
      loginNoFlg
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        areaCode
        hcDate
        hckWeight
        hcAbdominal
        appFirstAt
        supportType
        loginNoFlg
        createdAt
        updatedAt
        deletedAt
      }
      nextToken
    }
  }
`;
export const getAreaMaster = /* GraphQL */ `
  query GetAreaMaster($areaCode: ID!) {
    getAreaMaster(areaCode: $areaCode) {
      areaCode
      userId
      createdAt
      updatedAt
    }
  }
`;
export const listAreaMasters = /* GraphQL */ `
  query ListAreaMasters(
    $areaCode: ID
    $filter: ModelAreaMasterFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAreaMasters(
      areaCode: $areaCode
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        areaCode
        userId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNurseSubArea = /* GraphQL */ `
  query GetNurseSubArea($nurseId: ID!, $subAreaCode: ID!) {
    getNurseSubArea(nurseId: $nurseId, subAreaCode: $subAreaCode) {
      nurseId
      subAreaCode
      createdAt
      updatedAt
    }
  }
`;
export const listNurseSubAreas = /* GraphQL */ `
  query ListNurseSubAreas(
    $nurseId: ID
    $subAreaCode: ModelIDKeyConditionInput
    $filter: ModelNurseSubAreaFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listNurseSubAreas(
      nurseId: $nurseId
      subAreaCode: $subAreaCode
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        nurseId
        subAreaCode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNurseUserGroup = /* GraphQL */ `
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
          areaCode
          hcDate
          hckWeight
          hcAbdominal
          appFirstAt
          supportType
          loginNoFlg
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
          areaCode
          hcDate
          hckWeight
          hcAbdominal
          appFirstAt
          supportType
          loginNoFlg
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
`;
export const listNurseUserGroups = /* GraphQL */ `
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
`;
export const getHealthCheck = /* GraphQL */ `
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
`;
export const listHealthChecks = /* GraphQL */ `
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
`;
export const getHealthCheckPerHour = /* GraphQL */ `
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
`;
export const listHealthCheckPerHours = /* GraphQL */ `
  query ListHealthCheckPerHours(
    $userId: ID
    $recordedAtHour: ModelHealthCheckPerHourPrimaryCompositeKeyConditionInput
    $filter: ModelHealthCheckPerHourFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listHealthCheckPerHours(
      userId: $userId
      recordedAtHour: $recordedAtHour
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
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
`;
export const getSpecificHealthGoal = /* GraphQL */ `
  query GetSpecificHealthGoal($userId: ID!, $settingDate: AWSDate!) {
    getSpecificHealthGoal(userId: $userId, settingDate: $settingDate) {
      userId
      settingDate
      period
      goalWeight
      goalAbdominal
      createdAt
      updatedAt
    }
  }
`;
export const listSpecificHealthGoals = /* GraphQL */ `
  query ListSpecificHealthGoals(
    $userId: ID
    $settingDate: ModelStringKeyConditionInput
    $filter: ModelSpecificHealthGoalFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSpecificHealthGoals(
      userId: $userId
      settingDate: $settingDate
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        settingDate
        period
        goalWeight
        goalAbdominal
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRuleMaster = /* GraphQL */ `
  query GetRuleMaster($ruleNo: Int!, $settingDate: AWSDate!) {
    getRuleMaster(ruleNo: $ruleNo, settingDate: $settingDate) {
      ruleNo
      settingDate
      ruleContents
      validFlg
      createdAt
      updatedAt
    }
  }
`;
export const listRuleMasters = /* GraphQL */ `
  query ListRuleMasters(
    $ruleNo: Int
    $settingDate: ModelStringKeyConditionInput
    $filter: ModelRuleMasterFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRuleMasters(
      ruleNo: $ruleNo
      settingDate: $settingDate
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        ruleNo
        settingDate
        ruleContents
        validFlg
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRuleDisplay = /* GraphQL */ `
  query GetRuleDisplay($userId: ID!, $ruleNo: Int!) {
    getRuleDisplay(userId: $userId, ruleNo: $ruleNo) {
      userId
      ruleNo
      displayFlg
      createdAt
      updatedAt
    }
  }
`;
export const listRuleDisplays = /* GraphQL */ `
  query ListRuleDisplays(
    $userId: ID
    $ruleNo: ModelIntKeyConditionInput
    $filter: ModelRuleDisplayFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRuleDisplays(
      userId: $userId
      ruleNo: $ruleNo
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        ruleNo
        displayFlg
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRuleAgree = /* GraphQL */ `
  query GetRuleAgree($userId: ID!, $ruleNo: Int!, $agreedAt: AWSTimestamp!) {
    getRuleAgree(userId: $userId, ruleNo: $ruleNo, agreedAt: $agreedAt) {
      userId
      ruleNo
      agreedAt
      settingDate
      agreement
      createdAt
      updatedAt
    }
  }
`;
export const listRuleAgrees = /* GraphQL */ `
  query ListRuleAgrees(
    $userId: ID
    $ruleNoAgreedAt: ModelRuleAgreePrimaryCompositeKeyConditionInput
    $filter: ModelRuleAgreeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRuleAgrees(
      userId: $userId
      ruleNoAgreedAt: $ruleNoAgreedAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        ruleNo
        agreedAt
        settingDate
        agreement
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEatLog = /* GraphQL */ `
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
`;
export const listEatLogs = /* GraphQL */ `
  query ListEatLogs(
    $userId: ID
    $mealDateMealTimeMealNo: ModelEatLogPrimaryCompositeKeyConditionInput
    $filter: ModelEatLogFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEatLogs(
      userId: $userId
      mealDateMealTimeMealNo: $mealDateMealTimeMealNo
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
      nextToken
    }
  }
`;
export const getChatMessage = /* GraphQL */ `
  query GetChatMessage($id: ID!) {
    getChatMessage(id: $id) {
      id
      groupId
      chatGroup {
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
          deviceToken
          endpointArn
          guidanceDate
          guidanceState
          organizationCd
          organizationName
          areaCode
          hcDate
          hckWeight
          hcAbdominal
          appFirstAt
          supportType
          loginNoFlg
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
`;
export const listChatMessages = /* GraphQL */ `
  query ListChatMessages(
    $filter: ModelChatMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        groupId
        chatGroup {
          nextToken
        }
        body
        postedAt
        postedId
        postedUser {
          nextToken
        }
        deletedAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatGroup = /* GraphQL */ `
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
`;
export const listChatGroups = /* GraphQL */ `
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
`;
export const getChatGroupUser = /* GraphQL */ `
  query GetChatGroupUser($groupId: ID!, $userId: ID!) {
    getChatGroupUser(groupId: $groupId, userId: $userId) {
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
          guidanceDate
          guidanceState
          organizationCd
          organizationName
          areaCode
          hcDate
          hckWeight
          hcAbdominal
          appFirstAt
          supportType
          loginNoFlg
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
`;
export const listChatGroupUsers = /* GraphQL */ `
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
        group {
          nextToken
        }
        userId
        subscriptionArn
        user {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getActionGoalMaster = /* GraphQL */ `
  query GetActionGoalMaster($goalId: Int!) {
    getActionGoalMaster(goalId: $goalId) {
      goalId
      primaryId
      primaryContent
      secondaryId
      secondaryContent
      tertiaryId
      tertiaryContent
      goalContent
      exerciseUnit
      foodUnit
      defaultTime
      defaultQuantity
      defaultFrequency
      foodOneFlg
      foodTwoFlg
      calorie
      createdAt
      updatedAt
    }
  }
`;
export const listActionGoalMasters = /* GraphQL */ `
  query ListActionGoalMasters(
    $goalId: Int
    $filter: ModelActionGoalMasterFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listActionGoalMasters(
      goalId: $goalId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        goalId
        primaryId
        primaryContent
        secondaryId
        secondaryContent
        tertiaryId
        tertiaryContent
        goalContent
        exerciseUnit
        foodUnit
        defaultTime
        defaultQuantity
        defaultFrequency
        foodOneFlg
        foodTwoFlg
        calorie
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getActionGoal = /* GraphQL */ `
  query GetActionGoal($userId: ID!, $goalSettingNo: Int!) {
    getActionGoal(userId: $userId, goalSettingNo: $goalSettingNo) {
      userId
      goalSettingNo
      goalType
      goalId
      primaryId
      secondaryId
      goalContent
      calorie
      goalTime
      goalQuantity
      exerciseUnit
      frequencyCount
      frequencyDayOfWeek
      action
      foodOne
      foodQuantityOne
      foodUnitOne
      foodTwo
      foodQuantityTwo
      foodUnitTwo
      createdAt
      updatedAt
    }
  }
`;
export const listActionGoals = /* GraphQL */ `
  query ListActionGoals(
    $userId: ID
    $goalSettingNo: ModelIntKeyConditionInput
    $filter: ModelActionGoalFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listActionGoals(
      userId: $userId
      goalSettingNo: $goalSettingNo
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        goalSettingNo
        goalType
        goalId
        primaryId
        secondaryId
        goalContent
        calorie
        goalTime
        goalQuantity
        exerciseUnit
        frequencyCount
        frequencyDayOfWeek
        action
        foodOne
        foodQuantityOne
        foodUnitOne
        foodTwo
        foodQuantityTwo
        foodUnitTwo
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getActionGoalLog = /* GraphQL */ `
  query GetActionGoalLog(
    $userId: ID!
    $goalSettingNo: Int!
    $settingAt: AWSTimestamp!
  ) {
    getActionGoalLog(
      userId: $userId
      goalSettingNo: $goalSettingNo
      settingAt: $settingAt
    ) {
      userId
      goalSettingNo
      settingAt
      startDate
      endDate
      historyContent
      goalType
      goalId
      primaryId
      secondaryId
      goalContent
      calorie
      goalTime
      goalQuantity
      exerciseUnit
      frequencyCount
      frequencyDayOfWeek
      action
      foodOne
      foodQuantityOne
      foodUnitOne
      foodTwo
      foodQuantityTwo
      foodUnitTwo
      createdAt
      updatedAt
    }
  }
`;
export const listActionGoalLogs = /* GraphQL */ `
  query ListActionGoalLogs(
    $userId: ID
    $goalSettingNoSettingAt: ModelActionGoalLogPrimaryCompositeKeyConditionInput
    $filter: ModelActionGoalLogFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listActionGoalLogs(
      userId: $userId
      goalSettingNoSettingAt: $goalSettingNoSettingAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        goalSettingNo
        settingAt
        startDate
        endDate
        historyContent
        goalType
        goalId
        primaryId
        secondaryId
        goalContent
        calorie
        goalTime
        goalQuantity
        exerciseUnit
        frequencyCount
        frequencyDayOfWeek
        action
        foodOne
        foodQuantityOne
        foodUnitOne
        foodTwo
        foodQuantityTwo
        foodUnitTwo
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getActionGoalEvaluation = /* GraphQL */ `
  query GetActionGoalEvaluation(
    $userId: ID!
    $goalSettingNo: Int!
    $actionDate: AWSDate!
  ) {
    getActionGoalEvaluation(
      userId: $userId
      goalSettingNo: $goalSettingNo
      actionDate: $actionDate
    ) {
      userId
      goalSettingNo
      actionDate
      actionGoalResult
      createdAt
      updatedAt
    }
  }
`;
export const listActionGoalEvaluations = /* GraphQL */ `
  query ListActionGoalEvaluations(
    $userId: ID
    $goalSettingNoActionDate: ModelActionGoalEvaluationPrimaryCompositeKeyConditionInput
    $filter: ModelActionGoalEvaluationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listActionGoalEvaluations(
      userId: $userId
      goalSettingNoActionDate: $goalSettingNoActionDate
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        goalSettingNo
        actionDate
        actionGoalResult
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getQuestionNaire = /* GraphQL */ `
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
          validFlag
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listQuestionNaires = /* GraphQL */ `
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
`;
export const getQuestionNaireAnswer = /* GraphQL */ `
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
`;
export const listQuestionNaireAnswers = /* GraphQL */ `
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
`;
export const getQuestionNaireAnswerResult = /* GraphQL */ `
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
`;
export const listQuestionNaireAnswerResults = /* GraphQL */ `
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
`;
export const getChatBotMessageLog = /* GraphQL */ `
  query GetChatBotMessageLog(
    $userId: ID!
    $messageId: ID!
    $sendingAt: AWSTimestamp!
  ) {
    getChatBotMessageLog(
      userId: $userId
      messageId: $messageId
      sendingAt: $sendingAt
    ) {
      userId
      messageId
      sendingAt
      achieveStart
      achieveNo
      createdAt
      updatedAt
      chatBotMessageMaster {
        items {
          messageId
          articleType
          subCondition
          week
          achieveStart
          achieveEnd
          achieveNo
          weightFlg
          messageContent
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listChatBotMessageLogs = /* GraphQL */ `
  query ListChatBotMessageLogs(
    $userId: ID
    $messageIdSendingAt: ModelChatBotMessageLogPrimaryCompositeKeyConditionInput
    $filter: ModelChatBotMessageLogFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listChatBotMessageLogs(
      userId: $userId
      messageIdSendingAt: $messageIdSendingAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        messageId
        sendingAt
        achieveStart
        achieveNo
        createdAt
        updatedAt
        chatBotMessageMaster {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getChatBotMessageMaster = /* GraphQL */ `
  query GetChatBotMessageMaster($messageId: ID!) {
    getChatBotMessageMaster(messageId: $messageId) {
      messageId
      articleType
      subCondition
      week
      achieveStart
      achieveEnd
      achieveNo
      weightFlg
      messageContent
      createdAt
      updatedAt
    }
  }
`;
export const listChatBotMessageMasters = /* GraphQL */ `
  query ListChatBotMessageMasters(
    $messageId: ID
    $filter: ModelChatBotMessageMasterFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listChatBotMessageMasters(
      messageId: $messageId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        messageId
        articleType
        subCondition
        week
        achieveStart
        achieveEnd
        achieveNo
        weightFlg
        messageContent
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSupportQuestionNaireLog = /* GraphQL */ `
  query GetSupportQuestionNaireLog($userId: ID!, $supportCount: Int!) {
    getSupportQuestionNaireLog(userId: $userId, supportCount: $supportCount) {
      userId
      supportCount
      recordDate
      weight
      abdominal
      goalSettingNoOne
      goalAchieveRateOne
      goalSettingNoTwo
      goalAchieveRateTwo
      goalSettingNoThree
      goalAchieveRateThree
      foodLife
      bodyActivity
      smokingStatus
      freeInputContent
      createdAt
      updatedAt
    }
  }
`;
export const listSupportQuestionNaireLogs = /* GraphQL */ `
  query ListSupportQuestionNaireLogs(
    $userId: ID
    $supportCount: ModelIntKeyConditionInput
    $filter: ModelSupportQuestionNaireLogFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSupportQuestionNaireLogs(
      userId: $userId
      supportCount: $supportCount
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        supportCount
        recordDate
        weight
        abdominal
        goalSettingNoOne
        goalAchieveRateOne
        goalSettingNoTwo
        goalAchieveRateTwo
        goalSettingNoThree
        goalAchieveRateThree
        foodLife
        bodyActivity
        smokingStatus
        freeInputContent
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSystemConfigure = /* GraphQL */ `
  query GetSystemConfigure($configureNo: ID!) {
    getSystemConfigure(configureNo: $configureNo) {
      configureNo
      configureName
      contents
      createdAt
      updatedAt
    }
  }
`;
export const listSystemConfigures = /* GraphQL */ `
  query ListSystemConfigures(
    $configureNo: ID
    $filter: ModelSystemConfigureFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSystemConfigures(
      configureNo: $configureNo
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        configureNo
        configureName
        contents
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNurseInterviewResult = /* GraphQL */ `
  query GetNurseInterviewResult($userId: ID!, $interviewNo: Int!) {
    getNurseInterviewResult(userId: $userId, interviewNo: $interviewNo) {
      userId
      interviewNo
      interviewDate
      weight
      abdominal
      goalSettingNoOne
      goalSettingOne
      goalChangeOne
      goalChangeFreeContentOne
      goalAchieveRateOne
      goalSettingNoTwo
      goalSettingTwo
      goalChangeTwo
      goalChangeFreeContentTwo
      goalAchieveRateTwo
      goalSettingNoThree
      goalSettingThree
      goalChangeThree
      goalChangeFreeContentThree
      goalAchieveRateThree
      foodLife
      bodyActivity
      smokingStatus
      satisfaction
      goodPoint
      badPoint
      createdAt
      updatedAt
    }
  }
`;
export const listNurseInterviewResults = /* GraphQL */ `
  query ListNurseInterviewResults(
    $userId: ID
    $interviewNo: ModelIntKeyConditionInput
    $filter: ModelNurseInterviewResultFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listNurseInterviewResults(
      userId: $userId
      interviewNo: $interviewNo
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        interviewNo
        interviewDate
        weight
        abdominal
        goalSettingNoOne
        goalSettingOne
        goalChangeOne
        goalChangeFreeContentOne
        goalAchieveRateOne
        goalSettingNoTwo
        goalSettingTwo
        goalChangeTwo
        goalChangeFreeContentTwo
        goalAchieveRateTwo
        goalSettingNoThree
        goalSettingThree
        goalChangeThree
        goalChangeFreeContentThree
        goalAchieveRateThree
        foodLife
        bodyActivity
        smokingStatus
        satisfaction
        goodPoint
        badPoint
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listNurseSubAreaNurseId = /* GraphQL */ `
  query ListNurseSubAreaNurseId(
    $nurseId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelNurseSubAreaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNurseSubAreaNurseId(
      nurseId: $nurseId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        nurseId
        subAreaCode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listNurseUserGroupNurseId = /* GraphQL */ `
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
`;
export const listHealthCheckUserIdRecordAt = /* GraphQL */ `
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
`;
export const listHealthCheckPerHourUserIdRecordAt = /* GraphQL */ `
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
`;
export const listSpecificHealthGoalUserIdSettingDate = /* GraphQL */ `
  query ListSpecificHealthGoalUserIdSettingDate(
    $userId: ID
    $settingDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSpecificHealthGoalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpecificHealthGoalUserIdSettingDate(
      userId: $userId
      settingDate: $settingDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userId
        settingDate
        period
        goalWeight
        goalAbdominal
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listRuleMasterValidFlg = /* GraphQL */ `
  query ListRuleMasterValidFlg(
    $validFlg: Int
    $sortDirection: ModelSortDirection
    $filter: ModelRuleMasterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRuleMasterValidFlg(
      validFlg: $validFlg
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ruleNo
        settingDate
        ruleContents
        validFlg
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listRuleDisplayRuleNo = /* GraphQL */ `
  query ListRuleDisplayRuleNo(
    $ruleNo: Int
    $sortDirection: ModelSortDirection
    $filter: ModelRuleDisplayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRuleDisplayRuleNo(
      ruleNo: $ruleNo
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userId
        ruleNo
        displayFlg
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listRuleAgreeByUserIdRuleNo = /* GraphQL */ `
  query ListRuleAgreeByUserIdRuleNo(
    $userId: ID
    $ruleNo: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRuleAgreeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRuleAgreeByUserIdRuleNo(
      userId: $userId
      ruleNo: $ruleNo
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userId
        ruleNo
        agreedAt
        settingDate
        agreement
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listEatLogByUserIdMealDate = /* GraphQL */ `
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
      nextToken
    }
  }
`;
export const listChatMessageGroupId = /* GraphQL */ `
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
          nextToken
        }
        body
        postedAt
        postedId
        postedUser {
          nextToken
        }
        deletedAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listChatGroupUserUserId = /* GraphQL */ `
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
          nextToken
        }
        userId
        subscriptionArn
        user {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listActionGoalMasterPrimaryIdSecondaryId = /* GraphQL */ `
  query ListActionGoalMasterPrimaryIdSecondaryId(
    $primaryId: String
    $secondaryId: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelActionGoalMasterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActionGoalMasterPrimaryIdSecondaryId(
      primaryId: $primaryId
      secondaryId: $secondaryId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        goalId
        primaryId
        primaryContent
        secondaryId
        secondaryContent
        tertiaryId
        tertiaryContent
        goalContent
        exerciseUnit
        foodUnit
        defaultTime
        defaultQuantity
        defaultFrequency
        foodOneFlg
        foodTwoFlg
        calorie
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listActionGoalUserId = /* GraphQL */ `
  query ListActionGoalUserId(
    $userId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelActionGoalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActionGoalUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userId
        goalSettingNo
        goalType
        goalId
        primaryId
        secondaryId
        goalContent
        calorie
        goalTime
        goalQuantity
        exerciseUnit
        frequencyCount
        frequencyDayOfWeek
        action
        foodOne
        foodQuantityOne
        foodUnitOne
        foodTwo
        foodQuantityTwo
        foodUnitTwo
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listActionGoalLogUserIdHistoryContent = /* GraphQL */ `
  query ListActionGoalLogUserIdHistoryContent(
    $userId: ID
    $historyContent: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelActionGoalLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActionGoalLogUserIdHistoryContent(
      userId: $userId
      historyContent: $historyContent
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userId
        goalSettingNo
        settingAt
        startDate
        endDate
        historyContent
        goalType
        goalId
        primaryId
        secondaryId
        goalContent
        calorie
        goalTime
        goalQuantity
        exerciseUnit
        frequencyCount
        frequencyDayOfWeek
        action
        foodOne
        foodQuantityOne
        foodUnitOne
        foodTwo
        foodQuantityTwo
        foodUnitTwo
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listActionGoalLogUserIdGoalSettingNo = /* GraphQL */ `
  query ListActionGoalLogUserIdGoalSettingNo(
    $userId: ID
    $goalSettingNo: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelActionGoalLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActionGoalLogUserIdGoalSettingNo(
      userId: $userId
      goalSettingNo: $goalSettingNo
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userId
        goalSettingNo
        settingAt
        startDate
        endDate
        historyContent
        goalType
        goalId
        primaryId
        secondaryId
        goalContent
        calorie
        goalTime
        goalQuantity
        exerciseUnit
        frequencyCount
        frequencyDayOfWeek
        action
        foodOne
        foodQuantityOne
        foodUnitOne
        foodTwo
        foodQuantityTwo
        foodUnitTwo
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listActionGoalEvaluationUserIdActionDate = /* GraphQL */ `
  query ListActionGoalEvaluationUserIdActionDate(
    $userId: ID
    $actionDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelActionGoalEvaluationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActionGoalEvaluationUserIdActionDate(
      userId: $userId
      actionDate: $actionDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userId
        goalSettingNo
        actionDate
        actionGoalResult
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listActionGoalEvaluationUserId = /* GraphQL */ `
  query ListActionGoalEvaluationUserId(
    $userId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelActionGoalEvaluationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActionGoalEvaluationUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userId
        goalSettingNo
        actionDate
        actionGoalResult
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listQuestionNaireValidFlg = /* GraphQL */ `
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
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listQuestionNaireAnswerFlg = /* GraphQL */ `
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
`;
export const listQuestionNaireAnswerResultUserId = /* GraphQL */ `
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
`;
export const listChatBotMessageLogAchieveStart = /* GraphQL */ `
  query ListChatBotMessageLogAchieveStart(
    $userId: ID
    $achieveStart: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChatBotMessageLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatBotMessageLogAchieveStart(
      userId: $userId
      achieveStart: $achieveStart
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userId
        messageId
        sendingAt
        achieveStart
        achieveNo
        createdAt
        updatedAt
        chatBotMessageMaster {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listChatBotMessageMasterArticleType = /* GraphQL */ `
  query ListChatBotMessageMasterArticleType(
    $articleType: String
    $sortDirection: ModelSortDirection
    $filter: ModelChatBotMessageMasterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatBotMessageMasterArticleType(
      articleType: $articleType
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        messageId
        articleType
        subCondition
        week
        achieveStart
        achieveEnd
        achieveNo
        weightFlg
        messageContent
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listChatBotMessageMasterArticleTypeSubCondition = /* GraphQL */ `
  query ListChatBotMessageMasterArticleTypeSubCondition(
    $articleType: String
    $subCondition: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChatBotMessageMasterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatBotMessageMasterArticleTypeSubCondition(
      articleType: $articleType
      subCondition: $subCondition
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        messageId
        articleType
        subCondition
        week
        achieveStart
        achieveEnd
        achieveNo
        weightFlg
        messageContent
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listChatBotMessageMasterArticleTypeWeek = /* GraphQL */ `
  query ListChatBotMessageMasterArticleTypeWeek(
    $articleType: String
    $week: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChatBotMessageMasterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatBotMessageMasterArticleTypeWeek(
      articleType: $articleType
      week: $week
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        messageId
        articleType
        subCondition
        week
        achieveStart
        achieveEnd
        achieveNo
        weightFlg
        messageContent
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listSupportQuestionNaireLogUserId = /* GraphQL */ `
  query ListSupportQuestionNaireLogUserId(
    $userId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelSupportQuestionNaireLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSupportQuestionNaireLogUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userId
        supportCount
        recordDate
        weight
        abdominal
        goalSettingNoOne
        goalAchieveRateOne
        goalSettingNoTwo
        goalAchieveRateTwo
        goalSettingNoThree
        goalAchieveRateThree
        foodLife
        bodyActivity
        smokingStatus
        freeInputContent
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listSystemConfigureName = /* GraphQL */ `
  query ListSystemConfigureName(
    $configureName: String
    $sortDirection: ModelSortDirection
    $filter: ModelSystemConfigureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSystemConfigureName(
      configureName: $configureName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        configureNo
        configureName
        contents
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
