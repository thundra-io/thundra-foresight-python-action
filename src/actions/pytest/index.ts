import * as core from '@actions/core'
import { runTests } from '../helper/execute-test'
import * as Helper from '../helper/package_manager'

const command: string = core.getInput('command')

export default async function run(thundraDep: string) {
    const check_pip_installed = await Helper.checkPipInstallation()
    if (!check_pip_installed) {
        core.warning('[THUNDRA] To install thundra, pip is required. Please ensure your workspace has pip...')
        core.warning('[THUNDRA] Instrumentation failed due to missing pip...')
        process.exit(core.ExitCode.Success)
    }
    const check_pytest_installed = await Helper.checkPytestInstallation()
    if (!check_pytest_installed) {
        core.warning('[THUNDRA] To install thundra, pytest is required. Please ensure your workspace has pytest...')
        core.warning('[THUNDRA] Instrumentation failed due to missing pytest...')
        process.exit(core.ExitCode.Success)
    }
    await Helper.installThundraPythonAgent(thundraDep)
    core.info(`[THUNDRA] ${thundraDep} installed...`)
    await runTests(command)
}