"use client"

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/code-block'
import { Button } from '@/components/ui/button'

function UseStateDemo() {
  const [level, setLevel] = useState(1)

  return (
    <div className="rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-5xl">⚡️</p>
          <p className="mt-2 text-lg font-semibold">皮卡丘</p>
          <p className="text-muted-foreground">等級: {level}</p>
        </div>
        <Button onClick={() => setLevel(level + 1)}>
          提升等級
        </Button>
      </div>
      <div className="mt-4 text-center">
        <Button variant="outline" size="sm" onClick={() => setLevel(1)}>
          重置等級
        </Button>
      </div>
    </div>
  )
}

export default function UseStatePage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">useState Hook</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          `useState` 是 React 中最基本也最重要的 Hook。它允許你在函式元件中加入並管理「狀態 (state)」。
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>什麼是狀態 (State)？</CardTitle>
          <CardDescription>
            狀態是一個物件，用來儲存會隨著時間改變的資料。當一個元件的狀態改變時，React 會自動重新渲染該元件以反映這些變化。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">想像一下你正在玩的寶可夢遊戲，你的皮卡丘的等級就是一種狀態。當牠獲得經驗值並升級時，螢幕上顯示的等級數字也需要更新。`useState` 就是用來處理這種會變動的資料。</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>如何使用 `useState`</CardTitle>
          <CardDescription>
            要使用 `useState`，你需要在元件的最頂層呼叫它，並傳入一個初始狀態。它會回傳一個陣列，包含兩個元素：目前的狀態值，以及一個用來更新該狀態的函式。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock code={`import { useState } from 'react';

function PokemonTrainer() {
  // 宣告一個新的 state 變數，我們叫它 "level"
  // 1 是 level 的初始值
  const [level, setLevel] = useState(1);

  // setLevel 是一個函式，用來更新 level 的值
  // 當我們呼叫 setLevel，React 會重新渲染元件
  return (
    <div>
      <p>皮卡丘的等級是 {level}</p>
      <button onClick={() => setLevel(level + 1)}>
        提升等級
      </button>
    </div>
  );
}`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>實際演練</CardTitle>
          <CardDescription>
            試著點擊按鈕，看看皮卡丘的等級變化！
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UseStateDemo />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>參考資料</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            <li><a href="https://www.w3schools.com/react/react_usestate.asp" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">React useState Hook - W3Schools</a></li>
            <li><a href="https://react.dev/reference/react/useState" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">useState - React 官方文件</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
