import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { NfcStats } from "@/hooks/useNfcData";

interface ExportButtonProps {
  stats: NfcStats;
  chartData: { label: string; taps: number; vcards: number }[];
}

export function ExportButton({ stats, chartData }: ExportButtonProps) {
  const handleExport = () => {
    const rows: string[][] = [];

    rows.push(["NFC Dashboard Report", new Date().toLocaleDateString()]);
    rows.push([]);
    rows.push(["Metric", "Value"]);
    rows.push(["Total Profile Views", String(stats.totalTaps)]);
    rows.push(["Unique Visitors", String(stats.uniqueVisitors)]);
    rows.push(["Contact Save Rate", `${stats.contactSaveRate}%`]);
    rows.push(["Avg Dwell Time", `${stats.avgDwellTime}s`]);
    rows.push(["vCard Downloads", String(stats.vcardDownloads)]);
    rows.push(["CV Downloads", String(stats.cvDownloads)]);
    rows.push(["Top Device", stats.topDevice]);
    rows.push(["Leads Captured", String(stats.leadGenCount)]);
    rows.push(["Auth Success Rate", `${stats.authSuccessRate}%`]);
    rows.push(["Unauthorized Attempts", String(stats.unauthorizedAttempts)]);
    rows.push([]);

    if (stats.deviceBreakdown.length > 0) {
      rows.push(["Device Breakdown"]);
      rows.push(["Device", "Count"]);
      stats.deviceBreakdown.forEach((d) => rows.push([d.name, String(d.value)]));
      rows.push([]);
    }

    if (stats.browserBreakdown.length > 0) {
      rows.push(["Browser Breakdown"]);
      rows.push(["Browser", "Count"]);
      stats.browserBreakdown.forEach((d) => rows.push([d.name, String(d.value)]));
      rows.push([]);
    }

    if (stats.linkCTR.length > 0) {
      rows.push(["Link CTR"]);
      rows.push(["Link", "Clicks", "CTR %"]);
      stats.linkCTR.forEach((l) => rows.push([l.name, String(l.clicks), `${l.percentage}%`]));
      rows.push([]);
    }

    if (chartData.length > 0) {
      rows.push(["Timeline Data"]);
      rows.push(["Period", "Profile Views", "vCard Saves"]);
      chartData.forEach((p) => rows.push([p.label, String(p.taps), String(p.vcards)]));
    }

    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nfc-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5" onClick={handleExport}>
      <Download className="w-3 h-3" />
      Export CSV
    </Button>
  );
}
