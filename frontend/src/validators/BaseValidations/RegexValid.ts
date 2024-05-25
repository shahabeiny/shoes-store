export const mobileRegex = /^(?:\(+98)|(0098)|(0)?9\d{2}\d{3}\d{4}$/;
export const namePersionRegex =
  /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F_-]+( [\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F_-]+)*$/;

export const nameEnglishRegex = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
export const namePersionOrEnglishRegex =
  /^[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F_-]+( [A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F_-]+)*$/;
