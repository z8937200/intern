import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/code-block'

export default function ArrowFunctionsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">箭頭函式：迅捷的進化</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          箭頭函式是 JavaScript 中一種更簡潔的函式寫法。可以把它們想像成你傳統函式的「超級進化」——在某些情況下更時尚、更快速、更強大。
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>經典形式：傳統函式</CardTitle>
          <CardDescription>
            這是一個標準的函式宣告。它使用 `function` 關鍵字和 `return` 陳述式。它堅固可靠，就像卡比獸一樣。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock code={`// 傳統函式
function getPokemonType(pokemon) {
  return pokemon.type;
}`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>進化形式：箭頭函式</CardTitle>
          <CardDescription>
            這裡是與箭頭函式相同的邏輯。注意少了 `function` 關鍵字，並且對於單行返回，也省略了花括號 {'{}'} 和 `return` 關鍵字。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock code={`// 箭頭函式
const getPokemonType = (pokemon) => pokemon.type;

// 如果你的邏輯超過一行，就需要花括號和 return
const getStrongestMove = (pokemon) => {
  let strongest = pokemon.moves[0];
  // ... 找出最強招式的邏輯
  return strongest;
}`} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>關鍵差異：this 關鍵字</CardTitle>
          <CardDescription>
            最大的不同不是語法，而是行為。箭頭函式沒有自己的 `this` 上下文。它們會從父層作用域繼承 `this`。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">這在 React 類別元件中非常有用（在現代的函式元件搭配 hooks 使用時較不常用），因為你不需要在建構函式中 `.bind(this)`。箭頭函式會自動知道 `this` 指的是元件實例。</p>
          <CodeBlock code={`class Trainer {
  constructor() {
    this.name = "Ash";
  }

  // 在傳統函式中，'this' 會是 undefined，除非被綁定
  introduceRegular() {
    setTimeout(function() {
      // console.log("My name is " + this.name); // 'this' 不是 Trainer
    }, 1000);
  }

  // 使用箭頭函式，'this' 會從 Trainer 的作用域繼承
  introduceArrow() {
    setTimeout(() => {
      console.log("My name is " + this.name); // 'this' 就是 Trainer！
    }, 1000);
  }
}

const ash = new Trainer();
ash.introduceArrow(); // 1 秒後會印出 "My name is Ash"
`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>參考資料</CardTitle>
          <CardDescription>想更深入了解，可以查看 MDN 的文件。</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            <li><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">箭頭函式 - MDN Web Docs</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
