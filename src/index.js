import Blog from './endpoints/blog/blog';

class Client {
  constructor({ returnPromises }) {
    this.returnPromises = returnPromises || false;
  }

  userInfo(name, callback) {
    const response = Blog.info.fetch(name);
    if (this.returnPromises) {
      return Promise.resolve(response);
    } else {
      return callback(null, response);
    }
  }

  blogPosts(name, callback) {
    const response = Blog.posts.fetch(name);
    if (this.returnPromises) {
      return Promise.resolve(response);
    } else {
      return callback(null, response);
    }
  }
}

const client = new Client({
  returnPromises: true
});

client.userInfo('insideoutfox').then(data => {
  console.log(data);
});

client.blogPosts('insideoutfox', { type: 'photo' }).then(data => {
  console.log(JSON.stringify(data, null, 3));
});
