export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  const monthDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const year = date.getFullYear();
  const time = new Date(timestamp)
    .toLocaleTimeString("en-GB", {
      minute: "2-digit",
      hour12: false,
    })
    .slice(3);

  return `${day} | ${monthDate} ${year}  ${time}`;
};
