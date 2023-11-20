export function convertSecondsToMMSS(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);

  // Add leading zeros if needed for single-digit minutes or seconds
  const mm = (minutes < 10 ? "0" : "") + minutes;
  const ss = (remainingSeconds < 10 ? "0" : "") + remainingSeconds;

  return mm + ":" + ss;
}
