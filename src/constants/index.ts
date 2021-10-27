export const MIN_THUNDRA_AGENT_VERSION = '2.7.0' // TODO After release foresight change it! 

export const TEST_FRAMEWORKS = {
    pytest: 'pytest'
}

export const THUNDRA_SPECIFIC_ENV_VARS = {
    api_key: 'THUNDRA_APIKEY',
    project_id: 'THUNDRA_AGENT_TEST_PROJECT_ID',
    test_disable: "THUNDRA_AGENT_TEST_DISABLE" // action.yml>inputs>env_var>test_disable(Set env variable if specified)
}