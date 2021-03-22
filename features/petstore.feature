@regression
Feature: PetStore API GET/POST/PUT/DELETE Verification

  #   POST /pet
  #   Get /pet/{petId}
  Scenario: Add a new pet ,verify , update and delete the pet details
    When I add a dog category chiuaha name Monty to the pet store with status sold
    Then I get a HTTP Status as 200
    Then I get the pet from the petstore
    And I verify the pet is added in my petstore
    #PUT /pet/{petId}
    When I update pet oldname Monty to newname Tinkerbell to the pet store with status pending
    Then I get a HTTP Status as 200
    Then I get the pet from the petstore
    And I verify I have atleast one pet in my store that has name Tinkerbell
    #DELETE /pet/{petId}
    When I delete that pet I just created
    Then I get a HTTP Status as 200
    And I retrieve the deleted pet from the petstore
    And I get a HTTP Status as 404

  #GET /pet/findByStatus
  Scenario Outline: Find pets by status
    When I get status <status> of my pet
    Then I get a HTTP Status as <statusCode>
    Examples:
      |status     | statusCode |
      |available  | 200        |
      |sold       | 200        |
      |pending    | 200        |
     # Below case should bring 404 but instead it returns 200 , so the test will fail 
      |blah       | 404        |   


 Scenario Outline: Check GET /pet/petId Error Codes
    When I get info of pet <pet> from the petstore
    Then I get a HTTP Status as <statusCode>
    And  error message is <errorMessage>

    Examples:
      | pet                       | statusCode | errorMessage                                        |
      | 0                         | 404        | Pet not found |
      | 2.1                       | 404        | java.lang.NumberFormatException |
      









