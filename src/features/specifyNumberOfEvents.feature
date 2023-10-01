Feature: Specify number of events
    Scenario: user hasn't specified a number, 32 is the default number
        Given the user hasn't specified or filtered the number of events
        When the user chooses to display events in a specific city or all events
        Then the default number of displayed events will be 32

    Scenario: User can change the number of events they want to see
        Given the user has events displayed
        When the user wants to specific number of events in that city
        Then the number of events displayed will update to the number the user selected