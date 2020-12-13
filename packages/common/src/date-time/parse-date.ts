/**
 * Parses a string value in the given format to its respective {@link Date} instance. The format can
 * be provided using the tokens "YYYY" for the year, "MM" for the month, "DD" for the date, "HH" for
 * hours, "mm" for minutes, "ss" for seconds and "SSS" for milliseconds
 *
 * @experimental
 */
export function parseDate(str: string, format = 'YYYY-MM-DD HH:mm:ss.SSS', base: Date = new Date()): Date {
  // tslint:disable-next-line:one-variable-per-declaration
  let delimiter, formatTokens, strTokens, month, date, year, hours, minutes, seconds, ms;
  const pm = /pm/i.test(str);
  // assign base date values if available
  if (base != null) {
    year = base.getFullYear();
    month = base.getMonth();
    date = base.getDate();
    hours = base.getHours();
    minutes = base.getMinutes();
    seconds = base.getSeconds();
    ms = base.getMilliseconds();
  }
  // find custom delimiter by excluding relevant date property values
  delimiter = /[^YMDHmsS]/g.exec(format).filter((d, i, m) => m.indexOf(d) === i);
  delimiter = new RegExp(`[${delimiter.join()}]`, 'g');
  formatTokens = format.split(delimiter);
  strTokens = str.split(delimiter);
  for (let i = 0, len = strTokens.length; i < len; i++) {
    // assigning values based on the format array
    if (/Y/.test(formatTokens[i])) year = parseInt(strTokens[i], 10);
    else if (/M/.test(formatTokens[i])) month = parseInt(strTokens[i], 10) - 1;
    else if (/D/.test(formatTokens[i])) date = parseInt(strTokens[i], 10);
    else if (/H/.test(formatTokens[i])) hours = parseInt(strTokens[i], 10);
    else if (/m/.test(formatTokens[i])) minutes = parseInt(strTokens[i], 10);
    else if (/s/.test(formatTokens[i])) seconds = parseInt(strTokens[i], 10);
    else if (/S/.test(formatTokens[i])) ms = parseInt(strTokens[i], 10);
  }
  if (pm && hours <= 12) hours += 12;
  return new Date(year || 0, month || 0, date || 0, hours || 0, minutes || 0, seconds || 0, ms || 0);
}
