!(function(n, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define(t)
    : (n.RGBaster = t());
})(this, function() {
  'use strict';
  var t = function(n, o) {
      var u = new Image(),
        t = n.src || n;
      'data:' !== t.substring(0, 5) && (u.crossOrigin = 'Anonymous'),
        (u.onload = function() {
          var n,
            t,
            e,
            r = ((n = u.width),
            (t = u.height),
            (e = document.createElement('canvas')).setAttribute('width', n),
            e.setAttribute('height', t),
            e.getContext('2d'));
          r.drawImage(u, 0, 0);
          var i = r.getImageData(0, 0, u.width, u.height);
          o && o(i.data);
        }),
        (u.src = t);
    },
    s = function(n) {
      return ['rgb(', n, ')'].join('');
    },
    f = function(n, t) {
      return { name: s(n), count: t };
    },
    n = {};
  return (
    (n.colors = function(n, u) {
      var a = (u = u || {}).exclude || [],
        c = u.paletteSize || 10;
      t(n, function(n) {
        for (var t = {}, e = '', r = [], i = 0; i < n.length; i += 4)
          (r[0] = n[i]),
            (r[1] = n[i + 1]),
            (r[2] = n[i + 2]),
            (e = r.join(',')),
            -1 === r.indexOf(void 0) &&
              0 !== n[i + 3] &&
              -1 === a.indexOf(s(e)) &&
              (t[e] = e in t ? t[e] + 1 : 1);
        if (u.success) {
          var o = (function(n, t) {
            if (n.length > t) return n.slice(0, t);
            for (var e = n.length - 1; e < t - 1; e++) n.push(f('0,0,0', 0));
            return n;
          })(
            (function(n) {
              var t = [];
              for (var e in n) t.push(f(e, n[e]));
              return (
                t.sort(function(n, t) {
                  return t.count - n.count;
                }),
                t
              );
            })(t),
            c + 1,
          );
          u.success({
            dominant: o[0].name,
            secondary: o[1].name,
            palette: o
              .map(function(n) {
                return n.name;
              })
              .slice(1),
          });
        }
      });
    }),
    n
  );
});
