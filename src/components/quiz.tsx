"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export interface QuizQuestion {
  question: React.ReactNode;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  title?: string;
}

export function Quiz({ questions, title = "小測驗時間！" }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const score = userAnswers.reduce((acc, answer, index) => {
      return answer === questions[index].correctAnswer ? acc + 1 : acc;
    }, 0);
    const incorrectQuestions = questions.filter((_, index) => userAnswers[index] !== questions[index].correctAnswer);

    return (
      <Card>
        <CardHeader>
          <CardTitle>測驗結束！</CardTitle>
          <CardDescription>你答對了 {score} / {questions.length} 題。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {incorrectQuestions.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold">錯誤題目解析：</h4>
              {incorrectQuestions.map((q, i) => (
                <Alert key={i} variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle className="font-code">{q.question}</AlertTitle>
                  <AlertDescription>
                    <p>你的答案：<span className="font-semibold">{userAnswers[questions.indexOf(q)] || "未作答"}</span></p>
                    <p>正確答案：<span className="font-semibold text-green-700 dark:text-green-400">{q.correctAnswer}</span></p>
                    <p className="mt-2">解析：{q.explanation}</p>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          )}
          {incorrectQuestions.length === 0 && (
             <Alert variant="default" className="bg-green-100/50 dark:bg-green-900/20 border-green-500/50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>太厲害了！</AlertTitle>
                <AlertDescription>你全部都答對了！你已經是個合格的寶可夢大師了！</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={resetQuiz}>再玩一次</Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>第 {currentQuestionIndex + 1} / {questions.length} 題</CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="font-semibold text-lg font-code">{currentQuestion.question}</div>
        <RadioGroup onValueChange={setSelectedAnswer} value={selectedAnswer || ''} className="font-code">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="text-base font-normal">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNext} disabled={!selectedAnswer}>
          {currentQuestionIndex < questions.length - 1 ? "下一題" : "完成測驗"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
