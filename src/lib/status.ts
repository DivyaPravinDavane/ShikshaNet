export type StatusType = "On Track" | "Watch" | "Needs Attention" | "At Risk" | "Delayed" | "Good" | "Poor" | "Excellent" | "Completed" | "In Progress" | "Pending";

export interface StatusConfig {
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  colorHex: string;
  category: "success" | "warning" | "danger" | "purple";
}

export function getStatusFromPercentage(percentage: number): StatusType {
  if (percentage >= 75) return "On Track";
  if (percentage >= 50) return "Watch";
  return "At Risk";
}

export function getStatusConfig(status: StatusType | string): StatusConfig {
  const norm = status.toLowerCase();

  if (norm.includes("on track") || norm === "good" || norm === "excellent" || norm === "completed") {
    return {
      label: status,
      badgeBg: "bg-emerald-500/15",
      badgeText: "text-emerald-400 dark:text-emerald-400 font-semibold",
      badgeBorder: "border-emerald-500/30",
      colorHex: "#22C55E",
      category: "success",
    };
  }

  if (norm.includes("watch") || norm.includes("attention") || norm === "in progress") {
    return {
      label: status,
      badgeBg: "bg-amber-500/15",
      badgeText: "text-amber-400 dark:text-amber-400 font-semibold",
      badgeBorder: "border-amber-500/30",
      colorHex: "#F5B301",
      category: "warning",
    };
  }

  // At Risk / Delayed / Poor / Pending
  return {
    label: status,
    badgeBg: "bg-rose-500/15",
    badgeText: "text-rose-400 dark:text-rose-400 font-semibold",
    badgeBorder: "border-rose-500/30",
    colorHex: "#EF4444",
    category: "danger",
  };
}

export function getPercentageColor(percentage: number): string {
  if (percentage >= 75) return "text-emerald-400";
  if (percentage >= 50) return "text-amber-400";
  return "text-rose-400";
}
