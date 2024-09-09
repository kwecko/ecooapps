export const parseCookies = (
  cookieHeaderValue: string
): { [key: string]: string } => {
  const cookieParts = cookieHeaderValue.split(";").map((part) => part.trim());

  const cookieObject = new Map<string, string>();
  cookieParts.forEach((part) => {
    const [key, value] = part.split("=");

    if (key && value) cookieObject.set(key.trim(), value);
  });

  return Object(cookieObject);
};
