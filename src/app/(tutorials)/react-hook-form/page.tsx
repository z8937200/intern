import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/code-block'
import { ReactHookFormDemo } from '@/components/ReactHookFormDemo'

export default function ReactHookFormPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-headline text-4xl font-bold tracking-tight">React Hook Form: 深入了解 Controller</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          React Hook Form 是一個高效能的表單函式庫。其中，`Controller` 元件是整合外部 UI 元件庫（如 ShadCN UI）的關鍵，它能讓我們以宣告式的方式無縫地將任何受控元件與表單狀態連結起來。
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>核心概念：`useForm` 與 `&lt;Controller&gt;`</CardTitle>
          <CardDescription>
            `Controller` 扮演著 React Hook Form 核心邏輯與你的 UI 元件之間的橋樑。它會為你處理註冊、值更新和驗證狀態。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">整個流程的核心概念如下：</p>
          <ol className="list-decimal space-y-2 pl-5 mb-4">
            <li><strong>初始化表單 (useForm)</strong>: 使用 `useForm` hook 來建立表單的實例，它會提供 `control` 物件等方法。</li>
            <li><strong>包裹元件 (`&lt;Controller&gt;`)</strong>: 對於每一個需要與表單狀態連結的輸入元件，我們都使用 `&lt;Controller&gt;` 來包裹。</li>
            <li><strong>傳遞 `control` 和 `name`</strong>: 必須將 `useForm` 回傳的 `control` 物件和該欄位的唯一 `name` 傳給 `Controller`。</li>
            <li><strong>使用 `render` Prop</strong>: `Controller` 的 `render` prop 會提供 `field` 和 `fieldState` 物件。`field` 包含了 `value`, `onChange`, `onBlur` 等屬性，你需要將它們傳給你的 UI 元件。`fieldState` 則包含 `error` 等狀態資訊。</li>
            <li><strong>定義驗證規則 (`rules`)</strong>: 你可以直接在 `Controller` 上使用 `rules` prop 來定義驗證規則，例如 `required`。</li>
          </ol>
          <CodeBlock code={`import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function PokedexForm() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      pokemonName: ""
    }
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="pokemonName">寶可夢名稱</Label>
        <Controller
          name="pokemonName"
          control={control}
          rules={{ required: "寶可夢名稱不可空白！" }}
          render={({ field }) => (
            <Input id="pokemonName" placeholder="皮卡丘" {...field} />
          )}
        />
        {errors.pokemonName && <p className="text-sm font-medium text-destructive">{errors.pokemonName.message}</p>}
      </div>

      <Button type="submit">提交</Button>
    </form>
  );
}`} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>互動演練場</CardTitle>
          <CardDescription>
            現在，讓我們來實際操作一個表單，體驗 `setValue`、`getValues` 和 `trigger` 的強大功能。試著點擊下方的按鈕，看看表單會發生什麼變化，並對照下方的程式碼來理解其運作原理。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReactHookFormDemo />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>參考資料</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li><a href="https://react-hook-form.com/get-started" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">React Hook Form - Get Started</a></li>
            <li><a href="https://react-hook-form.com/api/usecontroller/controller" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Controller - React Hook Form Docs</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
