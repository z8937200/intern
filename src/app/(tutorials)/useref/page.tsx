"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/code-block'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, RefreshCw, Zap } from 'lucide-react'

function UseRefDemo() {
    const [inputValue, setInputValue] = useState("");
    const renderCount = useRef(0);

    useEffect(() => {
        // 這個 effect 會在每次渲染後執行，並更新 ref 的值
        renderCount.current = renderCount.current + 1;
    });

    return (
        <div className="rounded-lg border p-6 space-y-4">
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="在這裡輸入文字來觸發渲染..."
            />
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>狀態追蹤</AlertTitle>
                <AlertDescription>
                    這個元件已經重新渲染了 <span className="font-bold text-accent">{renderCount.current}</span> 次。
                    <br />
                    請注意，我們更新 `renderCount.current` 並沒有觸發更多的渲染，否則會造成無限迴圈！
                </AlertDescription>
            </Alert>
        </div>
    );
}

export default function UseRefPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">useRef Hook</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          `useRef` 像一個「盒子」，可以讓你在元件的多次渲染之間，持續存放一個可變動的值，而不會觸發畫面更新。
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>useRef vs useState</CardTitle>
          <CardDescription>
            為什麼我們需要一個不會觸發渲染的變數？
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex flex-col items-center">
                    <Zap className="h-6 w-6 text-primary" />
                    <strong className="mt-1 font-semibold">useState</strong>
                </div>
                <p className="text-muted-foreground">
                    當你需要儲存的資料會直接影響到畫面的顯示時使用。呼叫 `setState` 會告訴 React：「嘿，資料變了，請重新畫一次！」，這會觸發元件的重新渲染 (re-render)。
                </p>
            </div>
             <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex flex-col items-center">
                    <RefreshCw className="h-6 w-6 text-muted-foreground" />
                    <strong className="mt-1 font-semibold">useRef</strong>
                </div>
                <p className="text-muted-foreground">
                    當你需要一個變數在多次渲染之間「存活」，但它的變動「不應該」觸發重新渲染時使用。例如，儲存一個計時器的 ID，或是像下面的範例一樣，計算元件被渲染了幾次。
                </p>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>演練：追蹤渲染次數</CardTitle>
          <CardDescription>
            `useRef` 會回傳一個物件，其 `{'{ current: ... }'}` 屬性就是你存放值的地方。要更新它，你只需要直接修改 `.current` 屬性即可。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UseRefDemo />
           <CodeBlock code={`import { useState, useEffect, useRef } from 'react';

function RenderCounter() {
  // 為了觸發渲染，我們需要一個 state
  const [inputValue, setInputValue] = useState("");
  
  // 建立一個 ref 來存放渲染次數
  const renderCount = useRef(0);

  useEffect(() => {
    // 每次渲染後，我們就將計數器加一
    // 注意：直接修改 .current 不會觸發重新渲染
    renderCount.current = renderCount.current + 1;
  });

  return (
    <div>
      <input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <p>這個元件被渲染了 {renderCount.current} 次。</p>
    </div>
  );
}`} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>參考資料</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            <li><a href="https://www.w3schools.com/react/react_useref.asp" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">React useRef Hook - W3Schools</a></li>
            <li><a href="https://react.dev/reference/react/useRef" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">useRef - React 官方文件</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
