export class NotFoundError extends Error {
  constructor(reason?: string) {
    super(`Could not find page information: ${reason ?? 'not found'}`);
    this.name = 'NotFoundError';
  }
}
