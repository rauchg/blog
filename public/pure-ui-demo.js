(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object")
    module.exports = factory();
  else if (typeof define === "function" && define.amd) define(factory);
  else if (typeof exports === "object") exports["Viewer"] = factory();
  else root["Viewer"] = factory();
})(this, function () {
  return (function (modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) return installedModules[moduleId].exports;
      var module = (installedModules[moduleId] = {
        exports: {},
        id: moduleId,
        loaded: false,
      });
      modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );
      module.loaded = true;
      return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "";
    return __webpack_require__(0);
  })([
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = render;
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key))
                newObj[key] = obj[key];
            }
          }
          newObj["default"] = obj;
          return newObj;
        }
      }
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _lib = __webpack_require__(1);
      var _lib2 = _interopRequireDefault(_lib);
      var _videopressLibViews = __webpack_require__(40);
      var views = _interopRequireWildcard(_videopressLibViews);
      function render(data, to, repaint) {
        to.appendChild((0, _lib2["default"])(views, data, repaint).node);
      }
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key))
                newObj[key] = obj[key];
            }
          }
          newObj["default"] = obj;
          return newObj;
        }
      }
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _vd = __webpack_require__(2);
      var _vd2 = _interopRequireDefault(_vd);
      var _vdRender = __webpack_require__(20);
      var _vdRender2 = _interopRequireDefault(_vdRender);
      var _css = __webpack_require__(24);
      var _css2 = _interopRequireDefault(_css);
      var _xhr = __webpack_require__(25);
      var _xhr2 = _interopRequireDefault(_xhr);
      var _fields = __webpack_require__(32);
      var fields = _interopRequireWildcard(_fields);
      var IMGUR = "https://api.imgur.com/3/gallery/r/earthporn";
      exports["default"] = function (views, spec, onrepaint) {
        var node = document.createElement("div");
        var paint = (0, _vdRender2["default"])(node, { prefix: "" });
        var data = state(views, spec, function () {
          paint(viewer(data));
          onrepaint && onrepaint();
        });
        paint(viewer(data));
        return { node: node };
      };
      function state(views, spec, fn) {
        return spec.map(function (cat) {
          return {
            title: cat.title,
            lines: cat.views
              .map(function (v) {
                return Array.isArray(v) ? v : [v];
              })
              .map(function (line) {
                return line.map(function (view) {
                  view.view = views[view.require](view.params);
                  view.keys = [];
                  view.toggle = function () {
                    view.expanded = !view.expanded;
                    fn();
                  };
                  var _loop = function (i) {
                    var val = view.params[i];
                    var type = decorator(i, val);
                    var key = {
                      key: i,
                      val: val,
                      type: type,
                      set: function set(v) {
                        key.val = v;
                        view.params[i] = v;
                        view.view = views[view.require](view.params);
                        fn();
                      },
                    };
                    if ("img" == type) {
                      key.fetch = function () {
                        if (key.loading) return;
                        key.loading = true;
                        var uri = IMGUR + "/" + rand(100) + ".json";
                        (0, _xhr2["default"])(
                          {
                            uri: uri,
                            headers: {
                              Authorization: "Client-ID 0a96ba777ef2eb2",
                            },
                          },
                          function (err, res, body) {
                            key.loading = false;
                            if (body) {
                              var list = JSON.parse(body).data;
                              var item = list[rand(list.length)];
                              key.set(item.link);
                            }
                            fn();
                          }
                        );
                        fn();
                      };
                    }
                    view.keys.push(key);
                  };
                  for (var i in view.params) {
                    _loop(i);
                  }
                  return view;
                });
              }),
          };
        });
      }
      function viewer(views) {
        return (0, _vd2["default"])(
          ".viewer",
          views.map(category),
          _css2["default"]
        );
      }
      function category(_ref) {
        var title = _ref.title;
        var lines = _ref.lines;
        return (0, _vd2["default"])(
          ".category",
          (0, _vd2["default"])(".t", title),
          (0, _vd2["default"])(
            ".lines",
            lines.map(function (views) {
              return (0, _vd2["default"])(".line", views.map(board));
            })
          )
        );
      }
      function board(_ref2) {
        var title = _ref2.title;
        var keys = _ref2.keys;
        var view = _ref2.view;
        var toggle = _ref2.toggle;
        var expanded = _ref2.expanded;
        return (0, _vd2["default"])(
          ".board",
          (0, _vd2["default"])(
            ".t",
            title,
            (0, _vd2["default"])("span.opts-toggle", {
              onmousedown: toggle,
              classes: { expanded: expanded },
            })
          ),
          expanded && options({ keys: keys }),
          (0, _vd2["default"])(".artboard", view)
        );
      }
      function options(_ref3) {
        var keys = _ref3.keys;
        return (0, _vd2["default"])(".options", keys.map(param));
      }
      var params = 0;
      function param(p) {
        var key = p.key;
        var type = p.type;
        return (0, _vd2["default"])(
          ".option",
          (0, _vd2["default"])("span.t", key),
          (0, _vd2["default"])("span.input", fields[type](p))
        );
      }
      function decorator(key, val) {
        switch (typeof val) {
          case "string":
            if (/url/.test(key) && /\.(gif|jpe?g|png)$/i.test(val)) {
              return "img";
            } else {
              return "text";
            }
          case "number":
            if (/width|height/.test(key)) {
              return "dim";
            } else {
              return "num";
            }
          case "boolean":
            return "bool";
        }
      }
      function rand(max) {
        return Math.round(Math.random() * 1e3) % max;
      }
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _interopRequireWildcard = function (obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _Node = __webpack_require__(3);
      var _Node2 = _interopRequireWildcard(_Node);
      var _Text = __webpack_require__(4);
      var _Text2 = _interopRequireWildcard(_Text);
      var _Style = __webpack_require__(5);
      var _Style2 = _interopRequireWildcard(_Style);
      var _Element = __webpack_require__(13);
      var _Element2 = _interopRequireWildcard(_Element);
      var _parse2 = __webpack_require__(19);
      var _parse3 = _interopRequireWildcard(_parse2);
      exports["default"] = build;
      exports.Node = _Node2["default"];
      exports.Text = _Text2["default"];
      exports.Element = _Element2["default"];
      exports.Style = _Style2["default"];
      exports.style = style;
      function build(sel) {
        for (
          var _len = arguments.length,
            children = Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          children[_key - 1] = arguments[_key];
        }
        var _parse = _parse3["default"](sel);
        var tag = _parse.tag;
        var attrs = _parse.attrs;
        var el = new _Element2["default"](tag);
        if (isProperties(children[0])) {
          var props = children.shift();
          for (var i in props) {
            var prop = props[i];
            switch (i) {
              case "class":
                if (null != attrs["class"]) {
                  attrs["class"] += " " + prop;
                } else {
                  attrs["class"] = prop;
                }
                break;
              case "classes":
                var classes = props.classes;
                if (classes && "object" == typeof classes) {
                  for (var c in classes) {
                    if (!prop[c]) continue;
                    if (null != attrs["class"]) {
                      attrs["class"] += " " + c;
                    } else {
                      attrs["class"] = c;
                    }
                  }
                } else {
                  attrs[i] = prop;
                }
                break;
              default:
                attrs[i] = prop;
            }
          }
        }
        if (attrs) el.set(attrs);
        if (children) el.add(children);
        return el;
      }
      build.style = style;
      function isProperties(obj) {
        return (
          obj &&
          "object" == typeof obj &&
          !Array.isArray(obj) &&
          "function" != typeof obj.toHTML
        );
      }
      function style() {
        return new _Style2["default"]();
      }
    },
    function (module, exports) {
      "use strict";
      var _classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var Node = function Node() {
        _classCallCheck(this, Node);
      };
      exports["default"] = Node;
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _interopRequireWildcard = function (obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      };
      var _classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      var _createClass = (function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      var _get = function get(object, property, receiver) {
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);
          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;
          if (getter === undefined) {
            return undefined;
          }
          return getter.call(receiver);
        }
      };
      var _inherits = function (subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (superClass) subClass.__proto__ = superClass;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _Node2 = __webpack_require__(3);
      var _Node3 = _interopRequireWildcard(_Node2);
      var Text = (function (_Node) {
        function Text(value) {
          _classCallCheck(this, Text);
          _get(Object.getPrototypeOf(Text.prototype), "constructor", this).call(
            this
          );
          this._value = value;
        }
        _inherits(Text, _Node);
        _createClass(Text, [
          {
            key: "value",
            value: function value() {
              return this._value;
            },
          },
          {
            key: "toHTML",
            value: function toHTML() {
              return this.value();
            },
          },
        ]);
        return Text;
      })(_Node3["default"]);
      exports["default"] = Text;
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _interopRequireWildcard = function (obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      };
      var _classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      var _createClass = (function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      var _get = function get(object, property, receiver) {
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);
          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;
          if (getter === undefined) {
            return undefined;
          }
          return getter.call(receiver);
        }
      };
      var _inherits = function (subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (superClass) subClass.__proto__ = superClass;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _Sheet = __webpack_require__(6);
      var _Sheet2 = _interopRequireWildcard(_Sheet);
      var _Text = __webpack_require__(4);
      var _Text2 = _interopRequireWildcard(_Text);
      var _Element2 = __webpack_require__(13);
      var _Element3 = _interopRequireWildcard(_Element2);
      var Style = (function (_Element) {
        function Style() {
          var _this = this;
          _classCallCheck(this, Style);
          _get(
            Object.getPrototypeOf(Style.prototype),
            "constructor",
            this
          ).call(this, "style");
          this.sheet = new _Sheet2["default"]();
          {
            var text = new _Text2["default"]();
            text.value = function () {
              return _this.sheet.serialize();
            };
            this.children.push(text);
          }
        }
        _inherits(Style, _Element);
        _createClass(Style, [
          {
            key: "add",
            value: function add() {
              var _sheet;
              for (
                var _len = arguments.length, props = Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                props[_key] = arguments[_key];
              }
              (_sheet = this.sheet).add.apply(_sheet, props);
              return this;
            },
          },
          {
            key: "remove",
            value: function remove(dec) {
              this.sheet.remove(dec);
              return this;
            },
          },
          {
            key: "anim",
            value: function anim(name, frames) {
              return this.sheet.anim(name, frames);
            },
          },
          {
            key: "media",
            value: function media(params) {
              return this.sheet.media(params);
            },
          },
        ]);
        return Style;
      })(_Element3["default"]);
      exports["default"] = Style;
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _interopRequire = function (obj) {
        return obj && (obj["default"] || obj);
      };
      var Sheet = _interopRequire(__webpack_require__(11));
      var Block = _interopRequire(__webpack_require__(9));
      var Scope = _interopRequire(__webpack_require__(8));
      var Media = _interopRequire(__webpack_require__(7));
      var Animation = _interopRequire(__webpack_require__(12));
      var Ruleset = _interopRequire(__webpack_require__(10));
      exports = module.exports = Sheet;
      exports.Block = Block;
      exports.Scope = Scope;
      exports.Media = Media;
      exports.Animation = Animation;
      exports.Ruleset = Ruleset;
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _inherits = function (child, parent) {
        child.prototype = Object.create(parent && parent.prototype, {
          constructor: {
            value: child,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (parent) child.__proto__ = parent;
      };
      var _interopRequire = function (obj) {
        return obj && (obj["default"] || obj);
      };
      var Scope = _interopRequire(__webpack_require__(8));
      var Media = function Media(params) {
        Scope.call(this);
        this.params = params;
      };
      _inherits(Media, Scope);
      Media.prototype.serialize = function () {
        return (
          "@media " +
          this.params +
          " {\n  " +
          Scope.prototype.serialize.call(this) +
          "\n}"
        );
      };
      module.exports = Media;
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _inherits = function (child, parent) {
        child.prototype = Object.create(parent && parent.prototype, {
          constructor: {
            value: child,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (parent) child.__proto__ = parent;
      };
      var _interopRequire = function (obj) {
        return obj && (obj["default"] || obj);
      };
      var Block = _interopRequire(__webpack_require__(9));
      var Ruleset = _interopRequire(__webpack_require__(10));
      var Scope = function Scope() {
        this.children = [];
      };
      _inherits(Scope, Block);
      Scope.prototype.add = function (sel, decs) {
        if (sel instanceof Block) {
          this.children.push(sel);
        } else {
          var rule = new Ruleset(sel, decs);
          this.children.push(rule);
        }
        return this;
      };
      Scope.prototype.remove = function (dec) {
        this.children = this.children.filter(function (v) {
          return dec == v;
        });
      };
      Scope.prototype.serialize = function () {
        return this.children
          .map(function (child) {
            return child.serialize();
          })
          .join("");
      };
      module.exports = Scope;
    },
    function (module, exports) {
      "use strict";
      var Block = function Block() {};
      module.exports = Block;
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _inherits = function (child, parent) {
        child.prototype = Object.create(parent && parent.prototype, {
          constructor: {
            value: child,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (parent) child.__proto__ = parent;
      };
      var _interopRequire = function (obj) {
        return obj && (obj["default"] || obj);
      };
      var Block = _interopRequire(__webpack_require__(9));
      var Ruleset = function Ruleset(sel, decs) {
        this.sel = sel;
        this.decs = decs;
      };
      _inherits(Ruleset, Block);
      Ruleset.prototype.serialize = function () {
        var decs = this.decs;
        var str = "";
        for (var key in decs) {
          if (str.length) str += ";";
          str += "" + key + ":" + decs[key];
        }
        return "" + this.sel + "{" + str + "}";
      };
      module.exports = Ruleset;
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _inherits = function (child, parent) {
        child.prototype = Object.create(parent && parent.prototype, {
          constructor: {
            value: child,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (parent) child.__proto__ = parent;
      };
      var _interopRequire = function (obj) {
        return obj && (obj["default"] || obj);
      };
      var Scope = _interopRequire(__webpack_require__(8));
      var Media = _interopRequire(__webpack_require__(7));
      var Animation = _interopRequire(__webpack_require__(12));
      var Sheet = function Sheet() {
        if (Scope) {
          Scope.apply(this, arguments);
        }
      };
      _inherits(Sheet, Scope);
      Sheet.prototype.anim = function (name, frames, serializePrefixes) {
        var anim = new Animation(name, serializePrefixes);
        for (var i in frames) {
          anim.add(i, frames[i]);
        }
        this.add(anim);
        return anim;
      };
      Sheet.prototype.media = function (params) {
        var _media = new Media(params);
        this.add(_media);
        return _media;
      };
      module.exports = Sheet;
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _inherits = function (child, parent) {
        child.prototype = Object.create(parent && parent.prototype, {
          constructor: {
            value: child,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (parent) child.__proto__ = parent;
      };
      var _interopRequire = function (obj) {
        return obj && (obj["default"] || obj);
      };
      var Scope = _interopRequire(__webpack_require__(8));
      var prefixes = ["-webkit", "-moz", "-o"];
      var Animation = function Animation(name, serializePrefixes) {
        if (serializePrefixes === undefined) serializePrefixes = true;
        Scope.call(this);
        this.name = name;
        this.serializePrefixes = serializePrefixes;
      };
      _inherits(Animation, Scope);
      Animation.prototype.serialize = function () {
        var _this = this;
        var css =
          "@keyframes " +
          this.name +
          "{" +
          Scope.prototype.serialize.call(this) +
          "}";
        if (this.serializePrefixes) {
          prefixes.forEach(function (p) {
            css +=
              "@" +
              p +
              "-keyframes " +
              _this.name +
              "{" +
              Scope.prototype.serialize.call(_this) +
              "}";
          });
        }
        return css;
      };
      module.exports = Animation;
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _interopRequireWildcard = function (obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      };
      var _classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      var _createClass = (function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      var _get = function get(object, property, receiver) {
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);
          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;
          if (getter === undefined) {
            return undefined;
          }
          return getter.call(receiver);
        }
      };
      var _inherits = function (subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (superClass) subClass.__proto__ = superClass;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _Text = __webpack_require__(4);
      var _Text2 = _interopRequireWildcard(_Text);
      var _Node2 = __webpack_require__(3);
      var _Node3 = _interopRequireWildcard(_Node2);
      var _voidTags = __webpack_require__(15);
      var _voidTags2 = _interopRequireWildcard(_voidTags);
      var _flatten = __webpack_require__(14);
      var _flatten2 = _interopRequireWildcard(_flatten);
      var _parseCSS = __webpack_require__(17);
      var _parseCSS2 = _interopRequireWildcard(_parseCSS);
      var _ClassList = __webpack_require__(18);
      var _ClassList2 = _interopRequireWildcard(_ClassList);
      var Element = (function (_Node) {
        function Element(tagName, isVoid) {
          _classCallCheck(this, Element);
          _get(
            Object.getPrototypeOf(Element.prototype),
            "constructor",
            this
          ).call(this);
          this.name = tagName;
          if (null != isVoid) {
            this["void"] = isVoid;
          } else {
            this["void"] = null != _voidTags2["default"][tagName];
          }
          this.style = {};
          this.classList = new _ClassList2["default"]();
          this.children = [];
          this.props = {};
        }
        _inherits(Element, _Node);
        _createClass(Element, [
          {
            key: "add",
            value: function add() {
              var _this = this;
              for (
                var _len = arguments.length, children = Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                children[_key] = arguments[_key];
              }
              _flatten2["default"](children)
                .filter(function (v) {
                  return null != v && "boolean" != typeof v;
                })
                .map(function (v) {
                  if ("string" == typeof v || "number" == typeof v) {
                    return new _Text2["default"](String(v));
                  } else {
                    return v;
                  }
                })
                .forEach(function (v) {
                  return _this.children.push(v);
                });
              return this;
            },
          },
          {
            key: "set",
            value: function set(prop, val) {
              if ("object" == typeof prop) {
                for (var key in prop) {
                  this.set(key, prop[key]);
                }
              } else {
                if ("text" == prop) {
                  this.add(null == val ? "" : val);
                } else if ("style" == prop && val) {
                  if ("object" == typeof val) {
                    this.style = val;
                  } else {
                    this.style = _parseCSS2["default"](val);
                  }
                } else if ("class" == prop) {
                  var cl = this.classList;
                  var add = cl.add.bind(cl);
                  val.split(/\s+/).forEach(add);
                } else {
                  if (val == null || val === false) {
                    delete this.props[prop];
                  } else {
                    this.props[prop] = val;
                  }
                }
              }
              return this;
            },
          },
          {
            key: "attrs",
            value: (function (_attrs) {
              function attrs() {
                return _attrs.apply(this, arguments);
              }
              attrs.toString = function () {
                return _attrs.toString();
              };
              return attrs;
            })(function () {
              var attrs = this.props;
              if (!empty(this.style)) {
                attrs.style = toCSS(this.style);
              } else {
                delete attrs.style;
              }
              if (this.classList.length) {
                attrs["class"] = this.classList.toString();
              } else {
                delete attrs["class"];
              }
              return attrs;
            }),
          },
          {
            key: "toHTML",
            value: function toHTML() {
              var tag = this.name.toLowerCase();
              var html = "<" + tag;
              var attrs = this.attrs();
              for (var key in attrs) {
                if (attrs.hasOwnProperty(key)) {
                  html += " " + key + "=" + JSON.stringify(attrs[key]);
                }
              }
              html += ">";
              var contentLength = 0;
              this.children.forEach(function (el) {
                var add = el.toHTML();
                contentLength += add.length;
                html += add;
              });
              if (contentLength || !this["void"]) {
                html += "</" + tag + ">";
              }
              return html;
            },
          },
        ]);
        return Element;
      })(_Node3["default"]);
      exports["default"] = Element;
      function empty(obj) {
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            return false;
          }
        }
        return true;
      }
      function toCSS(obj) {
        var css = "";
        for (var k in obj) {
          if (css.length) css += ";";
          css += "" + k + ":" + obj[k];
        }
        return css;
      }
      module.exports = exports["default"];
    },
    function (module, exports) {
      var flatten = function (array, result, depth) {
        depth--;
        for (var i = 0; i < array.length; i++) {
          if (depth > -1 && Array.isArray(array[i])) {
            flatten(array[i], result, depth);
          } else {
            result.push(array[i]);
          }
        }
        return result;
      };
      module.exports = function (array, depth) {
        if (depth < 1) {
          return Array.prototype.slice.call(array);
        }
        return flatten(array, [], depth || Infinity);
      };
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _interopRequireWildcard = function (obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _voidElements = __webpack_require__(16);
      var _voidElements2 = _interopRequireWildcard(_voidElements);
      var tags = {};
      _voidElements2["default"].forEach(function (el) {
        tags[el] = 1;
      });
      exports["default"] = tags;
      module.exports = exports["default"];
    },
    function (module, exports) {
      module.exports = [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "keygen",
        "link",
        "menuitem",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
      ];
    },
    function (module, exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = parse;
      var wraps = { "(": ")", '"': '"', "'": "'" };
      function parse(css) {
        var ret = {};
        var key = "";
        var val = undefined;
        var wrap = undefined;
        for (var i = 0; i < css.length; i++) {
          var chr = css[i];
          if (null == val) {
            if (":" !== chr) {
              if (!/\s/.test(chr)) {
                key += chr;
              }
            } else {
              val = "";
            }
          } else {
            if (null == wrap) {
              if (wraps.hasOwnProperty(chr)) {
                wrap = wraps[chr];
              }
            } else {
              if (chr === wrap && "\\" !== css[i - 1]) {
                wrap = null;
              }
            }
            if (wrap || ";" !== chr) {
              val += chr;
            }
            if (!wrap && (";" === chr || i + 1 === css.length)) {
              ret[key] = val.trim();
              key = "";
              val = null;
            }
          }
        }
        return ret;
      }
      module.exports = exports["default"];
    },
    function (module, exports) {
      "use strict";
      var _classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      var _createClass = (function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      var ClassList = (function () {
        function ClassList() {
          _classCallCheck(this, ClassList);
          this.value = [];
        }
        _createClass(ClassList, [
          {
            key: "add",
            value: function add(c) {
              c = ("" + c).trim();
              if (c.length && !this.contains(c)) {
                this.value.push(c);
                updateLength(this);
              }
            },
          },
          {
            key: "remove",
            value: function remove(c) {
              if (this.contains(c)) {
                this.value.splice(this.value.indexOf(c), 1);
                updateLength(this);
              }
            },
          },
          {
            key: "item",
            value: function item(i) {
              return this.value[i];
            },
          },
          {
            key: "toggle",
            value: function toggle(c) {
              var force = arguments[1] === undefined ? null : arguments[1];
              if (null == force) {
                if (this.contains(c)) {
                  this.remove(c);
                } else {
                  this.add(c);
                }
              } else {
                this[force ? "add" : "remove"](c);
              }
            },
          },
          {
            key: "contains",
            value: function contains(c) {
              return !!~this.value.indexOf(c);
            },
          },
          {
            key: "toString",
            value: function toString() {
              return this.value.join(" ");
            },
          },
        ]);
        return ClassList;
      })();
      exports["default"] = ClassList;
      function updateLength(cl) {
        cl.length = cl.value.length;
      }
      module.exports = exports["default"];
    },
    function (module, exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = parse;
      function parse(str) {
        var pieces = str.replace(/^</, "").replace(/>$/, "").split(/\s+/);
        var _parseTag = parseTag(pieces.shift());
        var tag = _parseTag.tag;
        var classes = _parseTag.classes;
        var id = _parseTag.id;
        var attrs = parseAttrs(pieces.join(" "));
        if (null != id) attrs.id = id;
        if (classes.length || null != attrs["class"]) {
          attrs["class"] =
            classes.join(" ") + (null == attrs["class"] ? "" : attrs["class"]);
        }
        return { tag: tag, attrs: attrs };
      }
      function parseTag(str) {
        var ret = {};
        var tag = str.match(/^[^\.#]+/);
        var id = str.match(/#([^\.#]+)/);
        var classes = str.match(/\.([^\.#]+)/g);
        tag = tag ? tag[0] : "div";
        id = id ? id[1] : null;
        classes = classes || [];
        classes = classes.map(function (v) {
          return v.substr(1);
        });
        return { tag: tag, id: id, classes: classes };
      }
      function parseAttrs(str) {
        var attrs = {};
        var key = undefined,
          val = undefined,
          stop = undefined;
        for (var i = 0; i < str.length; i++) {
          var chr = str[i];
          if (null == val) {
            if (null == key) key = "";
            if ("=" == chr) {
              val = "";
            } else if (/\s/.test(chr)) {
              if (key.length) {
                attrs[key] = true;
                key = null;
              }
            } else {
              key += chr;
            }
          } else {
            var stopped = undefined;
            if (!stop) {
              if (/['"]/.test(chr)) {
                stop = new RegExp(chr);
              } else {
                stop = /\s/;
                val += chr;
              }
            } else {
              stopped = stop.test(chr);
              if (!stopped) val += chr;
            }
            if (stopped || i + 1 == str.length) {
              attrs[key] = val;
              key = val = stop = null;
            }
          }
        }
        if (null != key) attrs[key] = true;
        return attrs;
      }
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = render;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _vdiff = __webpack_require__(21);
      var _vdiff2 = _interopRequireDefault(_vdiff);
      var _css = __webpack_require__(22);
      var _css2 = _interopRequireDefault(_css);
      var _event = __webpack_require__(23);
      var _event2 = _interopRequireDefault(_event);
      var RENDER_EVENTS = {
        onremove: 1,
        onattrdel: 1,
        onattrset: 1,
        onattradd: 1,
      };
      function render(div) {
        var _ref = arguments[1] === undefined ? {} : arguments[1];
        var _ref$prefix = _ref.prefix;
        var prefix = _ref$prefix === undefined ? true : _ref$prefix;
        var evs = {};
        var fns = {};
        var key = "__vd_" + rand();
        var keyNS = key + "_NS";
        var keyRemoved = key + "_removed";
        var keyEvs = {};
        for (var i in RENDER_EVENTS) {
          keyEvs[i] = key + "_" + i;
        }
        if (true === prefix) prefix = key + "_";
        if (null == prefix || false === prefix) prefix = "";
        var sheet = (0, _css2["default"])(prefix);
        var last = undefined,
          el = undefined;
        function paint(tree) {
          if (last) {
            patch(el, (0, _vdiff2["default"])(last, tree));
          } else {
            el = toDOM(tree);
            div.appendChild(el);
          }
          last = tree;
        }
        function toDOM(vd, ns) {
          if (vd.props) {
            var _ret = (function () {
              ns = ns || vd.props.xmlns;
              var dom = ns
                ? document.createElementNS(ns, vd.name)
                : document.createElement(vd.name);
              var atts = vd.attrs();
              if (atts.onattradd) {
                addEvent(dom, "onattradd", atts.onattradd);
                delete atts.onattrset;
              }
              for (var i in atts) {
                if ("key" == i) continue;
                if (/^xmlns/.test(i)) continue;
                var val = atts[i];
                if (/^on/i.test(i)) {
                  addEvent(dom, i, val);
                  continue;
                }
                if (ns) dom[keyNS] = ns;
                setAttribute(dom, i, val, true);
              }
              if (vd.sheet) {
                dom.textContent = sheet(vd.sheet);
              } else {
                vd.children.forEach(function (c) {
                  dom.appendChild(toDOM(c, ns));
                });
              }
              return { v: dom };
            })();
            if (typeof _ret === "object") return _ret.v;
          } else {
            return document.createTextNode(vd.value());
          }
        }
        function setAttribute(dom, key, val) {
          var add = arguments[3] === undefined ? false : arguments[3];
          var ev = keyEvs[add ? "onattradd" : "onattrset"];
          if (dom[ev]) {
            dom[ev](dom, key, val, set);
          } else {
            set();
          }
          function set() {
            if (dom[keyNS]) {
              dom.setAttributeNS(null, key, val);
            } else {
              if ("class" === key && "" !== prefix) {
                val = val
                  .split(/\s+/)
                  .map(function (v) {
                    return prefix + v;
                  })
                  .join(" ");
              }
              dom.setAttribute(key, val);
            }
          }
        }
        function delAttribute(dom, key) {
          var ev = keyEvs.onattrdel;
          if (dom[ev]) {
            dom[ev](dom, key, del);
          } else {
            del();
          }
          function del() {
            if (dom[keyNS]) {
              dom.removeAttributeNS(null, key);
            } else {
              dom.removeAttribute(key);
            }
          }
        }
        function listen(ev) {
          div.addEventListener(
            ev,
            (fns[ev] = function (e) {
              if (e.bubbles) return;
              check(e.target, new _event2["default"](e));
            }),
            true
          );
          div.addEventListener(
            ev,
            (fns["b" + ev] = function (e) {
              check(e.target, new _event2["default"](e), true);
            }),
            false
          );
          function check(el, e, checkParent, orig) {
            if (checkParent === undefined) checkParent = false;
            if (!el) return;
            var data = el[key];
            if (data) {
              var fn = data[ev];
              if (fn) {
                e.target = el;
                e.currentTarget = orig || el;
                fn(e);
                if (e.isPropagationStopped()) return;
              }
            }
            if (checkParent) check(el.parentNode, e, true, el);
          }
        }
        function unlisten(ev) {
          div.removeEventListener(ev, fns[ev], true);
          div.removeEventListener(ev, fns["b" + ev], false);
        }
        function addEvent(dom, ev, fn) {
          if (RENDER_EVENTS[ev]) {
            dom[keyEvs[ev]] = fn;
          } else {
            var type = ev.toLowerCase().replace(/^on/, "");
            if (!dom[key]) dom[key] = {};
            var data = dom[key];
            if (!fn || data[type] === fn) return;
            data[type] = fn;
            if (!evs[type]) listen(type);
            evs[type] = (evs[type] || 0) + 1;
          }
        }
        function removeEvent(dom, ev) {
          var skipCheck = arguments[2] === undefined ? false : arguments[2];
          if (RENDER_EVENTS[ev]) {
            delete dom[keyEvs[ev]];
          } else {
            var type = ev.toLowerCase().replace(/^on/, "");
            var data = dom[key];
            delete data[type];
            if (!skipCheck) --evs[type] || unlisten(type);
          }
        }
        function patch(dom, ops) {
          var get = function get(t) {
            return t.reduce(function (p, n) {
              var o = 0;
              for (var i = 0; i < p.childNodes.length; i++) {
                if (p.childNodes[i][keyRemoved]) continue;
                if (o++ == n) return p.childNodes[i];
              }
            }, dom);
          };
          ops.forEach(function (op) {
            var target = get(op.target);
            switch (op.type) {
              case "attr-add":
              case "attr-set":
                if ("key" == op.key) break;
                if (/^on/i.test(op.key)) {
                  if (op.old) removeEvent(target, op.key, true);
                  addEvent(target, op.key, op.val);
                } else {
                  setAttribute(target, op.key, op.val, "attr-add" == op.type);
                }
                break;
              case "attr-del":
                if (/^on/i.test(op.key)) {
                  removeEvent(target, op.key);
                } else {
                  delAttribute(target, op.key);
                }
                break;
              case "class-add":
                target.classList.add(prefix + op.val);
                break;
              case "class-del":
                target.classList.remove(prefix + op.val);
                break;
              case "style-add":
              case "style-set":
                target.style[op.key] = op.val;
                break;
              case "style-del":
                target.style.removeProperty(op.key);
                break;
              case "add":
                splice(target, op.index, 0, toDOM(op.node));
                break;
              case "del":
                var dp = get(op.target.slice(0, -1));
                splice(dp, op.target.slice(-1)[0], 1);
                break;
              case "replace":
                var rp = get(op.target.slice(0, -1));
                splice(rp, op.target.slice(-1)[0], 1, toDOM(op.node));
                break;
              case "move":
                var mp = get(op.target.slice(0, -1));
                var node = splice(mp, op.target.slice(-1), 1)[0];
                splice(mp, op.index, 0, toDOM(node));
            }
          });
        }
        function splice(el, start, del) {
          for (
            var _len = arguments.length,
              items = Array(_len > 3 ? _len - 3 : 0),
              _key = 3;
            _key < _len;
            _key++
          ) {
            items[_key - 3] = arguments[_key];
          }
          var children = [];
          for (var i = 0; i < el.childNodes.length; i++) {
            var child = el.childNodes[i];
            if (child[keyRemoved]) continue;
            children.push(child);
          }
          if (start < 0) start = children.length + start;
          start = Math.max(0, start);
          var sel = children[start];
          var ret = [];
          if (sel) {
            if (!del && !items.length) {
              del = children.length - start;
            }
            del = Math.max(0, del);
            if (del) {
              var _loop = function (i) {
                var child = children[start + i];
                if (child) {
                  var removeFn = child[keyEvs.onremove];
                  if (removeFn) {
                    removeFn(child, function () {
                      return el.removeChild(child);
                    });
                    child[keyRemoved] = true;
                    delete child[keyEvs.onremove];
                  } else {
                    el.removeChild(child);
                  }
                  ret.push(child);
                }
              };
              for (var i = 0; i < del; i++) {
                _loop(i);
              }
            }
            if (items.length) {
              sel = children[start + del];
              if (sel) {
                items.forEach(function (item) {
                  el.insertBefore(item, sel);
                });
              } else {
                append();
              }
            }
          } else {
            append();
          }
          function append() {
            items.forEach(el.appendChild, el);
          }
          return ret;
        }
        return paint;
      }
      function rand() {
        return Math.random().toString(36).substr(7);
      }
      module.exports = exports["default"];
    },
    function (module, exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = diff;
      function diff(origEl, newEl) {
        var ops = [];
        compare(origEl, newEl, []);
        function compare(o, n, i) {
          if (isElement(o) && isElement(n)) {
            if (o.name == n.name) {
              if ("style" == o.name && o.toHTML() !== n.toHTML()) {
                op("replace", i, { node: n, old: o });
              } else {
                compareAttrs(o, n, i);
                compareChildren(o, n, i);
              }
            } else {
              op("replace", i, { node: n, old: o });
            }
          } else {
            if (isText(o) && isText(n) && o.value() === n.value()) {
              return;
            }
            op("replace", i, { node: n, old: o });
          }
        }
        function compareAttrs(o, n, i) {
          var oattrs = o.props;
          var nattrs = n.props;
          for (var key in oattrs) {
            if (!has(oattrs, key)) continue;
            if ("class" === key || "style" === key) continue;
            if (has(nattrs, key)) {
              if (nattrs[key] !== oattrs[key]) {
                if (null == nattrs[key]) {
                  op("attr-del", i, { key: key });
                } else {
                  op("attr-set", i, {
                    key: key,
                    old: oattrs[key],
                    val: nattrs[key],
                  });
                }
              }
            } else {
              op("attr-del", i, { key: key });
            }
          }
          for (var key in nattrs) {
            if (!has(oattrs, key)) {
              op("attr-add", i, { key: key, val: nattrs[key] });
            }
          }
          compareClasses(o.classList, n.classList, i);
          compareStyles(o.style, n.style, i);
        }
        function compareClasses(o, n, i) {
          o = o.value;
          n = n.value;
          if (!o.length && !n.length) {
            return;
          }
          for (var k = 0; k < Math.max(o.length, n.length); k++) {
            var orig = o[k];
            var newc = n[k];
            if (null == orig) {
              op("class-add", i, { val: newc });
            } else if (orig !== newc) {
              op("class-del", i, { val: orig });
              if (null != newc) {
                op("class-add", i, { val: newc });
              }
            }
          }
        }
        function compareStyles(o, n, i) {
          for (var prop in o) {
            if (!has(o, prop)) continue;
            if (has(n, prop)) {
              if (o[prop] !== n[prop]) {
                if (null == n[prop]) {
                  op("style-del", i, { key: prop });
                } else {
                  op("style-set", i, { key: prop, old: o[prop], val: n[prop] });
                }
              }
            } else {
              op("style-del", i, { key: prop });
            }
          }
          for (var prop in n) {
            if (!has(n, prop)) continue;
            if (!has(o, prop)) {
              op("style-add", i, { key: prop, val: n[prop] });
            }
          }
        }
        function compareChildren(o, n, i) {
          var ignoreKeys = arguments[3] === undefined ? false : arguments[3];
          if (!o.children.length && !n.children.length) {
            return;
          }
          var key = undefined;
          if (!ignoreKeys) {
            var el = o.children[0] || n.children[0];
            if (isElement(el)) {
              var props = el.props;
              key = props.key
                ? "key"
                : props.id
                ? "id"
                : props.name
                ? "name"
                : null;
            }
          }
          if (key) {
            var t1 = {},
              t2 = {};
            var fallback = function fallback() {
              t1 = t2 = null;
              compareChildren(o, n, i, true);
            };
            var max = Math.max(o.children.length, n.children.length);
            for (var k = 0; k < max; k++) {
              var oc = o.children[k];
              var nc = n.children[k];
              if (oc) {
                if (!isElement(oc) || null == oc.props[key]) return fallback();
                t1[oc.props[key]] = { el: oc, index: k };
              }
              if (nc) {
                if (!isElement(nc) || null == nc.props[key]) return fallback();
                t2[nc.props[key]] = { el: nc, index: k };
              }
            }
            var added = {};
            var deleted = {};
            var d = 0;
            for (var k = 0; k < max; k++) {
              var oc = o.children[k];
              var nc = n.children[k];
              var isDeleted = oc && !t2[oc.props[key]];
              var isNew = nc && !t1[nc.props[key]];
              if (isDeleted && isNew) {
                deleted[k] = true;
                added[k] = true;
                op("replace", i.concat(k - d), { node: nc, old: oc });
                continue;
              }
              if (isDeleted) {
                deleted[k] = true;
                op("del", i.concat(k - d), { node: oc });
                d++;
              }
              if (isNew) {
                added[k] = true;
                op("add", i, { node: nc, index: k });
              }
            }
            var x = 0;
            var m = 0;
            var a = 0;
            var D = 0;
            var moved = {};
            for (var k = 0; k < max; k++) {
              if (deleted[k] && added[k]) x++;
              else if (deleted[k]) D++;
              if (!deleted[k] && added[k]) a++;
              if (added[k]) continue;
              var j = x++;
              var ii = j - m + a;
              var el = o.children[j + D];
              if (!el) {
                x--;
                continue;
              }
              var nel = n.children[k - D];
              if (!nel) {
                x--;
                continue;
              }
              var mel = t2[el.props[key]];
              if (!mel) {
                x--;
                continue;
              }
              if (moved[j]) m -= moved[j];
              if (ii != mel.index && el.props[key] != nel.props[key]) {
                op("move", i.concat(ii), { index: mel.index });
                compare(el, mel.el, i.concat(mel.index));
                var at = mel.index + m;
                if (at < max) {
                  moved[at] = (moved[at] || 0) + 1;
                  m++;
                }
                if (mel.index < ii) m--;
              } else {
                compare(el, mel.el, i.concat(ii));
              }
            }
          } else {
            var len = Math.max(o.children.length, n.children.length);
            var d = 0;
            for (var k = 0; k < len; k++) {
              var orig = o.children[k];
              var repl = n.children[k];
              if (orig) {
                if (repl) {
                  compare(orig, repl, i.concat(k));
                } else {
                  op("del", i.concat(k - d), { node: orig });
                  d++;
                }
              } else {
                op("add", i, { node: repl, index: k });
              }
            }
          }
        }
        function op(type, target) {
          var attrs = arguments[2] === undefined ? {} : arguments[2];
          attrs.type = type;
          attrs.target = target;
          ops.push(attrs);
        }
        return ops;
      }
      function isElement(el) {
        return !!el.props;
      }
      function isText(el) {
        return el.value && !el.props;
      }
      function has(obj, key) {
        return obj.hasOwnProperty(key);
      }
      module.exports = exports["default"];
    },
    function (module, exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = css;
      function css(prefix) {
        function serialize(obj) {
          if (obj.params) {
            return media(obj);
          } else if (obj.name) {
            return animation(obj);
          } else if (obj.children) {
            return scope(obj);
          } else {
            return ruleset(obj);
          }
        }
        function scope(obj) {
          return obj.children
            .map(function (c) {
              return serialize(c);
            })
            .join("");
        }
        function media(obj) {
          return "@media " + obj.params + "{" + scope(obj) + "}";
        }
        function animation(obj) {
          return (
            "@keyframes " +
            prefix +
            obj.name +
            "{" +
            scope(obj) +
            "}" +
            ("@-webkit-keyframes " + prefix + obj.name + "{" + scope(obj) + "}")
          );
        }
        function ruleset(obj) {
          var decs = obj.decs;
          var str = "";
          for (var key in decs) {
            if (str.length) str += ";";
            var val = decs[key];
            if ("" !== prefix) {
              var anim = key.match(
                /^(-webkit-|-moz-|-o-|-ms-)?animation(-name)?$/
              );
              if (anim) {
                (function () {
                  var name = function name(n) {
                    return /^(none|inherit)$/i.test(n) ? n : prefix + n;
                  };
                  if (anim[2]) {
                    val = name(val);
                  } else {
                    (function () {
                      var replaced = undefined;
                      val = val
                        .split(/\s+/)
                        .map(function (v) {
                          if (!replaced && v.length) {
                            v = name(v);
                            replaced = true;
                          }
                          return v;
                        })
                        .join(" ");
                    })();
                  }
                })();
              }
            }
            str += key + ":" + val;
          }
          return selector(obj.sel) + "{" + str + "}";
        }
        function selector(sel) {
          var str = "";
          var expect = undefined;
          for (var i = 0; i < sel.length; i++) {
            var chr = sel.charAt(i);
            if (expect && chr == expect) expect = null;
            if ("[" == chr) expect = "]";
            if (!expect && "." === chr) {
              str += "." + prefix;
            } else {
              str += chr;
            }
          }
          return str;
        }
        return serialize;
      }
      module.exports = exports["default"];
    },
    function (module, exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var _createClass = (function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      var Event = (function () {
        function Event(ev) {
          _classCallCheck(this, Event);
          this.originalEvent = ev;
          this.stopped = false;
          for (var i in ev) {
            if (
              "webkitMovementX" != i &&
              "webkitMovementY" != i &&
              "function" != typeof ev[i]
            ) {
              this[i] = ev[i];
            }
          }
        }
        _createClass(Event, [
          {
            key: "stopPropagation",
            value: function stopPropagation() {
              if (this.stopped) return;
              this.stopped = true;
            },
          },
          {
            key: "preventDefault",
            value: function preventDefault() {
              return this.originalEvent.preventDefault();
            },
          },
          {
            key: "isPropagationStopped",
            value: function isPropagationStopped() {
              return this.stopped;
            },
          },
        ]);
        return Event;
      })();
      exports["default"] = Event;
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var _vd = __webpack_require__(2);
      var css = (0, _vd.style)();
      css.add(".viewer", {
        "box-sizing": "border-box",
        margin: 0,
        padding: 0,
        "font-family":
          "'San Francisco Display', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      });
      css.add(".category > .t", {
        "font-size": "16px",
        "margin-bottom": "20px",
      });
      css.add(".line", { "margin-bottom": "20px" });
      css.add(".line > .board", {
        display: "inline-block",
        "margin-right": "20px",
        "margin-bottom": "20px",
      });
      css.add(".board > .artboard", {
        background: "#fff",
        padding: "20px",
        "margin-top": "10px",
        display: "inline-block",
        position: "relative",
        "box-shadow": "0 1px 3px rgba(0,0,0,.65)",
      });
      css.add(".board > .t > .opts-toggle::before", {
        content: '"[+]"',
        color: "#666",
        "font-weight": "bold",
        cursor: "pointer",
        "margin-left": "5px",
      });
      css.add(".board > .t > .opts-toggle:hover::before", { color: "#000" });
      css.add(".board > .t > .opts-toggle.expanded::before", {
        content: '"[-]"',
      });
      css.add(".options", { padding: "10px 0 0 10px" });
      css.add(".option", { display: "table-row" });
      css.add(".option > span.t", { "padding-right": "20px" });
      css.add(".option > span", {
        display: "table-cell",
        "padding-bottom": "5px",
      });
      css.add(".option > .input", { "white-space": "nowrap" });
      css.add(".option > .input > input", {
        border: "none",
        "font-family": 'monaco, Consolas, "Lucida Console", monospace',
        "font-size": "11px",
      });
      css.add(".option > .input > input[type=text]", {
        padding: "2px 10px",
        "box-sizing": "content-box",
      });
      css.add(".option > .input > .field", {
        border: "none",
        "font-family": 'monaco, Consolas, "Lucida Console", monospace',
        "font-size": "11px",
        padding: "2px 10px",
        background: "#fff",
        display: "inline-block",
        "box-sizing": "content-box",
      });
      css.add(
        ".option > .input > .field.focus, .option > .input > input.loading",
        { background: "#FFFABF" }
      );
      css.add(".option > .input > input:focus", {
        outline: 0,
        background: "#FFFABF",
      });
      css.add(".option > .t", {
        "font-family": 'monaco, Consolas, "Lucida Console", monospace',
        "font-size": "11px",
        color: "#9B9B9B",
      });
      css.add(".checkbox", { display: "inline-block", cursor: "pointer" });
      css.add(".checkbox > span", {
        "font-family": 'monaco, Consolas, "Lucida Console", monospace',
        "font-size": "11px",
        padding: "2px 0",
        "text-align": "center",
        background: "#fff",
        color: "#9B9B9B",
        width: "34px",
        display: "inline-block",
      });
      css.add(".checkbox > span.selected", {
        background: "#9B9B9B",
        color: "#fff",
      });
      css.add(".board > .t", {
        "font-family":
          '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif',
        "font-size": "11px",
        color: "#9B9B9B",
      });
      css.add("span.random", {
        padding: "2px",
        "line-height": "0",
        display: "inline-block",
        color: "#4A90E2",
        position: "relative",
        top: "1px",
        left: "4px",
        cursor: "pointer",
      });
      css.add("span.random svg", { fill: "#4A90E2" });
      css.add("span.random:hover", { background: "#4A90E2" });
      css.add("span.random:hover svg", { fill: "#fff" });
      css.add("span.random.loading", {
        background: "#ccc",
        "pointer-events": "none",
      });
      css.add("span.random.loading svg", { fill: "#999" });
      exports["default"] = css;
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var window = __webpack_require__(26);
      var once = __webpack_require__(27);
      var parseHeaders = __webpack_require__(28);
      var XHR = window.XMLHttpRequest || noop;
      var XDR = "withCredentials" in new XHR() ? XHR : window.XDomainRequest;
      module.exports = createXHR;
      function createXHR(options, callback) {
        function readystatechange() {
          if (xhr.readyState === 4) {
            loadFunc();
          }
        }
        function getBody() {
          var body = undefined;
          if (xhr.response) {
            body = xhr.response;
          } else if (xhr.responseType === "text" || !xhr.responseType) {
            body = xhr.responseText || xhr.responseXML;
          }
          if (isJson) {
            try {
              body = JSON.parse(body);
            } catch (e) {}
          }
          return body;
        }
        var failureResponse = {
          body: undefined,
          headers: {},
          statusCode: 0,
          method: method,
          url: uri,
          rawRequest: xhr,
        };
        function errorFunc(evt) {
          clearTimeout(timeoutTimer);
          if (!(evt instanceof Error)) {
            evt = new Error("" + (evt || "unknown"));
          }
          evt.statusCode = 0;
          callback(evt, failureResponse);
        }
        function loadFunc() {
          clearTimeout(timeoutTimer);
          var status = xhr.status === 1223 ? 204 : xhr.status;
          var response = failureResponse;
          var err = null;
          if (status !== 0) {
            response = {
              body: getBody(),
              statusCode: status,
              method: method,
              headers: {},
              url: uri,
              rawRequest: xhr,
            };
            if (xhr.getAllResponseHeaders) {
              response.headers = parseHeaders(xhr.getAllResponseHeaders());
            }
          } else {
            err = new Error("Internal XMLHttpRequest Error");
          }
          callback(err, response, response.body);
        }
        if (typeof options === "string") {
          options = { uri: options };
        }
        options = options || {};
        if (typeof callback === "undefined") {
          throw new Error("callback argument missing");
        }
        callback = once(callback);
        var xhr = options.xhr || null;
        if (!xhr) {
          if (options.cors || options.useXDR) {
            xhr = new XDR();
          } else {
            xhr = new XHR();
          }
        }
        var key;
        var uri = (xhr.url = options.uri || options.url);
        var method = (xhr.method = options.method || "GET");
        var body = options.body || options.data;
        var headers = (xhr.headers = options.headers || {});
        var sync = !!options.sync;
        var isJson = false;
        var timeoutTimer;
        if ("json" in options) {
          isJson = true;
          headers["Accept"] || (headers["Accept"] = "application/json");
          if (method !== "GET" && method !== "HEAD") {
            headers["Content-Type"] = "application/json";
            body = JSON.stringify(options.json);
          }
        }
        xhr.onreadystatechange = readystatechange;
        xhr.onload = loadFunc;
        xhr.onerror = errorFunc;
        xhr.onprogress = function () {};
        xhr.ontimeout = errorFunc;
        xhr.open(method, uri, !sync, options.username, options.password);
        if (!sync) {
          xhr.withCredentials = !!options.withCredentials;
        }
        if (!sync && options.timeout > 0) {
          timeoutTimer = setTimeout(function () {
            xhr.abort("timeout");
          }, options.timeout + 2);
        }
        if (xhr.setRequestHeader) {
          for (key in headers) {
            if (headers.hasOwnProperty(key)) {
              xhr.setRequestHeader(key, headers[key]);
            }
          }
        } else if (options.headers) {
          throw new Error("Headers cannot be set on an XDomainRequest object");
        }
        if ("responseType" in options) {
          xhr.responseType = options.responseType;
        }
        if (
          "beforeSend" in options &&
          typeof options.beforeSend === "function"
        ) {
          options.beforeSend(xhr);
        }
        xhr.send(body);
        return xhr;
      }
      function noop() {}
    },
    function (module, exports) {
      (function (global) {
        if (typeof window !== "undefined") {
          module.exports = window;
        } else if (typeof global !== "undefined") {
          module.exports = global;
        } else if (typeof self !== "undefined") {
          module.exports = self;
        } else {
          module.exports = {};
        }
      }.call(
        exports,
        (function () {
          return this;
        })()
      ));
    },
    function (module, exports) {
      module.exports = once;
      once.proto = once(function () {
        Object.defineProperty(Function.prototype, "once", {
          value: function () {
            return once(this);
          },
          configurable: true,
        });
      });
      function once(fn) {
        var called = false;
        return function () {
          if (called) return;
          called = true;
          return fn.apply(this, arguments);
        };
      }
    },
    function (module, exports, __webpack_require__) {
      var trim = __webpack_require__(29),
        forEach = __webpack_require__(30),
        isArray = function (arg) {
          return Object.prototype.toString.call(arg) === "[object Array]";
        };
      module.exports = function (headers) {
        if (!headers) return {};
        var result = {};
        forEach(trim(headers).split("\n"), function (row) {
          var index = row.indexOf(":"),
            key = trim(row.slice(0, index)).toLowerCase(),
            value = trim(row.slice(index + 1));
          if (typeof result[key] === "undefined") {
            result[key] = value;
          } else if (isArray(result[key])) {
            result[key].push(value);
          } else {
            result[key] = [result[key], value];
          }
        });
        return result;
      };
    },
    function (module, exports) {
      exports = module.exports = trim;
      function trim(str) {
        return str.replace(/^\s*|\s*$/g, "");
      }
      exports.left = function (str) {
        return str.replace(/^\s*/, "");
      };
      exports.right = function (str) {
        return str.replace(/\s*$/, "");
      };
    },
    function (module, exports, __webpack_require__) {
      var isFunction = __webpack_require__(31);
      module.exports = forEach;
      var toString = Object.prototype.toString;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      function forEach(list, iterator, context) {
        if (!isFunction(iterator)) {
          throw new TypeError("iterator must be a function");
        }
        if (arguments.length < 3) {
          context = this;
        }
        if (toString.call(list) === "[object Array]")
          forEachArray(list, iterator, context);
        else if (typeof list === "string")
          forEachString(list, iterator, context);
        else forEachObject(list, iterator, context);
      }
      function forEachArray(array, iterator, context) {
        for (var i = 0, len = array.length; i < len; i++) {
          if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array);
          }
        }
      }
      function forEachString(string, iterator, context) {
        for (var i = 0, len = string.length; i < len; i++) {
          iterator.call(context, string.charAt(i), i, string);
        }
      }
      function forEachObject(object, iterator, context) {
        for (var k in object) {
          if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object);
          }
        }
      }
    },
    function (module, exports) {
      module.exports = isFunction;
      var toString = Object.prototype.toString;
      function isFunction(fn) {
        var string = toString.call(fn);
        return (
          string === "[object Function]" ||
          (typeof fn === "function" && string !== "[object RegExp]") ||
          (typeof window !== "undefined" &&
            (fn === window.setTimeout ||
              fn === window.alert ||
              fn === window.confirm ||
              fn === window.prompt))
        );
      }
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _dim = __webpack_require__(33);
      var _dim2 = _interopRequireDefault(_dim);
      var _num = __webpack_require__(34);
      var _num2 = _interopRequireDefault(_num);
      var _img = __webpack_require__(36);
      var _img2 = _interopRequireDefault(_img);
      var _bool = __webpack_require__(38);
      var _bool2 = _interopRequireDefault(_bool);
      var _text = __webpack_require__(39);
      var _text2 = _interopRequireDefault(_text);
      exports.img = _img2["default"];
      exports.dim = _dim2["default"];
      exports.num = _num2["default"];
      exports.bool = _bool2["default"];
      exports.text = _text2["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _num = __webpack_require__(34);
      var _num2 = _interopRequireDefault(_num);
      exports["default"] = _num2["default"];
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = num;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      var _vd = __webpack_require__(2);
      var _vd2 = _interopRequireDefault(_vd);
      var _isMobileBrowser = __webpack_require__(35);
      var _isMobileBrowser2 = _interopRequireDefault(_isMobileBrowser);
      var _text = __webpack_require__(39);
      var _text2 = _interopRequireDefault(_text);
      var isMobile = (0, _isMobileBrowser2["default"])(navigator.userAgent);
      var down = isMobile ? "touchstart" : "mousedown";
      var move = isMobile ? "touchmove" : "mousemove";
      var up = isMobile ? "touchend" : "mouseup";
      function num(_ref) {
        var _dom;
        var key = _ref.key;
        var val = _ref.val;
        var _set = _ref.set;
        var _ref$min = _ref.min;
        var min = _ref$min === undefined ? 0 : _ref$min;
        if (isMobile) {
          return (0, _text2["default"])({
            key: key,
            val: String(val),
            set: function set(v) {
              return _set(Number(v));
            },
          });
        }
        return (0, _vd2["default"])(
          "span.field",
          ((_dom = {}),
          _defineProperty(_dom, "on" + down, function (e) {
            e.preventDefault();
            var el = e.target;
            el.classList.add("focus");
            document.addEventListener(move, onmove, true);
            document.addEventListener(up, onup, true);
            var start = e.touches ? e.touches[0].pageX : e.clientX;
            var lastX = start;
            function onmove(e) {
              e.preventDefault();
              var x = Math.round(e.touches ? e.touches[0].pageX : e.clientX);
              var d = Math.abs(lastX - x);
              if (!d) return;
              if (x > lastX) d *= -1;
              if (false !== min) {
                val = Math.max(min, val - d);
              } else {
                val -= d;
              }
              _set(val);
              lastX = e.clientX;
            }
            function onup() {
              el.classList.remove("focus");
              document.removeEventListener(move, onmove, true);
              document.removeEventListener(up, onup, true);
            }
          }),
          _defineProperty(_dom, "style", {
            width: String(val).length * 7 + "px",
            cursor: "ew-resize",
          }),
          _dom),
          val
        );
      }
      module.exports = exports["default"];
    },
    function (module, exports) {
      module.exports = isMobileUser;
      function isMobileUser(useragent) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            useragent
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            useragent.substr(0, 4)
          )
        ) {
          return true;
        }
        return false;
      }
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = img;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _vd = __webpack_require__(2);
      var _vd2 = _interopRequireDefault(_vd);
      var _worldIcon = __webpack_require__(37);
      var _worldIcon2 = _interopRequireDefault(_worldIcon);
      var world = (0, _worldIcon2["default"])();
      function img(_ref) {
        var key = _ref.key;
        var val = _ref.val;
        var set = _ref.set;
        var loading = _ref.loading;
        var fetch = _ref.fetch;
        return [
          (0, _vd2["default"])("input", {
            type: "text",
            classes: { loading: loading },
            value: val,
            oninput: function oninput(e) {
              return set(e.target.value);
            },
            style: { width: val.length * 6.7 + "px" },
          }),
          (0, _vd2["default"])(
            "span.random",
            { classes: { loading: loading }, onclick: fetch },
            world
          ),
        ];
      }
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = world;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _vd = __webpack_require__(2);
      var _vd2 = _interopRequireDefault(_vd);
      function world() {
        return (0, _vd2["default"])(
          "svg",
          {
            "enable-background": "new 0 0 24.947 24.947",
            width: "10px",
            height: "10px",
            viewBox: "0 0 24.947 24.947",
            xmlns: "http://www.w3.org/2000/svg",
          },
          (0, _vd2["default"])("path", {
            d:
              "M12.474,0C5.596,0,0,5.596,0,12.474s5.597,12.474,12.475,12.474s12.474-5.596,12.474-12.474S19.352,0,12.474,0z   M16.009,7.858c0.07,0.239,0.223,0.503,0.462,0.798l0.096,0.131c0.04,0.055,0.092,0.114,0.142,0.173  c-0.144-0.04-0.326-0.086-0.554-0.136l-0.312-0.951C15.906,7.871,15.961,7.865,16.009,7.858z M14.835,8.085l0.332,0.531  l-0.027,0.003L15,8.729c-0.106,0.086-0.9,0.055-1.181-0.06c-0.008-0.042-0.021-0.102-0.037-0.17l0.155,0.115l0.211-0.035  C14.502,8.52,14.727,8.291,14.835,8.085z M12.474,23.588c-2.592,0-5.062-0.891-7.046-2.524c0.099-0.062,0.178-0.121,0.227-0.162  l0.261-0.219l-0.232-0.697l0.337-1.062l0.028-0.169c0-0.405-0.161-0.873-0.589-0.957c-0.049-0.02-0.175-0.219-0.25-0.272  c-0.213-0.156-0.382-0.385-0.589-0.385c0,0-0.001,0-0.002,0c-0.038,0-0.146,0.061-0.211,0.018c-0.058-0.037-0.134-0.025-0.216-0.066  c-0.049-0.023-0.131-0.036-0.12-0.02c-0.079-0.116-0.186-0.285-0.282-0.531c-0.077-0.215-0.146-0.322-0.508-0.729  c-0.238-0.27-0.295-0.329-0.515-0.432l-0.092-0.042c-0.093-0.046-0.154-0.093-0.214-0.136c-0.095-0.068-0.213-0.154-0.384-0.224  c-0.144-0.059-0.19-0.094-0.329-0.212c-0.05-0.045-0.109-0.095-0.18-0.141C1.43,13.922,1.36,13.199,1.36,12.474l0.002-0.138  c0.11-0.286,0.212-0.771,0.163-1.017c-0.003-0.062,0.036-0.256,0.06-0.371c0.041-0.202,0.076-0.402,0.072-0.5  c0.021-0.084,0.17-0.312,0.249-0.434c0.105-0.162,0.195-0.312,0.236-0.412C2.184,9.5,2.415,9.145,2.554,8.932l0.232-0.364  C2.847,8.473,2.988,8.248,2.934,8C3.197,7.814,3.536,7.573,3.58,7.536C3.634,7.482,4.086,6.988,3.623,6.13  C3.608,6.102,3.782,6.08,3.775,6.068c0.039-0.072,0.275-0.19,0.275-0.348V5.683c0-0.305,0.119-0.544,0.387-0.544h0.166  c0.06,0,0.119-0.175,0.174-0.185l0.408,0.099L6.03,4.697L6.12,4.51c0.001-0.001,0.09-0.173,0.278-0.307  c0.28-0.201,0.365-0.328,0.496-0.545L6.493,3.357L6.966,3.57C7.021,3.516,7.132,3.147,7.42,2.838  c0.335-0.36,0.527-0.698,0.505-0.698h0.209l0.148,0.094C8.327,2.184,8.515,2.104,8.66,1.908c1.925-0.706,4.048-0.793,6.048-0.385  c-0.264,0.006-0.512,0.119-0.89,0.3c-0.092,0.044-0.174,0.102-0.223,0.118c-0.086,0.021-0.216,0.082-0.353,0.144  c-0.083,0.036-0.237,0.108-0.255,0.116c-0.341,0-0.635,0.281-0.869,0.588c-0.293,0.533-0.222,0.854-0.128,1.012l0.192,0.339h0.139  c-0.182,0-0.351,0.266-0.456,0.358L11.36,3.875l-0.477-1.006l-0.834,0.72v0.373L9.538,3.787L9.02,4.867l0.738,1.018l0.293-0.258  v0.07l0.468-0.119c-0.011,0.118-0.035,0.234,0.004,0.342l-1.37,0.318l0.118,0.51c0.021,0.082,0.026,0.243,0.033,0.34  C9.116,7.834,9.286,8.061,9.353,8.148l0.123,0.136C9.303,8.459,9.189,8.654,9.132,8.75c-0.078,0.091-0.22,0.252-0.25,0.49  C8.837,9.297,8.737,9.388,8.666,9.436L8.575,9.492c-0.328,0.201-0.635,0.402-0.79,0.66C7.592,10.477,7.47,10.762,7.424,11  c-0.053,0.265-0.053,0.472-0.053,0.785c0,0.096-0.005,0.178-0.01,0.254c-0.01,0.166-0.021,0.338,0.017,0.562  c0.08,0.479,0.739,1.339,0.748,1.35c0.206,0.258,0.45,0.547,0.733,0.715c0.146,0.088,0.335,0.244,0.413,0.31  c0.188,0.221,0.625,0.411,1.053,0.248c0.12-0.046,0.241-0.068,0.358-0.096c0.216-0.048,0.462-0.101,0.704-0.238  c0.056-0.032,0.106-0.061,0.152-0.082c0.187,0.311,0.571,0.465,0.96,0.337l0.008-0.003c0.013,0.08,0.025,0.154,0.038,0.223  c0.014,0.068,0.026,0.127,0.025,0.245c-0.008,0.17-0.023,0.487,0.235,0.747c0.051,0.051,0.127,0.112,0.209,0.18  c0.035,0.027,0.087,0.068,0.127,0.104c0.017,0.214,0.062,0.572,0.174,0.795c0.054,0.105,0.068,0.186,0.087,0.15  c-0.095,0.188-0.282,0.699-0.301,0.763c-0.116,0.522-0.049,0.721-0.029,0.778c0.081,0.25,0.233,0.484,0.465,0.715  c0.028,0.028,0.041,0.069,0.068,0.17c0.032,0.116,0.075,0.274,0.185,0.421c0.044,0.062,0.145,0.318,0.195,0.473l0.063,0.348  l-0.001,0.965l0.572-0.082c0,0,0.938-0.137,1.121-0.183c0.213-0.055,0.934-0.388,1.193-0.646c0.132-0.132,0.195-0.255,0.237-0.337  c0.034-0.063,0.038-0.071,0.071-0.1c0.214-0.17,0.603-0.469,0.603-0.469l0.211-0.162l-0.046-0.729l0.359-0.484l0.306-0.312  c-0.072,0.172-0.163,0.396-0.196,0.527c-0.06,0.238-0.02,0.525,0.17,0.766l0.222,0.138h0.243l0.179,0.067  c0.186-0.061,0.333-0.153,0.478-0.291c0.044-0.042,0.086-0.061,0.113-0.081c0.273-0.18,0.537-0.64,0.6-0.886l0.173-0.64  c0.05-0.199,0.101-0.583,0.101-0.765c0-0.181-0.048-0.381-0.058-0.42l-0.313-1.263l-0.875,1.644c-0.128,0.062-0.22,0.12-0.303,0.18  c0.001-0.076-0.006-0.138-0.015-0.17c-0.021-0.084-0.065-0.471-0.104-0.826c0.062-0.13,0.143-0.281,0.189-0.346  c0.082-0.109,0.129-0.218,0.166-0.304c0.045-0.104,0.067-0.153,0.14-0.215c0.269-0.223,0.449-0.471,0.582-0.652l0.104-0.139  c0.143-0.188,0.366-0.488,0.44-0.604c0.123-0.183,0.208-0.511,0.247-0.688l0.159-0.722l-0.599,0.1c0.072-0.036,0.137-0.07,0.181-0.1  c0.035-0.023,0.096-0.058,0.165-0.097c0.273-0.153,0.477-0.271,0.604-0.398l0.268-0.195c0.235-0.156,0.528-0.351,0.565-0.688  c0.052,0.041,0.107,0.08,0.171,0.11c0.043,0.027,0.146,0.14,0.229,0.244c0.062,0.146,0.218,0.514,0.25,0.643  c0.022,0.087,0.087,0.249,0.158,0.418c0.055,0.128,0.115,0.263,0.128,0.275c0,0.113,0.051,0.451,0.239,0.666  C22.735,19.408,18.083,23.588,12.474,23.588z M12.634,7.641c-0.004,0-0.013,0.002-0.016,0.002c-0.047-0.009-0.195-0.057-0.312-0.103  l-0.112-0.044l-0.119,0.011c-0.042,0.005-0.104,0.013-0.172,0.021c0.004-0.006,0.014-0.021,0.017-0.024  c0.035-0.053,0.068-0.103,0.203-0.146c0.247-0.083,0.38-0.198,0.426-0.258c0.071-0.022,0.24-0.056,0.376-0.078l0.21,0.139  c0.062,0.074,0.15,0.156,0.277,0.236l-0.799,0.228L12.634,7.641z",
          })
        );
      }
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = bool;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _vd = __webpack_require__(2);
      var _vd2 = _interopRequireDefault(_vd);
      function bool(_ref) {
        var key = _ref.key;
        var val = _ref.val;
        var set = _ref.set;
        return (0, _vd2["default"])(
          ".checkbox",
          {
            onclick: function onclick() {
              set(!val);
            },
          },
          (0, _vd2["default"])("span", { classes: { selected: val } }, "on"),
          (0, _vd2["default"])("span", { classes: { selected: !val } }, "off")
        );
      }
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = text;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _vd = __webpack_require__(2);
      var _vd2 = _interopRequireDefault(_vd);
      function text(_ref) {
        var key = _ref.key;
        var val = _ref.val;
        var set = _ref.set;
        return (0, _vd2["default"])("input", {
          type: "text",
          value: val,
          oninput: function oninput(e) {
            return set(e.target.value);
          },
          style: { width: val.length * 6.7 + "px" },
        });
      }
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _thumbTip = __webpack_require__(41);
      var _thumbTip2 = _interopRequireDefault(_thumbTip);
      var _converting = __webpack_require__(63);
      var _converting2 = _interopRequireDefault(_converting);
      exports.thumbTip = _thumbTip2["default"];
      exports.converting = _converting2["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = tip;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _vd = __webpack_require__(42);
      var _vd2 = _interopRequireDefault(_vd);
      var _spinner = __webpack_require__(60);
      var _spinner2 = _interopRequireDefault(_spinner);
      var _timeFormat = __webpack_require__(61);
      var _timeFormat2 = _interopRequireDefault(_timeFormat);
      var PADDING = 3;
      function tip(_ref) {
        var at = _ref.at;
        var css = _ref.css;
        var width = _ref.width;
        var height = _ref.height;
        var tipLeft = _ref.tipLeft;
        var waiting = _ref.waiting;
        var url = _ref.url;
        var rows = _ref.rows;
        var cols = _ref.cols;
        var index = _ref.index;
        var totalWidth = width + PADDING * 2;
        var totalHeight = height + PADDING * 2;
        var box = (0, _vd2["default"])(".box", {
          style: { height: "" + totalHeight + "px" },
        });
        if (at) {
          box.add(
            (0, _vd2["default"])(
              ".thumb-at",
              (0, _vd2["default"])("span", (0, _timeFormat2["default"])(at))
            )
          );
        }
        var triangle = (0, _vd2["default"])(".triangle", {
          style: {
            width: 0,
            height: 0,
            "border-style": "solid",
            "border-color":
              "rgba(0,0,0,.8) transparent transparent transparent",
            position: "absolute",
            bottom: 0,
          },
        });
        var div = (0, _vd2["default"])(
          ".tip",
          {
            style: {
              width: "" + totalWidth + "px",
              height: "" + (totalHeight + 5) + "px",
              position: "relative",
            },
          },
          box,
          triangle,
          css && style()
        );
        if (waiting) {
          var tw = 30;
          box.add(
            (0, _vd2["default"])(
              ".tip-loading",
              {
                key: "spinner",
                style: {
                  "margin-top": "" + ((height + PADDING * 2) / 2 - 8) + "px",
                },
              },
              "Loading…"
            )
          );
        } else if (url) {
          var left = (index % cols) * width;
          var _top = Math.floor(index / rows) * height;
          box.add(
            (0, _vd2["default"])(".tip-image", {
              key: "image",
              style: {
                width: "" + width + "px",
                height: "" + height + "px",
                "background-size":
                  "" + width * cols + "px " + height * rows + "px",
                "background-image": "url(" + url + ")",
                "background-position": "-" + left + "px -" + _top + "px",
              },
            })
          );
        }
        {
          var left = tipLeft;
          if (null == left) {
            left = Math.round(totalWidth / 2);
          }
          var bw = undefined;
          if (left > totalWidth - 5) {
            bw = "5px 0 0 5px";
            left -= 5;
          } else if (left < 5) {
            bw = "5px 5px 0 0";
          } else {
            bw = "5px 5px 0 5px";
            left -= 5;
          }
          triangle.style.left = "" + left + "px";
          triangle.style["border-width"] = bw;
        }
        return div;
      }
      var css = undefined;
      function style() {
        if (css) return css;
        css = _vd2["default"].style();
        css.add(".tip-loading", {
          color: "#666",
          "font-size": "11px",
          position: "absolute",
          left: 0,
          right: 0,
          "text-align": "center",
        });
        css.add(".tip-spinner", {
          animation: "spinner 200ms ease-out 1",
          "-webkit-animation": "spinner 200ms ease-out 1",
          "animation-fill-mode": "forwards",
          "-webkit-animation-fill-mode": "forwards",
          "animation-delay": "300ms",
          "-webkit-animation-delay": "300ms",
          opacity: 0,
        });
        css.add(".box", { overflow: "hidden", background: "rgba(0,0,0,.8)" });
        css.add(".thumb-at", {
          color: "#fff",
          position: "absolute",
          width: "100%",
          "text-align": "center",
          bottom: "12px",
          "font-size": "9px",
        });
        css.add(".thumb-at span", {
          background: "rgba(0,0,0,.7)",
          padding: "1px 2px",
        });
        css.add(".tip-image", {
          overflow: "hidden",
          margin: "3px 0 0 3px",
          "background-repeat": "no-repeat",
        });
        css.anim("spinner", { from: { opacity: 0 }, to: { opacity: 0.3 } });
        return css;
      }
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _interopRequireWildcard = function (obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _Node = __webpack_require__(43);
      var _Node2 = _interopRequireWildcard(_Node);
      var _Text = __webpack_require__(44);
      var _Text2 = _interopRequireWildcard(_Text);
      var _Style = __webpack_require__(45);
      var _Style2 = _interopRequireWildcard(_Style);
      var _Element = __webpack_require__(53);
      var _Element2 = _interopRequireWildcard(_Element);
      var _parse2 = __webpack_require__(59);
      var _parse3 = _interopRequireWildcard(_parse2);
      exports["default"] = build;
      exports.Node = _Node2["default"];
      exports.Text = _Text2["default"];
      exports.Element = _Element2["default"];
      exports.Style = _Style2["default"];
      exports.style = style;
      function build(sel) {
        for (
          var _len = arguments.length,
            children = Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          children[_key - 1] = arguments[_key];
        }
        var _parse = _parse3["default"](sel);
        var tag = _parse.tag;
        var attrs = _parse.attrs;
        var el = new _Element2["default"](tag);
        if (isProperties(children[0])) {
          var props = children.shift();
          for (var i in props) {
            var prop = props[i];
            switch (i) {
              case "class":
                if (null != attrs["class"]) {
                  attrs["class"] += " " + prop;
                } else {
                  attrs["class"] = prop;
                }
                break;
              case "classes":
                var classes = props.classes;
                if (classes && "object" == typeof classes) {
                  for (var c in classes) {
                    if (!prop[c]) continue;
                    if (null != attrs["class"]) {
                      attrs["class"] += " " + c;
                    } else {
                      attrs["class"] = c;
                    }
                  }
                } else {
                  attrs[i] = prop;
                }
                break;
              default:
                attrs[i] = prop;
            }
          }
        }
        if (attrs) el.set(attrs);
        if (children) el.add(children);
        return el;
      }
      build.style = style;
      function isProperties(obj) {
        return (
          obj &&
          "object" == typeof obj &&
          !Array.isArray(obj) &&
          !(obj instanceof _Node2["default"])
        );
      }
      function style() {
        return new _Style2["default"]();
      }
    },
    function (module, exports) {
      "use strict";
      var _classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var Node = function Node() {
        _classCallCheck(this, Node);
      };
      exports["default"] = Node;
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _interopRequireWildcard = function (obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      };
      var _classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      var _createClass = (function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      var _get = function get(object, property, receiver) {
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);
          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;
          if (getter === undefined) {
            return undefined;
          }
          return getter.call(receiver);
        }
      };
      var _inherits = function (subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (superClass) subClass.__proto__ = superClass;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _Node2 = __webpack_require__(43);
      var _Node3 = _interopRequireWildcard(_Node2);
      var Text = (function (_Node) {
        function Text(value) {
          _classCallCheck(this, Text);
          _get(Object.getPrototypeOf(Text.prototype), "constructor", this).call(
            this
          );
          this._value = value;
        }
        _inherits(Text, _Node);
        _createClass(Text, [
          {
            key: "value",
            value: function value() {
              return this._value;
            },
          },
          {
            key: "toHTML",
            value: function toHTML() {
              return this.value();
            },
          },
        ]);
        return Text;
      })(_Node3["default"]);
      exports["default"] = Text;
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _interopRequireWildcard = function (obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      };
      var _classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      var _createClass = (function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      var _get = function get(object, property, receiver) {
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);
          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;
          if (getter === undefined) {
            return undefined;
          }
          return getter.call(receiver);
        }
      };
      var _inherits = function (subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (superClass) subClass.__proto__ = superClass;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _Sheet = __webpack_require__(46);
      var _Sheet2 = _interopRequireWildcard(_Sheet);
      var _Text = __webpack_require__(44);
      var _Text2 = _interopRequireWildcard(_Text);
      var _Element2 = __webpack_require__(53);
      var _Element3 = _interopRequireWildcard(_Element2);
      var Style = (function (_Element) {
        function Style() {
          var _this = this;
          _classCallCheck(this, Style);
          _get(
            Object.getPrototypeOf(Style.prototype),
            "constructor",
            this
          ).call(this, "style");
          this.sheet = new _Sheet2["default"]();
          {
            var text = new _Text2["default"]();
            text.value = function () {
              return _this.sheet.serialize();
            };
            this.children.push(text);
          }
        }
        _inherits(Style, _Element);
        _createClass(Style, [
          {
            key: "add",
            value: function add() {
              var _sheet;
              for (
                var _len = arguments.length, props = Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                props[_key] = arguments[_key];
              }
              (_sheet = this.sheet).add.apply(_sheet, props);
              return this;
            },
          },
          {
            key: "remove",
            value: function remove(dec) {
              this.sheet.remove(dec);
              return this;
            },
          },
          {
            key: "anim",
            value: function anim(name, frames) {
              return this.sheet.anim(name, frames);
            },
          },
          {
            key: "media",
            value: function media(params) {
              return this.sheet.media(params);
            },
          },
        ]);
        return Style;
      })(_Element3["default"]);
      exports["default"] = Style;
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _interopRequire = function (obj) {
        return obj && (obj["default"] || obj);
      };
      var Sheet = _interopRequire(__webpack_require__(51));
      var Block = _interopRequire(__webpack_require__(49));
      var Scope = _interopRequire(__webpack_require__(48));
      var Media = _interopRequire(__webpack_require__(47));
      var Animation = _interopRequire(__webpack_require__(52));
      var Ruleset = _interopRequire(__webpack_require__(50));
      exports = module.exports = Sheet;
      exports.Block = Block;
      exports.Scope = Scope;
      exports.Media = Media;
      exports.Animation = Animation;
      exports.Ruleset = Ruleset;
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _inherits = function (child, parent) {
        child.prototype = Object.create(parent && parent.prototype, {
          constructor: {
            value: child,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (parent) child.__proto__ = parent;
      };
      var _interopRequire = function (obj) {
        return obj && (obj["default"] || obj);
      };
      var Scope = _interopRequire(__webpack_require__(48));
      var Media = function Media(params) {
        Scope.call(this);
        this.params = params;
      };
      _inherits(Media, Scope);
      Media.prototype.serialize = function () {
        return (
          "@media " +
          this.params +
          " {\n  " +
          Scope.prototype.serialize.call(this) +
          "\n}"
        );
      };
      module.exports = Media;
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _inherits = function (child, parent) {
        child.prototype = Object.create(parent && parent.prototype, {
          constructor: {
            value: child,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (parent) child.__proto__ = parent;
      };
      var _interopRequire = function (obj) {
        return obj && (obj["default"] || obj);
      };
      var Block = _interopRequire(__webpack_require__(49));
      var Ruleset = _interopRequire(__webpack_require__(50));
      var Scope = function Scope() {
        this.children = [];
      };
      _inherits(Scope, Block);
      Scope.prototype.add = function (sel, decs) {
        if (sel instanceof Block) {
          this.children.push(sel);
        } else {
          var rule = new Ruleset(sel, decs);
          this.children.push(rule);
        }
        return this;
      };
      Scope.prototype.remove = function (dec) {
        this.children = this.children.filter(function (v) {
          return dec == v;
        });
      };
      Scope.prototype.serialize = function () {
        return this.children
          .map(function (child) {
            return child.serialize();
          })
          .join("");
      };
      module.exports = Scope;
    },
    function (module, exports) {
      "use strict";
      var Block = function Block() {};
      module.exports = Block;
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _inherits = function (child, parent) {
        child.prototype = Object.create(parent && parent.prototype, {
          constructor: {
            value: child,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (parent) child.__proto__ = parent;
      };
      var _interopRequire = function (obj) {
        return obj && (obj["default"] || obj);
      };
      var Block = _interopRequire(__webpack_require__(49));
      var Ruleset = function Ruleset(sel, decs) {
        this.sel = sel;
        this.decs = decs;
      };
      _inherits(Ruleset, Block);
      Ruleset.prototype.serialize = function () {
        var decs = this.decs;
        var str = "";
        for (var key in decs) {
          if (str.length) str += ";";
          str += "" + key + ":" + decs[key];
        }
        return "" + this.sel + "{" + str + "}";
      };
      module.exports = Ruleset;
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _inherits = function (child, parent) {
        child.prototype = Object.create(parent && parent.prototype, {
          constructor: {
            value: child,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (parent) child.__proto__ = parent;
      };
      var _interopRequire = function (obj) {
        return obj && (obj["default"] || obj);
      };
      var Scope = _interopRequire(__webpack_require__(48));
      var Media = _interopRequire(__webpack_require__(47));
      var Animation = _interopRequire(__webpack_require__(52));
      var Sheet = function Sheet() {
        if (Scope) {
          Scope.apply(this, arguments);
        }
      };
      _inherits(Sheet, Scope);
      Sheet.prototype.anim = function (name, frames, serializePrefixes) {
        var anim = new Animation(name, serializePrefixes);
        for (var i in frames) {
          anim.add(i, frames[i]);
        }
        this.add(anim);
        return anim;
      };
      Sheet.prototype.media = function (params) {
        var _media = new Media(params);
        this.add(_media);
        return _media;
      };
      module.exports = Sheet;
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _inherits = function (child, parent) {
        child.prototype = Object.create(parent && parent.prototype, {
          constructor: {
            value: child,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (parent) child.__proto__ = parent;
      };
      var _interopRequire = function (obj) {
        return obj && (obj["default"] || obj);
      };
      var Scope = _interopRequire(__webpack_require__(48));
      var prefixes = ["-webkit", "-moz", "-o"];
      var Animation = function Animation(name, serializePrefixes) {
        if (serializePrefixes === undefined) serializePrefixes = true;
        Scope.call(this);
        this.name = name;
        this.serializePrefixes = serializePrefixes;
      };
      _inherits(Animation, Scope);
      Animation.prototype.serialize = function () {
        var _this = this;
        var css =
          "@keyframes " +
          this.name +
          "{" +
          Scope.prototype.serialize.call(this) +
          "}";
        if (this.serializePrefixes) {
          prefixes.forEach(function (p) {
            css +=
              "@" +
              p +
              "-keyframes " +
              _this.name +
              "{" +
              Scope.prototype.serialize.call(_this) +
              "}";
          });
        }
        return css;
      };
      module.exports = Animation;
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _interopRequireWildcard = function (obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      };
      var _classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      var _createClass = (function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      var _get = function get(object, property, receiver) {
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);
          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;
          if (getter === undefined) {
            return undefined;
          }
          return getter.call(receiver);
        }
      };
      var _inherits = function (subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (superClass) subClass.__proto__ = superClass;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _Text = __webpack_require__(44);
      var _Text2 = _interopRequireWildcard(_Text);
      var _Node2 = __webpack_require__(43);
      var _Node3 = _interopRequireWildcard(_Node2);
      var _voidTags = __webpack_require__(55);
      var _voidTags2 = _interopRequireWildcard(_voidTags);
      var _flatten = __webpack_require__(54);
      var _flatten2 = _interopRequireWildcard(_flatten);
      var _parseCSS = __webpack_require__(57);
      var _parseCSS2 = _interopRequireWildcard(_parseCSS);
      var _ClassList = __webpack_require__(58);
      var _ClassList2 = _interopRequireWildcard(_ClassList);
      var Element = (function (_Node) {
        function Element(tagName, isVoid) {
          _classCallCheck(this, Element);
          _get(
            Object.getPrototypeOf(Element.prototype),
            "constructor",
            this
          ).call(this);
          this.name = tagName;
          if (null != isVoid) {
            this["void"] = isVoid;
          } else {
            this["void"] = null != _voidTags2["default"][tagName];
          }
          this.style = {};
          this.classList = new _ClassList2["default"]();
          this.children = [];
          this.props = {};
        }
        _inherits(Element, _Node);
        _createClass(Element, [
          {
            key: "add",
            value: function add() {
              var _this = this;
              for (
                var _len = arguments.length, children = Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                children[_key] = arguments[_key];
              }
              _flatten2["default"](children)
                .filter(function (v) {
                  return null != v && "boolean" != typeof v;
                })
                .map(function (v) {
                  if ("string" == typeof v || "number" == typeof v) {
                    return new _Text2["default"](String(v));
                  } else {
                    return v;
                  }
                })
                .forEach(function (v) {
                  return _this.children.push(v);
                });
              return this;
            },
          },
          {
            key: "set",
            value: function set(prop, val) {
              if ("object" == typeof prop) {
                for (var key in prop) {
                  this.set(key, prop[key]);
                }
              } else {
                if ("text" == prop) {
                  this.add(null == val ? "" : val);
                } else if ("style" == prop && val) {
                  if ("object" == typeof val) {
                    this.style = val;
                  } else {
                    this.style = _parseCSS2["default"](val);
                  }
                } else if ("class" == prop) {
                  var cl = this.classList;
                  var add = cl.add.bind(cl);
                  val.split(/\s+/).forEach(add);
                } else {
                  if (val == null || val === false) {
                    delete this.props[prop];
                  } else {
                    this.props[prop] = val;
                  }
                }
              }
              return this;
            },
          },
          {
            key: "attrs",
            value: (function (_attrs) {
              function attrs() {
                return _attrs.apply(this, arguments);
              }
              attrs.toString = function () {
                return _attrs.toString();
              };
              return attrs;
            })(function () {
              var attrs = this.props;
              if (!empty(this.style)) {
                attrs.style = toCSS(this.style);
              } else {
                delete attrs.style;
              }
              if (this.classList.length) {
                attrs["class"] = this.classList.toString();
              } else {
                delete attrs["class"];
              }
              return attrs;
            }),
          },
          {
            key: "toHTML",
            value: function toHTML() {
              var tag = this.name.toLowerCase();
              var html = "<" + tag;
              var attrs = this.attrs();
              for (var key in attrs) {
                if (attrs.hasOwnProperty(key)) {
                  html += " " + key + "=" + JSON.stringify(attrs[key]);
                }
              }
              html += ">";
              var contentLength = 0;
              this.children.forEach(function (el) {
                var add = el.toHTML();
                contentLength += add.length;
                html += add;
              });
              if (contentLength || !this["void"]) {
                html += "</" + tag + ">";
              }
              return html;
            },
          },
        ]);
        return Element;
      })(_Node3["default"]);
      exports["default"] = Element;
      function empty(obj) {
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            return false;
          }
        }
        return true;
      }
      function toCSS(obj) {
        var css = "";
        for (var k in obj) {
          if (css.length) css += ";";
          css += "" + k + ":" + obj[k];
        }
        return css;
      }
      module.exports = exports["default"];
    },
    function (module, exports) {
      var flatten = function (array, result, depth) {
        depth--;
        for (var i = 0; i < array.length; i++) {
          if (depth > -1 && Array.isArray(array[i])) {
            flatten(array[i], result, depth);
          } else {
            result.push(array[i]);
          }
        }
        return result;
      };
      module.exports = function (array, depth) {
        if (depth < 1) {
          return Array.prototype.slice.call(array);
        }
        return flatten(array, [], depth || Infinity);
      };
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      var _interopRequireWildcard = function (obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _voidElements = __webpack_require__(56);
      var _voidElements2 = _interopRequireWildcard(_voidElements);
      var tags = {};
      _voidElements2["default"].forEach(function (el) {
        tags[el] = 1;
      });
      exports["default"] = tags;
      module.exports = exports["default"];
    },
    function (module, exports) {
      module.exports = [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "keygen",
        "link",
        "menuitem",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
      ];
    },
    function (module, exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = parse;
      var wraps = { "(": ")", '"': '"', "'": "'" };
      function parse(css) {
        var ret = {};
        var key = "";
        var val = undefined;
        var wrap = undefined;
        for (var i = 0; i < css.length; i++) {
          var chr = css[i];
          if (null == val) {
            if (":" !== chr) {
              if (!/\s/.test(chr)) {
                key += chr;
              }
            } else {
              val = "";
            }
          } else {
            if (null == wrap) {
              if (wraps.hasOwnProperty(chr)) {
                wrap = wraps[chr];
              }
            } else {
              if (chr === wrap && "\\" !== css[i - 1]) {
                wrap = null;
              }
            }
            if (wrap || ";" !== chr) {
              val += chr;
            }
            if (!wrap && (";" === chr || i + 1 === css.length)) {
              ret[key] = val.trim();
              key = "";
              val = null;
            }
          }
        }
        return ret;
      }
      module.exports = exports["default"];
    },
    function (module, exports) {
      "use strict";
      var _classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      var _createClass = (function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      var ClassList = (function () {
        function ClassList() {
          _classCallCheck(this, ClassList);
          this.value = [];
        }
        _createClass(ClassList, [
          {
            key: "add",
            value: function add(c) {
              c = ("" + c).trim();
              if (c.length && !this.contains(c)) {
                this.value.push(c);
                updateLength(this);
              }
            },
          },
          {
            key: "remove",
            value: function remove(c) {
              if (this.contains(c)) {
                this.value.splice(this.value.indexOf(c), 1);
                updateLength(this);
              }
            },
          },
          {
            key: "item",
            value: function item(i) {
              return this.value[i];
            },
          },
          {
            key: "toggle",
            value: function toggle(c) {
              var force = arguments[1] === undefined ? null : arguments[1];
              if (null == force) {
                if (this.contains(c)) {
                  this.remove(c);
                } else {
                  this.add(c);
                }
              } else {
                this[force ? "add" : "remove"](c);
              }
            },
          },
          {
            key: "contains",
            value: function contains(c) {
              return !!~this.value.indexOf(c);
            },
          },
          {
            key: "toString",
            value: function toString() {
              return this.value.join(" ");
            },
          },
        ]);
        return ClassList;
      })();
      exports["default"] = ClassList;
      function updateLength(cl) {
        cl.length = cl.value.length;
      }
      module.exports = exports["default"];
    },
    function (module, exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = parse;
      function parse(str) {
        var pieces = str.replace(/^</, "").replace(/>$/, "").split(/\s+/);
        var _parseTag = parseTag(pieces.shift());
        var tag = _parseTag.tag;
        var classes = _parseTag.classes;
        var id = _parseTag.id;
        var attrs = parseAttrs(pieces.join(" "));
        if (null != id) attrs.id = id;
        if (classes.length || null != attrs["class"]) {
          attrs["class"] =
            classes.join(" ") + (null == attrs["class"] ? "" : attrs["class"]);
        }
        return { tag: tag, attrs: attrs };
      }
      function parseTag(str) {
        var ret = {};
        var tag = str.match(/^[^\.#]+/);
        var id = str.match(/#([^\.#]+)/);
        var classes = str.match(/\.([^\.#]+)/g);
        tag = tag ? tag[0] : "div";
        id = id ? id[1] : null;
        classes = classes || [];
        classes = classes.map(function (v) {
          return v.substr(1);
        });
        return { tag: tag, id: id, classes: classes };
      }
      function parseAttrs(str) {
        var attrs = {};
        var key = undefined,
          val = undefined,
          stop = undefined;
        for (var i = 0; i < str.length; i++) {
          var chr = str[i];
          if (null == val) {
            if (null == key) key = "";
            if ("=" == chr) {
              val = "";
            } else if (/\s/.test(chr)) {
              if (key.length) {
                attrs[key] = true;
                key = null;
              }
            } else {
              key += chr;
            }
          } else {
            var stopped = undefined;
            if (!stop) {
              if (/['"]/.test(chr)) {
                stop = new RegExp(chr);
              } else {
                stop = /\s/;
                val += chr;
              }
            } else {
              stopped = stop.test(chr);
              if (!stopped) val += chr;
            }
            if (stopped || i + 1 == str.length) {
              attrs[key] = val;
              key = val = stop = null;
            }
          }
        }
        if (null != key) attrs[key] = true;
        return attrs;
      }
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = spinner;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _vd = __webpack_require__(42);
      var _vd2 = _interopRequireDefault(_vd);
      function spinner(data) {
        data = data || {};
        var w = data.width || 70;
        var iw = (w * 0.33) | 0;
        var bs = { style: { width: "" + iw + "px", height: "" + iw + "px" } };
        var div = (0, _vd2["default"])(
          ".spinner",
          { style: { width: "" + w + "px" } },
          (0, _vd2["default"])("span.bounce.bounce-1", bs),
          (0, _vd2["default"])("span.bounce.bounce-2", bs),
          (0, _vd2["default"])("span.bounce.bounce-3", bs),
          style()
        );
        return div;
      }
      var css = undefined;
      function style() {
        if (css) return css;
        css = _vd2["default"].style();
        css.add(".spinner", { "text-align": "center" });
        css.add(
          ".bounce",
          prefix({
            "text-align": "center",
            "border-radius": "100%",
            display: "inline-block",
            "background-color": "#fff",
            animation: "bounce 1.4s infinite ease-in-out",
            "animation-fill-mode": "both",
          })
        );
        css.anim("bounce", {
          "0%, 80%, 100%": {
            transform: "scale(0,0)",
            "-webkit-transform": "scale(0,0)",
          },
          "40%": { transform: "scale(1.0)", "-webkit-transform": "scale(1.0)" },
        });
        css.add(".bounce-1", prefix({ "animation-delay": "-0.32s" }));
        css.add(".bounce-2", prefix({ "animation-delay": "-0.16s" }));
        return css;
      }
      function prefix(props) {
        for (var k in props) {
          if (/^animation/.test(k)) {
            props["-webkit-" + k] = props[k];
          }
        }
        return props;
      }
      module.exports = exports["default"];
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = format;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _timecodeutils = __webpack_require__(62);
      var _timecodeutils2 = _interopRequireDefault(_timecodeutils);
      function format(n) {
        var s = Math.round(n * 100) / 100;
        var fmt = _timecodeutils2["default"].secondsToTC(s);
        fmt = fmt.replace(/^00:/, "");
        fmt = fmt.replace(/^0(\d)/, "$1");
        return fmt;
      }
      module.exports = exports["default"];
    },
    function (module, exports) {
      var TimecodeUtils;
      TimecodeUtils = (function () {
        function TimecodeUtils() {}
        TimecodeUtils._pad = function (i) {
          if (i < 10) {
            return "0" + i;
          } else {
            return i;
          }
        };
        TimecodeUtils.secondsToTC = function (seconds) {
          var hours, mins, secs;
          if (seconds == null) {
            return void 0;
          }
          if (seconds === "") {
            return void 0;
          }
          if (seconds >= 0) {
            hours = this._pad(parseInt(seconds / (60 * 60), 10));
            seconds -= hours * 60 * 60;
            mins = this._pad(parseInt(seconds / 60, 10));
            secs = this._pad(parseInt(seconds % 60, 10));
            return "" + hours + ":" + mins + ":" + secs;
          } else {
            return void 0;
          }
        };
        TimecodeUtils.TCToSeconds = function (tc) {
          var hours, matches, mins, secs, tcregex;
          tcregex = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
          if (typeof tc !== "string") {
            return void 0;
          }
          matches = tc.match(tcregex);
          if (matches != null) {
            hours = parseInt(matches[1], 10);
            mins = parseInt(matches[2], 10);
            secs = parseInt(matches[3], 10);
            return hours * 60 * 60 + mins * 60 + secs;
          } else {
            return void 0;
          }
        };
        return TimecodeUtils;
      })();
      module.exports = TimecodeUtils;
    },
    function (module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports["default"] = converting;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _vd = __webpack_require__(42);
      var _vd2 = _interopRequireDefault(_vd);
      function converting(_ref) {
        var _ref$title = _ref.title;
        var title = _ref$title === undefined ? "Untitled" : _ref$title;
        var width = _ref.width;
        var height = _ref.height;
        var bgurl = _ref.bgurl;
        var progress = _ref.progress;
        var mw = width - (width <= 450 ? 120 : 250);
        var div = (0, _vd2["default"])(
          ".converting",
          {
            classes: { minimal: width <= 450 },
            style: { width: "" + width + "px", height: "" + height + "px" },
          },
          bgurl &&
            (0, _vd2["default"])(".bg", {
              style: { "background-image": "url(" + bgurl + ")" },
            }),
          (0, _vd2["default"])(
            ".title",
            (0, _vd2["default"])(
              ".conversion",
              (0, _vd2["default"])(
                "span.text",
                progress === 100
                  ? "Conversion complete!"
                  : "\n          Please wait.\n          We are converting this video\n        "
              ),
              " ",
              progress &&
                (0, _vd2["default"])("span.progress", "(" + progress + "%)")
            ),
            title &&
              (0, _vd2["default"])(
                "span",
                { style: { "max-width": "" + mw + "px" } },
                title
              ),
            progress &&
              (0, _vd2["default"])(".title-bar", {
                style: { width: "" + progress + "%" },
              })
          ),
          style()
        );
        return div;
      }
      var css = undefined;
      function style() {
        if (css) return css;
        var css = _vd2["default"].style();
        css.add(".converting", {
          "background-color": "#000",
          "font-family": "Helvetica Neue, Helvetica, Arial",
        });
        css.add(".converting", { position: "relative", overflow: "hidden" });
        css.add(".bg", {
          position: "absolute",
          top: "-50px",
          left: "-50px",
          right: "-50px",
          bottom: "-50px",
          "background-size": "cover",
          filter: "blur(15px)",
          "-webkit-filter": "blur(15px)",
        });
        css.add(".converting .title", {
          height: "32px",
          "line-height": "32px",
          "vertical-align": "middle",
          "font-size": "12px",
          padding: "0 14px",
          background: "rgba(0,0,0,.7)",
          position: "relative",
        });
        css.add(".converting .title-bar", {
          display: "block",
          content: '" "',
          position: "absolute",
          left: 0,
          bottom: "-2px",
          "border-bottom": "2px solid rgba(255,255,255,.7)",
          "box-shadow": "0 0 3px rgba(0,0,0,.7)",
          transition: "width 100ms ease-out",
        });
        css.add(".converting .title span", {
          color: "#fff",
          display: "inline-block",
          overflow: "hidden",
          "text-overflow": "ellipsis",
          "white-space": "nowrap",
        });
        css.add(".conversion", {
          float: "right",
          "font-size": "10px",
          "font-family": "Helvetica, Arial",
        });
        css.add(".conversion span", { color: "rgba(255,255,255,.68)" });
        css.add(".converting.minimal .conversion .text", { display: "none" });
        css.add(".converting.minimal .conversion .progress:before", {
          display: "inline",
          content: '"Converting "',
        });
        return css;
      }
      module.exports = exports["default"];
    },
  ]);
});
