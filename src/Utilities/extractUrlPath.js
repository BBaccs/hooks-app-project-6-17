  // Function to extract URL path from a full URL
  export const extractUrlPath = (url) => {
    if (url && typeof url === 'string' && url.startsWith('https')) {
      const index = url.indexOf(".com/") + 5;
      return url.substring(index);
    }
    return null;
  };







// For more complex/ custom url extraction

  // export const extractUrlPathComplex = (url, desiredValue, startsWith, theIndexOf, indexNum) => {
  //   if (url && typeof url === desiredValue && url.startsWith(startsWith)) {
  //     const index = url.indexOf(".com/") + 5;
  //     return url.substring(index);
  //   }
  //   return null;
  // };