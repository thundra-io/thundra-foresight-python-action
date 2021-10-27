/* eslint-disable sort-imports */
/* eslint-disable i18n-text/no-en */
import * as actions from './actions/index'
import * as core from '@actions/core'
import * as semver from 'semver'

import {MIN_THUNDRA_AGENT_VERSION, THUNDRA_SPECIFIC_ENV_VARS} from './constants'

const apikey: string = core.getInput('apikey')
const project_id: string = core.getInput('project_id')
const framework: string = core.getInput('framework').toLowerCase()
const agent_version: string = core.getInput('agent_version')
const test_disable: string = core.getInput('test_disable')

const thundraDep = agent_version ? `thundra==${agent_version}` : 'thundra'

if (test_disable.toUpperCase() === 'TRUE') {
    core.warning(
        '[THUNDRA] Instrumentation is not on board due to setting test disable...'
    )
    core.exportVariable(THUNDRA_SPECIFIC_ENV_VARS.test_disable, true)
    process.exit(core.ExitCode.Success)
}

if (!apikey) {
    core.warning('[THUNDRA] Thundra APIKEY is not present. Exiting early...')
    core.warning('[THUNDRA] Instrumentation failed.')
    process.exit(core.ExitCode.Success)
}

if (!project_id) {
    core.warning(
        '[THUNDRA] Thundra Project ID is not present. Exiting early...'
    )
    core.warning('[THUNDRA] Instrumentation failed.')
    process.exit(core.ExitCode.Success)
}

if (agent_version && semver.lt(agent_version, MIN_THUNDRA_AGENT_VERSION)) {
    core.setFailed(
        `[THUNDRA] Thundra Python Agent prior to ${MIN_THUNDRA_AGENT_VERSION} doesn't work with this action.`
    )
    process.exit(core.ExitCode.Success)
}

if (
    !actions.isValidFramework(framework) ||
    !actions.isValidFramework(framework.toLowerCase())
) {
    core.warning('[THUNDRA] Framework must take one of these values: pytest...')
    process.exit(core.ExitCode.Success)
}

core.exportVariable(THUNDRA_SPECIFIC_ENV_VARS.api_key, apikey)
core.exportVariable(THUNDRA_SPECIFIC_ENV_VARS.project_id, project_id)

async function run(): Promise<void> {
    try {
        core.info(`[THUNDRA] Initializing the Thundra Python Action...`)
        const action: Function | undefined = actions.getAction(framework)
        if (!action) {
            core.warning(
                `[THUNDRA] There is no defined action for framework: ${framework}`
            )
            process.exit(core.ExitCode.Success)
        }
        await action(thundraDep)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        core.setFailed(error.message)
    }
}

run()
