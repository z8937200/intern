import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/code-block'
import Image from 'next/image'

function PokemonCard({ name, type, image, children }: { name: string, type: string, image: string, children?: React.ReactNode }) {
  const typeColors: { [key: string]: string } = {
    "電": "bg-yellow-400",
    "水": "bg-blue-400",
    "火": "bg-red-500",
    "草": "bg-green-500",
  }

  return (
    <Card className="w-64">
      <CardHeader className="items-center">
        <Image src={image} alt={name} width={120} height={120} className="rounded-full border-4 border-muted" data-ai-hint="pokemon character" />
        <CardTitle>{name}</CardTitle>
        <CardDescription className={ `px-3 py-1 rounded-full text-white ${typeColors[type] || 'bg-gray-400'}`}>{type}</CardDescription>
      </CardHeader>
      {children && (
        <CardContent>
          <div className="text-sm text-center text-muted-foreground p-2 border-t">
            {children}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default function ComponentsAndPropsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">Components 與 Props：React 的積木</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Components 是構成 React 應用程式的基礎。它們是獨立且可重複使用的程式碼片段，而 Props 則是我們將資料傳遞給它們的方式。
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>什麼是 Components？</CardTitle>
          <CardDescription>
            你可以將 React Component 想像成一個 JavaScript 函式，它會接收輸入並回傳一個描述畫面上該出現什麼的 React 元素。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">把 Components 想像成你寶可夢隊伍中的每一隻寶可夢。每隻寶可夢（Component）都有自己獨特的外觀和能力，但你可以有很多隻皮卡丘在不同的地方作戰。</p>
          <CodeBlock code={`// 這是一個簡單的 functional component
function Welcome(props) {
  return <h1>你好, {props.name}</h1>;
}

// 你也可以用 ES6 class 來定義 component (較舊的寫法)
class Welcome extends React.Component {
  render() {
    return <h1>你好, {this.props.name}</h1>;
  }
}`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>什麼是 Props？</CardTitle>
          <CardDescription>
            Props（properties 的縮寫）是 Components 之間溝通的橋樑。它們是從父層 Component 傳遞到子層 Component 的唯讀資料。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">Props 就像是你對寶可夢下達的指令。你不能改變指令本身（唯讀），但你可以下達不同的指令（傳入不同的 props）。</p>
          <div className="flex flex-wrap gap-4 items-start justify-center my-6">
            <PokemonCard name="皮卡丘" type="電" image="https://placehold.co/120x120.png" />
            <PokemonCard name="小火龍" type="火" image="https://placehold.co/120x120.png" />
            <PokemonCard name="傑尼龜" type="水" image="https://placehold.co/120x120.png" />
          </div>
          <CodeBlock code={`// 我們透過 props 將 name, type, image 傳入 PokemonCard component
<PokemonCard name="皮卡丘" type="電" image="https://placehold.co/120x120.png" />
<PokemonCard name="小火龍" type="火" image="https://placehold.co/120x120.png" />`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>State vs. Props</CardTitle>
          <CardDescription>
            State 和 Props 都是 JavaScript 物件，當它們改變時，都會觸發 React 重新渲染。但它們的角色和資料流向完全不同。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">State (內部狀態)</h4>
            <p className="text-muted-foreground mt-1">
              State 在 Component 內部被管理，就像寶可夢自身的情緒或健康狀況。它是 Component 自己的狀態，只有該 Component 能透過 `useState` 這樣的 Hook 來改變它。外部無法直接修改。
            </p>
          </div>
           <div>
            <h4 className="font-semibold">Props (外部傳遞)</h4>
            <p className="text-muted-foreground mt-1">
              Props 從外部（父層 Component）傳入，就像訓練家對寶可夢下達的指令。寶可夢（子層）只能接收指令，不能自己修改指令內容（Props 是唯讀的）。但訓練家（父層）可以改變主意，下達新的指令，這會觸發畫面更新。
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>特殊的 Prop：`children`</CardTitle>
          <CardDescription>
            在 React component 中，包在開始和結束標籤中間的所有內容，都會被放到一個名為 `children` 的特殊 prop 中。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">這讓你可以建立像 `Card` 或 `Dialog` 這樣可以包裹其他元素的通用容器元件。就像一個可以放入任何道具的寶可夢背包。</p>
          <div className="my-4">
            <PokemonCard name="妙蛙種子" type="草" image="https://placehold.co/120x120.png">
              這是一段被當成 children 傳入的筆記！
            </PokemonCard>
          </div>
          <CodeBlock code={`// "這是一段筆記..." 會被當成 children prop 傳入
<PokemonCard name="妙蛙種子" ... >
  這是一段被當成 children 傳入的筆記！
</PokemonCard>

// 在 Component 內部這樣接收
function PokemonCard({ name, type, image, children }) {
  return (
    // ...
    <div>{children}</div>
    // ...
  )
}`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>參考資料</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            <li><a href="https://legacy.reactjs.org/docs/components-and-props.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Components and Props – React (Legacy Docs)</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
