import { Client, Generator } from './index';

const client = new Client({
  returnPromises: true
});

client.userLikes({ type: 'quote', limit: 1 }).then(data => {
  // console.log(JSON.stringify(data, null, 3));
});
