var MyLib = MyLib || {};

(function () {
	"use strict";

    MyLib.URL = {
        trimSlash: function (path) {
            return path.toString().replace(/\/$/, '').replace(/^\//, '');
        },
        getPathName: function (url) {
            var a  = document.createElement("a");
            a.href = url;

            return a.pathname;
        }
    };
})(MyLib);