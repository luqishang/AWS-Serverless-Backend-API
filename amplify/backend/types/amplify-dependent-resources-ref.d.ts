export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "healthcare": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        },
        "userPoolGroups": {
            "userGroupRole": "string",
            "nurseGroupRole": "string"
        }
    },
    "api": {
        "healthcareGraphQL": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        },
        "healthcareREST": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "function": {
        "healthcare": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "tmcimport": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "healthcarelayerOne": {
            "Arn": "string"
        },
        "tmcoutput": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "storage": {
        "s35f4002e8": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}