import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Linkedin, Github, Mail, Wifi, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function InteractiveBusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30,
  });

  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), {
    stiffness: 300,
    damping: 30,
  });
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), {
    stiffness: 300,
    damping: 30,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      mouseX.set(percentX);
      mouseY.set(percentY);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <div className="perspective-container w-full max-w-md mx-auto px-4">
      <motion.div
        ref={cardRef}
        className="relative w-full aspect-[1.6/1] cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
      >
        {/* Card Container with Flip Animation */}
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Front Side */}
          <motion.div
            className="absolute inset-0 backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              {/* Glassmorphism Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-slate-700/50" />

              {/* Glare Effect */}
              <motion.div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background: useTransform(
                    [glareX, glareY],
                    ([x, y]) =>
                      `radial-gradient(circle at ${x}% ${y}%, rgba(6,182,212,0.4) 0%, transparent 50%)`
                  ),
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full p-6 md:p-8 flex flex-col">
                {/* NFC Badge */}
                <div className="flex justify-end mb-4">
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-400/50 backdrop-blur-sm animate-pulse">
                    <Wifi className="w-3 h-3 mr-1" />
                    NFC Active
                  </Badge>
                </div>

                {/* Profile Section */}
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 p-1 mb-4">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-4xl md:text-5xl font-bold text-cyan-400">
                        JD
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    John Doe
                  </h2>
                  <p className="text-cyan-400 text-sm md:text-base font-medium mb-4">
                    Senior Product Designer
                  </p>
                  <p className="text-slate-400 text-xs md:text-sm max-w-xs">
                    Creating exceptional digital experiences through innovative design
                  </p>
                </div>

                {/* Company Logo / Brand */}
                <div className="flex justify-center">
                  <div className="text-slate-600 text-xs font-medium tracking-widest">
                    TECH INNOVATORS
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Back Side */}
          <motion.div
            className="absolute inset-0 backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              {/* Glassmorphism Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-slate-700/50" />

              {/* Glare Effect */}
              <motion.div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background: useTransform(
                    [glareX, glareY],
                    ([x, y]) =>
                      `radial-gradient(circle at ${x}% ${y}%, rgba(168,85,247,0.4) 0%, transparent 50%)`
                  ),
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full p-6 md:p-8 flex flex-col items-center justify-center">
                {/* QR Code */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-white p-3 mb-6 shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-[2px] w-full h-full p-2">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-slate-900"
                          style={{
                            backgroundColor:
                              Math.random() > 0.5 ? "#0f172a" : "#ffffff",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-slate-400 text-xs mb-6">Scan to connect</p>

                {/* Social Links */}
                <div className="flex gap-4">
                  <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:scale-110 transition-transform">
                    <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 hover:scale-110 transition-transform">
                    <Github className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Flip Button */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={() => setIsFlipped(!isFlipped)}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 shadow-lg shadow-cyan-500/20"
        >
          <RotateCw className="w-4 h-4 mr-2" />
          Flip Card
        </Button>
      </div>

      <style>{`
        .perspective-container {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
