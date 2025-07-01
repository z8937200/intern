import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold tracking-tight mb-4">
          歡迎來到 React 實習生道館！
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          為有抱負的 React 開發者設計的互動式教學平台
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>變數宣告</CardTitle>
            <CardDescription>學習 let, var, const 的差異</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/variables" className="text-primary hover:underline">
              開始學習 →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useState Hook</CardTitle>
            <CardDescription>React 狀態管理基礎</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/usestate" className="text-primary hover:underline">
              開始學習 →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>useEffect Hook</CardTitle>
            <CardDescription>處理副作用與生命週期</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/useeffect" className="text-primary hover:underline">
              開始學習 →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
