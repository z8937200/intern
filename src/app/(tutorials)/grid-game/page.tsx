import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { GridGame } from '@/components/grid-game'
import { CodeBlock } from '@/components/code-block'
import { cn } from '@/lib/utils'

const GridPreview = ({ containerClassName, itemClassNames = [] }: { containerClassName: string; itemClassNames: string[] }) => (
  <div className="mt-2 rounded-lg border bg-muted/30 p-4">
    <div className={cn("grid gap-2", containerClassName)}>
      {itemClassNames.map((className, i) => (
        <div key={i} className={cn("flex h-12 items-center justify-center rounded bg-primary/50 p-2 text-sm font-semibold text-primary-foreground", className)}>
          {i + 1}
        </div>
      ))}
    </div>
  </div>
);

export default function GridGamePage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">Tailwind Grid 遊戲</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          歡迎，寶可夢保育家！你的任務是使用 Tailwind 的網格系統來排列這些寶可夢棲息地。透過下面的教學來學習，然後在遊戲中測試你的技能！
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>網格基礎</CardTitle>
          <CardDescription>
            {'首先，你需要一個網格容器。只要在一個元素上加入 `grid` class 即可。接著，使用 `grid-cols-{number}` 和 `grid-rows-{number}` 來定義網格的欄與列。'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold">範例：`grid-cols-3`</h4>
          <p className="text-sm text-muted-foreground mb-1">建立一個三欄的網格。</p>
          <CodeBlock code={`<div className="grid grid-cols-3">...</div>`} />
          <GridPreview containerClassName="grid-cols-3" itemClassNames={['', '', '', '', '', '']} />

          <h4 className="mt-4 font-semibold">範例：`grid-rows-2`</h4>
          <p className="text-sm text-muted-foreground mb-1">建立一個兩列的網格 (搭配 `grid-flow-col` 使用效果更明顯)。</p>
          <CodeBlock code={`<div className="grid grid-flow-col grid-rows-2">...</div>`} />
          <GridPreview containerClassName="grid-flow-col grid-rows-2" itemClassNames={['', '', '', '']} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>跨越網格 (Spanning)</CardTitle>
          <CardDescription>
            {'有時候，一個項目需要佔據多個欄位或列的空間。這時就輪到 `col-span-{number}` 和 `row-span-{number}` 上場了。這些 class 是加在網格項目上，而不是容器上。'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold">範例：`col-span-2`</h4>
          <p className="text-sm text-muted-foreground mb-1">讓第一個項目橫跨兩欄。</p>
          <CodeBlock code={`<div class="grid grid-cols-3">
  <div class="col-span-2">1</div>
  <div>2</div>
  ...
</div>`} />
          <GridPreview 
            containerClassName="grid-cols-3" 
            itemClassNames={['col-span-2', '', '', '', '']}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>開始挑戰！</CardTitle>
          <CardDescription>
            現在你已經學會了基礎知識，試著完成以下的挑戰來排列寶可夢的棲息地吧！
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GridGame />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>參考資料</CardTitle>
          <CardDescription>想更深入了解，可以查看以下文件。</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5">
            <li><a href="https://tailwindcss.com/docs/grid-template-columns" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Grid Template Columns - Tailwind CSS</a></li>
            <li><a href="https://tailwindcss.com/docs/grid-column" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Grid Column (Span) - Tailwind CSS</a></li>
            <li><a href="https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_grid_layout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CSS Grid Layout - MDN Web Docs</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
