import * as core from '@actions/core'
import { runTests } from '../helper/execute-test'
import * as Helper from '../helper/package_manager'

const command: string = core.getInput('command')

export default async function run(thundraDep: string) {
    const check_pip_installed = await Helper.checkPipInstallation()
    if (!check_pip_installed) {
        core.warning('[THUNDRA] To install Thundra, pip is required. Please ensure your workspace has pip...')
    }
    const check_pytest_installed = await Helper.checkPytestInstallation()
    if (!check_pytest_installed) {
        core.warning('[THUNDRA] To install Thundra, pytest is required. Please ensure your workspace has pytest...')
    }
    await Helper.installThundraPythonAgent(thundraDep)
    core.info(`[THUNDRA] ${thundraDep} installed...`)
    if (command) {
        await runTests(command)
    } else {
        core.info('[THUNDRA] Instrumentation has been completed...')
    }
}