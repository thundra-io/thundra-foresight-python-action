import PytestAction from './pytest'

const FrameworkTypes = {
    pytest: 'pytest'
}

const actions = {
    [FrameworkTypes.pytest]: PytestAction
}

export function isValidFramework(framework: string): boolean {
    const res =
        FrameworkTypes[framework as keyof typeof FrameworkTypes] !== undefined
    return res
}

export function getAction(framework: string): Function | undefined {
    return actions[framework]
}
