var MyLib = MyLib || {};

(function () {
    "use strict";

    MyLib.Routes = function (r) {
        var root   = r? MyLib.URL.trimSlash(r) : "/",
            routes = [],
            fin    = {};

        var HrefClickHandler = function (link, r) {
            return function (e) {
                e.preventDefault();

                r.navigate(link.href, null, null);
            };
        };

        fin.setRootPath = function (newRoot) {
            root = newRoot;
        };

        fin.getCurrentPath = function () {
            var path = '';

            path = MyLib.URL.trimSlash(location.pathname);
            path = path.replace(/\?(.*)$/, '');
            path = root != '/' ? path.replace(root, ''): path;

            return MyLib.URL.trimSlash(path);
        };

        fin.add = function (pattern, handler) {
            routes.push({'pattern': pattern, 'handler': handler});
            return this;
        };

        fin.remove = function (pattern) {
            var i   = 0,
                len = routes.length,
                r;
            for (i = 0; i < len; i += 1) {
                r = routes[i].pattern.toString();
                if (r === pattern.toString()) {
                    routes.splice(i, 1);
                    return this;
                }
            }

            return this;
        };

        fin.reset = function () {
            routes = [];
            root   = ''
        };

        fin.run = function (url) {
            var path = url || this.getCurrentPath(),
                i    = 0,
                len  = routes.length,
                match;

            path = MyLib.URL.trimSlash(path);

            for (i = 0; i < len; i += 1) {
                match = path.match(routes[i].pattern);
                if (match) {
                    match.shift();
                    routes[i].handler.apply({}, match);

                    return this;
                }
            }

            return this;
        };

        fin.navigate = function (path, title, state) {
            path = MyLib.URL.trimSlash(MyLib.URL.getPathName(path));
            this.run(path);

            history.pushState(state, title, "/" + root + "/" + path);
        };

        fin.init = function () {
            var links = document.querySelectorAll("a"),
                i     = 0, 
                len   = links.length,
                that  = this,
                link;

            for (i = 0; i < len; i += 1) {
                link = links[i];

                link.addEventListener("click", HrefClickHandler(link, that));
            }

            window.onpopstate = function (e) {
                that.run(location.href);
            };
        };

        if (root !== "/") {
            var rootRegExp = root + "$";
            fin.add(new RegExp(rootRegExp, "i"), function () {
                var routeSpan = document.querySelector("#route");

                routeSpan.innerHTML = "/" + root + "/";
                console.log("Root: " + root);
            });
        }

        return fin;
    };
})(MyLib);