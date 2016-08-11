import Blog from './endpoints/blog/blog';
import User from './endpoints/user/user';
import * as Utils from './utils/utils';

function responseDecorator(func) {
  const target = this;
  return function() {
    const args = Array.from(arguments);
    const callback = args[args.length - 1];
    return wrapResponse.call(target, func.apply(target, arguments), callback);
  }
}

function wrapResponse(data, callback) {
  if (this.returnPromises) {
    if (this.returnErrors) {
      console.log(Utils.generateError(this.returnErrors));
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

const decorateResponses = klass => {
  return target => {
    if (target) {
      const properties = Object.getOwnPropertyNames(klass.prototype);
      for (const key in properties) {
        const property = properties[key];
        if (typeof klass.prototype[property] === 'function' && property !== 'constructor') {
          const func = klass.prototype[property];
          klass.prototype[property] = responseDecorator.call(target, func);
          Object.defineProperty(target, property, {
            value: klass.prototype[property]
          });
        }
      }
      return target;
    };
  }
}

@decorateResponses
class Client {
  returnErrors = false;
  returnPromises = false;
  user = false;
  constructor(args) {
    args = Object.assign({ returnPromises: false, user: false, returnErrors: false }, args);
    this.returnErrors = args.returnErrors;
    this.returnPromises = args.returnPromises;
    this.user = args.user;
  }

  blogInfo(name, callback) {
    return Blog.info.fetch(name);
  }

  blogPosts(name, options, callback) {
    return Blog.posts.fetch(name, options);
  }

  blogFollowers(name, callback) {
    return Blog.followers.fetch(name);
  }

  userInfo(callback) {
    return User.info.fetch(this.user);
  }

  userDashboard(options, callback) {
    return User.dashboard.fetch(options);
  }

  userLikes(options, callback) {
    return User.likes.fetch(options);
  }

  userFollowing(options, callback) {
    return User.following.fetch(options);
  }
}

export default Client;
