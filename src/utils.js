export function isAutomatedTest() {
  return process.env.NODE_ENV === 'test';
}