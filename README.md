# Tumblr Faker (WIP)

Generates amusing fake data for Tumblr. Mocks the tumblr.js client and returns authentic looking responses.

# Basic usage

The Client object can function as a drop-in replacement for the actual tumblr client.

```
import { Client } from 'tumblr-faker';

const client = new Client({
  user: 'luksfoks' // sets default tumblelog for user responses
});

client.userInfo((err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data); // returns {blog: {title: 'luksfoks', posts: 0, updated: 1465446039, description: 'filmmaker and I'm on over 250,000 Tumblr Instagram"' ... }

})
```

You can opt to return promises as per the official tumblr client and to  return errors if you want to test error/exception/etc handling. If you pass a specific error type to the constructor it will return that error, otherwise it defaults to 400.

```
const client = new Client({
  returnPromises: true,
  returnErrors: true
});

client.blogInfo('banshee-hands').then(response => {
  console.log(response.blog);
}).catch(err => {
  console.error(response.meta); // returns '400'
});
```

# Generators

If you are in a browser context or managing OAuth yourself (word) than you can opt to use generators to mock ajax responses.

```
import { Generators } from 'tumblr-faker';

const posts = Generators.blog.posts.fetch();
console.log(posts); // { meta: '200', msg: 'OK', response: { blog: ... posts: [...], total_posts: 321 }}
```

The ```Generators``` object is deeply nested so you can also import it via its endpoint path. Also note that you can pass whatever arguments you could pass to the tumblr api client to generator functions (with the exception that offset is meaningless)

```
import BlogGenerator from 'tumblr-faker/src/endpoints/blog/blog'; // this will be shortened in the future

console.log(BlogGenerator.posts.fetch()); // same response as above
console.log(BlogGenerator.posts.fetch({ limit: 25, type: 'photo' })); // returns an ajax response object containing an array of 25 posts of type 'photo'
console.log(BlogGenerator.posts.generate()); // returns an array of 10 posts
console.log(BlogGenerator.posts.generate({ type: 'quote', limit: 1 })); // returns 1 post of type 'quote'
```

Here is an example pulled from my project TumblrFox using the webpack loader "inject". (Pardon the use of the forbidden lodash.)

```
import { every } from 'lodash';
import { Generators } from 'tumblr-faker';
import ModuleInjector from 'inject!../../source/postSource';

const postsFixture = Generators.user.dashboard.generate(100);

const oauthRequest = query => {
  const posts = query.type ? every(postsFixture, {
    type: query.type
  }).slice(query.offset, query.offset + query.limit) : postsFixture.slice(query.offset, query.offset + query.limit);
  return Promise.resolve({ posts });
};

const PostSource = ModuleInjector({
  '../lib/oauthRequest': { oauthRequest }
}).default;
```

Now you have a fixture that generates its responses from the same pool of posts as if it were a snapshot of a real user's dashboard at a given time.

# Planned features

Deep in tumblr-faker is a file with tools for parsing and formatting your own tumblr data. In the future I plan on exposing it and allowing users to pull from their own tumblr data.

[![Dependency Status](https://david-dm.org/idelairre/tumblelog-generator.svg)](https://david-dm.org/idelairre/tumblelog-generator)
[![devDependency Status](https://david-dm.org/idelairre/tumblelog-generator/dev-status.svg)](https://david-dm.org/idelairre/tumblelog-generator#info=devDependencies)
