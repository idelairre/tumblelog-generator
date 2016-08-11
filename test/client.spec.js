import { Client } from '../src/index';

describe('Client', () => {
  it ('should work', () => {
    const client = new Client();
    expect(client).toBeDefined();
  });

  it ('should return promises if "returnPromises" argument is passed to constructor', () => {
    const client = new Client({
      returnPromises: true
    });
    expect(client.returnPromises).toBe(true);
    expect(client.blogInfo('banshee-hands') instanceof Promise).toBe(true);
  });
});
