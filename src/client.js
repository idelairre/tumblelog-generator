import Blog from './endpoints/blog/blog';
import User from './endpoints/user/user';

class Client {
  constructor({ returnPromises, user }) {
    this.returnPromises = returnPromises || false;
    this.user = user;
  }

  blogInfo(name, callback) {
    const data = Blog.info.fetch(name);
    if (this.returnPromises) {
      return Promise.resolve(data.response);
    } else {
      return callback(null, data.response);
    }
  }

  blogPosts(name, options, callback) {
    const data = Blog.posts.fetch(name, options);
    if (this.returnPromises) {
      return Promise.resolve(data.response);
    } else {
      return callback(null, data.response);
    }
  }

  blogFollowers(name, callback) { // done
    const data = Blog.followers.fetch(name);
    if (this.returnPromises) {
      return Promise.resolve(data.response);
    } else {
      return callback(null, data.response);
    }
  }

  userInfo(callback) {
    const data = User.info.fetch(this.user);
    if (this.returnPromises) {
      return Promise.resolve(data.response);
    } else {
      return callback(null, data.response);
    }
  }

  userDashboard(options, callback) {
    const data = User.dashboard.fetch();
    if (this.returnPromises) {
      return Promise.resolve(data.response);
    } else {
      return callback(null, data.response);
    }
  }

  userLikes(options, callback) {
    const data = User.likes.fetch(options);
    if (this.returnPromises) {
      return Promise.resolve(data.response);
    } else {
      return callback(null, data.response);
    }
  }

  userFollowing(options, callback) {
    const data = User.following.fetch(options);
    if (this.returnPromises) {
      return Promise.resolve(data.response);
    } else {
      return callback(null, data.response);
    }
  }
}

export default Client;
