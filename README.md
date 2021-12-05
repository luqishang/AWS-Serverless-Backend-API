# 环境搭建
## install software for development
1. Visudal Studio Code  
   https://azure.microsoft.com/ja-jp/products/visual-studio-code/
1. Node.js
   https://nodejs.org/ja/
1. AWS CLI  
   https://aws.amazon.com/jp/cli/
1. Git tool（VSCode and SourceTree）  
   https://www.sourcetreeapp.com/
1. Postman HTTP access tool  
   https://www.postman.com/downloads/
  
## SAM local debug software   
1. Docker  
   https://docs.docker.com/desktop/windows/install/
1. AWS SAM CLI   
   https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/serverless-sam-cli-install-windows.html
1. WSL  
   https://docs.microsoft.com/ja-jp/windows/wsl/install  


## VSCode enviroment setting
### ESLint(JavaScript style check) install

1. menu please click(Ctrl+Shift+X)
1. input「eslint」
1. choose「ESLint」
1. start install

## install Node.js modules
1. Amplify CLI   
install Node.js and then run command under
    ~~~
    npm install -g @aws-amplify/cli
    npm install nodemon -g
    ~~~

# Get source and create local debug enviroment
1. pull source from Git repository devlop branch
1. create AWS profile file by under command
   ~~~
   aws configure
   AWS Access Key ID:
   AWS Secret Access Key:
   Default region name [Japan]:ap-northeast-1
   Default output format [json]:json
   ~~~
1. run under command in project root path (such as C:\20_Wcheng\AWS-Serverless-Backend-API)
   ~~~
   amplify init
   ? Do you want to use an existing environment? (Y/n) Y
   ? Choose the environment you would like to use: (Use arrow keys)
   > dev
   ? Choose your default editor: (Use arrow keys)
   > Visual Studio Code
     Android Studio
     Xcode (Mac OS only)
     Atom Editor
     Sublime Text
     IntelliJ IDEA
     Vim (via Terminal, Mac OS only)
   (Move up and down to reveal more choices)
   ? Please choose the profile you want to use:
   > default
   ~~~
1. please use AWS profile (default) that you ceate it by aws configure command.
1. add those path to your VSCode workspace  
   ①amplify/backend/function/healthcarelayerOne  
   ②amplify/backend/function/healthcare/src  
   ③amplify/backend/function/tmcimport/src    
   ④amplify/backend/function/tmcimport/src  
   ⑤amplify/backend/api/healthcareGraphQL  
   ⑥frontend/src/graphql 
1. In amplify/backend/function/healthcarelayerOne/lib/nodejs install node modules
   ```
   npm install
   ```
1. VSCode run and debug menu  
   ① When debug webapi  
     select 「Run Express api(src)」and click it  
     you can confirm webapi by under URL with Postman  
     http://localhost:3000/v1/auth  
   ② When debug S3 trigger event  
     select「Run S3 Trigger(src)」and click it  
     when you want to debug diffirent file of S3 bucket, you can change 「aws-sam」「payload」S3「key」in amplify/backend/function/tmcimport/src/.vscode/launch.json
   ③ When debug https send file event  
     select「Run Send CSV to TMC(src)」and click it
* ※Even you debug in your local enviroment, It will access AWS Cognito and DynamoDB
* ※When add new module,you must modify amplify/backend/function/healthcarelayerOne/lib/nodejs/package.json and package-lock.json file and run npm install command again.

# Business logic development
## Controller development
1. amplify/backend/function/healthcare/src/controller
1. Controller path routing and GET,POST's HTTP method
   ```js script: Path routing and HTTP method sample
   router.get('/',　[
     ], (req, res, next) => {
     })().catch(e => next(e))
   })
   ```
1. You can check parameter and requestBody in second parameter 
    ```js script
    router.get('/', [
      check('userId').not().isEmpty().withMessage('you must add userId')
    ])
    ```
1. Validation rule  
https://blog.capilano-fw.com/?p=5619  
1. you can return validation err message such as under sample
    ```js script
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg))
      }
    ```
1. After develop controller, map route path and controller in amplify/backend/function/healthcare/src/app.js
    ```js script
    app.user('/v1/user', UserController)
    ```
1. certification will be necessary after those comment of app.js
    ```js script
    /* ここから認証が必要なルーティング */
    ```
   It will do ceritication by X-Auth-Token of http header    
1. debug local webapi by Postman
http://localhost:3000/v1/  
1. When test business logic by Postman, must set X-Auth-Token in HTTP head   
X-Auth-Token
Please confirm API document about Login in API  
http://localhost:3000/v1/auth

## Access DynamoDB
1. It must create method Get, Add, Update, Delete method in model for operate DynamoDB
  amplify/backend/function/healthcare/opt/model  
1. operation for GraphQL  
  copy from frontend/src/graphql
1. Get List is in queries.js
1. Add, Update, Delete is in mutations.js
1. Operation method will be created in model file
    ```js script
    async GetUser(id) {
      return await this.appSyncClient.query({
        query: gql(`
        `),
        variables: {
          id
        },
      })
    }
    ```
1. query: 
    ```js script
    async GetUser(id) {
        return await this.appSyncClient.query({
        query: gql(`
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
            agreement
            agreementedAt
            createdAt
            updatedAt
            deletedAt
            }
        }
        `),
        variables: {
            id
        },
        })
    }
    ```
1. It can use model in controller to access DynamoDB
    ```js script
    const userModel = new UserModel()
    const getUserResult = await userModel.GetUser(req.query.userId)
    ```
1. Because data operation is Promise, It must use await before method
1. It can use connection GraphQL for DynamoDB tables

## DynamoDB create new Table or Item
1. It must apply request to DBA
1. It can test schema in test ENV
   amplify/backend/api/healthcareGraphQL/schema.graphql
1. GraphQL
    ```graphql
    """
    ユーザー情報
    """
    type User @model {
    id: ID! "ID"
      account: String! "アカウント名"
      lastName: String "姓"
      firstName: String "名"
      lastKana: String "カナ姓"
      firstKana: String "カナ名"
      nickName: String "画面表示名"
      birth: AWSDate "生年月日"
      tel: String "電話番号"
      email: String "メールアドレス"姓
      gender: String "性別(男性:male 女性:female)"
      agreement: Boolean "個人情報同意"
      agreementedAt: AWSTimestamp "個人情報同意日時"
      createdAt: AWSTimestamp "作成日時"
      updatedAt: AWSTimestamp "更新日時"
      deletedAt: AWSTimestamp "削除日時"
    }
    ```
# source management by using Github
1. create new branch
    ```
    Name: feature/Backlog number
    Based on: develop
    ```
1. when finish branch development, please pull request for review 
    
# Deloy
1. It can confirm env by under command
    ```
    amplify env list
    | Environments |
    | ------------ |
    | *dev         |
    | prod         |
    | test         |
    ```
1. It can change env by under command
)
    ```
    amplify env checkout dev
    ```
1. It can deploy local source to AWS cloud by under command
    ```
    amplify push
    ```
1. When deploy local source to AWS Cloud, it will change DynamoDB, lambda function and other resource
1. It can access Webapi by under URL
- Dev ENV：
  https://XXXX.execute-api.ap-northeast-1.amazonaws.com/dev/v1/[自身のパス]

- Prod ENV：
  https://XXXX.execute-api.ap-northeast-1.amazonaws.com/prod/v1/[自身のパス]

# Reference information
1. API仕様についてはコントローラーにSwaggerによるOpenAPI記述を行えば以下のURLで随時確認出来る
    - ローカル環境：http://localhost:3000/v1/spec  
    - 開発環境：/dev/v1/spec
    - 本番環境：/prod/v1/spec

1. API仕様をYAMLファイルでダウロードする場合は以下のURLで取得可能
    - ローカル環境：yaml
    - 開発環境：yaml
    - 本番環境：yaml
