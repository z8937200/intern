"use client"

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { CodeBlock } from '@/components/code-block'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react'

const challenges = [
  {
    question: "你的小火龍準備好進化了！如果 level 大於 16，牠應該進化成「火恐龍」，否則還是「小火龍」。",
    code: "level > 16",
    options: {
      true: ["\"火恐龍\"", "\"小火龍\""],
      false: ["\"火恐龍\"", "\"小火龍\""]
    },
    correctAnswer: {
      true: "\"火恐龍\"",
      false: "\"小火龍\""
    },
    explanation: "當條件 `level > 16` 為 true 時，返回 '火恐龍'。當條件為 false 時，返回 '小火龍'。"
  },
  {
    question: "你遇到了一隻寶可夢！如果 `isShiny` 是 true，你應該丟出「大師球」，否則就丟「高級球」。",
    code: "isShiny",
    options: {
      true: ["\"大師球\"", "\"高級球\""],
      false: ["\"大師球\"", "\"高級球\""]
    },
    correctAnswer: {
      true: "\"大師球\"",
      false: "\"高級球\""
    },
    explanation: "閃光寶可夢非常稀有，絕對值得用大師球！條件 `isShiny` 為 true 時，返回 '大師球'，否則返回 '高級球'。"
  },
  {
    question: "你的寶可夢中毒了。如果 `isPoisoned` 是 true，牠的狀態應該是「中毒」，否則就是「正常」。",
    code: "isPoisoned",
    options: {
      true: ["\"中毒\"", "\"正常\""],
      false: ["\"中毒\"", "\"正常\""]
    },
    correctAnswer: {
      true: "\"中毒\"",
      false: "\"正常\""
    },
    explanation: "根據 `isPoisoned` 的布林值來決定寶可夢的狀態。True 對應 '中毒'，false 對應 '正常'。"
  }
]

function TernaryExercise() {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selections, setSelections] = useState<{ true: string | null, false: string | null }>({ true: null, false: null });
  const [result, setResult] = useState<{ correct: boolean; message: string } | null>(null);

  const currentChallenge = challenges[challengeIndex];

  const handleSelect = (part: 'true' | 'false', value: string) => {
    setSelections(prev => ({ ...prev, [part]: value }));
  };

  const checkAnswer = () => {
    const isCorrect = selections.true === currentChallenge.correctAnswer.true && selections.false === currentChallenge.correctAnswer.false;
    setResult({
      correct: isCorrect,
      message: isCorrect ? `太棒了！${currentChallenge.explanation}` : `再想一下！${currentChallenge.explanation}`
    });
  };

  const nextChallenge = () => {
    if (challengeIndex < challenges.length - 1) {
      setChallengeIndex(challengeIndex + 1);
      setSelections({ true: null, false: null });
      setResult(null);
    } else {
      // Quiz finished, you can add a summary screen here if needed
       setResult({ correct: true, message: "所有挑戰都完成了！你對三元運算子的掌握更上一層樓了！" });
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>進化時間！</CardTitle>
        <CardDescription>{currentChallenge.question}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="font-code p-4 bg-muted rounded-lg flex items-center justify-center flex-wrap gap-x-2">
          <span>{currentChallenge.code}</span>
          <span>?</span>
          <div className="flex flex-col gap-2 p-2 min-w-[120px]">
            <RadioGroup onValueChange={(val) => handleSelect('true', val)} value={selections.true || ""}>
              {currentChallenge.options.true.map(opt => (
                <div key={`true-${opt}`} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt} id={`true-${opt}`} />
                  <Label htmlFor={`true-${opt}`} className="font-normal">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <span>:</span>
          <div className="flex flex-col gap-2 p-2 min-w-[120px]">
             <RadioGroup onValueChange={(val) => handleSelect('false', val)} value={selections.false || ""}>
              {currentChallenge.options.false.map(opt => (
                <div key={`false-${opt}`} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt} id={`false-${opt}`} />
                  <Label htmlFor={`false-${opt}`} className="font-normal">{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        {!result ? (
           <Button onClick={checkAnswer} disabled={!selections.true || !selections.false}>嘗試進化</Button>
        ) : (
          <>
            <Alert variant={result.correct ? 'default' : 'destructive'}>
              {result.correct ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <AlertTitle>{result.correct ? "命中要害！" : "效果不太好..."}</AlertTitle>
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
            <Button onClick={nextChallenge}>
              {challengeIndex < challenges.length - 1 ? "下一個挑戰" : "完成"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

export default function TernaryPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">三元運算子</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          三元運算子是編寫簡單 `if-else` 陳述式的緊湊方式。就像在一回合內快速選擇兩個寶可夢招式一樣！
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>`if-else` 的方式</CardTitle>
          <CardDescription>
            這是一個典型的 `if-else` 區塊，用來根據寶可夢的 HP 決定使用哪個道具。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock code={`let item;
let pokemonHP = 30;

if (pokemonHP < 20) {
  item = "Potion";
} else {
  item = "Poké Ball";
}

// item 是 "Poké Ball"`} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>三元運算子的方式</CardTitle>
          <CardDescription>
            三元運算子將其簡化為一行。語法是 `condition ? expressionIfTrue : expressionIfFalse`。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">它乾淨、簡潔，在 React 中對於條件渲染非常有用。</p>
          <CodeBlock code={`let pokemonHP = 30;
const item = pokemonHP < 20 ? "Potion" : "Poké Ball";

// item 是 "Poké Ball"`} />
        </CardContent>
      </Card>

      <TernaryExercise />

      <Card>
        <CardHeader>
          <CardTitle>參考資料</CardTitle>
          <CardDescription>想更深入了解，可以查看 MDN 的文件。</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            <li><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Conditional_operator" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">條件（三元）運算子 - MDN Web Docs</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
