(function () {
    "use strict";

    var root      = "/routing/",
        route     = MyLib.Routes(root),
        routeSpan = document.querySelector("#route");

    routeSpan.innerHTML = location.pathname;

    route.add(/profile\/(.*)/, function (pid) {
        routeSpan.innerHTML = root + "profile";
        console.log("Profile ID: " + pid);
    });

    route.add(/options\/(.*)/, function (type) {
        routeSpan.innerHTML = root + "options/";
        console.log("Option type: " + type);
    });

    route.add(/dashboard/, function () {
        routeSpan.innerHTML = root + "dashboard/";
        console.log("DASHBOARD");
    });

    route.add(/logout/, function () {
        routeSpan.innerHTML = root + "logout/";
        console.log("LOGOUT");
    });

    route.init();
})();
