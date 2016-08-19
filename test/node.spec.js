import tumblr from 'tumblr.js';
import credentials from './tokens.json';

const tumblrClient = tumblr.createClient({ credentials });

tumblrClient.blogPosts('banshee-hands', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
