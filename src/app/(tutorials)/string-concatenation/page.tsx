"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/code-block'
import { Quiz, type QuizQuestion } from '@/components/quiz'

const concatenationQuestions: QuizQuestion[] = [
  {
    question: 'let result = "皮卡丘" + 10;\nconsole.log(result);',
    options: ["\"皮卡丘10\"", "NaN", "\"皮卡丘 10\"", "Error"],
    correctAnswer: "\"皮卡丘10\"",
    explanation: "當 `+` 運算子的一邊是字串時，它會執行字串串接，並將數字 `10` 強制轉換為字串 `\"10\"`。"
  },
  {
    question: 'const level = 25;\nconst message = `等級: ${level + 5}`;\nconsole.log(message);',
    options: ["\"等級: 30\"", "\"等級: ${level + 5}\"", "\"等級: 25 + 5\"", "Error"],
    correctAnswer: "\"等級: 30\"",
    explanation: "樣板字面值中的 `${...}` 語法會先執行裡面的 JavaScript 表達式 (`25 + 5` 變成 `30`)，然後再將結果嵌入到字串中。"
  },
  {
    question: 'console.log("5" + 5 - 5);',
    options: ["50", "5", "45", "\"5\""],
    correctAnswer: "45",
    explanation: "運算子由左至右計算。首先 `\"5\" + 5` 變成字串 `\"55\"`。接著，`-` 運算子會試圖將 `\"55\"` 轉換為數字，所以 `\"55\" - 5` 的結果是 `55 - 5`，也就是 `45`。"
  }
];

export default function StringConcatenationPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">字串與樣板字面值</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          在 JavaScript 中組合字串是個常見的任務。讓我們來看看兩種主要的方法：傳統的字串相加，以及更現代、更強大的樣板字面值。
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>傳統字串相加：型別強制轉換的魔法</CardTitle>
          <CardDescription>
            當你使用 `+` 運算子將一個字串和一個數字（或其他類型）相加時，JavaScript 會自動將數字轉換成字串，然後再將它們連接起來。這個過程稱為「型別強制轉換 (Type Coercion)」。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">這就像你的寶可夢學會了一個新招式，但必須先將其轉換為自己屬性的能量才能使用。</p>
          <CodeBlock code={`"皮卡丘的等級是 " + 25;  // "皮卡丘的等級是 25"
"5" + 5;                  // "55" (數字 5 被轉換成字串 "5")
5 + "5";                  // "55" (同樣的結果)`} />
          <p className="mt-4 text-sm text-muted-foreground">雖然方便，但有時候這種自動轉換可能會導致意想不到的結果，所以要小心使用！</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>進化形式：樣板字面值 (Template Literals)</CardTitle>
          <CardDescription>
            樣板字面值 (Template Literals) 是 ES6 引入的一種更優雅、更直觀的字串組合方式。你需要使用反引號 (`` ` ``) 而不是單引號或雙引號。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">最大的優勢是你可以使用 `\${}` 語法，直接在字串中嵌入變數或任何 JavaScript 表達式。這讓程式碼更乾淨、更容易閱讀。</p>
          <CodeBlock code={`const pokemonName = "妙蛙種子";
const level = 5;

// 使用樣板字面值
const message = \`你派出了 \${pokemonName}，牠的等級是 \${level}！\`;
// message 的值會是："你派出了 妙蛙種子，牠的等級是 5！"

// 你甚至可以在 \${} 中進行運算
const nextLevelMessage = \`再升一級，\${pokemonName} 就會變成 \${level + 1} 級。\`;
// nextLevelMessage 的值會是："再升一級，妙蛙種子 就會變成 6 級。"
`} />
        </CardContent>
      </Card>

      <Quiz questions={concatenationQuestions} title="字串大挑戰" />
      
      <Card>
        <CardHeader>
          <CardTitle>參考資料</CardTitle>
          <CardDescription>想更深入了解，可以查看 MDN 的文件。</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            <li><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Template_literals" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">樣板字面值 (Template literals) - MDN Web Docs</a></li>
            <li><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Grammar_and_types#%E5%AD%97%E4%B8%B2%E8%BD%89%E6%8F%9B" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">字串轉換 - MDN Web Docs</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
