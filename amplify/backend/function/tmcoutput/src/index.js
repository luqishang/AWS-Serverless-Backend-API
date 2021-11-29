/*
 * ファイル名: index.js
 * 作成日: 2021/11/29
 * 作成者: cheng.wei
 * 作成内容: TMCへhttpsでCSVファイル送信処理の新規作成
 * 修正日:
 * 修正者:
 * 修正内容:
 * ver:1.0.0
 */

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
