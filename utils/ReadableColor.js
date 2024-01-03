export const ReadableColor = (hexColor) => {
  // Convert hex to RGB
  var r = parseInt(hexColor.slice(1, 3), 16);
  var g = parseInt(hexColor.slice(3, 5), 16);
  var b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate relative luminance
  var luminance =
    (0.2126 * r) / 255 + (0.7152 * g) / 255 + (0.0722 * b) / 255;

  // Choose black or white text color based on the contrast ratio
  var textColor = luminance > 0.5 ? "#000000" : "#ffffff";

  return textColor;
};
