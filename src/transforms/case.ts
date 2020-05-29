export function toggle(input: string): string {
  return input === input.toUpperCase() ? input.toLowerCase() : input.toUpperCase();
}

export function upper(input: string): string {
  return input.replace(/[-_]/g, ' ').toUpperCase();
}

export function lower(input: string): string {
  return input.replace(/[-_]/g, ' ').toLowerCase();
}

export function lowerkebab(input: string): string {
  return getKebabOrSnakeCase(input, true, true);
}

export function upperkebab(input: string): string {
  return getKebabOrSnakeCase(input, true, false);
}

export function lowersnake(input: string): string {
  return getKebabOrSnakeCase(input, false, true);
}

export function uppersnake(input: string): string {
  return getKebabOrSnakeCase(input, false, false);
}

export function camelcase(input: string): string {
  return getCamelCase(input, true);
}

export function pascal(input: string): string {
  return getCamelCase(input, false);
}

export function sentence(input: string): string {
  return getSentenceCase(input, false);
}

export function title(input: string): string {
  return getSentenceCase(input, true);
}

function getKebabOrSnakeCase(str: string, isKebab = true, isLower = true): string {
  const suffix = isKebab ? '-' : '_';
  const charToReplace = isKebab ? '_' : '-'; // for kebab-case, replace _'s and vice-versa.
  const regexForReplace = new RegExp(`[${charToReplace}/\]`, 'g');
  const regexToAvoidMultipleChars = new RegExp(`[${suffix}](?=[${suffix}])`, 'g');
  let newStr = getDesiredFormatFromCamelCase(str, suffix);

  if (!hasSeparators(newStr)) {
    throw new Error(`Need separators(-/_/ ) for conversion! 🙁`);
  }

  newStr = newStr.replace(/ /g, '').replace(regexForReplace, suffix).replace(regexToAvoidMultipleChars, '');

  return isLower ? newStr.toLowerCase() : newStr.toUpperCase();
}

// thanks timhobbs/camelCase.js[https://gist.github.com/timhobbs/23c891bfea312cf43f31395d2d6660b1]
function getCamelCase(str: string, isCamel = true): string {
  let newStr = ''
  if (hasSeparators(str)) {
    newStr = getDesiredFormatFromCamelCase(str, ' ');
    newStr = newStr
      .toLowerCase()
      .replace(/(?:(^.)|([-_ \s]+.))/g, (match) => match.charAt(match.length - 1).toUpperCase());
  } else {
    newStr = str;
  }

  // return camelCased or PascalCased output based on the isCamel option.
  const firstCharacter = isCamel ? newStr.charAt(0).toLowerCase() : newStr.charAt(0).toUpperCase();
  return firstCharacter + newStr.slice(1);
}

function getSentenceCase(str: string, isTitleCase: boolean = false): string {
  let newStr = '';
  newStr = getDesiredFormatFromCamelCase(str, ' ');
  // Split the string into consecutive words if camel or pascal cased
  // now replace -'s and _'s that are NOT followed by a space with a space first, then remove the pending ones
  // Split the string into its parts to convert to Sentence Case
  let newStrArr = newStr.replace(/[-|_](?=[^ ])/g, ' ').replace(/-|_/g, '').split(' ');

  // If title case, then convert each word to title case
  if (isTitleCase) {
    newStrArr = newStrArr.map((word) => convertToTitleCase(word));
  } else {
    // Convert each of the words to lower case
    newStrArr = newStrArr.map((word) => word.toLowerCase());
    // Convert the first word to Title case
    newStrArr[0] = convertToTitleCase(newStrArr[0]);
  }

  // Join the array and then trim multiple white spaces
  newStr = trimMultipleWhiteSpaces(newStrArr.join(' '));
  return newStr;
}

function getDesiredFormatFromCamelCase(str: string, suffix: string): string {
  return str.replace(/[^A-Z](?=[A-Z])/g, (match) => `${match}${suffix}`);
}

function hasSeparators(str: string): boolean {
  const separatorRegex = /[-_ ]/g;
  const camelRegex = /[^A-Z](?=[A-Z])/g;

  return separatorRegex.test(str) || camelRegex.test(str);
}

// Removes multiple white spaces from within a string
// trim() removes white spaces from the ends of a string
function trimMultipleWhiteSpaces(str: string) {
  return str.replace(/\s+/g, ' ').trim();
}

// Returns a string with Title case
function convertToTitleCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}