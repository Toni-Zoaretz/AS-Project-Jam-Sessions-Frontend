// export const formatTimestamp = (timestamp) => {
//   return `${new Date(timestamp).toDateString()} | ${new Date(
//     timestamp
//   ).toLocaleTimeString("en-GB", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   })}`;
// };

// export const formatTimestamp = (timestamp) => {
//   return `${new Date(timestamp).toDateString()} | ${new Date(timestamp)
//     .toLocaleTimeString("en-GB", {
//       minute: "2-digit",
//       hour12: false,
//     })
//     .slice(3)}`; // slice(3) removes the first three characters (i.e. the hour and the colon)
// };

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
    .slice(3); // remove the hour from the time string

  return `${day} | ${monthDate} ${year}  ${time}`;
};
