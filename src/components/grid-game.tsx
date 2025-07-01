"use client"

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const Habitat = ({ id, className }: { id: number, className?: string }) => {
    const pokemonEmojis = ['🌳', '💧', '🔥', '⚡️', '⛰️', '💨', '🦋', '🍄'];
    return (
        <div className={cn("flex h-24 items-center justify-center rounded-lg bg-primary/50 text-4xl", className)}>
            {pokemonEmojis[id % pokemonEmojis.length]}
        </div>
    )
};

const puzzles = [
  {
    name: '四欄棲息地',
    description: '將棲息地排成四個等寬的欄位。',
    type: 'container',
    solution: ['grid-cols-4'],
    itemsCount: 4,
  },
  {
    name: '經典 2x2 網格',
    description: '是時候來個經典的 2x2 網格了。你需要同時定義欄和列。',
    type: 'container',
    solution: ['grid-cols-2', 'grid-rows-2'],
    itemsCount: 4,
  },
  {
    name: '橫跨欄位',
    description: '這個 🌳 太大了！讓它橫跨 2 個欄位來給它更多空間。',
    type: 'item',
    targetItemIndex: 0,
    containerClasses: 'grid grid-cols-3 grid-rows-2',
    solution: ['col-span-2'],
    itemsCount: 5,
  },
   {
    name: '精準定位',
    description: '把 🔥 放到第 4 欄開始的位置。',
    type: 'item',
    targetItemIndex: 2,
    containerClasses: 'grid grid-cols-4 grid-rows-2',
    solution: ['col-start-4'],
    itemsCount: 4
  },
  {
    name: '超級棲息地',
    description: '這個 💧 需要一個超大的空間！讓它橫跨 2 欄並縱跨 2 列。',
    type: 'item',
    targetItemIndex: 1,
    containerClasses: 'grid grid-cols-3 grid-rows-3',
    solution: ['col-span-2', 'row-span-2'],
    itemsCount: 6,
  },
];


export function GridGame() {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const currentPuzzle = useMemo(() => puzzles[puzzleIndex], [puzzleIndex]);

  const checkSolution = () => {
    const userClasses = new Set(userInput.trim().split(' ').filter(Boolean));
    const solutionClasses = new Set(currentPuzzle.solution);

    let isCorrect = true;
    if (userClasses.size !== solutionClasses.size) {
        isCorrect = false;
    } else {
        for (const cls of solutionClasses) {
          if (!userClasses.has(cls)) {
            isCorrect = false;
            break;
          }
        }
    }

    if (isCorrect) {
      setFeedback({ type: 'success', message: '太棒了！你完美地排列了棲息地。' });
    } else {
      const needed = currentPuzzle.solution.length;
      const provided = userClasses.size;
      const errorMessage = needed === provided 
        ? "不太對喔。請檢查你的 class 名稱是否正確。"
        : `不太對喔。這個挑戰需要 ${needed} 個 class，但你輸入了 ${provided} 個。`;
      setFeedback({ type: 'error', message: errorMessage });
    }
  };

  const nextPuzzle = () => {
    const nextIndex = (puzzleIndex + 1) % puzzles.length;
    setPuzzleIndex(nextIndex);
    setUserInput('');
    setFeedback(null);
  }

  const isContainerPuzzle = currentPuzzle.type === 'container';
  const puzzleHelperText = `(提示：需要 ${currentPuzzle.solution.length} 個 class)`;
  
  const targetContainerClasses = isContainerPuzzle
    ? `grid gap-4 p-4 ${currentPuzzle.solution.join(' ')}`
    : `grid gap-4 p-4 ${currentPuzzle.containerClasses || ''}`;

  const userContainerClasses = isContainerPuzzle
    ? `grid gap-4 p-4 ${userInput}`
    : `grid gap-4 p-4 ${currentPuzzle.containerClasses || ''}`;


  const renderGrid = (isTarget: boolean) => {
    const containerClasses = isTarget ? targetContainerClasses : userContainerClasses;
    
    return (
      <div className={cn(containerClasses, 'rounded-lg', isTarget ? 'border-2 border-dashed bg-muted/20' : 'border-2 border-accent')}>
        {Array.from({ length: currentPuzzle.itemsCount }).map((_, i) => {
          let itemClass = '';
          const isTargetItem = currentPuzzle.type === 'item' && i === currentPuzzle.targetItemIndex;

          if (isTarget && isTargetItem) {
            itemClass = currentPuzzle.solution.join(' ');
          }
          if (!isTarget && isTargetItem) {
            itemClass = userInput;
          }
          if (!isTarget && isTargetItem) {
            itemClass += ' ring-2 ring-accent ring-offset-2 ring-offset-background';
          }

          return <Habitat key={i} id={i} className={itemClass} />;
        })}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-headline text-lg font-semibold">{currentPuzzle.name}</h3>
        <p className="text-muted-foreground">{currentPuzzle.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h4 className="mb-2 font-semibold text-center">目標版面</h4>
          {renderGrid(true)}
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-center">你的版面</h4>
          {renderGrid(false)}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full">
            <Input 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="例如：grid-cols-3"
              className="font-code"
            />
             <div className="absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
              {puzzleHelperText}
            </div>
          </div>
          <Button onClick={checkSolution} className="shrink-0">檢查</Button>
        </div>
        {feedback && (
          <Alert variant={feedback.type === 'error' ? 'destructive' : 'default'}>
            {feedback.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertTitle>{feedback.type === 'success' ? '成功！' : '再試一次'}</AlertTitle>
            <AlertDescription className="flex flex-col items-start gap-2">
                <span>{feedback.message}</span>
                {feedback.type === 'success' && (
                    <Button onClick={nextPuzzle} size="sm" className="mt-2">
                        {puzzleIndex === puzzles.length - 1 ? "從頭開始" : "下一個挑戰"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
