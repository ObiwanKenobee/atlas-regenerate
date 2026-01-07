import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserFlowLayout from '@/components/UserFlowLayout';
import { 
  Leaf, TrendingUp, ShoppingCart, Award, 
  Filter, Search, ArrowUpRight, Zap 
} from 'lucide-react';

const carbonCredits = [
  {
    id: '1',
    project: 'Amazon Reforestation Initiative',
    type: 'Forestry',
    vintage: '2024',
    price: 45.50,
    available: 2500,
    verified: 'Verra VCS',
    rating: 'AAA',
    location: 'Brazil',
    cobenefits: ['Biodiversity', 'Community Jobs', 'Water Conservation']
  },
  {
    id: '2',
    project: 'Regenerative Coffee Farms',
    type: 'Agriculture',
    vintage: '2024',
    price: 52.75,
    available: 1800,
    verified: 'Gold Standard',
    rating: 'AA+',
    location: 'Costa Rica',
    cobenefits: ['Soil Health', 'Farmer Income', 'Biodiversity']
  },
  {
    id: '3',
    project: 'Kelp Forest Restoration',
    type: 'Blue Carbon',
    vintage: '2024',
    price: 68.25,
    available: 950,
    verified: 'Plan Vivo',
    rating: 'AAA',
    location: 'California',
    cobenefits: ['Marine Ecosystem', 'Coastal Protection', 'Research']
  }
];

export default function CarbonMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCredits, setSelectedCredits] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const addToCart = (credit, quantity = 100) => {
    const item = { ...credit, quantity, total: credit.price * quantity };
    setSelectedCredits([...selectedCredits, item]);
    setCartTotal(cartTotal + item.total);
  };

  return (
    <UserFlowLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Carbon Credit Marketplace</h1>
            <p className="text-gray-600">Trade verified carbon credits from regenerative projects</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({selectedCredits.length})
            </Button>
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Market Price</p>
                  <p className="text-lg font-bold">$55.42/tCO₂</p>
                  <p className="text-xs text-green-600">+12.5% today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Volume (24h)</p>
                  <p className="text-lg font-bold">8,450 tCO₂</p>
                  <p className="text-xs text-blue-600">+8.2% vs yesterday</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Available Credits</p>
                  <p className="text-lg font-bold">25,340</p>
                  <p className="text-xs text-purple-600">From 127 projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600">Commission</p>
                  <p className="text-lg font-bold">10%</p>
                  <p className="text-xs text-orange-600">Platform fee</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="marketplace" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
            <TabsTrigger value="trading">Trading</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-4">
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search carbon credits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {carbonCredits.map((credit) => (
                <Card key={credit.id} className="bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{credit.project}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{credit.type}</Badge>
                          <Badge className="bg-green-100 text-green-800">{credit.rating}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">${credit.price}</p>
                        <p className="text-xs text-gray-600">per tCO₂</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Available</p>
                        <p className="font-semibold">{credit.available.toLocaleString()} tCO₂</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Vintage</p>
                        <p className="font-semibold">{credit.vintage}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Verified by</p>
                        <p className="font-semibold">{credit.verified}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Location</p>
                        <p className="font-semibold">{credit.location}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Co-benefits</p>
                      <div className="flex flex-wrap gap-1">
                        {credit.cobenefits.map((benefit, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => addToCart(credit, 50)}
                      >
                        Buy 50 tCO₂
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => addToCart(credit, 100)}
                      >
                        Buy 100 tCO₂
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>My Carbon Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Leaf className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">You haven't purchased any carbon credits yet</p>
                  <Button>Browse Marketplace</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trading" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Price Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Interactive price chart would be here</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Recent Trades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Amazon Reforestation</p>
                        <p className="text-sm text-gray-600">250 tCO₂ @ $45.50</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">$11,375</p>
                        <p className="text-xs text-gray-500">2 min ago</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">Kelp Forest Restoration</p>
                        <p className="text-sm text-gray-600">100 tCO₂ @ $68.25</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">$6,825</p>
                        <p className="text-xs text-gray-500">5 min ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Market Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Forestry Credits</span>
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-semibold">+15%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Agriculture Credits</span>
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-semibold">+8%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Blue Carbon</span>
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-semibold">+22%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Trading Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Today</span>
                      <span className="font-bold">8,450 tCO₂</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">This Week</span>
                      <span className="font-bold">52,340 tCO₂</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">This Month</span>
                      <span className="font-bold">234,560 tCO₂</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Platform Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Commission (10%)</span>
                      <span className="font-bold text-green-600">$128,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly Growth</span>
                      <span className="font-bold text-blue-600">+34%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Active Traders</span>
                      <span className="font-bold">2,340</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </UserFlowLayout>
  );
}