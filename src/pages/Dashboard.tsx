import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Leaf, Waves, Heart, RefreshCw, Zap, TrendingUp,
  LogOut, Menu, X, BarChart3, Globe, Users
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar
} from "recharts";

interface ImpactMetric {
  id: string;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  category: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchMetrics();
  }, [user, navigate]);

  const fetchMetrics = async () => {
    const { data } = await supabase.from("impact_metrics").select("*");
    if (data) {
      setMetrics(data);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Chart data
  const timeSeriesData = [
    { month: "Jan", carbon: 180, hectares: 1200, water: 320 },
    { month: "Feb", carbon: 220, hectares: 1450, water: 380 },
    { month: "Mar", carbon: 280, hectares: 1800, water: 420 },
    { month: "Apr", carbon: 350, hectares: 2200, water: 490 },
    { month: "May", carbon: 420, hectares: 2600, water: 550 },
    { month: "Jun", carbon: 500, hectares: 3100, water: 620 },
  ];

  const categoryData = [
    { name: "Climate", value: 35, color: "#2d9b6e" },
    { name: "Land", value: 28, color: "#3b8fa3" },
    { name: "Ocean", value: 20, color: "#2a7a94" },
    { name: "Social", value: 17, color: "#b8860b" },
  ];

  const projectsData = [
    { name: "Forests", value: 42 },
    { name: "Farms", value: 38 },
    { name: "Ocean", value: 28 },
    { name: "Urban", value: 18 },
  ];

  const formatValue = (value: number, unit: string) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "climate": return Leaf;
      case "land": return Globe;
      case "ocean": return Waves;
      case "social": return Users;
      case "health": return Heart;
      case "ecosystem": return RefreshCw;
      case "economy": return TrendingUp;
      case "energy": return Zap;
      default: return BarChart3;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } transition-transform duration-300`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest to-ocean flex items-center justify-center">
                <Leaf className="w-5 h-5 text-background" />
              </div>
              <span className="font-serif text-xl">Atlas Sanctum</span>
            </a>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-2">
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary">
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </a>
            <a href="/how-it-works" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
              <Globe className="w-5 h-5" />
              How It Works
            </a>
          </nav>

          {/* User */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-earth to-gold flex items-center justify-center text-background font-medium">
                {user?.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.email}</p>
                <p className="text-xs text-muted-foreground">Member</p>
              </div>
            </div>
            <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start text-muted-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-card border-b border-border p-4 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <span className="font-serif text-lg">Dashboard</span>
        <div className="w-6" />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 pt-20 lg:pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-serif text-3xl lg:text-4xl mb-2">Impact Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time metrics from the regenerative value exchange
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {metrics.map((metric, index) => {
              const Icon = getCategoryIcon(metric.category);
              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-xl p-4 lg:p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl lg:text-3xl font-serif text-gradient-primary">
                    {formatValue(metric.metric_value, metric.metric_unit)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {metric.metric_name}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Area Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="font-serif text-xl mb-4">Impact Growth</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={timeSeriesData}>
                  <defs>
                    <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2d9b6e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2d9b6e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorHectares" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b8fa3" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b8fa3" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                  <XAxis dataKey="month" stroke="hsl(45 10% 55%)" />
                  <YAxis stroke="hsl(45 10% 55%)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(160 25% 6%)",
                      border: "1px solid hsl(160 20% 15%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="carbon"
                    stroke="#2d9b6e"
                    fillOpacity={1}
                    fill="url(#colorCarbon)"
                  />
                  <Area
                    type="monotone"
                    dataKey="hectares"
                    stroke="#3b8fa3"
                    fillOpacity={1}
                    fill="url(#colorHectares)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="font-serif text-xl mb-4">Impact Distribution</h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(160 25% 6%)",
                        border: "1px solid hsl(160 20% 15%)",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-sm text-muted-foreground">{cat.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="font-serif text-xl mb-4">Projects by Sector</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={projectsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 15%)" />
                <XAxis dataKey="name" stroke="hsl(45 10% 55%)" />
                <YAxis stroke="hsl(45 10% 55%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(160 25% 6%)",
                    border: "1px solid hsl(160 20% 15%)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" fill="#2d9b6e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </main>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
