'use client';
import ReactCodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { javascript } from '@codemirror/lang-javascript';
import { langs, LanguageName, loadLanguage } from "@uiw/codemirror-extensions-langs";
import { theme } from "@/components/theme";
import { TestResponse } from "@/types/index.t";
import { execute } from "./action";

export default function Home() {


  const [inputValue, setInputValue] = useState("console.log('hello world!');");
  const [outputValue, setOutputValue] = useState<TestResponse>();
  const [lang, setLang] = useState<"tsx" | "python">('tsx');
  const [status, setStatus] = useState<"success" | "error">('success');


  const onCodeChange = useCallback((val: string, viewUpdate: ViewUpdate) => {
    console.log('val:', val);
    setInputValue(val);
  }, []);

  const onRunHandler = async () => {
    await execute({ language: lang, code: inputValue, testStatus: status })
    .then((res) => {
      setOutputValue(res);
    })
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center w-full  bg-zinc-700 gap-5 p-5">

      <section className="flex gap-5 w-full justify-start">
        <button onClick={onRunHandler} className="bg-zinc-600 hover:bg-zinc-500 active:bg-zinc-700 text-zinc-100  font-semibold py-2 px-4 border border-zinc-500 rounded transition-all ">
          Run
        </button>
        <select onChange={(e) => setLang(e.target.value as "tsx" | "python")} className="rounded">
          <option value="tsx">TSX</option>
          <option value="python">Python</option>
        </select>
        <select onChange={(e) => setStatus(e.target.value as "success" | "error")} className="rounded">
          <option value="success">Success</option>
          <option value="error">Error</option>
        </select>
      </section>

      <section className="flex flex-wrap gap-5 w-full">
        <div className="w-full min-w-[275px] flex-1 bg-black rounded overflow-hidden">
          <ReactCodeMirror 
            className=" w-full h-[400px]"
            value={inputValue} 
            height="400px" 
            extensions={[lang === "tsx" ? langs.tsx() : langs.python(), theme]} 
            onChange={onCodeChange}
          />
        </div>
        <div className="w-full min-w-[275px] bg-gray-600 flex-1 rounded p-5 h-[400px]">
          <h3 className="font-mono text-zinc-100 font-medium text-lg">
            Вывод:
          </h3>
          <p className={`w-full font-mono font-medium ${outputValue?.status === 'success' ? 'text-zinc-300' : 'text-red-500'} `}>
            {outputValue?.error} {outputValue?.output}
          </p>
        </div>
      </section>

    </main>
  );
}
