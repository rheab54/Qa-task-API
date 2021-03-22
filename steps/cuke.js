let path = require('path');
let { Given, When, Then, And, After, Before, setDefaultTimeout } = require('cucumber');
const expect = require('chai').expect;
const requester = require('./requester');
let config = require('config');
process.env["NODE_CONFIG_DIR"] = path.join(__dirname, '../config');
const random = require('random');
const { assert } = require('console');
let endPoint;
let request;
let response;
let petIdFromResp;

When(/^I get status (.*) of my pet$/, function (status) {

    endPoint = config.get('baseUrl') + '/pet/findByStatus';
    request = {
        "status": status,

    };

    console.log('URL is : ' + endPoint);
    return requester.getResource(endPoint, request);
})

Then(/^I get a HTTP Status as (.*)$/, function (statusCode) {
    return requester.assertHttpStatusCode(statusCode);
});

When(/^I add a dog category (.*) name (.*) to the pet store with status (.*)$/, function (category, name, status) {
    endPoint = config.get('baseUrl') + '/pet';
    request = {
        "id": random.int(0, 10000),
        "category": {
            "id": 0,
            "name": category
        },
        "name": name,
        "photoUrls": [
            "string"
        ],
        "tags": [
            {
                "id": 0,
                "name": "string"
            }
        ],
        "status": status
    };

    console.log("URL is : " + endPoint);
    console.log("Request is : " + JSON.stringify(request));
    return requester.createResource(endPoint, request);
})

Then(/^I get the pet from the petstore$/, function () {
    petIdFromResp = requester.getResponseDetails("$.id");
    console.log("petID is : " + petIdFromResp);
    endPoint = config.get('baseUrl') + '/pet/' + petIdFromResp;
    console.log('URL is : ' + endPoint);
    return requester.getResource(endPoint, request);
})


Then(/^I verify the pet is added in my petstore$/, function () {
    requester.assertResponseBodyContains("id");
    petId = requester.getResponseDetails("$.id");
    expect(petIdFromResp).to.equal(parseInt(petId));
})

When(/^I update pet oldname (.*) to newname (.*) to the pet store with status (.*)$/, function (oldname, newname, status) {
    endPoint = config.get('baseUrl') + '/pet';
    request = {
        "id": petIdFromResp,
        "name": newname,
        "status": status
    };

    console.log("URL is : " + endPoint);
    console.log("Request is : " + JSON.stringify(request));
    return requester.updateResource(endPoint, request,);
})


Then(/^I verify I have atleast one pet in my store that has name (.*)$/, function (name) {
    console.log('name of ddddd' + name)
    requester.assertResponseBodyContains("name")
    endPoint = config.get('baseUrl') + '/pet/' + petIdFromResp;
    requester.getResource(endPoint, request);
    petName = requester.getResponseDetails("$.name");
    console.log('name of pet' + petName)
    expect(petName).to.equal(name);
    
})

Then(/^I retrieve the deleted pet from the petstore$/, function () {
    endPoint = config.get('baseUrl') + '/pet/' + petIdFromResp;
    console.log('URL is : ' + endPoint);
    return requester.getResource(endPoint, request);
})

When(/^I get info of pet (.*) from the petstore$/, function (pet) {
    endPoint = config.get('baseUrl') + '/pet/' +pet;
    console.log('URL is : ' + endPoint);
    return requester.getResource(endPoint, request);
})

When(/^I delete that pet I just created$/, function () {
    endPoint = config.get('baseUrl') + '/pet/' + petIdFromResp;
    console.log('URL is : ' + endPoint);
    console.log("Request is : " + JSON.stringify(request));
    return requester.deleteResource(endPoint);
})


When(/^I get all dogs with status (.*)$/, function (status) {
    endPoint = config.get('baseUrl') + '/pet/findByStatus?status=' + status;

    request = {

    };
    console.log('URL is : ' + endPoint);
    console.log('status is : ' + status);
    return requester.getResource(endPoint, request);
})

Then(/^I delete all the pets with status$/, function () {
    requester.assertResponseBodyContains("id");
    temp = requester.getObjectFromResponse("$..id");
    for (i = 0; i < 2; i++) {
        endPoint = config.get('baseUrl') + '/pet/' + temp[i];

        console.log('URL is : ' + endPoint);
        console.log("Request is : " + JSON.stringify(request));
        requester.deleteResource(endPoint);
    }

})

Then(/^error message is (.*)$/, function (errorMessage) {
    response = requester.getLastResponse();
    let msg = response.body.message;
    expect(msg).to.contains(errorMessage);
});

/**
 Before function executes prior executing any other scenario and will be executed
 for each individual scenario for a feature file.
 */
Before(function () {
    setDefaultTimeout(120 * 1000);
});

/**
 After function executes post executing the individual scenario from a feature file.
 */
After(function () {
    setDefaultTimeout(120 * 1000);
});

