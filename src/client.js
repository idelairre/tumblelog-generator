import Blog from './blog/blog';
import User from './user/user';
import * as Utils from './utils/utils';

function wrapResponse(data, callback) {
  if (this.returnPromises) {
    if (this.returnErrors) {
      return Promise.reject(Utils.generateError(this.returnErrors));
    }
    return Promise.resolve(data.response);
  }
  if (!callback || typeof callback !== 'function') {
    throw new Error('function expects a callback');
  }
  if (this.returnErrors) {
    callback(Utils.generateError(this.returnErrors));
  } else {
    callback(null, data.response);
  }
}

class Client {
  constructor({ returnPromises = false, user = false, returnErrors = false } = {}) {
    this.returnErrors = returnErrors;
    this.returnPromises = returnPromises;
    this.user = user;
  }

  blogInfo(name, callback) {
    const data = Blog.info.fetch(name);
    return wrapResponse.call(this, data, callback);
  }

  blogLikes(name, options, callback) {
    return blogPosts.apply(this, arguments);
  }

  blogSubmissions(name, options, callback) {

  }

  blogPosts(name, options, callback) {
    const opts = (typeof options === 'function' && typeof callback === 'undefined' ? {} : options);
    callback = (typeof options === 'function' && typeof callback === 'undefined' ? options : callback);
    const data = Blog.posts.fetch(name, opts);
    return wrapResponse.call(this, data, callback);
  }

  blogFollowers(name, options, callback) {
    const opts = (typeof options === 'function' && !callback ? {} : options);
    callback = (typeof options === 'function' && !callback ? options : callback);
    const data = Blog.followers.fetch(opts);
    return wrapResponse.call(this, data, callback);
  }

  userInfo(callback) {
    const data = User.info.fetch(this.user);
    return wrapResponse.call(this, data, callback);
  }

  userDashboard(options, callback) {
    if (typeof options === 'function' && !callback) {
      callback = options;
      options = undefined;
    }
    const data = User.dashboard.fetch(options);
    return wrapResponse.call(this, data, callback);
  }

  userLikes(options, callback) {
    if (typeof options === 'function' && !callback) {
      callback = options;
      options = undefined;
    }
    const data = User.likes.fetch(options);
    return wrapResponse.call(this, data, callback);
  }

  userFollowing(options, callback) {
    if (typeof options === 'function' && !callback) {
      callback = options;
      options = undefined;
    }
    const data = User.following.fetch(options);
    return wrapResponse.call(this, data, callback);
  }
}

export default Client;
