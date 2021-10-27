import PytestAction from './pytest'

const FrameworkTypes = {
    pytest: 'pytest'
}

const actions = {
    [FrameworkTypes.pytest]: PytestAction
}

export function isValidFramework(framework: string): boolean {
    return FrameworkTypes[framework as keyof typeof FrameworkTypes] !== undefined
}

export function getAction(framework: string): Function | undefined {
    return actions[framework]
}