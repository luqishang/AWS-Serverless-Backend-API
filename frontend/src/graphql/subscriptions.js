/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateAreaMaster = /* GraphQL */ `
  subscription OnCreateAreaMaster {
    onCreateAreaMaster {
      areaCode
      userId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAreaMaster = /* GraphQL */ `
  subscription OnUpdateAreaMaster {
    onUpdateAreaMaster {
      areaCode
      userId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAreaMaster = /* GraphQL */ `
  subscription OnDeleteAreaMaster {
    onDeleteAreaMaster {
      areaCode
      userId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNurseSubArea = /* GraphQL */ `
  subscription OnCreateNurseSubArea {
    onCreateNurseSubArea {
      nurseId
      subAreaCode
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNurseSubArea = /* GraphQL */ `
  subscription OnUpdateNurseSubArea {
    onUpdateNurseSubArea {
      nurseId
      subAreaCode
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNurseSubArea = /* GraphQL */ `
  subscription OnDeleteNurseSubArea {
    onDeleteNurseSubArea {
      nurseId
      subAreaCode
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNurseUserGroup = /* GraphQL */ `
  subscription OnCreateNurseUserGroup {
    onCreateNurseUserGroup {
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
export const onUpdateNurseUserGroup = /* GraphQL */ `
  subscription OnUpdateNurseUserGroup {
    onUpdateNurseUserGroup {
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
export const onDeleteNurseUserGroup = /* GraphQL */ `
  subscription OnDeleteNurseUserGroup {
    onDeleteNurseUserGroup {
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
export const onCreateHealthCheck = /* GraphQL */ `
  subscription OnCreateHealthCheck {
    onCreateHealthCheck {
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
export const onUpdateHealthCheck = /* GraphQL */ `
  subscription OnUpdateHealthCheck {
    onUpdateHealthCheck {
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
export const onDeleteHealthCheck = /* GraphQL */ `
  subscription OnDeleteHealthCheck {
    onDeleteHealthCheck {
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
export const onCreateHealthCheckPerHour = /* GraphQL */ `
  subscription OnCreateHealthCheckPerHour {
    onCreateHealthCheckPerHour {
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
export const onUpdateHealthCheckPerHour = /* GraphQL */ `
  subscription OnUpdateHealthCheckPerHour {
    onUpdateHealthCheckPerHour {
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
export const onDeleteHealthCheckPerHour = /* GraphQL */ `
  subscription OnDeleteHealthCheckPerHour {
    onDeleteHealthCheckPerHour {
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
export const onCreateSpecificHealthGoal = /* GraphQL */ `
  subscription OnCreateSpecificHealthGoal {
    onCreateSpecificHealthGoal {
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
export const onUpdateSpecificHealthGoal = /* GraphQL */ `
  subscription OnUpdateSpecificHealthGoal {
    onUpdateSpecificHealthGoal {
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
export const onDeleteSpecificHealthGoal = /* GraphQL */ `
  subscription OnDeleteSpecificHealthGoal {
    onDeleteSpecificHealthGoal {
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
export const onCreateRuleMaster = /* GraphQL */ `
  subscription OnCreateRuleMaster {
    onCreateRuleMaster {
      ruleNo
      settingDate
      ruleContents
      validFlg
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRuleMaster = /* GraphQL */ `
  subscription OnUpdateRuleMaster {
    onUpdateRuleMaster {
      ruleNo
      settingDate
      ruleContents
      validFlg
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRuleMaster = /* GraphQL */ `
  subscription OnDeleteRuleMaster {
    onDeleteRuleMaster {
      ruleNo
      settingDate
      ruleContents
      validFlg
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRuleDisplay = /* GraphQL */ `
  subscription OnCreateRuleDisplay {
    onCreateRuleDisplay {
      userId
      ruleNo
      displayFlg
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRuleDisplay = /* GraphQL */ `
  subscription OnUpdateRuleDisplay {
    onUpdateRuleDisplay {
      userId
      ruleNo
      displayFlg
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRuleDisplay = /* GraphQL */ `
  subscription OnDeleteRuleDisplay {
    onDeleteRuleDisplay {
      userId
      ruleNo
      displayFlg
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRuleAgree = /* GraphQL */ `
  subscription OnCreateRuleAgree {
    onCreateRuleAgree {
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
export const onUpdateRuleAgree = /* GraphQL */ `
  subscription OnUpdateRuleAgree {
    onUpdateRuleAgree {
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
export const onDeleteRuleAgree = /* GraphQL */ `
  subscription OnDeleteRuleAgree {
    onDeleteRuleAgree {
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
export const onCreateEatLog = /* GraphQL */ `
  subscription OnCreateEatLog {
    onCreateEatLog {
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
export const onUpdateEatLog = /* GraphQL */ `
  subscription OnUpdateEatLog {
    onUpdateEatLog {
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
export const onDeleteEatLog = /* GraphQL */ `
  subscription OnDeleteEatLog {
    onDeleteEatLog {
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
export const onCreateChatMessage = /* GraphQL */ `
  subscription OnCreateChatMessage {
    onCreateChatMessage {
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
export const onUpdateChatMessage = /* GraphQL */ `
  subscription OnUpdateChatMessage {
    onUpdateChatMessage {
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
export const onDeleteChatMessage = /* GraphQL */ `
  subscription OnDeleteChatMessage {
    onDeleteChatMessage {
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
export const onCreateChatGroup = /* GraphQL */ `
  subscription OnCreateChatGroup {
    onCreateChatGroup {
      id
      name
      topicArn
      deletedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChatGroup = /* GraphQL */ `
  subscription OnUpdateChatGroup {
    onUpdateChatGroup {
      id
      name
      topicArn
      deletedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChatGroup = /* GraphQL */ `
  subscription OnDeleteChatGroup {
    onDeleteChatGroup {
      id
      name
      topicArn
      deletedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChatGroupUser = /* GraphQL */ `
  subscription OnCreateChatGroupUser {
    onCreateChatGroupUser {
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
export const onUpdateChatGroupUser = /* GraphQL */ `
  subscription OnUpdateChatGroupUser {
    onUpdateChatGroupUser {
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
export const onDeleteChatGroupUser = /* GraphQL */ `
  subscription OnDeleteChatGroupUser {
    onDeleteChatGroupUser {
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
export const onCreateActionGoalMaster = /* GraphQL */ `
  subscription OnCreateActionGoalMaster {
    onCreateActionGoalMaster {
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
export const onUpdateActionGoalMaster = /* GraphQL */ `
  subscription OnUpdateActionGoalMaster {
    onUpdateActionGoalMaster {
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
export const onDeleteActionGoalMaster = /* GraphQL */ `
  subscription OnDeleteActionGoalMaster {
    onDeleteActionGoalMaster {
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
export const onCreateActionGoal = /* GraphQL */ `
  subscription OnCreateActionGoal {
    onCreateActionGoal {
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
export const onUpdateActionGoal = /* GraphQL */ `
  subscription OnUpdateActionGoal {
    onUpdateActionGoal {
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
export const onDeleteActionGoal = /* GraphQL */ `
  subscription OnDeleteActionGoal {
    onDeleteActionGoal {
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
export const onCreateActionGoalLog = /* GraphQL */ `
  subscription OnCreateActionGoalLog {
    onCreateActionGoalLog {
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
export const onUpdateActionGoalLog = /* GraphQL */ `
  subscription OnUpdateActionGoalLog {
    onUpdateActionGoalLog {
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
export const onDeleteActionGoalLog = /* GraphQL */ `
  subscription OnDeleteActionGoalLog {
    onDeleteActionGoalLog {
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
export const onCreateActionGoalEvaluation = /* GraphQL */ `
  subscription OnCreateActionGoalEvaluation {
    onCreateActionGoalEvaluation {
      userId
      goalSettingNo
      actionDate
      actionGoalResult
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateActionGoalEvaluation = /* GraphQL */ `
  subscription OnUpdateActionGoalEvaluation {
    onUpdateActionGoalEvaluation {
      userId
      goalSettingNo
      actionDate
      actionGoalResult
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteActionGoalEvaluation = /* GraphQL */ `
  subscription OnDeleteActionGoalEvaluation {
    onDeleteActionGoalEvaluation {
      userId
      goalSettingNo
      actionDate
      actionGoalResult
      createdAt
      updatedAt
    }
  }
`;
export const onCreateQuestionNaire = /* GraphQL */ `
  subscription OnCreateQuestionNaire {
    onCreateQuestionNaire {
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
export const onUpdateQuestionNaire = /* GraphQL */ `
  subscription OnUpdateQuestionNaire {
    onUpdateQuestionNaire {
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
export const onDeleteQuestionNaire = /* GraphQL */ `
  subscription OnDeleteQuestionNaire {
    onDeleteQuestionNaire {
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
export const onCreateQuestionNaireAnswer = /* GraphQL */ `
  subscription OnCreateQuestionNaireAnswer {
    onCreateQuestionNaireAnswer {
      questionNaireAnswerId
      questionNaireAnswerContents
      questionNaireId
      validFlag
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateQuestionNaireAnswer = /* GraphQL */ `
  subscription OnUpdateQuestionNaireAnswer {
    onUpdateQuestionNaireAnswer {
      questionNaireAnswerId
      questionNaireAnswerContents
      questionNaireId
      validFlag
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteQuestionNaireAnswer = /* GraphQL */ `
  subscription OnDeleteQuestionNaireAnswer {
    onDeleteQuestionNaireAnswer {
      questionNaireAnswerId
      questionNaireAnswerContents
      questionNaireId
      validFlag
      createdAt
      updatedAt
    }
  }
`;
export const onCreateQuestionNaireAnswerResult = /* GraphQL */ `
  subscription OnCreateQuestionNaireAnswerResult {
    onCreateQuestionNaireAnswerResult {
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
export const onUpdateQuestionNaireAnswerResult = /* GraphQL */ `
  subscription OnUpdateQuestionNaireAnswerResult {
    onUpdateQuestionNaireAnswerResult {
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
export const onDeleteQuestionNaireAnswerResult = /* GraphQL */ `
  subscription OnDeleteQuestionNaireAnswerResult {
    onDeleteQuestionNaireAnswerResult {
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
export const onCreateChatBotMessageLog = /* GraphQL */ `
  subscription OnCreateChatBotMessageLog {
    onCreateChatBotMessageLog {
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
export const onUpdateChatBotMessageLog = /* GraphQL */ `
  subscription OnUpdateChatBotMessageLog {
    onUpdateChatBotMessageLog {
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
export const onDeleteChatBotMessageLog = /* GraphQL */ `
  subscription OnDeleteChatBotMessageLog {
    onDeleteChatBotMessageLog {
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
export const onCreateChatBotMessageMaster = /* GraphQL */ `
  subscription OnCreateChatBotMessageMaster {
    onCreateChatBotMessageMaster {
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
export const onUpdateChatBotMessageMaster = /* GraphQL */ `
  subscription OnUpdateChatBotMessageMaster {
    onUpdateChatBotMessageMaster {
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
export const onDeleteChatBotMessageMaster = /* GraphQL */ `
  subscription OnDeleteChatBotMessageMaster {
    onDeleteChatBotMessageMaster {
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
export const onCreateSupportQuestionNaireLog = /* GraphQL */ `
  subscription OnCreateSupportQuestionNaireLog {
    onCreateSupportQuestionNaireLog {
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
export const onUpdateSupportQuestionNaireLog = /* GraphQL */ `
  subscription OnUpdateSupportQuestionNaireLog {
    onUpdateSupportQuestionNaireLog {
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
export const onDeleteSupportQuestionNaireLog = /* GraphQL */ `
  subscription OnDeleteSupportQuestionNaireLog {
    onDeleteSupportQuestionNaireLog {
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
export const onCreateSystemConfigure = /* GraphQL */ `
  subscription OnCreateSystemConfigure {
    onCreateSystemConfigure {
      configureNo
      configureName
      contents
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSystemConfigure = /* GraphQL */ `
  subscription OnUpdateSystemConfigure {
    onUpdateSystemConfigure {
      configureNo
      configureName
      contents
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSystemConfigure = /* GraphQL */ `
  subscription OnDeleteSystemConfigure {
    onDeleteSystemConfigure {
      configureNo
      configureName
      contents
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNurseInterviewResult = /* GraphQL */ `
  subscription OnCreateNurseInterviewResult {
    onCreateNurseInterviewResult {
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
export const onUpdateNurseInterviewResult = /* GraphQL */ `
  subscription OnUpdateNurseInterviewResult {
    onUpdateNurseInterviewResult {
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
export const onDeleteNurseInterviewResult = /* GraphQL */ `
  subscription OnDeleteNurseInterviewResult {
    onDeleteNurseInterviewResult {
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
