export default class extends Error {
  constructor(payload, ...params) {
    super(params);
    this.payload = payload; // eslint-disable-line functional/no-this-expressions
  }
}
