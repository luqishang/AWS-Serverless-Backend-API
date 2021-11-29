const AWSAppSyncClient = require('aws-appsync').default
const AWS = require('aws-sdk')


console.log('AWS.config')
console.log(AWS.config)

AWS.config.update({
  region: process.env['REGION'],
})

module.exports = class AppSync {
  constructor() {
    console.log('END POINT=' + process.env['API_HEALTHCAREGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT'])
    const appsyncOpts = {
      auth: {
        type: 'AWS_IAM',
        credentials: ()=> AWS.config.credentials
      },
      disableOffline: true,
      region: process.env['REGION'],
      url: process.env['API_HEALTHCAREGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT'],
    }
    this.appSyncClient = new AWSAppSyncClient(appsyncOpts)
  }
}