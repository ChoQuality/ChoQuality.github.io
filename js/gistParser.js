window.onload = function () {
    var t = this;
    const userInfo = JSON.parse(document.getElementById("data").text);
    console.log("User information: %o", userInfo);
};