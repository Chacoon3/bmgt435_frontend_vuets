export function validateText(text: any): boolean {
  if (text === null || text === undefined) {
    return false;
  } else {
    text = text.trim();
    if (text === "") {
      return false;
    } else {
      return true;
    }
  }
}
