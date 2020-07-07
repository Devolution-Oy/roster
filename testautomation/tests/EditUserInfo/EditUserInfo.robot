*** Settings ***
Documentation    User info editing test cases
Resource         ${PROJECT_ROOT}${/}resources${/}Setup.robot

Suite Teardown   Close All Browsers
Force Tags       set-edit-user-info

*** Variables ***
${EDITED_USER_NAME}   Edited User
${EDITED_EMAIL}       Edited@devolution.fi
${ORIGINAL_NAME}      Devolution Tester
${ORIGINAL_EMAIL}     roster.test@devolution.fi

*** Test Cases ***
User can edit own user information
    [Setup]   Open roster
    GIVEN User is logged in
    WHEN User edit own information    ${EDITED_USER_NAME}    ${EDITED_EMAIL}    ${ORIGINAL_NAME}    ${ORIGINAL_EMAIL}
    THEN New user info is saved into database
    [Teardown]   Revert user info

User cancel information edit
    GIVEN User is logged in
    WHEN User open edit dialog but cancel edit
    THEN User info are shown

# TODO: Add test case for unconfirm
User edit information but unconfirm the alert box
    GIVEN User is logged in
    WHEN User edit own information but does not confirm dialog    ${EDITED_USER_NAME}    ${EDITED_EMAIL}    ${ORIGINAL_NAME}    ${ORIGINAL_EMAIL}
    THEN User edit dialog is shown
    [Teardown]    Click element    xpath=.//button[@class='btn_accept']

*** Keywords ***
New user info is saved into database
    Wait until page contains element    xpath=.//label[@id='user_name_value' and text()='${EDITED_USER_NAME}']
    Page should contain element    xpath=.//label[@id='user_email_value' and text()='${EDITED_EMAIL}']
    Page should contain element    xpath=.//label[@id='user_github_value']
    Page should contain element    xpath=.//label[@id='user_role_value']
    Page should contain element    xpath=.//button[@id='btn_edit_user']

Save and confirm edit
    Click element    xpath=.//button[@class='btn_accept']
    Handle Alert

User edit dialog is shown
    [Arguments]    ${name}    ${email}
    Wait until page contains element    xpath=.//div[@id='form_edit_user']
    Wait until page contains element    xpath=.//input[@id='input_edit_name' and text()='${name}']
    Page should contain element         xpath=.//input[@id='input_edit_email' and text()='${email}']
    Page should contain element         xpath=.//select[@id='select_edit_role' and @disabled]
    Page should contain element         xpath=.//input[@id='input_edit_github' and @disabled]
    Page should contain element         xpath=.//button[@class='btn_cancel']
    Page should contain element         xpath=.//button[@class='btn_accept']

User open edit dialog but cancel edit
    SeleniumLibrary.Click element       xpath=.//button[@id='btn_edit_user']
    Wait until page contains element    xpath=.//div[@id='form_edit_user']
    Click element                       xpath=.//button[@class='btn_cancel']

User is logged in
    Github login
    User info are shown

User info are shown
    Page should contain element    xpath=.//label[@id='user_name']
    Page should contain element    xpath=.//label[@id='user_email']
    Page should contain element    xpath=.//label[@id='user_github']
    Page should contain element    xpath=.//label[@id='user_role']
    Page should contain element    xpath=.//button[@id='btn_edit_user']

Edit user info
    [Arguments]    ${name}    ${email}    ${orignal_name}    ${original_email}
    SeleniumLibrary.Click element       xpath=.//button[@id='btn_edit_user']
    User edit dialog is shown    ${original_name}    ${original_email}
    Clear element text    xpath=.//input[@id='input_edit_name']
    Clear element text    xpath=.//input[@id='input_edit_email']
    Input text    xpath=.//input[@id='input_edit_name']    ${name}
    Input text    xpath=.//input[@id='input_edit_email']    ${email}

User edit own information but does not confirm dialog
    [Arguments]    ${name}    ${email}
    Edit user info    ${name}    ${email}    ${original_name}    ${original_email}
    Click element    xpath=.//button[@class='btn_accept']
    Handle Alert     DISMISS

User edit own information
    [Documentation]    Assume that user page is shown
    [Arguments]    ${name}    ${email}    ${orignal_name}    ${original_email}
    Edit user info    ${name}    ${email}    ${orignal_name}    ${original_email}
    Save and confirm edit

Input and check
    [Arguments]    ${locator}    ${text}
    Clear element text    ${locator}
    Input text    ${locator}     ${text}
    Set focus to element    xpath=.//div[@id='modal_edit_user']
    Element text should be    ${locator}    ${text}

Revert user info
    User edit own information    ${ORIGINAL_NAME}    ${ORIGINAL_EMAIL}    ${EDITED_USER_NAME}     ${EDITED_EMAIL}
    # TODO: Add Firebase python library and call addUser from there

