import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  color?: "cyan" | "purple";
}

export function StatCard({ title, value, change, icon, color = "cyan" }: StatCardProps) {
  const colorClasses = {
    cyan: {
      border: "border-cyan-500/30",
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
    },
    purple: {
      border: "border-purple-500/30",
      bg: "bg-purple-500/10",
      text: "text-purple-400",
    },
  };

  const colors = colorClasses[color];

  return (
    <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-all duration-300 overflow-hidden group relative">
      <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border`}>
            <div className={colors.text}>{icon}</div>
          </div>

          {change !== undefined && (
            <div className="flex items-center gap-1 text-sm">
              {change > 0 ? (
                <>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-medium">+{change}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-medium">{change}%</span>
                </>
              )}
            </div>
          )}
        </div>

        <div>
          <p className="text-slate-400 text-sm mb-2">{title}</p>
          <motion.p
            className={`text-3xl font-bold ${colors.text}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {value}
          </motion.p>
        </div>
      </div>
    </Card>
  );
}
