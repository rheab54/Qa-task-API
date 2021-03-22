const expect = require('chai').expect;
const expected = require('unexpected');
const path = require('path');
const requestPromise = require('request-promise');
const jp = require('jsonpath');

let lastResponse;
process.env["NODE_CONFIG_DIR"] = path.join( __dirname, '../config' );

async function createResource(url, requestBody){
    const options = {
        uri: url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody,
        json: true,
        resolveWithFullResponse: true
    };
    options.simple = false;
    lastResponse = await requestPromise(options);
    console.log('Response Object from Create Resource is :'+JSON.stringify(lastResponse) + '\n');
    return lastResponse;
}

async function updateResource(url, requestBody){
    const options = {
        uri: url,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody,
        json: true,
        resolveWithFullResponse: true
    };
    options.simple = false;
    lastResponse = await requestPromise(options);
    console.log('Response Object from Update Resource is :'+JSON.stringify(lastResponse) + '\n');
    return lastResponse;
}

async function getResource(url, requestBody){
    const options = {
        uri: url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody,
        json: true,
        resolveWithFullResponse: true
    };
    options.simple = false;
    lastResponse = await requestPromise(options);
    console.log('Response Object from Get Resource is : '+JSON.stringify(lastResponse) + '\n');
    return lastResponse;
}

async function deleteResource(url){
    const options = {
        uri: url,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'api_key':  'special-key'
        },
        json: true,
        resolveWithFullResponse: true
    };
    options.simple = false;
    lastResponse = await requestPromise(options);
    console.log('Response Object from Delete Resource is :'+JSON.stringify(lastResponse) + '\n');
    return lastResponse;
}

function assertResponseBodyContains(expression){
    let storedResponse = JSON.stringify(this.getLastResponse().body);
    expect(storedResponse).to.include(expression);

};

// Get the last response that we received
function getLastResponse() {
    return lastResponse;
}

function assertHttpStatusCode(statusCode){
    
    expected(this.getLastResponse().statusCode, 'to equal', parseInt(statusCode, 10));
}

function getResponseDetails(jsonPath) {
    let submitResponse = JSON.stringify(this.getLastResponse().body);
    let parseObj = JSON.parse(submitResponse);
    let result = jp.query(parseObj, jsonPath);
    return result[0];
}

function getObjectFromResponse(jsonPath) {
    let submitResponse = JSON.stringify(this.getLastResponse().body);
    let parseObj = JSON.parse(submitResponse);
    let result = jp.query(parseObj, jsonPath);
    return result;
}


module.exports = {
    createResource: createResource,
    updateResource: updateResource,
    getResource: getResource,
    deleteResource: deleteResource,
    getLastResponse: getLastResponse,
    assertResponseBodyContains: assertResponseBodyContains,
    assertHttpStatusCode: assertHttpStatusCode,
    getResponseDetails: getResponseDetails,
    getObjectFromResponse:getObjectFromResponse
};