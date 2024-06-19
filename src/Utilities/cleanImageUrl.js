export default function cleanImageUrl(url) {
    if (!url) return '/placeholder.webp'; // Add a placeholder img here
    const indexOfPng = url.indexOf('.png');
    if (indexOfPng !== -1) {
      return url.substring(0, indexOfPng + 4);
    }
    return url;
  }