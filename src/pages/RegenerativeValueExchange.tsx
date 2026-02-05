import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Waves, Users, TrendingUp, Zap, Globe, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';

interface RegenerativeAsset {
  id: string;
  project_id: string;
  asset_category: string;
  asset_name: string;
  asset_description: string;
  total_units: number;
  available_units: number;
  base_price: number;
  current_price: number;
  price_adjustment_factor: number;
  impact_multiplier: number;
  verification_status: string;
  impact_data: any;
}

interface LivingSmartContract {
  id: string;
  asset_id: string;
  contract_type: string;
  contract_logic: any;
  trigger_conditions: any;
  current_state: any;
  active: boolean;
  last_executed: string;
}

interface RegenerativeExchange {
  id: string;
  asset_id: string;
  exchange_type: string;
  units_exchanged: number;
  price_per_unit: number;
  total_value: number;
  impact_bonus: number;
  regeneration_premium: number;
  exchange_status: string;
  executed_at: string;
}

interface RegenerativePortfolio {
  id: string;
  portfolio_name: string;
  portfolio_focus: string;
  total_value: number;
  regenerative_impact_score: number;
  carbon_impact: number;
  biodiversity_impact: number;
  cultural_impact: number;
}

export default function RegenerativeValueExchange() {
  const [assets, setAssets] = useState<RegenerativeAsset[]>([]);
  const [contracts, setContracts] = useState<LivingSmartContract[]>([]);
  const [exchanges, setExchanges] = useState<RegenerativeExchange[]>([]);
  const [portfolios, setPortfolios] = useState<RegenerativePortfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExchangeData();
  }, []);

  const fetchExchangeData = async () => {
    try {
      // Mock data since exchange tables don't exist
      setAssets([
        { id: '1', project_id: 'p1', asset_category: 'carbon_restoration', asset_name: 'Amazon Carbon Credit', asset_description: 'Verified carbon credits from Amazon reforestation', total_units: 10000, available_units: 7500, base_price: 25, current_price: 32, price_adjustment_factor: 1.28, impact_multiplier: 1.5, verification_status: 'verified', impact_data: {} },
        { id: '2', project_id: 'p2', asset_category: 'biodiversity_credit', asset_name: 'Coral Reef Restoration Unit', asset_description: 'Biodiversity credits from Pacific coral restoration', total_units: 5000, available_units: 3200, base_price: 45, current_price: 52, price_adjustment_factor: 1.15, impact_multiplier: 1.8, verification_status: 'active', impact_data: {} }
      ]);
      setContracts([
        { id: '1', asset_id: '1', contract_type: 'impact_linked_payment', contract_logic: {}, trigger_conditions: { description: 'Payment released when carbon verification complete' }, current_state: { status: 'Monitoring' }, active: true, last_executed: '2026-01-28' }
      ]);
      setExchanges([
        { id: '1', asset_id: '1', exchange_type: 'direct_purchase', units_exchanged: 500, price_per_unit: 32, total_value: 16000, impact_bonus: 2400, regeneration_premium: 800, exchange_status: 'completed', executed_at: '2026-02-01' },
        { id: '2', asset_id: '2', exchange_type: 'market_order', units_exchanged: 200, price_per_unit: 52, total_value: 10400, impact_bonus: 1560, regeneration_premium: 0, exchange_status: 'pending', executed_at: '2026-02-03' }
      ]);
      setPortfolios([
        { id: '1', portfolio_name: 'Climate Action Fund', portfolio_focus: 'carbon_sequestration', total_value: 2500000, regenerative_impact_score: 4.2, carbon_impact: 15000, biodiversity_impact: 0.35, cultural_impact: 0.2 },
        { id: '2', portfolio_name: 'Ocean Restoration Portfolio', portfolio_focus: 'marine_ecosystems', total_value: 1800000, regenerative_impact_score: 4.5, carbon_impact: 8000, biodiversity_impact: 0.65, cultural_impact: 0.15 }
      ]);
    } catch (error) {
      console.error('Error fetching exchange data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'carbon_restoration': return <Leaf className="h-4 w-4 text-green-600" />;
      case 'ecosystem_recovery': return <Waves className="h-4 w-4 text-blue-600" />;
      case 'cultural_preservation': return <Users className="h-4 w-4 text-purple-600" />;
      case 'biodiversity_credit': return <Globe className="h-4 w-4 text-orange-600" />;
      default: return <TrendingUp className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriceChange = (asset: RegenerativeAsset) => {
    return ((asset.current_price - asset.base_price) / asset.base_price) * 100;
  };

  const executeExchange = async (assetId: string, _units: number) => {
    try {
      const asset = assets.find(a => a.id === assetId);
      if (!asset) return;
      toast.success('Regenerative asset exchange initiated');
    } catch (error) {
      toast.error('Failed to execute exchange');
    }
  };

  const getTotalMarketValue = () => {
    return assets.reduce((sum, asset) => sum + (asset.available_units * asset.current_price), 0);
  };

  const getTotalExchangeVolume = () => {
    return exchanges.reduce((sum, exchange) => sum + exchange.total_value, 0);
  };

  const getAverageImpactMultiplier = () => {
    if (assets.length === 0) return 1;
    return assets.reduce((sum, asset) => sum + asset.impact_multiplier, 0) / assets.length;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading regenerative exchange data...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <ArrowUpDown className="h-8 w-8 text-green-600" />
        <h1 className="text-3xl font-bold">Regenerative Value Exchange</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Available Assets</p>
                <p className="text-2xl font-bold">{assets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Market Value</p>
                <p className="text-2xl font-bold">${getTotalMarketValue().toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Exchange Volume</p>
                <p className="text-2xl font-bold">${getTotalExchangeVolume().toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Avg Impact Multiplier</p>
                <p className="text-2xl font-bold">{getAverageImpactMultiplier().toFixed(2)}x</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assets">Regenerative Assets</TabsTrigger>
          <TabsTrigger value="contracts">Living Contracts</TabsTrigger>
          <TabsTrigger value="exchanges">Recent Exchanges</TabsTrigger>
          <TabsTrigger value="portfolios">Portfolios</TabsTrigger>
        </TabsList>

        <TabsContent value="assets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets.map((asset) => (
              <Card key={asset.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getCategoryIcon(asset.asset_category)}
                      {asset.asset_name}
                    </CardTitle>
                    <Badge className={getStatusColor(asset.verification_status)}>
                      {asset.verification_status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">{asset.asset_description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600">Current Price</p>
                        <p className="font-semibold">${asset.current_price}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Price Change</p>
                        <p className={`font-semibold ${getPriceChange(asset) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {getPriceChange(asset) >= 0 ? '+' : ''}{getPriceChange(asset).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Availability</p>
                      <Progress value={(asset.available_units / asset.total_units) * 100} />
                      <p className="text-xs text-gray-500 mt-1">
                        {asset.available_units.toLocaleString()} / {asset.total_units.toLocaleString()} units
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">
                        Impact: {asset.impact_multiplier.toFixed(2)}x
                      </Badge>
                      <Button 
                        size="sm"
                        onClick={() => executeExchange(asset.id, Math.min(10, asset.available_units))}
                        disabled={asset.available_units === 0}
                      >
                        Exchange
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          {contracts.map((contract) => (
            <Card key={contract.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    {contract.contract_type.replace('_', ' ')}
                  </CardTitle>
                  <Badge variant={contract.active ? 'default' : 'secondary'}>
                    {contract.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Trigger Conditions</p>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      {contract.trigger_conditions?.description || 'Impact-based triggers configured'}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Current State</p>
                    <div className="bg-blue-50 p-3 rounded text-sm">
                      Status: {contract.current_state?.status || 'Monitoring'}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Last executed: {contract.last_executed ? new Date(contract.last_executed).toLocaleDateString() : 'Never'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="exchanges" className="space-y-4">
          {exchanges.map((exchange) => (
            <Card key={exchange.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ArrowUpDown className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium capitalize">{exchange.exchange_type.replace('_', ' ')}</p>
                      <p className="text-sm text-gray-600">
                        {exchange.units_exchanged.toLocaleString()} units @ ${exchange.price_per_unit}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${exchange.total_value.toLocaleString()}</p>
                    <Badge className={getStatusColor(exchange.exchange_status)} variant="outline">
                      {exchange.exchange_status}
                    </Badge>
                  </div>
                </div>
                {(exchange.impact_bonus > 0 || exchange.regeneration_premium > 0) && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between text-sm">
                      {exchange.impact_bonus > 0 && (
                        <span className="text-green-600">
                          Impact Bonus: +${exchange.impact_bonus.toFixed(2)}
                        </span>
                      )}
                      {exchange.regeneration_premium > 0 && (
                        <span className="text-blue-600">
                          Regeneration Premium: +${exchange.regeneration_premium.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(exchange.executed_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="portfolios" className="space-y-4">
          {portfolios.map((portfolio) => (
            <Card key={portfolio.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {portfolio.portfolio_name}
                  </CardTitle>
                  <Badge variant="outline" className="capitalize">
                    {portfolio.portfolio_focus.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="text-lg font-semibold">${portfolio.total_value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Impact Score</p>
                    <p className="text-lg font-semibold">{portfolio.regenerative_impact_score.toFixed(1)}/5.0</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Carbon Impact</p>
                    <p className="text-lg font-semibold">{portfolio.carbon_impact.toLocaleString()} tCO₂</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Biodiversity</p>
                    <p className="text-lg font-semibold">+{(portfolio.biodiversity_impact * 100).toFixed(1)}%</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Regenerative Impact</span>
                    <span>{portfolio.regenerative_impact_score.toFixed(1)}/5.0</span>
                  </div>
                  <Progress value={(portfolio.regenerative_impact_score / 5) * 100} />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}