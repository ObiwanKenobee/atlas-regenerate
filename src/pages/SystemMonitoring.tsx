import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserFlowLayout from '@/components/UserFlowLayout';
import { 
  Activity, Zap, Shield, Globe, Clock, 
  Server, Database, Wifi, AlertTriangle, CheckCircle 
} from 'lucide-react';

export default function SystemMonitoring() {
  const [metrics, setMetrics] = useState({
    uptime: 99.97,
    responseTime: 145,
    throughput: 2850,
    errorRate: 0.03,
    cpuUsage: 34,
    memoryUsage: 67,
    diskUsage: 23,
    networkLatency: 12
  });

  const [alerts] = useState([
    { id: '1', type: 'warning', message: 'High memory usage on server-2', time: '2 min ago', severity: 'medium' },
    { id: '2', type: 'info', message: 'Database backup completed successfully', time: '15 min ago', severity: 'low' },
    { id: '3', type: 'success', message: 'API response time improved by 15%', time: '1 hour ago', severity: 'low' }
  ]);

  const [services] = useState([
    { name: 'API Gateway', status: 'healthy', uptime: 99.98, responseTime: 89 },
    { name: 'Database', status: 'healthy', uptime: 99.95, responseTime: 12 },
    { name: 'Authentication', status: 'healthy', uptime: 99.99, responseTime: 156 },
    { name: 'File Storage', status: 'warning', uptime: 99.87, responseTime: 234 },
    { name: 'Analytics Engine', status: 'healthy', uptime: 99.94, responseTime: 445 },
    { name: 'Notification Service', status: 'healthy', uptime: 99.96, responseTime: 78 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        responseTime: prev.responseTime + (Math.random() - 0.5) * 20,
        throughput: prev.throughput + (Math.random() - 0.5) * 100,
        cpuUsage: Math.max(0, Math.min(100, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(0, Math.min(100, prev.memoryUsage + (Math.random() - 0.5) * 5))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Activity className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <UserFlowLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">System Monitoring</h1>
            <p className="text-gray-600">Real-time platform performance and health metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">All Systems Operational</span>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Uptime</p>
                  <p className="text-lg font-bold">{metrics.uptime.toFixed(2)}%</p>
                  <p className="text-xs text-green-600">SLA: 99.9%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Response Time</p>
                  <p className="text-lg font-bold">{Math.round(metrics.responseTime)}ms</p>
                  <p className="text-xs text-blue-600">Target: &lt;200ms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Throughput</p>
                  <p className="text-lg font-bold">{Math.round(metrics.throughput)}/min</p>
                  <p className="text-xs text-purple-600">Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600">Error Rate</p>
                  <p className="text-lg font-bold">{metrics.errorRate.toFixed(2)}%</p>
                  <p className="text-xs text-orange-600">Target: &lt;0.1%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>API Response Time</span>
                      <span>{Math.round(metrics.responseTime)}ms</span>
                    </div>
                    <Progress value={Math.min(100, (metrics.responseTime / 500) * 100)} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Database Query Time</span>
                      <span>12ms</span>
                    </div>
                    <Progress value={6} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Page Load Time</span>
                      <span>1.2s</span>
                    </div>
                    <Progress value={40} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Traffic Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Users</span>
                    <span className="font-bold">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Requests/Hour</span>
                    <span className="font-bold">171,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Transfer</span>
                    <span className="font-bold">45.2 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cache Hit Rate</span>
                    <span className="font-bold text-green-600">94.5%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <Card key={index} className="bg-white/70 backdrop-blur-sm border-white/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{service.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(service.status)}`}></div>
                        <Badge variant={service.status === 'healthy' ? 'default' : 'secondary'}>
                          {service.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Uptime</p>
                        <p className="font-semibold">{service.uptime.toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Response</p>
                        <p className="font-semibold">{service.responseTime}ms</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Health Score</span>
                        <span>{service.uptime.toFixed(1)}%</span>
                      </div>
                      <Progress value={service.uptime} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="infrastructure" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Server Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>{Math.round(metrics.cpuUsage)}%</span>
                    </div>
                    <Progress value={metrics.cpuUsage} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>{Math.round(metrics.memoryUsage)}%</span>
                    </div>
                    <Progress value={metrics.memoryUsage} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Disk Usage</span>
                      <span>{metrics.diskUsage}%</span>
                    </div>
                    <Progress value={metrics.diskUsage} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Database Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Connections</span>
                    <span className="font-bold">45/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Query Time (avg)</span>
                    <span className="font-bold">12ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cache Hit Rate</span>
                    <span className="font-bold text-green-600">96.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Storage Used</span>
                    <span className="font-bold">234 GB / 1 TB</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  Network Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{metrics.networkLatency}ms</p>
                    <p className="text-sm text-gray-600">Latency</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">1.2 Gbps</p>
                    <p className="text-sm text-gray-600">Bandwidth</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">0.01%</p>
                    <p className="text-sm text-gray-600">Packet Loss</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">99.99%</p>
                    <p className="text-sm text-gray-600">Availability</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card key={alert.id} className="bg-white/70 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{alert.message}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              alert.severity === 'high' ? 'destructive' :
                              alert.severity === 'medium' ? 'secondary' : 'outline'
                            }>
                              {alert.severity}
                            </Badge>
                            <span className="text-xs text-gray-500">{alert.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Alert Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">0</p>
                    <p className="text-sm text-gray-600">Critical</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">1</p>
                    <p className="text-sm text-gray-600">Warning</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">2</p>
                    <p className="text-sm text-gray-600">Info</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </UserFlowLayout>
  );
}