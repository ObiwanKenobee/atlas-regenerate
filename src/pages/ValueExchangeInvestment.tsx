import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, DollarSign, PieChart, FileText, ShoppingCart, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

// Mock data
const mockAssets = [
  { id: '1', project_id: 'p1', asset_type: 'carbon_credit', asset_status: 'listed', total_units: 10000, available_units: 7500, unit_price: 32, risk_rating: 'low', impact_metrics: {}, created_at: '2025-06-01' },
  { id: '2', project_id: 'p2', asset_type: 'biodiversity_credit', asset_status: 'listed', total_units: 5000, available_units: 3200, unit_price: 45, risk_rating: 'medium', impact_metrics: {}, created_at: '2025-08-15' },
  { id: '3', project_id: 'p3', asset_type: 'impact_bond', asset_status: 'listed', total_units: 1000, available_units: 650, unit_price: 1000, risk_rating: 'low', impact_metrics: {}, created_at: '2025-03-20' },
  { id: '4', project_id: 'p4', asset_type: 'revenue_share', asset_status: 'listed', total_units: 2000, available_units: 1400, unit_price: 250, risk_rating: 'high', impact_metrics: {}, created_at: '2025-09-01' },
];

const mockTransactions = [
  { id: '1', asset_id: 'a1', transaction_type: 'primary_purchase', units_traded: 500, unit_price: 32, total_amount: 16000, platform_fee: 400, practitioner_payment: 15600, created_at: '2026-01-08' },
  { id: '2', asset_id: 'a2', transaction_type: 'secondary_sale', units_traded: 200, unit_price: 48, total_amount: 9600, platform_fee: 240, practitioner_payment: 0, created_at: '2026-01-07' },
  { id: '3', asset_id: 'a3', transaction_type: 'primary_purchase', units_traded: 50, unit_price: 1000, total_amount: 50000, platform_fee: 1250, practitioner_payment: 48750, created_at: '2026-01-06' },
];

const mockPortfolios = [
  { id: '1', portfolio_name: 'Climate Impact Fund', portfolio_type: 'balanced', total_invested: 250000, current_value: 285000, impact_score: 4.5, diversification_score: 4.2 },
  { id: '2', portfolio_name: 'High Impact Growth', portfolio_type: 'growth', total_invested: 180000, current_value: 198000, impact_score: 4.8, diversification_score: 3.8 },
];

export default function ValueExchangeInvestment() {
  const [assets] = useState(mockAssets);
  const [transactions] = useState(mockTransactions);
  const [portfolios] = useState(mockPortfolios);

  const purchaseAsset = (assetId: string) => {
    toast.success('Investment transaction initiated');
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-muted';
    }
  };

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case 'carbon_credit': return '🌱';
      case 'biodiversity_credit': return '🦋';
      case 'impact_bond': return '💰';
      case 'revenue_share': return '📈';
      default: return '💎';
    }
  };

  const getTotalMarketValue = () => assets.reduce((sum, a) => sum + (a.available_units * a.unit_price), 0);
  const getTotalTransactionVolume = () => transactions.reduce((sum, tx) => sum + tx.total_amount, 0);
  const getTotalPractitionerPayments = () => transactions.reduce((sum, tx) => sum + tx.practitioner_payment, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="h-8 w-8 text-green-600" />
        <h1 className="text-3xl font-bold">Value Exchange & Investment</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><ShoppingCart className="h-5 w-5 text-blue-600" /><div><p className="text-sm text-muted-foreground">Listed Assets</p><p className="text-2xl font-bold">{assets.length}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-green-600" /><div><p className="text-sm text-muted-foreground">Market Value</p><p className="text-2xl font-bold">${getTotalMarketValue().toLocaleString()}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-purple-600" /><div><p className="text-sm text-muted-foreground">Transaction Volume</p><p className="text-2xl font-bold">${getTotalTransactionVolume().toLocaleString()}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-orange-600" /><div><p className="text-sm text-muted-foreground">Practitioner Payments</p><p className="text-2xl font-bold">${getTotalPractitionerPayments().toLocaleString()}</p></div></div></CardContent></Card>
      </div>

      <Tabs defaultValue="marketplace" className="space-y-4">
        <TabsList>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="portfolios">Portfolios</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets.map((asset) => (
              <Card key={asset.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 capitalize"><span>{getAssetTypeIcon(asset.asset_type)}</span>{asset.asset_type.replace(/_/g, ' ')}</CardTitle>
                    <Badge className={getRiskColor(asset.risk_rating)}>{asset.risk_rating} risk</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><p className="text-muted-foreground">Unit Price</p><p className="font-semibold">${asset.unit_price}</p></div>
                      <div><p className="text-muted-foreground">Available</p><p className="font-semibold">{asset.available_units.toLocaleString()}</p></div>
                    </div>
                    <div><p className="text-sm text-muted-foreground mb-1">Availability</p><Progress value={(asset.available_units / asset.total_units) * 100} /><p className="text-xs text-muted-foreground mt-1">{asset.available_units.toLocaleString()} / {asset.total_units.toLocaleString()} units</p></div>
                    <div className="pt-2"><Button onClick={() => purchaseAsset(asset.id)} className="w-full" disabled={asset.available_units === 0}>Invest Now</Button></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolios" className="space-y-4">
          {portfolios.map((portfolio) => (
            <Card key={portfolio.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2"><PieChart className="h-5 w-5" />{portfolio.portfolio_name}</CardTitle>
                  <Badge variant="outline" className="capitalize">{portfolio.portfolio_type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><p className="text-sm text-muted-foreground">Total Invested</p><p className="text-lg font-semibold">${portfolio.total_invested.toLocaleString()}</p></div>
                  <div><p className="text-sm text-muted-foreground">Current Value</p><p className="text-lg font-semibold">${portfolio.current_value.toLocaleString()}</p></div>
                  <div><p className="text-sm text-muted-foreground">Impact Score</p><p className="text-lg font-semibold">{portfolio.impact_score.toFixed(1)}/5.0</p></div>
                  <div><p className="text-sm text-muted-foreground">Diversification</p><p className="text-lg font-semibold">{portfolio.diversification_score.toFixed(1)}/5.0</p></div>
                </div>
                <div className="mt-4"><div className="flex justify-between text-sm mb-1"><span>Performance</span><span className={portfolio.current_value >= portfolio.total_invested ? 'text-green-600' : 'text-red-600'}>{((portfolio.current_value - portfolio.total_invested) / portfolio.total_invested * 100).toFixed(1)}%</span></div><Progress value={Math.max(0, Math.min(100, (portfolio.current_value / portfolio.total_invested) * 100))} /></div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          {transactions.map((transaction) => (
            <Card key={transaction.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div><p className="font-medium">${transaction.total_amount.toLocaleString()}</p><p className="text-sm text-muted-foreground capitalize">{transaction.transaction_type.replace(/_/g, ' ')} • {transaction.units_traded.toLocaleString()} units</p></div>
                  </div>
                  <div className="text-right"><p className="text-sm text-muted-foreground">{new Date(transaction.created_at).toLocaleDateString()}</p><p className="text-xs text-muted-foreground">Fee: ${transaction.platform_fee.toFixed(2)}</p></div>
                </div>
                <div className="mt-3 pt-3 border-t"><div className="flex justify-between text-sm"><span className="text-muted-foreground">Practitioner Payment:</span><span className="font-medium text-green-600">${transaction.practitioner_payment.toLocaleString()}</span></div></div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Institutional Reports</CardTitle></CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Institutional-grade reports will appear here</p>
                <p className="text-sm text-muted-foreground mt-2">Monthly, quarterly, and annual performance reports</p>
                <Button className="mt-4">Generate Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
