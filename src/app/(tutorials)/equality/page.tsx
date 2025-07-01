"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/code-block'
import { Quiz, type QuizQuestion } from '@/components/quiz'

const equalityQuestions: QuizQuestion[] = [
  { question: "'5' === 5", options: ["true", "false"], correctAnswer: "false", explanation: "嚴格相等 (===) 會同時檢查值和類型。字串 '5' 與數字 5 的類型不同。" },
  { question: "'5' == 5", options: ["true", "false"], correctAnswer: "true", explanation: "寬鬆相等 (==) 會進行型別強制轉換。它會將字串 '5' 轉換為數字後再進行比較，所以它們被視為相等。" },
  { question: "0 == false", options: ["true", "false"], correctAnswer: "true", explanation: "寬鬆相等再次發威！`false` 被強制轉換為 `0`，所以 `0 == 0` 是 true。" },
  { question: "null == undefined", options: ["true", "false"], correctAnswer: "true", explanation: "寬鬆相等的一個特殊規則是 `null` 和 `undefined` 彼此相等。" },
  { question: "null === undefined", options: ["true", "false"], correctAnswer: "false", explanation: "嚴格來說，`null` 和 `undefined` 是兩種不同的類型，所以它們不相等。" },
];

export default function EqualityPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">相等運算子：== vs ===</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          在 JavaScript 中，比較兩個值可能很棘手。你有兩個主要工具：寬鬆相等 `==` 和嚴格相等 `===`。讓我們看看它們是如何運作的。
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>前情提要：JavaScript 的資料型別</CardTitle>
          <CardDescription>
            在深入比較之前，了解 JavaScript 中的資料型別至關重要。型別是 `===` 運算子檢查的關鍵之一。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">JavaScript 主要有七種「基本型別 (primitive types)」和一種「物件型別 (object type)」。</p>
          <ul className="mb-4 list-disc space-y-1 pl-5 text-muted-foreground">
            <li><strong>String</strong>: 文字，例如 "皮卡丘"</li>
            <li><strong>Number</strong>: 數字，例如 25 或 3.14</li>
            <li><strong>Boolean</strong>: 布林值，只有 `true` 或 `false`</li>
            <li><strong>undefined</strong>: 表示變數已宣告但尚未被賦值</li>
            <li><strong>null</strong>: 表示「沒有值」或「空值」</li>
            <li><strong>BigInt</strong>: 用於表示非常大的整數</li>
            <li><strong>Symbol</strong>: 獨一無二的值，常用於物件屬性的鍵</li>
          </ul>
          <p className="mb-2">除了這些，其他所有東西基本上都是 <strong>Object</strong>，包括陣列 `[]` 和函式 `function() {}`。</p>
          <h4 className="font-semibold mt-6">如何辨別型別？</h4>
          <p className="mb-2 text-muted-foreground">你可以使用 `typeof` 運算子來檢查一個變數的資料型別。</p>
          <CodeBlock code={`typeof "Pikachu";  // "string"
typeof 10;          // "number"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof {};          // "object"
typeof [];          // "object" (陣列也是物件的一種)
typeof null;        // "object" (這是一個歷史悠久的 bug，但已成為標準)`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>寬鬆相等 (==)：百變怪</CardTitle>
          <CardDescription>
            `==` 運算子就像百變怪。它會在比較之前嘗試將兩個值轉換成相同類型。這稱為「型別強制轉換」。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">雖然這可能很方便，但它可能導致一些令人困惑的結果，讓你意想不到的東西被視為相等。</p>
          <CodeBlock code={`5 == "5"      // true (字串被轉換成數字)
0 == false    // true (布林值被轉換成數字)
null == undefined // true (一個特殊情況)`} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>嚴格相等 (===)：嚴格的評審</CardTitle>
          <CardDescription>
            `===` 運算子就像寶可夢華麗大賽的評審——非常精確。它會檢查值和類型是否都相同。不允許型別強制轉換！
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">這是大多數情況下推薦使用的運算子，因為它可預測且能避免常見的錯誤。如有疑問，請使用 `===`！</p>
          <CodeBlock code={`5 === "5"     // false (數字 vs 字串)
0 === false   // false (數字 vs 布林值)
null === undefined // false (null vs undefined)`} />
        </CardContent>
      </Card>

      <Quiz questions={equalityQuestions} title="對戰挑戰！" />

      <Card>
        <CardHeader>
          <CardTitle>參考資料</CardTitle>
          <CardDescription>想更深入了解，可以查看 MDN 的文件。</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5">
            <li><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Equality" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">相等 (==) - MDN Web Docs</a></li>
            <li><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Strict_equality" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">嚴格相等 (===) - MDN Web Docs</a></li>
            <li><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Equality_comparisons_and_sameness" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">相等性比較與同值 - MDN Web Docs</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
