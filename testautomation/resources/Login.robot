*** Variables ***
${ROSTER_USER}    devolution-roster-test
${USER_PW}        devolution-test-account-617584

*** Keywords ***
Github login
    Wait and click element    xpath=.//div[@id='btn_github']
    Switch window    NEW
    Wait until page contains element    xpath=.//input[@id='login_field']
    Input text    xpath=.//input[@id='login_field']    ${ROSTER_USER}
    Input text    xpath=.//input[@id='password']    ${USER_PW}
    Click element    xpath=.//input[@type='submit']
    Switch window    MAIN

Logout from roster
    pause execution
    Click element    xpath=.//button[@id='btn_logout']
