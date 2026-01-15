import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Satellite, Cpu, Volume2, Droplets, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";

interface MonitoringData {
  id: string;
  measurement_type: string;
  measurement_value: number;
  measurement_unit: string;
  confidence_score: number;
  recorded_at: string;
  oracle_name: string;
  oracle_type: string;
}

interface VerificationEvent {
  id: string;
  event_type: string;
  severity: string;
  ai_analysis: string;
  verification_status: string;
  created_at: string;
}

interface SatelliteObservation {
  id: string;
  image_date: string;
  ndvi_mean: number;
  ndvi_change: number;
  vegetation_health: string;
  analysis_confidence: number;
  cloud_coverage: number;
}

// Mock data
const mockMonitoringData: MonitoringData[] = [
  { id: "1", measurement_type: "soil_moisture", measurement_value: 34.5, measurement_unit: "%", confidence_score: 0.95, recorded_at: "2024-01-26T10:30:00Z", oracle_name: "Soil Sensor Alpha", oracle_type: "iot_sensor" },
  { id: "2", measurement_type: "ndvi", measurement_value: 0.75, measurement_unit: "index", confidence_score: 0.96, recorded_at: "2024-01-26T08:00:00Z", oracle_name: "Sentinel-2", oracle_type: "satellite" },
  { id: "3", measurement_type: "acoustic_index", measurement_value: 8.2, measurement_unit: "score", confidence_score: 0.89, recorded_at: "2024-01-26T06:00:00Z", oracle_name: "Biodiversity Monitor", oracle_type: "acoustic" },
  { id: "4", measurement_type: "water_quality", measurement_value: 7.2, measurement_unit: "pH", confidence_score: 0.92, recorded_at: "2024-01-26T12:00:00Z", oracle_name: "Water Sensor Beta", oracle_type: "water_quality" },
];

const mockVerificationEvents: VerificationEvent[] = [
  { id: "1", event_type: "vegetation_improvement", severity: "success", ai_analysis: "NDVI increase of 8% detected over 30-day period", verification_status: "verified", created_at: "2024-01-26T10:00:00Z" },
  { id: "2", event_type: "soil_health_alert", severity: "warning", ai_analysis: "Soil moisture below optimal range in sector 4", verification_status: "pending", created_at: "2024-01-25T14:00:00Z" },
  { id: "3", event_type: "biodiversity_milestone", severity: "success", ai_analysis: "3 new bird species detected in monitoring zone", verification_status: "verified", created_at: "2024-01-24T09:00:00Z" },
];

const mockSatelliteData: SatelliteObservation[] = [
  { id: "1", image_date: "2024-01-24", ndvi_mean: 0.75, ndvi_change: 0.08, vegetation_health: "excellent", analysis_confidence: 0.96, cloud_coverage: 15.5 },
  { id: "2", image_date: "2024-01-19", ndvi_mean: 0.72, ndvi_change: 0.05, vegetation_health: "good", analysis_confidence: 0.94, cloud_coverage: 12.3 },
  { id: "3", image_date: "2024-01-14", ndvi_mean: 0.70, ndvi_change: 0.03, vegetation_health: "good", analysis_confidence: 0.92, cloud_coverage: 18.7 },
];

const RealTimeMonitoring = () => {
  const [monitoringData, setMonitoringData] = useState<MonitoringData[]>([]);
  const [verificationEvents, setVerificationEvents] = useState<VerificationEvent[]>([]);
  const [satelliteData, setSatelliteData] = useState<SatelliteObservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMonitoringData();
    const interval = setInterval(fetchMonitoringData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchMonitoringData = async () => {
    try {
      // Use mock data instead of database queries
      setMonitoringData(mockMonitoringData);
      setVerificationEvents(mockVerificationEvents);
      setSatelliteData(mockSatelliteData);
    } catch (error) {
      console.error("Error fetching monitoring data:", error);
    } finally {
      setLoading(false);
    }
  };

  const ndviTrend = [
    { date: "Jan 1", ndvi: 0.65, confidence: 0.92 },
    { date: "Jan 6", ndvi: 0.68, confidence: 0.94 },
    { date: "Jan 11", ndvi: 0.71, confidence: 0.91 },
    { date: "Jan 16", ndvi: 0.74, confidence: 0.95 },
    { date: "Jan 21", ndvi: 0.72, confidence: 0.93 },
    { date: "Jan 26", ndvi: 0.75, confidence: 0.96 }
  ];

  const sensorData = [
    { time: "00:00", soil_moisture: 32, ph: 7.2, temperature: 18 },
    { time: "04:00", soil_moisture: 35, ph: 7.1, temperature: 16 },
    { time: "08:00", soil_moisture: 38, ph: 7.3, temperature: 22 },
    { time: "12:00", soil_moisture: 34, ph: 7.2, temperature: 28 },
    { time: "16:00", soil_moisture: 31, ph: 7.1, temperature: 26 },
    { time: "20:00", soil_moisture: 33, ph: 7.2, temperature: 20 }
  ];

  const biodiversityData = [
    { month: "Oct", species: 8, acoustic_index: 6.2 },
    { month: "Nov", species: 12, acoustic_index: 7.1 },
    { month: "Dec", species: 15, acoustic_index: 8.3 },
    { month: "Jan", species: 18, acoustic_index: 9.1 }
  ];

  const getOracleIcon = (type: string) => {
    switch (type) {
      case "satellite": return Satellite;
      case "iot_sensor": return Cpu;
      case "acoustic": return Volume2;
      case "water_quality": return Droplets;
      default: return TrendingUp;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success": return "text-green-600 bg-green-50";
      case "warning": return "text-yellow-600 bg-yellow-50";
      case "critical": return "text-red-600 bg-red-50";
      default: return "text-blue-600 bg-blue-50";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl mb-2">Reality-Linked Verification</h1>
          <p className="text-muted-foreground">
            AI-powered oracles continuously monitor ecological improvement with satellite imagery, IoT sensors, and real-time data streams
          </p>
        </div>

        {/* Oracle Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Satellite className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Satellite Monitoring</p>
                    <p className="text-lg font-bold">Every 5 Days</p>
                    <Badge variant="outline" className="text-xs">96% Confidence</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Soil Sensors</p>
                    <p className="text-lg font-bold">24/7 Active</p>
                    <Badge variant="outline" className="text-xs">127 Sensors</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Acoustic Analysis</p>
                    <p className="text-lg font-bold">18 Species</p>
                    <Badge variant="outline" className="text-xs">Daily Scans</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Water Quality</p>
                    <p className="text-lg font-bold">pH 7.2</p>
                    <Badge variant="outline" className="text-xs">Excellent</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs defaultValue="satellite" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="satellite">Satellite Monitoring</TabsTrigger>
            <TabsTrigger value="sensors">IoT Sensors</TabsTrigger>
            <TabsTrigger value="biodiversity">Biodiversity</TabsTrigger>
            <TabsTrigger value="verification">AI Verification</TabsTrigger>
          </TabsList>

          {/* Satellite Monitoring */}
          <TabsContent value="satellite" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>NDVI Vegetation Health Trend</CardTitle>
                  <p className="text-sm text-muted-foreground">Normalized Difference Vegetation Index - Updated every 5 days</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={ndviTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                      <XAxis dataKey="date" stroke="hsl(45 10% 55%)" />
                      <YAxis domain={[0.6, 0.8]} stroke="hsl(45 10% 55%)" />
                      <Tooltip />
                      <Line type="monotone" dataKey="ndvi" stroke="#2d9b6e" strokeWidth={3} name="NDVI" />
                      <Line type="monotone" dataKey="confidence" stroke="#3b8fa3" strokeWidth={2} strokeDasharray="5 5" name="Confidence" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Latest Satellite Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-800">Vegetation Improvement Detected</p>
                        <p className="text-sm text-green-600">8% increase in NDVI over 30 days</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">96% Confidence</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Last Image:</span>
                        <p className="font-medium">2 days ago</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cloud Coverage:</span>
                        <p className="font-medium">15.5%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Resolution:</span>
                        <p className="font-medium">10m/pixel</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Source:</span>
                        <p className="font-medium">Sentinel-2</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Satellite Imagery
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* IoT Sensors */}
          <TabsContent value="sensors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Real-Time Soil Conditions</CardTitle>
                  <p className="text-sm text-muted-foreground">Live data from 127 soil health sensors</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={sensorData}>
                      <defs>
                        <linearGradient id="moisture" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2d9b6e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#2d9b6e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                      <XAxis dataKey="time" stroke="hsl(45 10% 55%)" />
                      <YAxis stroke="hsl(45 10% 55%)" />
                      <Tooltip />
                      <Area type="monotone" dataKey="soil_moisture" stroke="#2d9b6e" fill="url(#moisture)" name="Soil Moisture %" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Sensor Network Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-muted/20 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">127</p>
                        <p className="text-sm text-muted-foreground">Active Sensors</p>
                      </div>
                      <div className="p-3 bg-muted/20 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">98.5%</p>
                        <p className="text-sm text-muted-foreground">Uptime</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Soil Moisture</span>
                        <span className="font-medium">34.2% ± 2.1</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">pH Level</span>
                        <span className="font-medium">7.2 ± 0.1</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Temperature</span>
                        <span className="font-medium">22°C ± 1.5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Nutrient Level</span>
                        <span className="font-medium">Optimal</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Network Health</span>
                        <span>98.5%</span>
                      </div>
                      <Progress value={98.5} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Biodiversity */}
          <TabsContent value="biodiversity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Acoustic Biodiversity Analysis</CardTitle>
                  <p className="text-sm text-muted-foreground">AI-powered species detection from acoustic monitoring</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={biodiversityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                      <XAxis dataKey="month" stroke="hsl(45 10% 55%)" />
                      <YAxis stroke="hsl(45 10% 55%)" />
                      <Tooltip />
                      <Bar dataKey="species" fill="#2d9b6e" name="Species Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Species Detection Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <p className="text-3xl font-bold text-primary">18</p>
                      <p className="text-sm text-muted-foreground">Species Detected This Month</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-lg font-bold text-green-700">+5</p>
                        <p className="text-xs text-green-600">New Species</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-lg font-bold text-blue-700">9.1</p>
                        <p className="text-xs text-blue-600">Acoustic Index</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Recent Detections:</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Red-winged Blackbird</span>
                          <Badge variant="outline">Bird</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>American Bullfrog</span>
                          <Badge variant="outline">Amphibian</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Monarch Butterfly</span>
                          <Badge variant="outline">Insect</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Verification */}
          <TabsContent value="verification" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="glass lg:col-span-2">
                <CardHeader>
                  <CardTitle>Verification Events</CardTitle>
                  <p className="text-sm text-muted-foreground">AI-powered analysis of ecological changes</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {verificationEvents.map((event) => (
                      <div key={event.id} className={`p-4 rounded-lg ${getSeverityColor(event.severity)}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            {event.severity === "success" ? (
                              <CheckCircle className="w-5 h-5 mt-0.5" />
                            ) : event.severity === "warning" ? (
                              <AlertTriangle className="w-5 h-5 mt-0.5" />
                            ) : (
                              <Clock className="w-5 h-5 mt-0.5" />
                            )}
                            <div>
                              <p className="font-medium capitalize">{event.event_type.replace(/_/g, " ")}</p>
                              <p className="text-sm mt-1">{event.ai_analysis}</p>
                            </div>
                          </div>
                          <Badge variant="outline">{event.verification_status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Verification Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <p className="text-3xl font-bold text-primary">94%</p>
                      <p className="text-sm text-muted-foreground">Verification Rate</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Verified Claims</span>
                        <span className="font-medium">47</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Pending Review</span>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Rejected</span>
                        <span className="font-medium">0</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span>AI Confidence</span>
                        <span>94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;
