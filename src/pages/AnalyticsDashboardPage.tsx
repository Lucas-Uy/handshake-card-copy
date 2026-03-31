import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { Link } from "react-router-dom";
import { Chrome as Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const AnalyticsDashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              NFC Interaction Hub
            </h1>
            <p className="text-slate-400">
              Real-time analytics and interaction insights
            </p>
          </div>
          <Link to="/landing">
            <Button
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Card
            </Button>
          </Link>
        </div>

        <AnalyticsDashboard />
      </div>
    </div>
  );
};

export default AnalyticsDashboardPage;
