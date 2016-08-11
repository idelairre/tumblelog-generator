import Blog from './endpoints/blog/blog';
import User from './endpoints/user/user';
import * as Utils from './utils/utils';

function wrapResponse(data, callback) {
  if (this.returnPromises) {
    if (this.returnErrors) {
      return Promise.reject(Utils.generateError(this.returnErrors));
    }
    return Promise.resolve(data.response);
  } else {
    if (!callback || typeof callback !== 'function') {
      throw new Error('function expects a callback');
    }
    if (this.returnErrors) {
      callback(Utils.generateError(this.returnErrors));
    } else {
      callback(null, data.response);
    }
  }
}

class Client {
  returnErrors = false;
  returnPromises = false;
  user = false;

  constructor(options) {
    options = Object.assign({ returnPromises: false, user: false, returnErrors: false }, options);
    this.returnErrors = options.returnErrors;
    this.returnPromises = options.returnPromises;
    this.user = options.user;
  }

  blogInfo(name, callback) {
    const data = Blog.info.fetch(name);
    return wrapResponse.call(this, data, callback);
  }

  blogPosts(name, options, callback) {
    const data = Blog.posts.fetch(name, options);
    return wrapResponse.call(this, data, callback);
  }

  blogFollowers(name, callback) {
    const data = Blog.followers.fetch(name);
    return wrapResponse.call(this, data, callback);
  }

  userInfo(callback) {
    const data = User.info.fetch(this.user);
    return wrapResponse.call(this, data, callback);
  }

  userDashboard(options, callback) {
    const data = User.dashboard.fetch(options);
    return wrapResponse.call(this, data, callback);
  }

  userLikes(options, callback) {
    const data = User.likes.fetch(options);
    return wrapResponse.call(this, data, callback);
  }

  userFollowing(options, callback) {
    const data = User.following.fetch(options);
    return wrapResponse.call(this, data, callback);
  }
}

export default Client;
