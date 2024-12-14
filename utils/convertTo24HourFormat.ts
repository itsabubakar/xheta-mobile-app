export const convertTo24HourFormat = (time: string | undefined): string => {
  if (!time) return "00:00"; // Return default if time is undefined or null

  // Replace non-breaking spaces and normalize AM/PM
  const normalizedTime = time.replace(/\u202F/g, " ").trim(); // Replace non-breaking space with normal space
  const [timePart, meridian] = normalizedTime.split(" "); // Split into time and AM/PM
  let [hours, minutes] = timePart.split(":").map(Number); // Extract hours and minutes

  if (meridian?.toLowerCase() === "pm" && hours !== 12) {
    hours += 12; // Convert PM hours (except 12 PM)
  } else if (meridian?.toLowerCase() === "am" && hours === 12) {
    hours = 0; // Midnight edge case
  }

  // Format back to "HH:MM"
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};
