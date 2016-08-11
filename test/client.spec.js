import { Client } from '../src/index';

describe('Client', () => {
  it ('should work', () => {
    const client = new Client();
    expect(client).toBeDefined();
  });

  it ('should return responses as a callback by default', done => {
    const client = new Client();
    client.blogInfo('banshee-hands', (error, data) => {
      expect(data).toBeDefined();
      done();
    });
  });

  it ('should return promises if "returnPromises" argument is passed to constructor', async done => {
    const client = new Client({
      returnPromises: true
    });

    const request = client.blogInfo('banshee-hands');
    expect(request instanceof Promise).toBe(true);

    const response = await client.blogInfo('banshee-hands');
    console.log(response);
    expect(response.blog).toBeDefined();
    done();
  });

  it ('should expect a callback if "returnPromises" is undefined or false', () => {
    const client = new Client({
      returnPromises: false
    });
    expect(function () { client.blogInfo('banshee-hands') }).toThrow(new Error('function expects a callback'));
  });

  it ('should throw an error if "returnErrors" is enabled', done => {
    const client = new Client({
      returnErrors: true
    });
    client.blogInfo('banshee-hands', (error, data) => {
      expect(error).toBeDefined();
      expect(data).toBeUndefined();
      done();
    });
  });

  it ('should throw a specific error if designated', done => {
    const client = new Client({
      returnErrors: '401'
    });
    client.blogInfo('banshee-hands', (error, data) => {
      expect(error).toBeDefined();
      done();
    });
  });
});
