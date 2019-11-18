interface RuntimeError extends Error {
    [propName: string]: any;
}
export = RuntimeError;
