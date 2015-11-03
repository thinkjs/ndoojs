/*
" --------------------------------------------------
"   FileName: ndoo_service.ls
"       Desc: ndoo.js service模块
"             借鉴了t3.js http://t3js.org/
"     Author: chenglf
"    Version: ndoo.js(v1.0b1)
" LastChange: 11/03/2015 21:12
" --------------------------------------------------
*/

"use strict"
_        = @[\_]
$        = @[\jQuery] || @[\Zepto]

@N = @ndoo ||= {}
_n = @ndoo

_vars    = _n.vars
_func    = _n.func
_stor    = _n.storage

_n.service = (namespace, service) ->
  if nsmatch = namespace.match /(.*?)(?:[/.]([^/.]+))$/
    [null, namespace, name] = nsmatch
  else
    [namespace, name] = [\_default, name]

  if service
    _n._block \service, namespace, name, service

  else
    service = _n._block \service, namespace, name

    if service.init
      service.init _n
    else
      service

_n.trigger \STATUS:NSERVICE_DEFINE