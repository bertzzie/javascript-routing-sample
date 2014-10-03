(function () {
    "use strict";

    var route     = MyLib.Routes("/routing/"),
        routeSpan = document.querySelector("#route");

    routeSpan.innerHTML = location.pathname;

    route.add(/profile\/(.*)/, function (pid) {
        routeSpan.innerHTML = "/routing/profile";
        console.log("Profile ID: " + pid);
    });

    route.add(/options\/(.*)/, function (type) {
        routeSpan.innerHTML = "/routing/options/";
        console.log("Option type: " + type);
    });

    route.add(/dashboard/, function () {
        routeSpan.innerHTML = "/routing/dashboard/";
        console.log("DASHBOARD");
    });

    route.add(/logout/, function () {
        routeSpan.innerHTML = "/routing/logout/";
        console.log("LOGOUT");
    });

    route.init();
})();
