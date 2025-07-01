"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/code-block'
import { Button } from '@/components/ui/button'

function UseEffectDemo() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    // 這是一個「清除函式」。
    // 它會在元件卸載時，或是在下一次 useEffect 執行前被呼叫。
    // 這能防止記憶體洩漏。
    return () => clearInterval(intervalId);
  }, [isRunning]); // 依賴陣列：只有 isRunning 改變時，這個 effect 才會重新執行

  return (
    <div className="rounded-lg border p-6 text-center">
      <p className="text-lg font-semibold">訓練計時器</p>
      <p className="font-mono text-5xl font-bold tracking-tighter my-4">{time} <span className="text-lg font-normal">秒</span></p>
      <div className="flex justify-center gap-4">
        <Button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? '暫停' : '繼續'}
        </Button>
        <Button variant="outline" onClick={() => { setTime(0); setIsRunning(false); }}>
          重置
        </Button>
      </div>
    </div>
  );
}

export default function UseEffectPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">useEffect Hook</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          `useEffect` Hook 讓你在函式元件中執行「副作用 (side effects)」。
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>什麼是副作用？</CardTitle>
          <CardDescription>
            副作用是指在你的元件渲染過程中，與外部世界發生的任何互動。常見的例子包括：
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5">
            <li>向 API 請求資料 (Data fetching)</li>
            <li>設定訂閱 (Setting up a subscription)</li>
            <li>手動更改 DOM</li>
            <li>設定計時器 (Timers)</li>
          </ul>
          <p className="mt-4">基本上，任何不是直接計算和回傳 JSX 的事情，都可以被視為副作用。就像在寶可夢對戰中，一個招式除了造成傷害外，可能還會讓對手中毒或麻痺——這就是牠的「副作用」。</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>依賴陣列 (Dependency Array) 的力量</CardTitle>
          <CardDescription>
            `useEffect` 的第二個參數是依賴陣列，它決定了 effect 函式何時會被「重新執行」。這是控制副作用行為的關鍵。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-4 pl-5">
            <li>
              <strong className="font-semibold">沒有依賴陣列：每次都出動！</strong>
              <p className="text-muted-foreground mb-2">如果你不提供第二個參數，effect 會在每一次元件渲染後都執行。這就像一隻過動的皮卡丘，不管發生什麼事都要跳出來一下。</p>
              <CodeBlock code={`useEffect(() => {
  // 元件第一次掛載和每次更新後都會執行
});`} />
            </li>
            <li>
              <strong className="font-semibold">空的依賴陣列 `[]`：只在登場時執行一次！</strong>
              <p className="text-muted-foreground mb-2">傳入一個空陣列 `[]`，effect 就只會在元件第一次掛載到畫面上時執行一次。這就像是寶可夢登場時的特殊登場效果，只會發生一次。</p>
              <CodeBlock code={`useEffect(() => {
  // 只在元件第一次掛載後執行
}, []);`} />
            </li>
             <li>
              <strong className="font-semibold">有值的依賴陣列 `[value]`：特定情況才觸發！</strong>
              <p className="text-muted-foreground mb-2">當你把變數放進依賴陣列，effect 會在第一次渲染後執行，並且只有在這些變數的值改變時，才會再次執行。這就像是只有在對手使用特定屬性招式時，你的特性才會發動。</p>
              <CodeBlock code={`useEffect(() => {
  // 第一次掛載後，以及 'someValue' 改變後才會執行
}, [someValue]);`} />
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>實際演練</CardTitle>
          <CardDescription>
            底下是一個使用 `useEffect` 製作的計時器。它的依賴陣列中包含了 `isRunning`，所以只有在計時器開始或暫停時，effect 才會重新執行來設定或清除計時器。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UseEffectDemo />
          <CodeBlock code={`function UseEffectDemo() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    // 清除函式：會在 isRunning 改變或元件卸載時執行
    return () => clearInterval(intervalId);
  }, [isRunning]); // 依賴陣列

  return (
    // ... JSX ...
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
            <li><a href="https://www.w3schools.com/react/react_useeffect.asp" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">React useEffect Hook - W3Schools</a></li>
            <li><a href="https://react.dev/reference/react/useEffect" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">useEffect - React 官方文件</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
