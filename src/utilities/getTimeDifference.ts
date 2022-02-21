type TimeType = "ms" | "s" | "m" | "h" | "d" | "auto";

function sortDates(a: Date, b: Date) {
  if (a > b) {
    return [b, a];
  } else {
    return [a, b];
  }
}

export function getTimeDifference(
  oldDate: Date,
  currentDate: Date,
  timeType: TimeType = "auto"
) {
  const sortedDateArray = sortDates(oldDate, currentDate);

  const diffMs = Math.floor(
    sortedDateArray[1].getTime() - sortedDateArray[0].getTime()
  );
  const diffS = Math.floor(diffMs / 1000);
  const diffM = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays <= 7) {
    switch (timeType) {
      case "ms":
        return diffMs;
      case "s":
        return `${diffS} second${diffS > 1 ? "s" : ""} ago`;
      case "m":
        return `${diffM} minute${diffM > 1 ? "s" : ""} ago`;
      case "h":
        return `${diffH} hour${diffH > 1 ? "s" : ""} ago`;
      case "d":
        return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      case "auto":
        if (diffS < 60) {
          return `${diffS} second${diffS > 1 ? "s" : ""} ago`;
        } else if (diffM < 60) {
          return `${diffM} minute${diffM > 1 ? "s" : ""} ago`;
        } else if (diffH < 24) {
          return `${diffH} hour${diffH > 1 ? "s" : ""} ago`;
        } else if (diffDays < 8) {
          return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
        } else {
          return oldDate.toLocaleString("pt-BR");
        }
    }
  } else {
    return oldDate.toLocaleDateString("pt-BR");
  }
}
