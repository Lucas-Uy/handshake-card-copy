import { useMemo } from "react";

type Timeframe = "daily" | "weekly" | "monthly";

interface ChartDataPoint {
  name: string;
  taps: number;
}

interface Stats {
  totalTaps: number;
  uniqueUsers: number;
  deviceTypes: string;
  topLocation: string;
  totalChange: number;
  uniqueChange: number;
}

interface NfcData {
  chartData: ChartDataPoint[];
  stats: Stats;
}

export function useNfcData(timeframe: Timeframe): NfcData {
  const data = useMemo(() => {
    const generateChartData = (): ChartDataPoint[] => {
      switch (timeframe) {
        case "daily":
          return Array.from({ length: 24 }, (_, i) => ({
            name: `${i}:00`,
            taps: Math.floor(Math.random() * 50) + 10,
          }));
        case "weekly":
          return [
            { name: "Mon", taps: Math.floor(Math.random() * 200) + 100 },
            { name: "Tue", taps: Math.floor(Math.random() * 200) + 100 },
            { name: "Wed", taps: Math.floor(Math.random() * 200) + 100 },
            { name: "Thu", taps: Math.floor(Math.random() * 200) + 100 },
            { name: "Fri", taps: Math.floor(Math.random() * 200) + 100 },
            { name: "Sat", taps: Math.floor(Math.random() * 200) + 100 },
            { name: "Sun", taps: Math.floor(Math.random() * 200) + 100 },
          ];
        case "monthly":
          return Array.from({ length: 12 }, (_, i) => ({
            name: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ][i],
            taps: Math.floor(Math.random() * 1000) + 500,
          }));
      }
    };

    const generateStats = (): Stats => {
      const baseMultiplier = {
        daily: 1,
        weekly: 7,
        monthly: 30,
      }[timeframe];

      return {
        totalTaps: Math.floor(Math.random() * 1000 * baseMultiplier) + 500 * baseMultiplier,
        uniqueUsers: Math.floor(Math.random() * 500 * baseMultiplier) + 200 * baseMultiplier,
        deviceTypes: "iOS, Android",
        topLocation: ["New York", "San Francisco", "London", "Tokyo", "Berlin"][
          Math.floor(Math.random() * 5)
        ],
        totalChange: Math.floor(Math.random() * 30) + 5,
        uniqueChange: Math.floor(Math.random() * 25) + 3,
      };
    };

    return {
      chartData: generateChartData(),
      stats: generateStats(),
    };
  }, [timeframe]);

  return data;
}
