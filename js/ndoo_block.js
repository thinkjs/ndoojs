/*
" --------------------------------------------------
"   FileName: ndoo_block.ls
"       Desc: ndoo.js block模块
"     Author: chenglf
"    Version: 1.0.0
" LastChange: 10/19/2016 14:11
" --------------------------------------------------
*/
(function(){
  "use strict";
  var _, _n, _vars, _func, _stor, _lib;
  _ = this['_'];
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;
  _lib = _n._lib;
  /**
   * 检测是否存在指定block
   *
   * @method
   * @name hasBlock
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @return {boolean} 判断block是否存在
   */
  _n.hasBlock = function(namespace){
    var nsmatch, name, ref$;
    if (nsmatch = namespace.match(/(.*?)(?:[/.]([^/.]+))$/)) {
      namespace = nsmatch[1], name = nsmatch[2];
    } else {
      ref$ = ['_default', namespace], namespace = ref$[0], name = ref$[1];
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
   * @return {boolean} 设置标识成功
   */
  _n.setBlock = function(namespace){
    var nsmatch, name, ref$;
    if (nsmatch = namespace.match(/(.*?)(?:[/.]([^/.]+))$/)) {
      namespace = nsmatch[1], name = nsmatch[2];
    } else {
      ref$ = ['_default', namespace], namespace = ref$[0], name = ref$[1];
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
   * @param {(object|function)} block 模块实现
   * @return {(boolean|object|function)} 是否成功|标识本身
   */
  _n.block = function(namespace, block){
    var nsmatch, name, ref$;
    if (nsmatch = namespace.match(/(.*?)(?:[/.]([^/.]+))$/)) {
      namespace = nsmatch[1], name = nsmatch[2];
    } else {
      ref$ = ['_default', namespace], namespace = ref$[0], name = ref$[1];
    }
    if (arguments.length > 1) {
      return _n._block('block', namespace, name, block);
    } else {
      return _n._block('block', namespace, name);
    }
  };
  _n.trigger('STATUS:NBLOCK_DEFINE');
  _n.on('NBLOCK_LOADED', function(elem, namespace, name, params){
    var block, call;
    namespace == null && (namespace = '_default');
    if (block = _n.block(namespace + "." + name)) {
      if (_.isFunction(block.init)) {
        call = function(){
          block.init(elem, params);
        };
        if (block.depend) {
          return _n.require([].concat(block.depend), call, 'Do');
        } else {
          return call();
        }
      } else if (_.isFunction(block)) {
        return block(elem, params);
      }
    }
  });
  /**
   * 初始化模块
   *
   * @method
   * @name initBlock
   * @memberof ndoo
   * @param {DOMElement} elem 初始化的元素
   */
  _n.initBlock = function(elem){
    var blockId, _call;
    blockId = _lib.data(elem, 'nblockId');
    blockId = blockId.split(/\s*,\s*|\s+/);
    _call = function(blockId){
      var this$ = this;
      return this.router.parse(/^(?:\/?)(.*?)(?:\/?([^\/?#]+))(?:\?(.*?))?(?:\#(.*?))?$/, blockId, function(namespace, block, params){
        var pkg;
        namespace == null && (namespace = '_default');
        namespace = namespace.replace(/\//g, '.');
        pkg = namespace + "." + block;
        if (this$.block(pkg)) {
          this$.trigger('NBLOCK_LOADED', elem, namespace, block, params);
        } else if (_n.hasBlock(pkg)) {
          this$.require([namespace + "." + block], function(){
            _n.trigger('NBLOCK_LOADED', elem, namespace, block, params);
          }, 'Do');
        }
      });
    };
    _.each(blockId, function(id){
      return _call.call(_n, id);
    });
  };
  _n.on('NBLOCK_INIT', function(){
    var blockEl, blocks, i$, len$, el, auto, level, item, block;
    blockEl = _lib.querySelector('[data-nblock-id]');
    if (!blockEl || !blockEl.length) {
      return;
    }
    blocks = [];
    for (i$ = 0, len$ = blockEl.length; i$ < len$; ++i$) {
      el = blockEl[i$];
      auto = _lib.data(el, 'nblockAuto');
      level = parseInt(_lib.data(el, 'nblockLevel')) || 5;
      blocks.push([level, auto, el]);
    }
    blocks.sort(function(block1, block2){
      return block1[0] > block2[0];
    });
    for (i$ = 0, len$ = blocks.length; i$ < len$; ++i$) {
      item = blocks[i$];
      auto = item[1], block = item[2];
      if (auto === undefined || auto.toString() !== 'false') {
        _n.initBlock(block);
      }
    }
  });
  /* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
}).call(this);
