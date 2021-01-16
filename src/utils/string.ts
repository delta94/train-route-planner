export function isSubstring(str: string, substr: string) {
  try {
    return str.match(new RegExp(substr, 'i'));
  } catch (err) {
    return false;
  }
}
