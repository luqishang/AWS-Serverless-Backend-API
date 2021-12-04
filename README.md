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
### ESLint(JavaScriptの格式check) install

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

# Get source and run local debug enviroment
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
1. amplify/backend/function/healthcarelayerOne/lib/nodejsにてnode modulesのインストールを行う
   ```
   npm install
   ```
1. VSCodeの左のメニューから「実行とデバッグ」を選択  
   ①Healthcare（Webapi）をデバッグする場合、  
     プルダウンに表示されている「Run Express api(src)」を選択し実行ボタンを押す  
     Postman等を使用し以下のURLにアクセスして動作を確認する  
     http://localhost:3000/v1/auth  
   ②tmcimport（S3 trigger）をデバッグする場合、  
     プルダウンに表示されている「Run S3 Trigger(src)」を選択し実行ボタンを押す  
      amplify/backend/function/tmcimport/src/.vscode/launch.jsonの「aws-sam」の「payload」のS3「key」(S3にアップロードするjsonの名前)を修正する必要です。  
   ③tmcoutput(tmcへhttpsでcsv送信)  
     プルダウンに表示されている「Run Send CSV to TMC(src)」を選択し実行ボタンを押す
1. デバッグコンソールにて実行状況が表示される  
* ※functionはローカルで実行されているがCongnito,DynamoDBはAWSに接続しているため注意
* ※新たにmoduleを追加する場合、amplify/backend/function/healthcarelayerOne/lib/nodejs/package.jsonとpackage-lock.jsonにmodule名称とバージョンを追加する必要です。npm installの再実行も必要です。

# ビジネスロジックの実装方法
## コントローラーの実装
1. amplify/backend/function/healthcare/src/controllerに自身担当のビジネスロジックコントローラーファイルを作成する
1. 保健師向けAPIはcontroller/nurseの下に格納する  
保健対象者向けAPIはcontroller/userの下に格納する  
WebAPIのURLにはnurse(保健師向け)、user(保健対象者向け)を必ずつけてください。
1. コントローラでは2階層目のパスルーティングとGET、POSTなどHTTPメソッドに応じた記述を行う
   ```js script:パスルーティングとHTTPメソッド例
   router.get('/',　[
     ], (req, res, next) => {
     })().catch(e => next(e))
   })
   ```
1. パラメーターやリクエストボディのバリデーションが必要な場合はルーティングの第二引数に配列記述を行う
    ```js script
    router.get('/', [
      check('userId').not().isEmpty().withMessage('ユーザーIDは必須です')
    ])
    ```
1. バリデーションで利用出来るルール等は以下を参照  
https://blog.capilano-fw.com/?p=5619  
1. バリデーションにてエラーとなった場合は以下のコードにてエラーを返却する
    ```js script
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg))
      }
    ```
1. コントローラーの実装後にamplify/backend/function/healthcare/src/app.jsにパスルートを記述する
    ```js script
    app.user('/v1/user', UserController)
    ```
1. app.jsにパスルートを記述する際は認証が必要なパスの場合は必ずコメントの
    ```js script
    /* ここから認証が必要なルーティング */
    ```
   より下に記述を行う。これによりX-Auth-Tokenヘッダーにて渡されているトークンの認証を行える   
1. Postman等を利用して作成したビジネスロジックの確認を行う。ローカル実行の場合は  
http://localhost:3000/v1/  
にて確認が行える
1. Postman確認時にトークン認証が必要なビジネスロジックの場合は必ずHTTPヘッダーとして  
X-Auth-Token
にログイン用のAPIにて取得したトークンをセットする。ログイン用のAPIについてはAPI仕様書を参照。  
http://localhost:3000/v1/auth

## DynamoDBへのアクセス方法
1. DynamoDBからのデータ取得、追加、更新等が必要な場合はモデルを作成する  
  amplify/backend/function/healthcare/opt/model  
  にモデル用ファイルの作成を行う
1. 各種操作用のGraphQLは  
  frontend/src/graphqlからコピーを行い取得する（バックエンドから直接参照出来ないため）
1. 取得の場合はqueries.jsから該当テーブルのものをコピーする（Getが単一、Listが複数取得)
1. 追加、更新、削除の場合はmutations.jsから取得する
1. 各種操作用のメソッドをモデルに用意する
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
1. query: gqlの文字列として先ほどコピーした操作用のGrapQLのペーストする
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
1. 基本的にはGrapQLのクエリ名と同じメソッド名としておく方が良い
1. コントローラーにて上記のモデルメソッドを呼び出しDynamoDBへアクセスを行う
    ```js script
    const userModel = new UserModel()
    const getUserResult = await userModel.GetUser(req.query.userId)
    ```
1. データの操作はPromiseにて返却が行わるため基本的にはawaitにて同期処理とすること
1. GraphQLによりデータ取得はconnection設定がされている場合には単一取得の場合に限り子供のテーブルの情報も二階層まで取得が可能となる

## DynamoDBへの新テーブル追加、項目追加
1. 基本的にはDynamoDBの変更は環境が一つであることとチームメンバー同士のコンフリクトが発生してしまうためDBAに依頼を行う
1. どうしても自身で行う場合は以下のファイルにてスキーマの変更を行う  
   amplify/backend/api/healthcareGraphQL/schema.graphql
1. 記述方法はGraphQLの記述方法に従う
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
# Githubでソース管理
1. 新しいbranchを作成する
    ```
    Name: feature/関連するBacklog番号
    Based on: develop
    ```
1. branchの実装が完了したら、pull requestを提出し、レビューを依頼する。
    
# デプロイ方法（デプロィ担当者へ依頼）
1. デプロイに関しては現状では環境が一つであるため基本的にはデプロイヤーに依頼を行い最新のdevlopブランチのものを反映する
1. 現状選択している環境を確認する。testがテスト環境、devが開発環境。prodが本番環境となる。
    ```
    amplify env list
    | Environments |
    | ------------ |
    | *dev         |
    | prod         |
    | test         |
    ```
1. 現状選択している環境がデプロイを行う環境でない場合以下のコマンドで環境を切り替える（下記は開発環境の例）
)
    ```
    amplify env checkout dev
    ```
1. 個人でデプロイを行う場合は最新のdevlopからリベースを行った上で以下のコマンドを実行する
    ```
    amplify push
    ```
1. 上記のデプロイではDynamoDBの変更なども変更があれば同時に行われさらに上記のDynamoDB操作用のGraphQLも全て生成される（pushしないと生成されない）,DynamoDBのmodelの主キーが変更する場合、modelを削除してamplify pushを実行し、もう一度modelを修正し、amplify pushを実行する必要です。
1. デプロイ後は現在のDEV環境では以下のURLにてアクセス可能となる
- 開発環境：
  https://8uwc50azkc.execute-api.ap-northeast-1.amazonaws.com/dev/v1/[自身のパス]

- 本番環境：
  https://k0fhk57k6g.execute-api.ap-northeast-1.amazonaws.com/prod/v1/[自身のパス]

# 参考情報
1. API仕様についてはコントローラーにSwaggerによるOpenAPI記述を行えば以下のURLで随時確認出来る
    - ローカル環境：http://localhost:3000/v1/spec  
    - 開発環境：/dev/v1/spec
    - 本番環境：/prod/v1/spec

1. API仕様をYAMLファイルでダウロードする場合は以下のURLで取得可能
    - ローカル環境：.yaml
    - 開発環境：.yaml
    - 本番環境：yaml
