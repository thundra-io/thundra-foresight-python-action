import * as core from '@actions/core'
import * as exec from '@actions/exec'

const workspace = process.env.GITHUB_WORKSPACE

if (!workspace) {
    core.warning('[Thundra] There is no defined workspace')
    process.exit(core.ExitCode.Success)
}

function set_options(stdout_listener: Function): object {
    const options = {
        listeners: {
            stdout: stdout_listener
        },
        silent: true
    }
    return options
}

export async function checkPytestInstallation() {
    let pytest_installed = false
    const stdout_listener = (data: Buffer) => {
        pytest_installed = pytest_installed || data.toString().includes("pytest==")
    }
    const opts = set_options(stdout_listener)
    await exec.exec("pip", ["freeze"], opts)
    return pytest_installed
}

export async function checkPipInstallation() {
    let pip_installed = false
    const stdout_listener = (data: Buffer) => {
        pip_installed = pip_installed || data.toString().includes("pip")
    }
    const opts = set_options(stdout_listener)
    await exec.exec("which", ["pip"], opts)
    return pip_installed
}


export async function installThundraPythonAgent(thundra_agent: string) {
    await exec.exec("pip", ["install", `${thundra_agent}`], {ignoreReturnCode: true})
}