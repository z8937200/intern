import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/code-block'
import { Quiz, type QuizQuestion } from '@/components/quiz'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'

const variableQuestions: QuizQuestion[] = [
  {
    question: "let a = 5; 現在要讓 a 的值變成 6，以下哪個是錯誤的？",
    options: ["let a = 6;", "a = 6;", "a += 1;", "a = a + 1;"],
    correctAnswer: "let a = 6;",
    explanation: "使用 `let` 宣告的變數在相同的作用域中不能重複宣告。`let a = 6;` 試圖再次宣告 `a`，因此會報錯。其他選項都是有效的賦值操作。"
  },
  {
    question: "const team = [\"皮卡丘\"]; team.push(\"妙蛙種子\"); 這段程式碼會發生什麼事？",
    options: ["會報錯，因為 team 是常數", "team 的內容會變成 [\"皮卡丘\", \"妙蛙種子\"]", "team 會變成 undefined", "語法錯誤"],
    correctAnswer: "team 的內容會變成 [\"皮卡丘\", \"妙蛙種子\"]",
    explanation: "`const` 確保的是變數 `team` 的參照（reference）不會改變，也就是它永遠指向同一個陣列。但我們仍然可以修改該陣列的內容，例如使用 `push`、`pop` 等方法。"
  },
  {
    question: "在一個 `if` 區塊內用 `var` 宣告的變數，可以在區塊外被存取嗎？",
    options: ["可以", "不可以", "只在嚴格模式下可以", "會變成 undefined"],
    correctAnswer: "可以",
    explanation: "`var` 是函式作用域（function-scoped），不是區塊作用域（block-scoped）。這意味著它的作用範圍是整個函式，而不是僅限於它被宣告的 `{}` 區塊。"
  }
];

function VariableComparisonTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>快速比較</CardTitle>
        <CardDescription>
          底下是 `var`、`let` 和 `const` 的主要差異。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead className="text-center">var</TableHead>
                <TableHead className="text-center">let</TableHead>
                <TableHead className="text-center">const</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">作用域</TableCell>
                <TableCell className="text-center">函式作用域</TableCell>
                <TableCell className="text-center">區塊作用域</TableCell>
                <TableCell className="text-center">區塊作用域</TableCell>
              </TableRow>
               <TableRow className="bg-muted/30">
                <TableCell className="font-semibold">變數提升</TableCell>
                <TableCell className="text-center">有</TableCell>
                <TableCell className="text-center">無</TableCell>
                <TableCell className="text-center">無</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">重複宣告</TableCell>
                <TableCell className="text-center">可以</TableCell>
                <TableCell className="text-center">不可以</TableCell>
                <TableCell className="text-center">不可以</TableCell>
              </TableRow>
              <TableRow className="bg-muted/30">
                <TableCell className="font-semibold">賦值限制</TableCell>
                <TableCell className="text-center">可以重新賦值</TableCell>
                <TableCell className="text-center">可以重新賦值</TableCell>
                <TableCell className="text-center">不可重新賦值</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}


export default function VariablesPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">變數宣告：let, var, and const</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          選擇正確的寶可夢來對戰至關重要，選擇正確的方式宣告變數也同樣重要！讓我們來探索 JavaScript 中可以用來宣告變數的三個關鍵字：`var`、`let` 與 `const`。
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>var：最初的訓練家</CardTitle>
          <CardDescription>
            `var` 是宣告變數最古老的方式。可以把它想像成關都地區的初學者。它已經存在很久了，但有一些奇特的行為，尤其是在作用域方面。用 `var` 宣告的變數是函式作用域，而不是區塊作用域。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">這意味著如果你在迴圈或 `if` 區塊內宣告 `var`，它實際上在整個函式中都可用。這可能會導致意想不到的錯誤，就像在山洞裡遇到野生的超音蝠一樣！</p>
          <CodeBlock code={`function catchPokemon() {
  if (true) {
    var pokemon = "Pikachu";
  }
  // 'pokemon' 在 'if' 區塊外仍然可用！
  console.log("Caught a " + pokemon); // Caught a Pikachu
}`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>let：現代的選擇</CardTitle>
          <CardDescription>
            `let` 是在 ES6 (2015) 中引入的，用來解決 `var` 的問題。它是區塊作用域，這更直觀。用 `let` 在一個區塊 {'{...}'} 內宣告的變數只能在該區塊內使用。
          </CardDescription>
        </CardHeader>
        <CardContent>
           <p className="mb-2">這就像把你的寶可夢放在精靈球裡。它是被包含的，只有在指定的程式碼「區塊」內需要時才會出來。</p>
          <CodeBlock code={`function trainPokemon() {
  let level = 5;
  if (level > 3) {
    let move = "Tackle";
    console.log("Learned " + move); // Learned Tackle
  }
  // console.log(move); // 這裡會導致錯誤！ 'move' 在這裡未定義。
}`} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>const：傳說中的寶可夢</CardTitle>
          <CardDescription>
            `const` 也是區塊作用域，但有一條特殊規則：你不能重新賦值給它。一旦你宣告了一個 `const` 變數，它的值就是常數。就像傳說中的寶可夢一樣——一旦你擁有了它，它就是你獨一無二的，無法被取代。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">這對於你知道不應該改變的值非常有用，比如你的初始寶可夢的名字或一個基本的遊戲規則。注意：對於物件和陣列，其內容仍然可以更改，但變數不能重新賦值給一個新的物件或陣列。</p>
          <CodeBlock code={`const starterPokemon = "Squirtle";
// starterPokemon = "Charmander"; // 錯誤！無法重新賦值給常數。

const pokedex = { region: "Kanto", count: 151 };
pokedex.count = 152; // 這是可以的！我們正在修改物件，而不是重新賦值。
console.log(pokedex.count); // 152
`} />
        </CardContent>
      </Card>

      <VariableComparisonTable />
      
      <Quiz questions={variableQuestions} title="變數大挑戰" />

      <Card>
        <CardHeader>
          <CardTitle>參考資料</CardTitle>
          <CardDescription>想更深入了解，可以查看 MDN 的文件。</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5">
            <li><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/var" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"><code>var</code> - MDN Web Docs</a></li>
            <li><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/let" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"><code>let</code> - MDN Web Docs</a></li>
            <li><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/const" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"><code>const</code> - MDN Web Docs</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
