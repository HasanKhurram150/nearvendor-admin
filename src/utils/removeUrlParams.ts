const removeURLParameter = (url: string, parameter: string) => {
  // Split the URL into parts
  const urlParts = url.split("?");

  if (urlParts.length >= 2) {
    // Get the query string
    const prefix = encodeURIComponent(parameter) + "=";
    const params = urlParts[1].split(/[&;]/g);

    // Remove the parameter if it exists
    for (let i = params.length; i-- > 0; ) {
      if (params[i].lastIndexOf(prefix, 0) !== -1) {
        params.splice(i, 1);
      }
    }

    // Join the parts back together
    url = urlParts[0] + (params.length > 0 ? "?" + params.join("&") : "");
  }

  return url;
};

export default removeURLParameter;
