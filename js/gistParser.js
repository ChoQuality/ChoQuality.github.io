window.onload = function () {
    const userInfo = JSON.parse(document.getElementById("data").text);
    console.log("User information: %o", userInfo);
};