'use server'

//Я не могу использовать action.ts из-за деплоя приложения на Next JS в статике. Изначально выполнение серверной части должно быть здесь

import { TestResponse } from "@/types/index.t";

// Иммитация серверной части
export async function execute({ language, code, testStatus }: { language: "tsx" | "python", code: string, testStatus: "success" | "error"}): Promise<TestResponse> {

    // Представим, что сервер вернул данные
    let responseFromServer
    if (testStatus === "success") {
        responseFromServer = JSON.stringify({ status: "success", output: "Hello world!" });
    } else {
        responseFromServer = JSON.stringify({ status: "error", error: "SyntaxError: Unexpected token" });
    }
    const response = JSON.parse(responseFromServer);
    return response 
}
