export default (date) => {
  let timeString = "";
  const timestamp = new Date(date);
  const now = Date.now().valueOf();
  const difference = now - timestamp.valueOf();
  const day = 60 * 60 * 24 * 1000;
  let options;

  if (difference > 7 * day) {
    // DD/MM/YYYY
    options = { day: "numeric", month: "numeric", year: "numeric"}
    timeString = timestamp.toLocaleDateString("en-US", options);
  } else if (difference > 2 * day) {
    // Saturday
    options = { weekday: "long" }
    timeString = timestamp.toLocaleDateString("en-US", options);
  } else if (difference > day) {
    timeString = "Yesterday";
  } else {
    // 8:00 AM
    options = { hour: "2-digit", minute: "2-digit" }
    timeString = timestamp.toLocaleTimeString("en-US", options);
  }
  return timeString;
}