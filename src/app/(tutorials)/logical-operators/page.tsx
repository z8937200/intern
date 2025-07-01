import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/code-block'
import { Quiz, type QuizQuestion } from '@/components/quiz'

const logicalOperatorQuestions: QuizQuestion[] = [
  { question: `let user = null; let defaultUser = "Guest";\nlet currentUser = user || defaultUser;\ncurrentUser 的值是什麼？`, options: ["null", "\"Guest\"", "undefined", "true"], correctAnswer: "\"Guest\"", explanation: "OR (||) 運算子會返回第一個「真值」。因為 `user` 是 `null` (假值)，所以表達式會返回 `defaultUser` 的值，也就是 \"Guest\"。" },
  { question: `let quantity = 0;\nlet orderQuantity = quantity ?? 10;\norderQuantity 的值是什麼？`, options: ["10", "0", "null", "undefined"], correctAnswer: "0", explanation: "空值合併運算子 (??) 只會在左側的值是 `null` 或 `undefined` 時才返回右側的值。因為 `0` 是一個有效的數值，所以 `orderQuantity` 的值就是 `0`。" },
  { question: `let isLoggedIn = true;\nlet cartItems = 5;\nconst canCheckout = isLoggedIn && cartItems > 0;\ncanCheckout 的值是什麼？`, options: ["true", "false", "5", "undefined"], correctAnswer: "true", explanation: "AND (&&) 運算子要求兩邊的條件都為 true，才會返回 true。`isLoggedIn` 是 true，`cartItems > 0` 也是 true，所以結果是 true。" },
  { question: `! (5 > 10)`, options: ["true", "false"], correctAnswer: "true", explanation: "表達式 `5 > 10` 的結果是 false。NOT (!) 運算子會將其反轉，所以最終結果是 true。" },
  { question: `let speed = 0;\nconst status = speed > 0 || "stopped";\nstatus 的值是什麼？`, options: ["0", "\"stopped\"", "true", "false"], correctAnswer: "\"stopped\"", explanation: "`speed > 0` 的結果是 `false` (因為 0 不大於 0)。OR (||) 運算子會繼續尋找下一個真值，所以它返回了字串 \"stopped\"。" },
  { question: `let profile = { name: "Ash" };\nlet age = profile.age ?? 10;\nage 的值是什麼？`, options: ["10", "undefined", "null", "\"Ash\""], correctAnswer: "10", explanation: "`profile.age` 的值是 `undefined`。空值合併運算子 (??) 遇到 `undefined`，會返回右側的預設值，也就是 10。" },
  { question: `!"" && "hello"`, options: ["\"hello\"", "\"\"", "true", "false"], correctAnswer: "\"hello\"", explanation: "空字串 `\"\"` 是假值，所以 `!\"\"` 會變成 `true`。AND (&&) 運算子在左側為 true 時，會繼續並返回右側的值，也就是 \"hello\"。" },
];


export default function LogicalOperatorsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">邏輯運算子：||、??、&& 與 !</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          邏輯運算子是你控制程式流程的策略工具，就像訓練家在戰鬥中使用狀態招式一樣。
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>邏輯或 (||)：樂觀主義者</CardTitle>
          <CardDescription>
            OR `||` 運算子會從一串變數中找到第一個「真值 (truthy)」。所謂「真值」是指除了 `false`、`0`、`""`、`null`、`undefined` 或 `NaN` 以外的任何值。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">它對於提供備用值很有用。想像一下在你的背包裡找一個道具；你會拿你找到的第一個！</p>
          <CodeBlock code={`let preferredBerry = null;
let availableBerry = "Oran Berry";
let defaultBerry = "Pecha Berry";

// 會找到第一個真值
const berryToUse = preferredBerry || availableBerry || defaultBerry;
// berryToUse 是 "Oran Berry"`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>空值合併運算子 (??)：專家</CardTitle>
          <CardDescription>
            空值合併運算子 `??` 是 OR 的更嚴格版本。它只尋找第一個不是 `null` 或 `undefined` 的值。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">當 `0` 或空字串 `""` 是你想要保留的有效值時，這非常有用。它不會像 OR 運算子那樣跳過它們。</p>
          <CodeBlock code={`let pikachuLevel = 0; // 一個有效等級！

// 在這裡使用 OR 會是個 bug
const levelWithOR = pikachuLevel || 1; // levelWithOR 是 1，這是錯的！

// 使用 ?? 會得到正確的結果
const levelWithNC = pikachuLevel ?? 1; // levelWithNC 是 0，這是對的！
`} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>邏輯與 (&&)：守門員</CardTitle>
          <CardDescription>
            AND `&&` 運算子常用於「短路求值」。如果第一個值是「假值 (falsy)」，它就會停止並返回該值。如果它是「真值」，它會繼續並返回第二個值。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">在 React 中，這是一種非常常見的條件渲染模式。「如果你有火之石，`&&` 就顯示「進化」按鈕。」</p>
          <CodeBlock code={`const hasFireStone = true;
const hasWaterStone = false;

// 如果 hasFireStone 是 true，表達式會變成第二個值（按鈕）
const evolveButton = hasFireStone && "顯示進化按鈕"; // "顯示進化按鈕"

// 如果 hasWaterStone 是 false，表達式會短路並返回 false
const anotherButton = hasWaterStone && "顯示另一個按鈕"; // false
`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>邏輯非 (!)：唱反調的胖丁</CardTitle>
          <CardDescription>
            NOT `!` 運算子會將一個值反轉。真值變假值，假值變真值。就像一隻總是在你說「上」時說「下」的寶可夢。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">它對於切換布林值或檢查一個條件是否為 false 非常有用。</p>
          <CodeBlock code={`let isSleeping = true;
let isAwake = !isSleeping; // isAwake 是 false

!false; // true
!"";    // true (因為空字串是假值)
!5;     // false (因為 5 是真值)
`} />
        </CardContent>
      </Card>

      <Quiz questions={logicalOperatorQuestions} title="邏輯大考驗" />

      <Card>
        <CardHeader>
          <CardTitle>參考資料</CardTitle>
          <CardDescription>想更深入了解，可以查看 MDN 的文件。</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5">
            <li><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Logical_AND" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">邏輯與 (&&) - MDN Web Docs</a></li>
            <li><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Logical_OR" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">邏輯或 (||) - MDN Web Docs</a></li>
            <li><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">空值合併運算子 (??) - MDN Web Docs</a></li>
            <li><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Logical_NOT" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">邏輯非 (!) - MDN Web Docs</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
