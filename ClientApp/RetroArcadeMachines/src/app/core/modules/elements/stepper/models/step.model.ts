export class BaseStepEvent {
    componentName: string;
}

export class Step {
    buttonLocation?: 'above' | 'below' | 'aboveAndBelow';
    component?: any; // todo: make this a baseComponent
    allowForwardStep?: boolean;
    allowBackStep?: boolean;
    label?: string;
    optional?: boolean;
    event: BaseStepEvent;
}
