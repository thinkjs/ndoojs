/*
" --------------------------------------------------
"   FileName: ndoo_prep.ls
"       Desc: ndoo.js前置文件
"     Author: chenglf
"    Version: ndoo.js(v0.1b5)
" LastChange: 03/07/2014 00:31
" --------------------------------------------------
*/
(function(){
  "use strict";
  var _n, slice$ = [].slice;
  if (this.ndoo) {
    return;
  }
  this.N = this.ndoo || (this.ndoo = {});
  /**
   * ndoojs 全局名称空间，短名称N
   *
   * @namespace ndoo
   */
  _n = this.ndoo;
  /**
   * _isDebug 是否开启调试模式
   *
   * @name _isDebug
   * @memberof ndoo
   * @type {boolean}
   */
  _n._isDebug = 0;
  /* event module {{{ */
  _n.event = function(name, type){
    return type + ":" + name;
  };
  /**
   * 事件模块
   *
   * @namespace
   * @name event
   * @memberof ndoo
   * @param {string} name 事件名称
   * @param {string} type 事件类型
   */
  (function(e){
    /**
     * 暂存数据类型
     *
     * @name TYPE_ON
     * @memberof ndoo.event
     * @type {number}
     */
    e == null && (e = _n.event);
    e.TYPE_ON = 1;
    /**
     * 暂存数据类型
     *
     * @name TYPE_TRIGGER
     * @memberof ndoo.event
     * @type {number}
     */
    e.TYPE_TRIGGER = 2;
    /**
     * init token
     *
     * @name inited
     * @memberof ndoo.event
     * @type {boolean}
     */
    e.inited = false;
    /**
     * event stack
     *
     * @private
     * @name _temp
     * @memberof ndoo.event
     * @type {array}
     */
    e._temp = [];
    /**
     * on api
     *
     * @method
     * @name on
     * @memberof ndoo.event
     * @param {string} eventName 事件名称
     * @param {callback} callback 回调函数
     */
    e.on = function(eventName, callback){
      this._temp.push({
        type: this.TYPE_ON,
        eventName: eventName,
        callback: callback
      });
    };
    /**
     * trigger api
     *
     * @method
     * @name trigger
     * @memberof ndoo.event
     * @param eventName {string} 事件名称
     * @param eventType {string} 事件类型
     * @param data {any} 数据类型
     */
    e.trigger = function(eventName, eventType, data){
      this._temp.push({
        type: this.TYPE_TRIGGER,
        eventName: eventName,
        eventType: eventType,
        data: data
      });
    };
    /**
     * off api
     *
     * @method
     * @name off
     * @memberof ndoo.event
     */
    e.off = function(){};
    /* short event
    e.default = (name) -> "DEFAULT:#name"
    e.delay   = (name) -> "DELAY:#name"
    e.status  = (name) -> "STATUS:#name" */
  })();
  /**
   * global on
   *
   * @method
   * @name on
   * @memberof ndoo
   * @param {string} eventName 事件名称
   * @param {string} callback 事件回调
   * @example // ndoo alias _n
   * var _n = ndoo;
   * _n.on('testEvent', function(data, data2){
   *   console.log(data);
   *   console.log(data2);
   * });
   * _n.trigger('testEvent', 'testEvent', 'kkk');
   */
  _n.on = function(eventName, callback){
    var i$, len$, item, results$ = [];
    eventName = eventName.replace(/\s*/g, '').split(',');
    for (i$ = 0, len$ = eventName.length; i$ < len$; ++i$) {
      item = eventName[i$];
      results$.push(this.event.on(item, callback));
    }
    return results$;
  };
  /**
   * global trigger
   *
   * @method
   * @name trigger
   * @memberof ndoo
   * @param {string} eventName 事件名称
   * @param {array} data 数据
   */
  _n.trigger = function(eventName){
    var data, _index, type, name;
    data = slice$.call(arguments, 1);
    _index = eventName.indexOf(':');
    type = eventName.substring(0, _index++);
    type || (type = 'DEFAULT');
    name = eventName.substring(_index);
    return this.event.trigger(name, type, data);
  };
  /**
   * global off
   *
   * @method
   * @name off
   * @memberof ndoo
   * @param {string} eventName 事件名称
   */
  _n.off = function(eventName){
    return this.event.off(eventName);
  };
  /* }}} */
  /**
   * 变量存储名称空间
   *
   * @namespace
   * @name vars
   * @memberof ndoo
   * @type {object}
   * @example // alias _vars
   * var _vars = ndoo.vars;
   * vars.bar = 'bar';
   */
  _n.vars || (_n.vars = {});
  /**
   * 函数存储名称空间
   *
   * @namespace
   * @name func
   * @memberof ndoo
   * @type {object}
   * @example // alias _func
   * var _func = ndoo.func;
   * _func.foo = function() {
   *   console.log('foo');
   * }
   */
  _n.func || (_n.func = {});
  /* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
}).call(this);
/*
" --------------------------------------------------
"   FileName: ndoo_lib.ls
"       Desc: ndoo.js库文件
"     Author: chenglf
"    Version: ndoo.js(v0.1b5)
" LastChange: 05/21/2014 14:24
" --------------------------------------------------
*/
(function(){
  "use strict";
  var _, _n, _lib, Backbone, array, slice;
  _ = this['_'];
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _lib = _n._lib || (_n._lib = {});
  Backbone = _lib;
  if (this['Backbone']) {
    _lib = this['Backbone'];
    return;
  }
  array = [];
  slice = array.slice;
  
  // Backbone.Events
  // ---------------
  
  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with 'on' or remove with 'off' callback
  // functions to an event; 'trigger'-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {
  
    // Bind an event to a 'callback' function. Passing '"all"' will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },
  
    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },
  
    // Remove one or many callbacks. If 'context' is null, removes all
    // callbacks with that function. If 'callback' is null, removes all
    // callbacks for the event. If 'name' is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
  
      // Remove all callbacks for all events.
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
  
      var names = name ? [name] : _.keys(this._events);
      for (var i = 0, length = names.length; i < length; i++) {
        name = names[i];
  
        // Bail out if there are no events stored.
        var events = this._events[name];
        if (!events) continue;
  
        // Remove all callbacks for this event.
        if (!callback && !context) {
          delete this._events[name];
          continue;
        }
  
        // Find any remaining events.
        var remaining = [];
        for (var j = 0, k = events.length; j < k; j++) {
          var event = events[j];
          if (
            callback && callback !== event.callback &&
            callback !== event.callback._callback ||
            context && context !== event.context
          ) {
            remaining.push(event);
          }
        }
  
        // Replace events if there are any remaining.  Otherwise, clean up.
        if (remaining.length) {
          this._events[name] = remaining;
        } else {
          delete this._events[name];
        }
      }
  
      return this;
    },
  
    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as 'trigger' is, apart from the event name
    // (unless you're listening on '"all"', which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },
  
    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }
  
  };
  
  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;
  
  // Implement fancy features of the Events API such as multiple event
  // names '"change blur"' and jQuery-style event maps '{change: action}'
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;
  
    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }
  
    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, length = names.length; i < length; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }
  
    return true;
  };
  
  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };
  
  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};
  
  // Inversion-of-control versions of 'on' and 'once'. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });
  
  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;
  
  // Allow the 'Backbone' object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);
  
  // Backbone.Router
  // ---------------
  
  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its 'routes' hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };
  
  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  
  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {
  
    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},
  
    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        if (router.execute(callback, args, name) !== false) {
          router.trigger.apply(router, ['route:' + name].concat(args));
          router.trigger('route', name, args);
          Backbone.history.trigger('route', router, name, args);
        }
      });
      return this;
    },
  
    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args, name) {
      if (callback) callback.apply(this, args);
    },
  
    // Simple proxy to 'Backbone.history' to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },
  
    // Bind all defined routes to 'Backbone.history'. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },
  
    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },
  
    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as 'null' to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }
  
  });
  
  // Helpers
  // -------
  
  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to 'goog.inherits', but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;
  
    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your 'extend' definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }
  
    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);
  
    // Set the prototype chain to inherit from 'parent', without calling
    // 'parent''s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;
  
    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);
  
    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;
  
    return child;
  };
  
  // Set up inheritance for the model, collection, router, view and history.
  // Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;
  Router.extend = extend;
  
  
}).call(this);
/*
" --------------------------------------------------
"   FileName: ndoo.block.ls
"       Desc: ndoo.js block模块
"     Author: chenglf
"    Version: ndoo.js(v0.1b5)
" LastChange: 05/21/2014 15:32
" --------------------------------------------------
*/
(function(){
  "use strict";
  var _, $, _n, _vars, _func, _stor;
  _ = this['_'];
  $ = this['jQuery'] || this['Zepto'];
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;
  /**
   * 检测是否存在指定block
   *
   * @method
   * @name hasBlock
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @param {string} name 名称
   */
  _n.hasBlock = function(namespace){
    var nsmatch, name, ref$;
    if (nsmatch = namespace.match(/(.*?)(?:[/.]([^/.]+))$/)) {
      namespace = nsmatch[1], name = nsmatch[2];
    } else {
      ref$ = ['_default', name], namespace = ref$[0], name = ref$[1];
    }
    return _n._blockData['_exist']["block." + namespace + "." + name];
  };
  /**
   * 标识指定block
   *
   * @method
   * @name setBlock
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @param {string} name 名称
   */
  _n.setBlock = function(namespace){
    var nsmatch, name, ref$;
    if (nsmatch = namespace.match(/(.*?)(?:[/.]([^/.]+))$/)) {
      namespace = nsmatch[1], name = nsmatch[2];
    } else {
      ref$ = ['_default', name], namespace = ref$[0], name = ref$[1];
    }
    return _n._blockData['_exist']["block." + namespace + "." + name] = true;
  };
  /**
   * 添加block实现
   *
   * @method
   * @name block
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @param {string} name 名称
   */
  _n.block = function(namespace, block){
    var nsmatch, name, ref$;
    if (nsmatch = namespace.match(/(.*?)(?:[/.]([^/.]+))$/)) {
      namespace = nsmatch[1], name = nsmatch[2];
    } else {
      ref$ = ['_default', name], namespace = ref$[0], name = ref$[1];
    }
    return _n._block('block', namespace, name, block);
  };
  _n.trigger('STATUS:NBLOCK_DEFINE');
  _n.on('NBLOCK_LOADED', function(elem, namespace, name, params){
    var block;
    namespace == null && (namespace = '_default');
    if (block = _n.block(namespace + "." + name)) {
      if (_.isFunction(block)) {
        return block(elem, params);
      } else if (_.isObject(block) && typeof block === 'object') {
        return block.init(elem, params);
      }
    }
  });
  /**
   * 初始化模块
   *
   * @method
   * @name initBlock
   * @memberof ndoo
   * @param {object} elem 初始化的元素
   */
  _n.initBlock = function(elem){
    var blockId, this$ = this;
    blockId = $(elem).data('nblockId');
    _n.router.parse(/^(?:\/?)(.*?)(?:\/?([^\/?]+))(?:\?(.*?))?(?:\#(.*?))?$/, blockId, function(namespace, block, params){
      var pkg;
      namespace == null && (namespace = '_default');
      pkg = namespace + "." + block;
      if (_n.block(pkg)) {
        _n.trigger('NBLOCK_LOADED', elem, namespace, block, params);
      } else if (_n.hasBlock(pkg)) {
        this$.require([namespace + "." + block], function(){
          _n.trigger('NBLOCK_LOADED', elem, namespace, block, params);
        }, 'Do');
      }
    });
  };
  _n.on('NBLOCK_INIT', function(){
    var blocks, i$, len$, block, auto;
    blocks = $('[data-nblock-id]');
    if (blocks.length) {
      for (i$ = 0, len$ = blocks.length; i$ < len$; ++i$) {
        block = blocks[i$];
        auto = $(block).data('nblockAuto');
        if (auto === undefined || auto.toString() !== 'false') {
          _n.initBlock(block);
        }
      }
    }
  });
  /* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
}).call(this);
/*
" --------------------------------------------------
"   FileName: ndoo.ls
"       Desc: ndoo.js主文件
"     Author: chenglf
"    Version: ndoo.js(v0.1b5)
" LastChange: 11/06/2014 23:32
" --------------------------------------------------
*/
(function(){
  "use strict";
  var _, $, _n, _vars, _func, _stor;
  _ = this['_'];
  $ = this['jQuery'] || this['Zepto'];
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _vars = _n.vars;
  _func = _n.func;
  /* default _lib {{{ */
  if (!_n._lib && this['Backbone']) {
    _n._lib = this['Backbone'];
  }
  /* }}} */
  /* storage module {{{ */
  /**
   * 变量存储
   *
   * @method
   * @name storage
   * @memberof ndoo
   * @param {string} key 存储键名
   * @param {any} value 存储值
   * @param {const} option 选项，覆盖或删除
   * @example // alias _stor
   * var _stor = ndoo.storage;
   * // set abc vlaue 1
   * _stor('abc', 1); // 1
   * // set abc value 2 failed
   * _stor('abc', 2); // false
   * // set abc value 2
   * _stor('abc', 2, _stor.REWRITE); // 2
   * // delete abc
   * _stor('abc', null, _stor.DESTROY); // true
   */
  _n.storage = function(key, value, option){
    var destroy, rewrite, data, e;
    destroy = option & _n.storage.DESTROY;
    rewrite = option & _n.storage.REWRITE;
    data = _n.storage._data;
    if (value === undefined) {
      return data[key];
    }
    if (destroy) {
      delete data[key];
      return true;
    }
    if (!rewrite && data.hasOwnProperty(key)) {
      return false;
    }
    if (Object.defineProperty) {
      try {
        Object.defineProperty(data, key, {
          value: value,
          writable: true,
          enumerable: true,
          configurable: true
        });
      } catch (e$) {
        e = e$;
        data[key] = value;
      }
    } else {
      data[key] = value;
    }
    return data[key];
  };
  /**
   * alias ndoo.storage
   *
   */
  _stor = _n.storage;
  _n.storage._data = {};
  /**
   * storage重写常量
   *
   * @name REWRITE
   * @memberof ndoo.storage
   */
  _n.storage.REWRITE = 1;
  /**
   * storage删除常量
   *
   * @name DESTROY
   * @memberof ndoo.storage
   */
  _n.storage.DESTROY = 2;
  /* }}} */
  /* require module {{{ */
  /**
   * 依赖加载
   *
   * @method
   * @name require
   * @memberof ndoo
   * @param {array} depend 依赖
   * @param {function} callback 回调函数
   * @param {string} type 加载器类型
   * @example // ndoo alias _n
   * var _n = ndoo;
   * _n.require(['../example/lib/jquery-1.11.1.js', '../example/lib/jquery-mytest.js'], function(a){
   *   a('body').mytest();
   * }, 'seajs');
   */
  _n.require = function(depend, callback, type){
    if (type === 'Do') {
      Do.apply(null, depend.concat(callback));
    } else if (type === 'seajs') {
      seajs.use(depend, callback);
    }
  };
  /* }}} */
  /* define block module {{{ */
  _n._blockData || (_n._blockData = {
    _block: {},
    _app: {},
    _exist: {}
  });
  _n._block = function(base, namespace, name, block){
    var data, nsArr, temp, i$, len$, ns;
    if (base === 'block') {
      data = _n._blockData['_block'];
    } else if (base === 'app') {
      data = _n._blockData['_app'];
    }
    if (namespace) {
      nsArr = namespace.replace(/^[/.]|[/.]$/g, '').split(/[/.]/);
    } else {
      nsArr = [];
    }
    temp = data;
    if (block) {
      if (namespace) {
        _n._blockData['_exist'][base + "." + namespace + "." + name] = true;
      } else {
        _n._blockData['_exist'][base + "." + name] = true;
      }
      for (i$ = 0, len$ = nsArr.length; i$ < len$; ++i$) {
        ns = nsArr[i$];
        temp = temp[ns] || (temp[ns] = {});
      }
      temp[name] || (temp[name] = {});
      if (_.isObject(block) && typeof block === 'object') {
        return _.defaults(temp[name], block);
      } else {
        return temp[name] = block;
      }
    } else {
      for (i$ = 0, len$ = nsArr.length; i$ < len$; ++i$) {
        ns = nsArr[i$];
        if (!_.has(temp, ns)) {
          return false;
        }
        temp = temp[ns];
      }
      return temp[name];
    }
  };
  /* }}} */
  /* define app module {{{ */
  /**
   * 检测是否存在指定app
   *
   * @method
   * @name hasApp
   * @memberof ndoo
   * @param {string} namespace 名称空间
   */
  _n.hasApp = function(namespace){
    return _n._blockData['_exist']["app." + namespace];
  };
  /**
   * 标识指定app
   *
   * @method
   * @name setApp
   * @memberof ndoo
   * @param {string} namespace 名称空间
   */
  _n.setApp = function(namespace){
    return _n._blockData['_exist']["app." + namespace] = true;
  };
  /**
   * 添加app实现
   *
   * @method
   * @name app
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @param {object} controller 控制器
   */
  _n.app = function(namespace, controller){
    var nsmatch, controllerName, ref$;
    if (nsmatch = namespace.match(/(.*?)(?:[/.]([^/.]+))$/)) {
      namespace = nsmatch[1], controllerName = nsmatch[2];
    } else {
      ref$ = [namespace, null], controllerName = ref$[0], namespace = ref$[1];
    }
    return _n._block('app', namespace, controllerName, controller);
  };
  _n.trigger('STATUS:NAPP_DEFINE');
  /* }}} */
  /* event module {{{ */
  _n.event = _.extend(_n.event, {
    /* eventHandle {{{ */
    eventHandle: _.extend({
      events: {},
      listened: {}
    }, _n._lib.Events)
    /* }}} */
    /* rewrite on {{{ */,
    on: function(eventName, callback){
      var eventHandle, i$, ref$, len$, item;
      eventHandle = this.eventHandle;
      eventHandle.on(eventName, callback);
      eventHandle.listened[eventName] = true;
      if (_.has(eventHandle.events, "STATUS:" + eventName)) {
        callback.apply(eventHandle, eventHandle.events["STATUS:" + eventName]);
      }
      if (_.has(eventHandle.events, eventName)) {
        for (i$ = 0, len$ = (ref$ = eventHandle.events[eventName]).length; i$ < len$; ++i$) {
          item = ref$[i$];
          callback.apply(eventHandle, item);
        }
      }
    }
    /* }}} */
    /* off api {{{ */,
    off: function(eventName){
      var eventHandle;
      eventHandle = this.eventHandle;
      eventHandle.off(eventName);
      delete eventHandle.listened[eventName];
    }
    /* off }}} */
    /* rewrite trigger {{{ */,
    trigger: function(eventName, eventType, data){
      var eventHandle;
      eventHandle = this.eventHandle;
      if (eventType === 'DEFAULT') {
        eventHandle.trigger.apply(eventHandle, [eventName].concat(data));
      } else if (eventType === 'DELAY') {
        if (_.has(eventHandle.listened, eventName)) {
          eventHandle.trigger.apply(eventHandle, [eventName].concat(data));
        }
        if (_.has(eventHandle.events, eventName)) {
          if (eventType === 'STATUS') {
            return;
          }
          eventHandle.events[eventName].push(data);
        } else {
          eventHandle.events[eventName] = [data];
        }
      } else if (eventType === 'STATUS') {
        if (!_.has(eventHandle.events, eventType + ":" + eventName)) {
          eventHandle.events[eventType + ":" + eventName] = data;
          if (_.has(eventHandle.listened, eventName)) {
            eventHandle.trigger.apply(eventHandle, [eventName].concat(data));
          }
        }
      }
    }
    /* }}} */
    /* init {{{ */
    /**
     * init 事件初始化
     *
     * @private
     * @name init
     * @memberof ndoo.event
     */,
    init: function(){
      var i$, ref$, len$, item;
      if (!this.inited) {
        for (i$ = 0, len$ = (ref$ = this._temp).length; i$ < len$; ++i$) {
          item = ref$[i$];
          if (item.type === this.TYPE_ON) {
            this.on(item.eventName, item.callback);
          } else if (item.type === this.TYPE_TRIGGER) {
            this.trigger(item.eventName, item.eventType, item.data);
          }
        }
      }
      this.inited = true;
    }
    /* }}} */
  });
  /* }}} */
  _.extend(_n, {
    /* base {{{ */
    /**
     * page id
     *
     * @name pageId
     * @memberof ndoo
     * @type {string}
     */
    pageId: ''
    /**
     * initPageId 初始化 pageId
     *
     * @private
     * @name initPageId
     * @memberof ndoo
     */,
    initPageId: function(id){
      var el;
      if (this.pageId) {
        return;
      }
      if (typeof document !== 'undefined') {
        if (el = document.getElementById(id || 'scriptArea')) {
          this.pageId = el.getAttribute('data-page-id') || '';
        }
      }
      if (!this.pageId && id) {
        this.pageId = id;
      }
    }
    /**
     * 获取唯一key
     *
     * @method
     * @name getPk
     * @memberof ndoo
     * @return {number}
     */,
    getPk: function(){
      var _pk;
      _pk = +new Date();
      return function(){
        return ++_pk;
      };
    }()
    /* }}} */
    /* router module {{{ */
    /**
     * backbone风格的路由解析器
     *
     * @private
     * @name router
     * @memberof ndoo
     * @type {object}
     */,
    router: new (_n._lib.Router.extend({
      parse: function(route, url, callback){
        var routeMatch;
        if (!_.isRegExp(route)) {
          route = this._routeToRegExp(route);
        }
        routeMatch = route.exec(url);
        if (routeMatch !== null) {
          callback.apply(null, routeMatch.slice(1));
        }
      }
    }))
    /* }}} */
    /* dispatch {{{ */
    /**
     * 路由函数
     *
     * @private
     * @method
     * @name dispatch
     * @memberof ndoo
     */,
    dispatch: function(){
      /* before and after filter event */
      var this$ = this;
      this.on('NAPP_ACTION_BEFORE, NAPP_ACTION_AFTER', function(data, controller, actionName, params){
        var _data, i$, len$, dataItem, _filter, isRun, _only, _except, j$, len1$, filter;
        if (data) {
          if (_.isObject(data) && typeof data === 'object') {
            _data = [].concat(data);
          }
          for (i$ = 0, len$ = _data.length; i$ < len$; ++i$) {
            dataItem = _data[i$];
            /* init filter array */
            _filter = dataItem.filter;
            if (!_.isArray(_filter)) {
              _filter = [].concat(_filter.replace(/\s*/g, '').split(','));
            }
            isRun = true;
            /* init only array */
            if (dataItem.only) {
              _only = dataItem.only;
              if (!_.isArray(_only)) {
                _only = [].concat(_only.replace(/\s*/g, '').split(','));
              }
              if (_.indexOf(_only, actionName) < 0) {
                isRun = false;
              }
              /* init except array */
            } else if (dataItem.except) {
              _except = dataItem.except;
              if (!_.isArray(_except)) {
                _except = [].concat(_except.replace(/\s*/g, '').split(','));
              }
              if (_.indexOf(_except, actionName) > -1) {
                isRun = false;
              }
            }
            if (isRun) {
              for (j$ = 0, len1$ = _filter.length; j$ < len1$; ++j$) {
                filter = _filter[j$];
                controller[filter + 'Filter'](params);
              }
            }
          }
        }
      });
      /* call action */
      this.on('NAPP_LOADED', function(namespace, controllerName, actionName, params){
        var controller, depend, before, after, filterPrefix, run;
        if (namespace) {
          controller = _n.app(namespace + "." + controllerName);
        } else {
          controller = _n.app(controllerName);
        }
        if (!_.has(controller, actionName + "Action") && _.has(controller, '_emptyAction')) {
          actionName = '_empty';
        }
        depend || (depend = controller['depend']);
        depend = (depend || []).concat(controller[actionName + 'Depend'] || []);
        before = controller.before;
        after = controller.after;
        filterPrefix = controllerName;
        if (namespace) {
          filterPrefix = (namespace + "." + controllerName).replace(/\./g, '_');
        }
        filterPrefix = filterPrefix.toUpperCase();
        run = function(){
          var key$;
          if (actionName) {
            _n.trigger('NAPP_ACTION_BEFORE', before, controller, actionName, params);
            _n.trigger("NAPP_" + filterPrefix + "_ACTION_BEFORE", controller, actionName, params);
            if (typeof controller[key$ = actionName + 'Before'] == 'function') {
              controller[key$](params);
            }
            if (typeof controller[key$ = actionName + 'Action'] == 'function') {
              controller[key$](params);
            }
            if (typeof controller[key$ = actionName + 'After'] == 'function') {
              controller[key$](params);
            }
            _n.trigger("NAPP_" + filterPrefix + "_ACTION_AFTER", controller, actionName, params);
            _n.trigger('NAPP_ACTION_AFTER', after, controller, actionName, params);
          }
        };
        if (depend && depend.length) {
          _n.require(_.uniq(depend), run, 'Do');
        } else {
          run();
        }
      });
      /* page route */
      this.on('PAGE_STATUS_ROUTING', function(data){
        this$.router.parse(/^(?:\/?)(.*?)(?:\/?([^\/?]+))(?:\?(.*?))?(?:\#(.*?))?$/, data, function(controller, action, params){
          var nsmatch, namespace, pkg;
          if (nsmatch = controller.match(/(.*?)(?:[/.]([^/.]+))$/)) {
            namespace = nsmatch[1], controller = nsmatch[2];
          } else {
            namespace = void 8;
          }
          if (namespace) {
            pkg = namespace + "." + controller;
          } else {
            pkg = controller;
          }
          if (_n.app(pkg)) {
            this$.trigger('NAPP_LOADED', namespace, controller, action, params);
          } else if (_n.hasApp(pkg)) {
            this$.require([pkg + ""], function(){
              _n.trigger('NAPP_LOADED', namespace, controller, action, params);
            }, 'Do');
          }
        });
      });
    }
    /* }}} */
    /* trigger {{{ */
    /**
     * 触发页面状态
     *
     * @private
     * @method
     * @name triggerPageStatus
     * @memberof ndoo
     */,
    triggerPageStatus: function(){
      var this$ = this;
      this.trigger('STATUS:PAGE_STATUS_FAST');
      $(function(){
        this$.trigger('STATUS:PAGE_STATUS_DOMPREP');
        this$.trigger('STATUS:PAGE_STATUS_DOM');
        this$.trigger('STATUS:PAGE_STATUS_DOMORLOAD');
      });
      $(window).bind('load', function(){
        return this$.trigger('STATUS:PAGE_STATUS_LOAD');
      });
      this.on('PAGE_STATUS_DOM', function(){
        if (this$.pageId) {
          this$.trigger('STATUS:PAGE_STATUS_ROUTING', this$.pageId);
          this$.trigger('STATUS:NBLOCK_INIT');
        }
      });
    }
    /* }}} */
    /* init {{{ */
    /**
     * 触发页面状态
     *
     * @private
     * @method
     * @name init
     * @memberof ndoo
     */,
    init: function(id){
      this.initPageId(id);
      this.event.init();
      this.dispatch();
      this.triggerPageStatus();
      return this;
    }
    /* }}} */
  });
  /* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
}).call(this);
