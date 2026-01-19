import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Recycle, Factory, Leaf, ArrowRightLeft, Package, TrendingUp, Lightbulb } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CircularEnterprise {
  id: string;
  enterprise_name: string;
  enterprise_type: string;
  business_model: string;
  operational_scale: string;
  circular_principles: string[];
  certification_standards: string[];
  created_at: string;
}

interface WasteStreamTracking {
  id: string;
  enterprise_id: string;
  waste_type: string;
  input_volume_kg: number;
  recovery_rate: number;
  diversion_from_landfill: number;
  processing_efficiency: number;
  processed_at: string;
}

interface MaterialFlow {
  id: string;
  enterprise_id: string;
  material_type: string;
  flow_direction: string;
  quantity_kg: number;
  quality_grade: string;
  value_per_kg: number;
  circularity_score: number;
  tracked_at: string;
}

interface CircularProduct {
  id: string;
  enterprise_id: string;
  product_name: string;
  product_category: string;
  circular_design_score: number;
  biodegradability: string;
  market_demand: number;
  price_per_unit: number;
  created_at: string;
}

interface WasteReductionInitiative {
  id: string;
  enterprise_id: string;
  initiative_name: string;
  initiative_type: string;
  baseline_waste_kg: number;
  current_waste_kg: number;
  reduction_percentage: number;
  cost_savings: number;
  status: string;
  implementation_date: string;
}

interface BioeconomyMetric {
  id: string;
  enterprise_id: string;
  total_waste_processed_kg: number;
  materials_recovered_kg: number;
  landfill_diversion_rate: number;
  carbon_emissions_avoided: number;
  revenue_generated: number;
  circular_economy_score: number;
  reporting_period_start: string;
  reporting_period_end: string;
}

export default function CircularBioeconomy() {
  const [enterprises, setEnterprises] = useState<CircularEnterprise[]>([]);
  const [wasteStreams, setWasteStreams] = useState<WasteStreamTracking[]>([]);
  const [materialFlows, setMaterialFlows] = useState<MaterialFlow[]>([]);
  const [products, setProducts] = useState<CircularProduct[]>([]);
  const [initiatives, setInitiatives] = useState<WasteReductionInitiative[]>([]);
  const [metrics, setMetrics] = useState<BioeconomyMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBioeconomyData();
    const interval = setInterval(fetchBioeconomyData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchBioeconomyData = async () => {
    try {
      const [enterprisesRes, wasteRes, flowsRes, productsRes, initiativesRes, metricsRes] = await Promise.all([
        supabase.from('circular_enterprises').select('*').order('created_at', { ascending: false }),
        supabase.from('waste_stream_tracking').select('*').order('processed_at', { ascending: false }).limit(20),
        supabase.from('material_flows').select('*').order('tracked_at', { ascending: false }).limit(25),
        supabase.from('circular_products').select('*').order('created_at', { ascending: false }),
        supabase.from('waste_reduction_initiatives').select('*').order('implementation_date', { ascending: false }).limit(20),
        supabase.from('bioeconomy_metrics').select('*').order('reporting_period_end', { ascending: false }).limit(10)
      ]);

      if (enterprisesRes.data) setEnterprises(enterprisesRes.data);
      if (wasteRes.data) setWasteStreams(wasteRes.data);
      if (flowsRes.data) setMaterialFlows(flowsRes.data);
      if (productsRes.data) setProducts(productsRes.data);
      if (initiativesRes.data) setInitiatives(initiativesRes.data);
      if (metricsRes.data) setMetrics(metricsRes.data);
    } catch (error) {
      console.error('Error fetching bioeconomy data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEnterpriseTypeIcon = (type: string) => {
    switch (type) {
      case 'waste_processing': return <Recycle className="h-4 w-4 text-green-600" />;
      case 'material_recovery': return <ArrowRightLeft className="h-4 w-4 text-blue-600" />;
      case 'biorefinery': return <Factory className="h-4 w-4 text-purple-600" />;
      case 'upcycling': return <Package className="h-4 w-4 text-orange-600" />;
      case 'composting': return <Leaf className="h-4 w-4 text-green-600" />;
      default: return <Recycle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'planned': return 'bg-yellow-500';
      case 'paused': return 'bg-gray-500';
      default: return 'bg-gray-500';
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
      default: return 'bg-gray-500';
    }
  };

  const getTotalWasteProcessed = () => {
    return wasteStreams.reduce((sum, waste) => sum + waste.input_volume_kg, 0);
  };

  const getAverageRecoveryRate = () => {
    if (wasteStreams.length === 0) return 0;
    return wasteStreams.reduce((sum, waste) => sum + waste.recovery_rate, 0) / wasteStreams.length;
  };

  const getTotalCarbonAvoided = () => {
    return metrics.reduce((sum, metric) => sum + metric.carbon_emissions_avoided, 0);
  };

  const getAverageCircularityScore = () => {
    if (metrics.length === 0) return 0;
    return metrics.reduce((sum, metric) => sum + metric.circular_economy_score, 0) / metrics.length;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading circular bioeconomy data...</div>;
  }

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
                <p className="text-sm text-gray-600">Enterprises</p>
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
                <p className="text-sm text-gray-600">Waste Processed</p>
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
                <p className="text-sm text-gray-600">Carbon Avoided</p>
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
                <p className="text-sm text-gray-600">Circularity Score</p>
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
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getEnterpriseTypeIcon(enterprise.enterprise_type)}
                      {enterprise.enterprise_name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="font-semibold capitalize">{enterprise.enterprise_type.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Business Model</p>
                      <p className="font-semibold uppercase">{enterprise.business_model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Scale</p>
                      <p className="font-semibold capitalize">{enterprise.operational_scale}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Circular Principles</p>
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
                        <p className="text-sm text-gray-600 mb-2">Certifications</p>
                        <div className="flex flex-wrap gap-1">
                          {enterprise.certification_standards.map((cert, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">
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
                        <p className="text-gray-600">Input Volume</p>
                        <p className="font-semibold">{waste.input_volume_kg.toLocaleString()} kg</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Landfill Diverted</p>
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
                    <p className="text-xs text-gray-500">
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
                    <p className="text-sm text-gray-600">Quantity</p>
                    <p className="font-semibold">{flow.quantity_kg.toLocaleString()} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Quality Grade</p>
                    <p className="font-semibold capitalize">{flow.quality_grade.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Value per kg</p>
                    <p className="font-semibold">${flow.value_per_kg?.toFixed(2) || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Circularity Score</p>
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
                <p className="text-xs text-gray-500 mt-2">
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
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-semibold capitalize">{product.product_category.replace('_', ' ')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600">Market Demand</p>
                        <p className="font-semibold">{product.market_demand.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Price per Unit</p>
                        <p className="font-semibold">${product.price_per_unit.toFixed(2)}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Circular Design Score</span>
                        <span className={getScoreColor(product.circular_design_score)}>
                          {(product.circular_design_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={product.circular_design_score * 100} />
                    </div>
                    <p className="text-xs text-gray-500">
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
                    <CardTitle className="text-base">{initiative.initiative_name}</CardTitle>
                    <Badge className={getStatusColor(initiative.status)}>
                      {initiative.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Initiative Type</p>
                      <p className="font-semibold capitalize">{initiative.initiative_type.replace('_', ' ')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Baseline Waste</p>
                        <p className="font-semibold">{initiative.baseline_waste_kg.toLocaleString()} kg</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Current Waste</p>
                        <p className="font-semibold">{initiative.current_waste_kg.toLocaleString()} kg</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Waste Reduction</span>
                        <span className="text-green-600">{initiative.reduction_percentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={initiative.reduction_percentage} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cost Savings</p>
                      <p className="font-semibold text-green-600">${initiative.cost_savings?.toLocaleString() || 'N/A'}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Implemented: {new Date(initiative.implementation_date).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          {metrics.map((metric) => (
            <Card key={metric.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Bioeconomy Impact Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Waste Processed</p>
                    <p className="text-lg font-semibold">{(metric.total_waste_processed_kg / 1000).toFixed(1)}k kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Materials Recovered</p>
                    <p className="text-lg font-semibold">{(metric.materials_recovered_kg / 1000).toFixed(1)}k kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Carbon Avoided</p>
                    <p className="text-lg font-semibold text-green-600">{(metric.carbon_emissions_avoided / 1000).toFixed(1)}k tCO₂e</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Revenue Generated</p>
                    <p className="text-lg font-semibold">${metric.revenue_generated.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Landfill Diversion Rate</span>
                      <span>{metric.landfill_diversion_rate.toFixed(1)}%</span>
                    </div>
                    <Progress value={metric.landfill_diversion_rate} />
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
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Period: {new Date(metric.reporting_period_start).toLocaleDateString()} - {new Date(metric.reporting_period_end).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}