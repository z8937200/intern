"use client"

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Info, Sparkles, Zap, Waypoints } from 'lucide-react'
import { CodeBlock } from './code-block'

export function ReactHookFormDemo() {
  const [retrievedValue, setRetrievedValue] = useState<string | null>(null);
  const { toast } = useToast();

  const { control, handleSubmit, setValue, getValues, trigger, formState: { errors } } = useForm({
    defaultValues: {
      trainerName: "小智",
      pokemonName: "",
      level: 1,
    },
  });

  function onSubmit(data: any) {
    toast({
        title: "表單成功提交！",
        description: <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4"><code className="text-white">{JSON.stringify(data, null, 2)}</code></pre>
    })
    setRetrievedValue(null);
  }

  const handleSetValue = () => {
    setValue("pokemonName", "皮卡丘", { shouldValidate: true, shouldDirty: true });
    setValue("level", 25, { shouldValidate: true, shouldDirty: true });
    setRetrievedValue("已使用 setValue 將「皮卡丘」和等級「25」填入表單，並觸發驗證。");
  }

  const handleGetValue = () => {
    const currentTrainer = getValues("trainerName");
    setRetrievedValue(`getValues("trainerName") 的結果是: "${currentTrainer || '空的'}"`);
  }

  const handleTriggerValidation = async () => {
    const result = await trigger("pokemonName");
    if (result) {
        setRetrievedValue("「寶可夢名稱」欄位驗證成功！ (trigger 回傳 true)");
    } else {
        const errorMessage = errors.pokemonName?.message;
        setRetrievedValue(`「寶可夢名稱」欄位驗證失敗！ (trigger 回傳 false)\n錯誤訊息：${String(errorMessage)}`);
    }
  }
  
  const getErrorMessage = (error: any) => {
    if (!error) return null;
    return <p className="text-sm font-medium text-destructive mt-1">{String(error.message)}</p>
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="trainerName">訓練家名稱 (trainerName)</Label>
            <Controller
              name="trainerName"
              control={control}
              rules={{
                required: "訓練家名稱不可空白",
                minLength: { value: 2, message: "訓練家名稱至少需要 2 個字元。" }
              }}
              render={({ field }) => (
                <Input id="trainerName" placeholder="例如：小智" {...field} />
              )}
            />
            {getErrorMessage(errors.trainerName)}
          </div>
          
          <div className="space-y-2">
             <Label htmlFor="pokemonName">寶可夢名稱 (pokemonName)</Label>
            <Controller
              name="pokemonName"
              control={control}
              rules={{
                required: "寶可夢名稱不可空白",
                minLength: { value: 2, message: "寶可夢名稱至少需要 2 個字元。" }
              }}
              render={({ field }) => (
                <Input id="pokemonName" placeholder="例如：皮卡丘" {...field} />
              )}
            />
            {getErrorMessage(errors.pokemonName)}
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">等級 (level)</Label>
            <Controller
              name="level"
              control={control}
              rules={{
                  required: "等級不可空白",
                  min: { value: 1, message: "等級至少為 1" },
                  max: { value: 100, message: "等級不能超過 100" },
                  validate: (value) => !isNaN(Number(value)) || "請輸入有效的數字"
              }}
              render={({ field }) => (
                <Input 
                  id="level" 
                  type="number" 
                  {...field} 
                  onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}
                />
              )}
            />
            {getErrorMessage(errors.level)}
          </div>
          
          <Button type="submit">提交表單</Button>
        </form>
        
        <div className="mt-8 space-y-6">
            <h4 className="font-semibold">功能按鈕</h4>
            
            <div>
                <Button variant="outline" onClick={handleSetValue}>
                    <Sparkles className="mr-2" /> setValue (填入皮卡丘資料)
                </Button>
                <CodeBlock className="mt-2 text-xs" code={`// 第二個參數 { shouldValidate: true } 會在設值後立即觸發驗證
setValue("pokemonName", "皮卡丘", { shouldValidate: true });
setValue("level", 25, { shouldValidate: true });`} />
            </div>

            <div>
                <Button variant="outline" onClick={handleGetValue}>
                    <Waypoints className="mr-2" /> getValues (取得訓練家名稱)
                </Button>
                 <CodeBlock className="mt-2 text-xs" code={`const currentTrainer = getValues("trainerName");`} />
            </div>

            <div>
                <Button variant="outline" onClick={handleTriggerValidation}>
                    <Zap className="mr-2" /> trigger (驗證寶可夢名稱)
                </Button>
                 <CodeBlock className="mt-2 text-xs" code={`// 手動觸發單一欄位的驗證，並回傳一個布林值
const result = await trigger("pokemonName");`} />
            </div>
        </div>

      </CardContent>
        {retrievedValue && (
            <CardFooter>
                 <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>觸發結果</AlertTitle>
                    <AlertDescription className="whitespace-pre-wrap">
                        {retrievedValue}
                    </AlertDescription>
                </Alert>
            </CardFooter>
        )}
    </Card>
  )
}
