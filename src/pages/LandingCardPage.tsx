import { InteractiveBusinessCard } from "@/components/InteractiveBusinessCard";
import { Link } from "react-router-dom";
import { ChartBar as BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingCardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_50%)]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-white font-bold text-xl">NFC Hub</span>
          </div>
          <Link to="/analytics">
            <Button
              variant="outline"
              className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </Link>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Interactive Business Card
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
              Experience the future of networking with NFC-enabled digital business cards
            </p>
          </div>

          <InteractiveBusinessCard />

          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm">
              Hover and move your mouse to interact with the card
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingCardPage;
