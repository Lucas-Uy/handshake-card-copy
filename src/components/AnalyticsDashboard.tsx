import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNfcData } from "@/hooks/useNfcData";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Zap,
  Users,
  Smartphone,
  MapPin,
  Settings,
  TrendingUp,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Timeframe = "daily" | "weekly" | "monthly";

type WidgetConfig = {
  id: string;
  label: string;
  visible: boolean;
};

export function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState<Timeframe>("daily");
  const [editMode, setEditMode] = useState(false);
  const [widgets, setWidgets] = useState<WidgetConfig[]>([
    { id: "total", label: "Total Taps", visible: true },
    { id: "unique", label: "Unique Users", visible: true },
    { id: "devices", label: "Device Types", visible: true },
    { id: "location", label: "Top Location", visible: true },
  ]);

  const { chartData, stats } = useNfcData(timeframe);

  const toggleWidget = (id: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, visible: !w.visible } : w))
    );
  };

  const visibleWidgets = widgets.filter((w) => w.visible);

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          {/* Timeframe Switcher */}
          <div className="flex flex-col gap-2">
            <Label className="text-slate-400 text-xs uppercase tracking-wider">
              Timeframe
            </Label>
            <div className="flex gap-2">
              {(["daily", "weekly", "monthly"] as Timeframe[]).map((t) => (
                <Button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  variant={timeframe === t ? "default" : "outline"}
                  size="sm"
                  className={
                    timeframe === t
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 border-0"
                      : "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                  }
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Edit Mode Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-slate-400" />
              <Label className="text-slate-400 text-sm">Customize Widgets</Label>
              <Switch checked={editMode} onCheckedChange={setEditMode} />
            </div>
            {editMode && (
              <Badge
                variant="outline"
                className="border-cyan-500/50 text-cyan-400 animate-pulse"
              >
                Edit Mode Active
              </Badge>
            )}
          </div>
        </div>

        {/* Widget Manager */}
        <AnimatePresence>
          {editMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-slate-800"
            >
              <Label className="text-slate-400 text-xs uppercase tracking-wider mb-3 block">
                Visible Widgets
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {widgets.map((widget) => (
                  <label
                    key={widget.id}
                    className="flex items-center gap-2 p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={widget.visible}
                      onChange={() => toggleWidget(widget.id)}
                      className="w-4 h-4 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                    />
                    <span className="text-sm text-slate-300">{widget.label}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Stats Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {widgets.find((w) => w.id === "total")?.visible && (
            <motion.div
              key="total"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <StatCard
                title="Total Taps"
                value={stats.totalTaps.toLocaleString()}
                change={stats.totalChange}
                icon={<Zap className="w-5 h-5" />}
                color="cyan"
              />
            </motion.div>
          )}

          {widgets.find((w) => w.id === "unique")?.visible && (
            <motion.div
              key="unique"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <StatCard
                title="Unique Users"
                value={stats.uniqueUsers.toLocaleString()}
                change={stats.uniqueChange}
                icon={<Users className="w-5 h-5" />}
                color="purple"
              />
            </motion.div>
          )}

          {widgets.find((w) => w.id === "devices")?.visible && (
            <motion.div
              key="devices"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <StatCard
                title="Device Types"
                value={stats.deviceTypes}
                icon={<Smartphone className="w-5 h-5" />}
                color="cyan"
              />
            </motion.div>
          )}

          {widgets.find((w) => w.id === "location")?.visible && (
            <motion.div
              key="location"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <StatCard
                title="Top Location"
                value={stats.topLocation}
                icon={<MapPin className="w-5 h-5" />}
                color="purple"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Main Chart */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Interaction Trends
            </h3>
            <p className="text-slate-400 text-sm">
              NFC tap activity over {timeframe} period
            </p>
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">
              +{stats.totalChange}% growth
            </span>
          </div>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorTaps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                opacity={0.3}
              />
              <XAxis
                dataKey="name"
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "#06b6d4", strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="taps"
                stroke="#06b6d4"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorTaps)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
        <p className="text-slate-400 text-xs mb-1">{payload[0].payload.name}</p>
        <p className="text-cyan-400 text-lg font-bold">
          {payload[0].value.toLocaleString()} taps
        </p>
      </div>
    );
  }
  return null;
}
