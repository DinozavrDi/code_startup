export type TestResponse = {
    status: "success" | "error",
    output?: string,
    error?: string
}