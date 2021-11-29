/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createAreaMaster = /* GraphQL */ `
  mutation CreateAreaMaster(
    $input: CreateAreaMasterInput!
    $condition: ModelAreaMasterConditionInput
  ) {
    createAreaMaster(input: $input, condition: $condition) {
      areaCode
      userId
      createdAt
      updatedAt
    }
  }
`;
export const updateAreaMaster = /* GraphQL */ `
  mutation UpdateAreaMaster(
    $input: UpdateAreaMasterInput!
    $condition: ModelAreaMasterConditionInput
  ) {
    updateAreaMaster(input: $input, condition: $condition) {
      areaCode
      userId
      createdAt
      updatedAt
    }
  }
`;
export const deleteAreaMaster = /* GraphQL */ `
  mutation DeleteAreaMaster(
    $input: DeleteAreaMasterInput!
    $condition: ModelAreaMasterConditionInput
  ) {
    deleteAreaMaster(input: $input, condition: $condition) {
      areaCode
      userId
      createdAt
      updatedAt
    }
  }
`;
export const createNurseSubArea = /* GraphQL */ `
  mutation CreateNurseSubArea(
    $input: CreateNurseSubAreaInput!
    $condition: ModelNurseSubAreaConditionInput
  ) {
    createNurseSubArea(input: $input, condition: $condition) {
      nurseId
      subAreaCode
      createdAt
      updatedAt
    }
  }
`;
export const updateNurseSubArea = /* GraphQL */ `
  mutation UpdateNurseSubArea(
    $input: UpdateNurseSubAreaInput!
    $condition: ModelNurseSubAreaConditionInput
  ) {
    updateNurseSubArea(input: $input, condition: $condition) {
      nurseId
      subAreaCode
      createdAt
      updatedAt
    }
  }
`;
export const deleteNurseSubArea = /* GraphQL */ `
  mutation DeleteNurseSubArea(
    $input: DeleteNurseSubAreaInput!
    $condition: ModelNurseSubAreaConditionInput
  ) {
    deleteNurseSubArea(input: $input, condition: $condition) {
      nurseId
      subAreaCode
      createdAt
      updatedAt
    }
  }
`;
export const createNurseUserGroup = /* GraphQL */ `
  mutation CreateNurseUserGroup(
    $input: CreateNurseUserGroupInput!
    $condition: ModelNurseUserGroupConditionInput
  ) {
    createNurseUserGroup(input: $input, condition: $condition) {
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
export const updateNurseUserGroup = /* GraphQL */ `
  mutation UpdateNurseUserGroup(
    $input: UpdateNurseUserGroupInput!
    $condition: ModelNurseUserGroupConditionInput
  ) {
    updateNurseUserGroup(input: $input, condition: $condition) {
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
export const deleteNurseUserGroup = /* GraphQL */ `
  mutation DeleteNurseUserGroup(
    $input: DeleteNurseUserGroupInput!
    $condition: ModelNurseUserGroupConditionInput
  ) {
    deleteNurseUserGroup(input: $input, condition: $condition) {
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
export const createHealthCheck = /* GraphQL */ `
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
`;
export const updateHealthCheck = /* GraphQL */ `
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
`;
export const deleteHealthCheck = /* GraphQL */ `
  mutation DeleteHealthCheck(
    $input: DeleteHealthCheckInput!
    $condition: ModelHealthCheckConditionInput
  ) {
    deleteHealthCheck(input: $input, condition: $condition) {
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
export const createHealthCheckPerHour = /* GraphQL */ `
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
`;
export const updateHealthCheckPerHour = /* GraphQL */ `
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
`;
export const deleteHealthCheckPerHour = /* GraphQL */ `
  mutation DeleteHealthCheckPerHour(
    $input: DeleteHealthCheckPerHourInput!
    $condition: ModelHealthCheckPerHourConditionInput
  ) {
    deleteHealthCheckPerHour(input: $input, condition: $condition) {
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
export const createSpecificHealthGoal = /* GraphQL */ `
  mutation CreateSpecificHealthGoal(
    $input: CreateSpecificHealthGoalInput!
    $condition: ModelSpecificHealthGoalConditionInput
  ) {
    createSpecificHealthGoal(input: $input, condition: $condition) {
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
export const updateSpecificHealthGoal = /* GraphQL */ `
  mutation UpdateSpecificHealthGoal(
    $input: UpdateSpecificHealthGoalInput!
    $condition: ModelSpecificHealthGoalConditionInput
  ) {
    updateSpecificHealthGoal(input: $input, condition: $condition) {
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
export const deleteSpecificHealthGoal = /* GraphQL */ `
  mutation DeleteSpecificHealthGoal(
    $input: DeleteSpecificHealthGoalInput!
    $condition: ModelSpecificHealthGoalConditionInput
  ) {
    deleteSpecificHealthGoal(input: $input, condition: $condition) {
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
export const createRuleMaster = /* GraphQL */ `
  mutation CreateRuleMaster(
    $input: CreateRuleMasterInput!
    $condition: ModelRuleMasterConditionInput
  ) {
    createRuleMaster(input: $input, condition: $condition) {
      ruleNo
      settingDate
      ruleContents
      validFlg
      createdAt
      updatedAt
    }
  }
`;
export const updateRuleMaster = /* GraphQL */ `
  mutation UpdateRuleMaster(
    $input: UpdateRuleMasterInput!
    $condition: ModelRuleMasterConditionInput
  ) {
    updateRuleMaster(input: $input, condition: $condition) {
      ruleNo
      settingDate
      ruleContents
      validFlg
      createdAt
      updatedAt
    }
  }
`;
export const deleteRuleMaster = /* GraphQL */ `
  mutation DeleteRuleMaster(
    $input: DeleteRuleMasterInput!
    $condition: ModelRuleMasterConditionInput
  ) {
    deleteRuleMaster(input: $input, condition: $condition) {
      ruleNo
      settingDate
      ruleContents
      validFlg
      createdAt
      updatedAt
    }
  }
`;
export const createRuleDisplay = /* GraphQL */ `
  mutation CreateRuleDisplay(
    $input: CreateRuleDisplayInput!
    $condition: ModelRuleDisplayConditionInput
  ) {
    createRuleDisplay(input: $input, condition: $condition) {
      userId
      ruleNo
      displayFlg
      createdAt
      updatedAt
    }
  }
`;
export const updateRuleDisplay = /* GraphQL */ `
  mutation UpdateRuleDisplay(
    $input: UpdateRuleDisplayInput!
    $condition: ModelRuleDisplayConditionInput
  ) {
    updateRuleDisplay(input: $input, condition: $condition) {
      userId
      ruleNo
      displayFlg
      createdAt
      updatedAt
    }
  }
`;
export const deleteRuleDisplay = /* GraphQL */ `
  mutation DeleteRuleDisplay(
    $input: DeleteRuleDisplayInput!
    $condition: ModelRuleDisplayConditionInput
  ) {
    deleteRuleDisplay(input: $input, condition: $condition) {
      userId
      ruleNo
      displayFlg
      createdAt
      updatedAt
    }
  }
`;
export const createRuleAgree = /* GraphQL */ `
  mutation CreateRuleAgree(
    $input: CreateRuleAgreeInput!
    $condition: ModelRuleAgreeConditionInput
  ) {
    createRuleAgree(input: $input, condition: $condition) {
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
export const updateRuleAgree = /* GraphQL */ `
  mutation UpdateRuleAgree(
    $input: UpdateRuleAgreeInput!
    $condition: ModelRuleAgreeConditionInput
  ) {
    updateRuleAgree(input: $input, condition: $condition) {
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
export const deleteRuleAgree = /* GraphQL */ `
  mutation DeleteRuleAgree(
    $input: DeleteRuleAgreeInput!
    $condition: ModelRuleAgreeConditionInput
  ) {
    deleteRuleAgree(input: $input, condition: $condition) {
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
export const createEatLog = /* GraphQL */ `
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
`;
export const updateEatLog = /* GraphQL */ `
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
`;
export const deleteEatLog = /* GraphQL */ `
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
`;
export const createChatMessage = /* GraphQL */ `
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
export const updateChatMessage = /* GraphQL */ `
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
export const deleteChatMessage = /* GraphQL */ `
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
export const createChatGroup = /* GraphQL */ `
  mutation CreateChatGroup(
    $input: CreateChatGroupInput!
    $condition: ModelChatGroupConditionInput
  ) {
    createChatGroup(input: $input, condition: $condition) {
      id
      name
      topicArn
      deletedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateChatGroup = /* GraphQL */ `
  mutation UpdateChatGroup(
    $input: UpdateChatGroupInput!
    $condition: ModelChatGroupConditionInput
  ) {
    updateChatGroup(input: $input, condition: $condition) {
      id
      name
      topicArn
      deletedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteChatGroup = /* GraphQL */ `
  mutation DeleteChatGroup(
    $input: DeleteChatGroupInput!
    $condition: ModelChatGroupConditionInput
  ) {
    deleteChatGroup(input: $input, condition: $condition) {
      id
      name
      topicArn
      deletedAt
      createdAt
      updatedAt
    }
  }
`;
export const createChatGroupUser = /* GraphQL */ `
  mutation CreateChatGroupUser(
    $input: CreateChatGroupUserInput!
    $condition: ModelChatGroupUserConditionInput
  ) {
    createChatGroupUser(input: $input, condition: $condition) {
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
export const updateChatGroupUser = /* GraphQL */ `
  mutation UpdateChatGroupUser(
    $input: UpdateChatGroupUserInput!
    $condition: ModelChatGroupUserConditionInput
  ) {
    updateChatGroupUser(input: $input, condition: $condition) {
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
export const deleteChatGroupUser = /* GraphQL */ `
  mutation DeleteChatGroupUser(
    $input: DeleteChatGroupUserInput!
    $condition: ModelChatGroupUserConditionInput
  ) {
    deleteChatGroupUser(input: $input, condition: $condition) {
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
export const createActionGoalMaster = /* GraphQL */ `
  mutation CreateActionGoalMaster(
    $input: CreateActionGoalMasterInput!
    $condition: ModelActionGoalMasterConditionInput
  ) {
    createActionGoalMaster(input: $input, condition: $condition) {
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
export const updateActionGoalMaster = /* GraphQL */ `
  mutation UpdateActionGoalMaster(
    $input: UpdateActionGoalMasterInput!
    $condition: ModelActionGoalMasterConditionInput
  ) {
    updateActionGoalMaster(input: $input, condition: $condition) {
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
export const deleteActionGoalMaster = /* GraphQL */ `
  mutation DeleteActionGoalMaster(
    $input: DeleteActionGoalMasterInput!
    $condition: ModelActionGoalMasterConditionInput
  ) {
    deleteActionGoalMaster(input: $input, condition: $condition) {
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
export const createActionGoal = /* GraphQL */ `
  mutation CreateActionGoal(
    $input: CreateActionGoalInput!
    $condition: ModelActionGoalConditionInput
  ) {
    createActionGoal(input: $input, condition: $condition) {
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
export const updateActionGoal = /* GraphQL */ `
  mutation UpdateActionGoal(
    $input: UpdateActionGoalInput!
    $condition: ModelActionGoalConditionInput
  ) {
    updateActionGoal(input: $input, condition: $condition) {
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
export const deleteActionGoal = /* GraphQL */ `
  mutation DeleteActionGoal(
    $input: DeleteActionGoalInput!
    $condition: ModelActionGoalConditionInput
  ) {
    deleteActionGoal(input: $input, condition: $condition) {
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
export const createActionGoalLog = /* GraphQL */ `
  mutation CreateActionGoalLog(
    $input: CreateActionGoalLogInput!
    $condition: ModelActionGoalLogConditionInput
  ) {
    createActionGoalLog(input: $input, condition: $condition) {
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
export const updateActionGoalLog = /* GraphQL */ `
  mutation UpdateActionGoalLog(
    $input: UpdateActionGoalLogInput!
    $condition: ModelActionGoalLogConditionInput
  ) {
    updateActionGoalLog(input: $input, condition: $condition) {
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
export const deleteActionGoalLog = /* GraphQL */ `
  mutation DeleteActionGoalLog(
    $input: DeleteActionGoalLogInput!
    $condition: ModelActionGoalLogConditionInput
  ) {
    deleteActionGoalLog(input: $input, condition: $condition) {
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
export const createActionGoalEvaluation = /* GraphQL */ `
  mutation CreateActionGoalEvaluation(
    $input: CreateActionGoalEvaluationInput!
    $condition: ModelActionGoalEvaluationConditionInput
  ) {
    createActionGoalEvaluation(input: $input, condition: $condition) {
      userId
      goalSettingNo
      actionDate
      actionGoalResult
      createdAt
      updatedAt
    }
  }
`;
export const updateActionGoalEvaluation = /* GraphQL */ `
  mutation UpdateActionGoalEvaluation(
    $input: UpdateActionGoalEvaluationInput!
    $condition: ModelActionGoalEvaluationConditionInput
  ) {
    updateActionGoalEvaluation(input: $input, condition: $condition) {
      userId
      goalSettingNo
      actionDate
      actionGoalResult
      createdAt
      updatedAt
    }
  }
`;
export const deleteActionGoalEvaluation = /* GraphQL */ `
  mutation DeleteActionGoalEvaluation(
    $input: DeleteActionGoalEvaluationInput!
    $condition: ModelActionGoalEvaluationConditionInput
  ) {
    deleteActionGoalEvaluation(input: $input, condition: $condition) {
      userId
      goalSettingNo
      actionDate
      actionGoalResult
      createdAt
      updatedAt
    }
  }
`;
export const createQuestionNaire = /* GraphQL */ `
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
          validFlag
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateQuestionNaire = /* GraphQL */ `
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
          validFlag
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteQuestionNaire = /* GraphQL */ `
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
          validFlag
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createQuestionNaireAnswer = /* GraphQL */ `
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
`;
export const updateQuestionNaireAnswer = /* GraphQL */ `
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
`;
export const deleteQuestionNaireAnswer = /* GraphQL */ `
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
`;
export const createQuestionNaireAnswerResult = /* GraphQL */ `
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
`;
export const updateQuestionNaireAnswerResult = /* GraphQL */ `
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
`;
export const deleteQuestionNaireAnswerResult = /* GraphQL */ `
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
`;
export const createChatBotMessageLog = /* GraphQL */ `
  mutation CreateChatBotMessageLog(
    $input: CreateChatBotMessageLogInput!
    $condition: ModelChatBotMessageLogConditionInput
  ) {
    createChatBotMessageLog(input: $input, condition: $condition) {
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
export const updateChatBotMessageLog = /* GraphQL */ `
  mutation UpdateChatBotMessageLog(
    $input: UpdateChatBotMessageLogInput!
    $condition: ModelChatBotMessageLogConditionInput
  ) {
    updateChatBotMessageLog(input: $input, condition: $condition) {
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
export const deleteChatBotMessageLog = /* GraphQL */ `
  mutation DeleteChatBotMessageLog(
    $input: DeleteChatBotMessageLogInput!
    $condition: ModelChatBotMessageLogConditionInput
  ) {
    deleteChatBotMessageLog(input: $input, condition: $condition) {
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
export const createChatBotMessageMaster = /* GraphQL */ `
  mutation CreateChatBotMessageMaster(
    $input: CreateChatBotMessageMasterInput!
    $condition: ModelChatBotMessageMasterConditionInput
  ) {
    createChatBotMessageMaster(input: $input, condition: $condition) {
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
export const updateChatBotMessageMaster = /* GraphQL */ `
  mutation UpdateChatBotMessageMaster(
    $input: UpdateChatBotMessageMasterInput!
    $condition: ModelChatBotMessageMasterConditionInput
  ) {
    updateChatBotMessageMaster(input: $input, condition: $condition) {
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
export const deleteChatBotMessageMaster = /* GraphQL */ `
  mutation DeleteChatBotMessageMaster(
    $input: DeleteChatBotMessageMasterInput!
    $condition: ModelChatBotMessageMasterConditionInput
  ) {
    deleteChatBotMessageMaster(input: $input, condition: $condition) {
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
export const createSupportQuestionNaireLog = /* GraphQL */ `
  mutation CreateSupportQuestionNaireLog(
    $input: CreateSupportQuestionNaireLogInput!
    $condition: ModelSupportQuestionNaireLogConditionInput
  ) {
    createSupportQuestionNaireLog(input: $input, condition: $condition) {
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
export const updateSupportQuestionNaireLog = /* GraphQL */ `
  mutation UpdateSupportQuestionNaireLog(
    $input: UpdateSupportQuestionNaireLogInput!
    $condition: ModelSupportQuestionNaireLogConditionInput
  ) {
    updateSupportQuestionNaireLog(input: $input, condition: $condition) {
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
export const deleteSupportQuestionNaireLog = /* GraphQL */ `
  mutation DeleteSupportQuestionNaireLog(
    $input: DeleteSupportQuestionNaireLogInput!
    $condition: ModelSupportQuestionNaireLogConditionInput
  ) {
    deleteSupportQuestionNaireLog(input: $input, condition: $condition) {
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
export const createSystemConfigure = /* GraphQL */ `
  mutation CreateSystemConfigure(
    $input: CreateSystemConfigureInput!
    $condition: ModelSystemConfigureConditionInput
  ) {
    createSystemConfigure(input: $input, condition: $condition) {
      configureNo
      configureName
      contents
      createdAt
      updatedAt
    }
  }
`;
export const updateSystemConfigure = /* GraphQL */ `
  mutation UpdateSystemConfigure(
    $input: UpdateSystemConfigureInput!
    $condition: ModelSystemConfigureConditionInput
  ) {
    updateSystemConfigure(input: $input, condition: $condition) {
      configureNo
      configureName
      contents
      createdAt
      updatedAt
    }
  }
`;
export const deleteSystemConfigure = /* GraphQL */ `
  mutation DeleteSystemConfigure(
    $input: DeleteSystemConfigureInput!
    $condition: ModelSystemConfigureConditionInput
  ) {
    deleteSystemConfigure(input: $input, condition: $condition) {
      configureNo
      configureName
      contents
      createdAt
      updatedAt
    }
  }
`;
export const createNurseInterviewResult = /* GraphQL */ `
  mutation CreateNurseInterviewResult(
    $input: CreateNurseInterviewResultInput!
    $condition: ModelNurseInterviewResultConditionInput
  ) {
    createNurseInterviewResult(input: $input, condition: $condition) {
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
export const updateNurseInterviewResult = /* GraphQL */ `
  mutation UpdateNurseInterviewResult(
    $input: UpdateNurseInterviewResultInput!
    $condition: ModelNurseInterviewResultConditionInput
  ) {
    updateNurseInterviewResult(input: $input, condition: $condition) {
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
export const deleteNurseInterviewResult = /* GraphQL */ `
  mutation DeleteNurseInterviewResult(
    $input: DeleteNurseInterviewResultInput!
    $condition: ModelNurseInterviewResultConditionInput
  ) {
    deleteNurseInterviewResult(input: $input, condition: $condition) {
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
