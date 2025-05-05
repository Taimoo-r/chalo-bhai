import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, Plus } from "lucide-react"
import Link from "next/link"

interface CoinBalanceProps {
  balance: number
  compact?: boolean
}

export default function CoinBalance({ balance, compact = false }: CoinBalanceProps) {
  if (compact) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-yellow-500" />
          <span className="font-semibold">{balance} coins</span>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/coins">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Coin Balance</CardTitle>
        <CardDescription>Earn coins by driving, redeem for events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-yellow-500" />
            <span className="text-2xl font-bold">{balance}</span>
          </div>
          <Button size="sm" asChild>
            <Link href="/coins">
              <Plus className="h-4 w-4 mr-2" />
              Get More Coins
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
