"use strict";

window.onload = function () {
  updateIframe();
  setInterval(updateIframe, 15000);
};

/**
 * Updates webpage on a 15s interval if a new best stream is determined.
 */
function updateIframe() {
  var pin = document.getElementById("buttonPin").value;
  if (pin === "on") {
    return;
  }
  getJSON();
}

/**
 * Call API to get JSON from server.
 */
function getJSON() {
  var options = {
    url: "/all",
    method: "GET"
  };

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.response);
      var currentStream = document.getElementById("twitch_iframe").src;
      var topResult = data[0];
      var secondResult = data[1];
      console.log(currentStream);
      console.log(topResult);
      console.log(currentStream != topResult["stream_url"]);

      document.getElementById("streamer_name").innerHTML = topResult["stream_name"] + " - " + topResult["alive"];
      document.getElementById("next_closest").innerHTML = secondResult["stream_name"] + " - " + secondResult["alive"];

      if (currentStream !== topResult["stream_url"]) {
        document.getElementById("twitch_iframe").src = topResult["stream_url"];
      }
    }
  };
  xhr.open(options.method, options.url);
  xhr.send();
};

document.getElementById("buttonPin").addEventListener("click", function () {
  var element = document.getElementById("buttonPin");
  var pinned = element.value;
  if (pinned === "off") {
    element.value = "on";
    element.innerHTML = "Unpin Stream";
  } else {
    element.value = "off";
    element.innerHTML = "Pin Stream";
  }
});

/**
 * Apply colors to buttons
 * @param {int} a - value of a
 * @param {int} b - value of b
 * @param {int} c - value of c
 * @param {string} white - rgb for white
 * @param {string} green - rgb for green
 *  @param {string} abcColor - rgb for a,b,c
 * @param {array} buttonItems - array of buttons
 */
function changeButtonColor(a, b, c, white, green, abcColor, buttonItems) {
  if (a !== 255 && b !== 255 && c !== 255) {
    buttonItems[0].style.backgroundColor = green;
    buttonItems[0].style.color = abcColor;
    buttonItems[1].style.backgroundColor = green;
    buttonItems[2].style.backgroundColor = green;
    buttonItems[1].getElementsByTagName("a")[0].style.color = abcColor;
    buttonItems[2].getElementsByTagName("a")[0].style.color = abcColor;
  } else {
    buttonItems[0].style.backgroundColor = white;
    buttonItems[0].style.color = green;
    buttonItems[1].style.backgroundColor = white;
    buttonItems[2].style.backgroundColor = white;
    buttonItems[1].getElementsByTagName("a")[0].style.color = green;
    buttonItems[2].getElementsByTagName("a")[0].style.color = green;
  }
}

/**
 * Apply text color
 * @param {string} element - html element
 *  @param {string} color - color to change to
 */
function changeTextColor(element, color) {
  for (var i = 0; i < element.length; i++) {
    element[i].style.color = color;
  }
}

document.getElementById("myRange").addEventListener("input", function (evt) {
  var sliderValue = document.getElementById("myRange").value;
  // body and button text color
  var a = 255 * sliderValue / 100;
  var b = 255 * sliderValue / 100;
  var c = 255 * sliderValue / 100;
  // navbar and button - background,border color
  var a1 = 0 * sliderValue / 100;
  var b1 = 170 * sliderValue / 100;
  var c1 = 94 * sliderValue / 100;

  var white = "rgb(" + Math.floor(a1) + ",\n    " + Math.floor(b1) + ", " + Math.floor(c1) + ")";
  // original color is green
  var green = "rgb(" + Math.floor(a) + ", " + Math.floor(b) + ", " + Math.floor(c) + ")";

  var navbar = document.getElementById("navbar");
  var navbarLinks = navbar.getElementsByTagName("a");
  var about = document.getElementById("about");
  var contact = document.getElementById("contact");
  var buttons = document.getElementById("container__button");
  var buttonItems = buttons.getElementsByTagName("button");
  // buttonItems[1].getElementsByTagName("a")[0].style.color = green;
  // buttonItems[2].getElementsByTagName("a")[0].style.color = green;
  var contactUs = document.getElementById("contactUs");
  var contactLinks = contact.getElementsByTagName("a");

  document.body.style.backgroundColor = green;
  navbar.style.backgroundColor = white;
  navbar.style.border = white;
  navbar.style.color = green;
  about.style.backgroundColor = white;
  about.style.border = white;
  about.style.color = green;
  contact.style.color = white;
  contactUs.style.borderRight = "2px solid " + white;

  changeTextColor(contactLinks, white);
  changeTextColor(navbarLinks, green);
  changeButtonColor(a, b, c, "rgb(255, 255, 255)", "rgb(0, 170, 94)", white, buttonItems);
});