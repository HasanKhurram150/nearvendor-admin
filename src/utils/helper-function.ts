export const generateQueryParams = (props: Record<string, any>): string => {
  const queryParams = [];

  for (const key in props) {
    if (props.hasOwnProperty(key) && props[key] !== undefined) {
      queryParams.push(`${key}=${props[key]}`);
    }
  }

  return queryParams.join("&");
};
