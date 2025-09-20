import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import ReportsTable from '../Dashboard/ReportsTable';
import WeeklyTrends from '../Dashboard/WeeklyTrends';

const Dashboard = () => {

type WasteStatus = 'Pending' | 'Collected' | 'Disposed';
type TrackingUpdate = { status: string; timestamp: string };
type WasteApiReport = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  wasteType: string;
  description?: string;
  photo?: string;
  status: WasteStatus;
  collector?: string;
  trackingUpdates: TrackingUpdate[];
  createdAt: string;
  updatedAt: string;
};

const [report, setReport] = useState<WasteApiReport[]>([])
  useEffect(() => {
    const fetchWasteData = async () => {
      try {
        const response = await fetch("/api/waste");
        const data: WasteApiReport[] = await response.json();
        setReport(data)
        console.log('Waste data:', data);
      } catch (error) {
        setReport([])
        console.error('Error fetching waste data:', error);
      }
    };
    
    fetchWasteData();
  }, [])
  

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Derived: table rows from fetched data
  const wasteReports = report.map((r: WasteApiReport, idx) => ({
    id: (r._id ? String(r._id).slice(-6).toUpperCase() : `WR${idx.toString().padStart(3, '0')}`),
    location: r.location ?? 'Unknown',
    type: r.wasteType ?? 'Unknown',
    status: r.status ?? 'Pending',
    date: r.createdAt ? new Date(r.createdAt).toISOString().slice(0, 10) : '',
    reporter: r.name ?? 'Anonymous'
  }));

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Collected': { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      'Disposed': { variant: 'secondary' as const, icon: Clock, color: 'text-blue-600' },
      'Pending': { variant: 'outline' as const, icon: AlertCircle, color: 'text-yellow-600' },
    };

    const normalized = (status || 'Pending') as keyof typeof statusConfig;
    const config = statusConfig[normalized] ?? statusConfig['Pending'];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className={`h-3 w-3 ${config.color}`} />
        {status}
      </Badge>
    );
  };

  const filteredReports = wasteReports.filter(r => {
    const matchesSearch = r.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         r.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         r.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Waste type distribution from fetched data
  const palette = ['#059669','#0891b2','#7c3aed','#dc2626','#ea580c','#16a34a','#0ea5e9','#a855f7','#ef4444','#f59e0b'];
  const typeCounts = report.reduce((acc: Record<string, number>, r: WasteApiReport) => {
    const key = r.wasteType || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const wasteTypeData = Object.entries(typeCounts).map(([name, value], i) => ({ name, value, color: palette[i % palette.length] }));

  // Monthly trends (last 6 months rolling)
  const now = new Date();
  const months: { label: string; year: number; month: number }[] = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return { label: d.toLocaleString('default', { month: 'short' }), year: d.getFullYear(), month: d.getMonth() };
  });
  const monthlyData = months.map(({ label, year, month }) => {
    const inMonth = report.filter((r: WasteApiReport) => {
      const d = r.createdAt ? new Date(r.createdAt) : null;
      return d && d.getFullYear() === year && d.getMonth() === month;
    });
    const collected = inMonth.filter((r: WasteApiReport) => r.status === 'Collected').length;
    return { month: label, reports: inMonth.length, collected };
  });

  // Weekly trend (last 7 days)
  const dailyMap: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().slice(0,10);
    dailyMap[key] = 0;
  }
  report.forEach((r: WasteApiReport) => {
    if (r.createdAt) {
      const key = new Date(r.createdAt).toISOString().slice(0,10);
      if (key in dailyMap) dailyMap[key] += 1;
    }
  });
  const weeklyTrendData = Object.entries(dailyMap).map(([date, value]) => ({ day: new Date(date).toLocaleDateString(undefined, { weekday: 'short' }), value }));

  const totalReports = report.length;
  const currentMonthIdx = now.getMonth();
  const currentYear = now.getFullYear();
  const thisMonthReports = report.filter((r: WasteApiReport) => {
    const d = r.createdAt ? new Date(r.createdAt) : null;
    return d && d.getFullYear() === currentYear && d.getMonth() === currentMonthIdx;
  });
  const collectedThisMonth = thisMonthReports.filter((r: WasteApiReport) => r.status === 'Collected').length;
  const collectedPct = thisMonthReports.length ? Math.round((collectedThisMonth / thisMonthReports.length) * 100) : 0;
  const pendingCount = report.filter((r: WasteApiReport) => r.status === 'Pending').length;
  const uniqueUsers = new Set(report.map((r: WasteApiReport) => r.email || r.name)).size;
  const stats = [
    { title: 'Total Reports', value: String(totalReports), change: '', trend: 'up', icon: TrendingUp },
    { title: 'Collected This Month', value: `${collectedPct}%`, change: '', trend: 'up', icon: TrendingUp },
    { title: 'Pending Reports', value: String(pendingCount), change: '', trend: pendingCount ? 'down' : 'up', icon: TrendingDown },
    { title: 'Active Users', value: String(uniqueUsers), change: '', trend: 'up', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Waste Management Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Monitor waste collection activities and environmental impact
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card border-0 hover:shadow-green transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Waste Type Distribution */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="shadow-card border-0">
                  <CardHeader>
                    <CardTitle>Waste Type Distribution</CardTitle>
                    <CardDescription>
                      Breakdown of reported waste types this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={wasteTypeData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {wasteTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Monthly Trends */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="shadow-card border-0">
                  <CardHeader>
                    <CardTitle>Monthly Collection Trends</CardTitle>
                    <CardDescription>
                      Reports vs. collections over the last 6 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="reports" fill="hsl(var(--primary))" name="Reports" />
                        <Bar dataKey="collected" fill="hsl(var(--primary-glow))" name="Collected" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Weekly Trend */}
        <WeeklyTrends trendData={weeklyTrendData} />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {/* Search and Filter */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by location, type, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="collected">Collected</SelectItem>
                  <SelectItem value="disposed">Disposed</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Reports Table */}
            <ReportsTable
              filteredReports={filteredReports}
              getStatusBadge={getStatusBadge}
            />

          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <h3 className="text-2xl font-bold mb-4">Advanced Analytics</h3>
              <p className="text-muted-foreground mb-6">
                Detailed environmental impact analysis and predictive insights coming soon!
              </p>
              <Button className="bg-gradient-primary hover:shadow-green transition-all duration-300">
                Get Notified When Available
              </Button>
            </motion.div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;