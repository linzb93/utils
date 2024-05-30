type NoopFn = () => {}

export interface IToast {
    type?: "error"
    message: string;
    duration: number;
    onClose: NoopFn
}

export interface ILoading {
    open(text: string): void;
    close: NoopFn
}

export interface AnyObject {
    [key: string]: any
}