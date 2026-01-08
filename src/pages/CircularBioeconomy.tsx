import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Recycle, Factory, Leaf, ArrowRightLeft, Package, TrendingUp } from 'lucide-react';

// Mock data for Circular Bioeconomy
const mockEnterprises = [
  { id: '1', enterprise_name: 'GreenCycle Industries', enterprise_type: 'waste_processing', business_model: 'B2B', operational_scale: 'regional', circular_principles: ['Reduce', 'Reuse', 'Recycle'], certification_standards: ['ISO 14001', 'Cradle to Cradle'], created_at: '2024-01-15' },
  { id: '2', enterprise_name: 'BioRefine Co', enterprise_type: 'biorefinery', business_model: 'B2B', operational_scale: 'national', circular_principles: ['Renewable Resources', 'Biodegradable'], certification_standards: ['USDA BioPreferred'], created_at: '2024-02-20' },
  { id: '3', enterprise_name: 'UpCycle Studio', enterprise_type: 'upcycling', business_model: 'B2C', operational_scale: 'local', circular_principles: ['Upcycling', 'Design for Longevity'], certification_standards: [], created_at: '2024-03-10' },
];

const mockWasteStreams = [
  { id: '1', enterprise_id: '1', waste_type: 'Organic', input_volume_kg: 15000, recovery_rate: 85, diversion_from_landfill: 12750, processing_efficiency: 92, processed_at: '2024-12-01' },
  { id: '2', enterprise_id: '1', waste_type: 'Plastic', input_volume_kg: 8000, recovery_rate: 72, diversion_from_landfill: 5760, processing_efficiency: 78, processed_at: '2024-12-05' },
];

const mockMaterialFlows = [
  { id: '1', enterprise_id: '1', material_type: 'Recycled Plastic', flow_direction: 'outbound', quantity_kg: 5000, quality_grade: 'grade_a', value_per_kg: 1.25, circularity_score: 0.85, tracked_at: '2024-12-01' },
  { id: '2', enterprise_id: '2', material_type: 'Biofuel', flow_direction: 'outbound', quantity_kg: 3500, quality_grade: 'premium', value_per_kg: 2.10, circularity_score: 0.92, tracked_at: '2024-12-03' },
];

const mockProducts = [
  { id: '1', enterprise_id: '3', product_name: 'Upcycled Furniture', product_category: 'home_goods', circular_design_score: 0.88, biodegradability: 'durable', market_demand: 78, price_per_unit: 250, created_at: '2024-11-15' },
  { id: '2', enterprise_id: '1', product_name: 'Compost Premium', product_category: 'agriculture', circular_design_score: 0.95, biodegradability: 'biodegradable', market_demand: 92, price_per_unit: 15, created_at: '2024-11-20' },
];

const mockInitiatives = [
  { id: '1', enterprise_id: '1', initiative_name: 'Zero Waste 2025', initiative_type: 'waste_elimination', baseline_waste_kg: 50000, current_waste_kg: 15000, reduction_percentage: 70, cost_savings: 125000, status: 'active', implementation_date: '2024-01-01' },
  { id: '2', enterprise_id: '2', initiative_name: 'Renewable Packaging', initiative_type: 'material_substitution', baseline_waste_kg: 20000, current_waste_kg: 8000, reduction_percentage: 60, cost_savings: 45000, status: 'active', implementation_date: '2024-03-15' },
];

const mockMetrics = [
  { id: '1', enterprise_id: '1', total_waste_processed_kg: 23000, materials_recovered_kg: 18500, landfill_diversion_rate: 0.85, carbon_emissions_avoided: 4500, revenue_generated: 125000, circular_economy_score: 0.82, reporting_period_start: '2024-10-01', reporting_period_end: '2024-12-31' },
  { id: '2', enterprise_id: '2', total_waste_processed_kg: 15000, materials_recovered_kg: 13200, landfill_diversion_rate: 0.88, carbon_emissions_avoided: 3200, revenue_generated: 95000, circular_economy_score: 0.78, reporting_period_start: '2024-10-01', reporting_period_end: '2024-12-31' },
];

export default function CircularBioeconomy() {
  const [enterprises] = useState(mockEnterprises);
  const [wasteStreams] = useState(mockWasteStreams);
  const [materialFlows] = useState(mockMaterialFlows);
  const [products] = useState(mockProducts);
  const [initiatives] = useState(mockInitiatives);
  const [metrics] = useState(mockMetrics);

  const getEnterpriseTypeIcon = (type: string) => {
    switch (type) {
      case 'waste_processing': return <Recycle className="h-4 w-4 text-green-600" />;
      case 'material_recovery': return <ArrowRightLeft className="h-4 w-4 text-blue-600" />;
      case 'biorefinery': return <Factory className="h-4 w-4 text-purple-600" />;
      case 'upcycling': return <Package className="h-4 w-4 text-orange-600" />;
      case 'composting': return <Leaf className="h-4 w-4 text-green-600" />;
      default: return <Recycle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'planned': return 'bg-yellow-500';
      case 'paused': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBiodegradabilityColor = (type: string) => {
    switch (type) {
      case 'biodegradable': return 'bg-green-500';
      case 'compostable': return 'bg-blue-500';
      case 'recyclable': return 'bg-yellow-500';
      case 'durable': return 'bg-purple-500';
      default: return 'bg-muted';
    }
  };

  const getTotalWasteProcessed = () => {
    return wasteStreams.reduce((sum, waste) => sum + waste.input_volume_kg, 0);
  };

  const getTotalCarbonAvoided = () => {
    return metrics.reduce((sum, metric) => sum + metric.carbon_emissions_avoided, 0);
  };

  const getAverageCircularityScore = () => {
    if (metrics.length === 0) return 0;
    return metrics.reduce((sum, metric) => sum + metric.circular_economy_score, 0) / metrics.length;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Recycle className="h-8 w-8 text-green-600" />
        <h1 className="text-3xl font-bold">Circular Bioeconomy</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Factory className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Enterprises</p>
                <p className="text-2xl font-bold">{enterprises.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Recycle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Waste Processed</p>
                <p className="text-2xl font-bold">{(getTotalWasteProcessed() / 1000).toFixed(1)}k kg</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Carbon Avoided</p>
                <p className="text-2xl font-bold">{(getTotalCarbonAvoided() / 1000).toFixed(1)}k tCO₂e</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Circularity Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(getAverageCircularityScore())}`}>
                  {(getAverageCircularityScore() * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="enterprises" className="space-y-4">
        <TabsList>
          <TabsTrigger value="enterprises">Enterprises</TabsTrigger>
          <TabsTrigger value="waste">Waste Streams</TabsTrigger>
          <TabsTrigger value="materials">Material Flows</TabsTrigger>
          <TabsTrigger value="products">Circular Products</TabsTrigger>
          <TabsTrigger value="initiatives">Waste Reduction</TabsTrigger>
          <TabsTrigger value="metrics">Impact Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="enterprises" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enterprises.map((enterprise) => (
              <Card key={enterprise.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getEnterpriseTypeIcon(enterprise.enterprise_type)}
                    {enterprise.enterprise_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-semibold capitalize">{enterprise.enterprise_type.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Business Model</p>
                      <p className="font-semibold uppercase">{enterprise.business_model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Scale</p>
                      <p className="font-semibold capitalize">{enterprise.operational_scale}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Circular Principles</p>
                      <div className="flex flex-wrap gap-1">
                        {enterprise.circular_principles.map((principle, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {principle}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {enterprise.certification_standards.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Certifications</p>
                        <div className="flex flex-wrap gap-1">
                          {enterprise.certification_standards.map((cert, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Established: {new Date(enterprise.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="waste" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wasteStreams.map((waste) => (
              <Card key={waste.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Recycle className="h-5 w-5" />
                    {waste.waste_type} Waste Processing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Input Volume</p>
                        <p className="font-semibold">{waste.input_volume_kg.toLocaleString()} kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Landfill Diverted</p>
                        <p className="font-semibold text-green-600">{waste.diversion_from_landfill.toLocaleString()} kg</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Recovery Rate</span>
                        <span>{waste.recovery_rate.toFixed(1)}%</span>
                      </div>
                      <Progress value={waste.recovery_rate} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Processing Efficiency</span>
                        <span>{waste.processing_efficiency.toFixed(1)}%</span>
                      </div>
                      <Progress value={waste.processing_efficiency} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Processed: {new Date(waste.processed_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          {materialFlows.map((flow) => (
            <Card key={flow.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ArrowRightLeft className="h-5 w-5" />
                    {flow.material_type} Flow
                  </CardTitle>
                  <Badge variant="outline" className="capitalize">
                    {flow.flow_direction}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-semibold">{flow.quantity_kg.toLocaleString()} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quality Grade</p>
                    <p className="font-semibold capitalize">{flow.quality_grade.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Value per kg</p>
                    <p className="font-semibold">${flow.value_per_kg?.toFixed(2) || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Circularity Score</p>
                    <p className={`font-semibold ${getScoreColor(flow.circularity_score)}`}>
                      {(flow.circularity_score * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Circularity Score</span>
                    <span>{(flow.circularity_score * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={flow.circularity_score * 100} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Tracked: {new Date(flow.tracked_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      {product.product_name}
                    </CardTitle>
                    <Badge className={getBiodegradabilityColor(product.biodegradability)}>
                      {product.biodegradability}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-semibold capitalize">{product.product_category.replace('_', ' ')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Market Demand</p>
                        <p className="font-semibold">{product.market_demand.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Price per Unit</p>
                        <p className="font-semibold">${product.price_per_unit.toFixed(2)}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Design Score</span>
                        <span>{(product.circular_design_score * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={product.circular_design_score * 100} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(product.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="initiatives" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {initiatives.map((initiative) => (
              <Card key={initiative.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      {initiative.initiative_name}
                    </CardTitle>
                    <Badge className={getStatusColor(initiative.status)}>
                      {initiative.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-semibold capitalize">{initiative.initiative_type.replace('_', ' ')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Baseline Waste</p>
                        <p className="font-semibold">{initiative.baseline_waste_kg.toLocaleString()} kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Waste</p>
                        <p className="font-semibold text-green-600">{initiative.current_waste_kg.toLocaleString()} kg</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Reduction Progress</span>
                        <span className="text-green-600">{initiative.reduction_percentage}%</span>
                      </div>
                      <Progress value={initiative.reduction_percentage} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cost Savings</p>
                      <p className="font-semibold text-green-600">${initiative.cost_savings.toLocaleString()}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Started: {new Date(initiative.implementation_date).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.id}>
                <CardHeader>
                  <CardTitle>Impact Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Waste Processed</p>
                        <p className="font-semibold">{metric.total_waste_processed_kg.toLocaleString()} kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Materials Recovered</p>
                        <p className="font-semibold text-green-600">{metric.materials_recovered_kg.toLocaleString()} kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Carbon Avoided</p>
                        <p className="font-semibold">{metric.carbon_emissions_avoided.toLocaleString()} tCO₂e</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenue Generated</p>
                        <p className="font-semibold text-green-600">${metric.revenue_generated.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Landfill Diversion Rate</span>
                        <span>{(metric.landfill_diversion_rate * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={metric.landfill_diversion_rate * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Circular Economy Score</span>
                        <span className={getScoreColor(metric.circular_economy_score)}>
                          {(metric.circular_economy_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={metric.circular_economy_score * 100} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Period: {new Date(metric.reporting_period_start).toLocaleDateString()} - {new Date(metric.reporting_period_end).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
