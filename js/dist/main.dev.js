"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

$(document).ready(function () {
  // Calculation ramadan count down
  (function () {
    var remainingTimeElement = $(".container-remainingTime"),
        todayGeorgianDate = moment(),
        todayHijiriFormat = todayGeorgianDate.format("iYYYY/iM/iD"),
        todayHijiriDate = moment(todayHijiriFormat, "iYYYY/iM/iD"),
        thisHijiriYear = parseInt(todayGeorgianDate.format("iYYYY")),
        ramadanDate = moment("".concat(thisHijiriYear, "/9/1"), "iYYYY/iM/iD"),
        daysInRamadan = ramadanDate.daysInMonth(),
        diff = todayHijiriDate.diff(ramadanDate, "days");

    if (diff >= 0) {
      if (diff <= daysInRamadan) {
        $(".container-text").addClass('container--duringRamdan');
        diff = daysInRamadan - diff;
      } else {
        var nextHijiriYear = thisHijiriYear + 1;
        ramadanDate = moment("".concat(nextHijiriYear, "/9/1"), "iYYYY/iM/iD");
        diff = todayHijiriDate.diff(ramadanDate, "days");
      }
    }

    remainingTimeElement.text(Math.abs(diff).toLocaleString("ar-sa"));
  })(); // variables


  var city = $('#city-list'),
      prayList = $("#pray-list"),
      imsak = $('#imsak'),
      imsakOverLay = $('#over-lay'),
      imsakClose = $('#imsak-close'),
      imsakBtn = $('#imsak-btn'),
      morningAzkar = $('#morning-azkar'),
      morningAzkarOverlay = $('#morning-azkar-overlay'),
      morningAzkarClose = $('#morning-azkar-close'),
      morningAzkarBtn = $('#morning-azkar-btn'),
      morningAzkarList = $('#morning-azkar-list'),
      eveningAzkar = $('#evening-azkar'),
      eveningAzkarOverlay = $('#evening-azkar-overlay'),
      eveningAzkarClose = $('#evening-azkar-close'),
      eveningAzkarBtn = $('#evening-azkar-btn'),
      eveningAzkarList = $('#evening-azkar-list'); // Fetch prayer times

  function getPrayerTime() {
    var today = new Date().toISOString().slice(0, 10);
    $.ajax({
      method: "GET",
      url: "https://api.pray.zone/v2/times/day.json?city=".concat(city.val(), "&date=").concat(today, "&school=2&timeformat=1"),
      success: function success(response, status, request) {
        var times = response.results.datetime[0].times;
        prayList.html("");

        for (var _i = 0, _Object$entries = Object.entries(times); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          if (key == 'Sunrise' || key == 'Sunset' || key == 'Midnight') {
            continue;
          }

          $("<li class='pray-info'>\n                <p class='pray-name'>".concat(key, "</p>\n                <p class='pray-time'>").concat(value, "</p>\n                </li>")).appendTo(prayList);
        }
      },
      error: function error(request, status, _error) {
        console.log(request);
        console.log(status);
        console.log(_error);
      }
    });
  }

  ; // Fetch morning azkar

  function getMorningAzkar() {
    $.ajax({
      method: "GET",
      url: "json/azkar.json",
      success: function success(response, status, request) {
        for (var i = 0; i <= response.length - 1; i += 1) {
          if (response[i].category !== 'أذكار الصباح') {
            continue;
          } // console.log(response[i]);


          $("<li class=\"azkar-info\">\n                <p class='azkar-name'>".concat(response[i].zekr, "</p>\n                <p class='azkar-count'>Count: \" ").concat(response[i].count, " \"</p>\n                </li>")).appendTo(morningAzkarList);
        }
      }
    });
  }

  ;
  getMorningAzkar(); // Fetch evening azkar

  function getEveningAzkar() {
    $.ajax({
      method: "GET",
      url: "json/azkar.json",
      success: function success(response, status, request) {
        for (var i = 0; i <= response.length - 1; i += 1) {
          if (response[i].category !== 'أذكار المساء') {
            continue;
          }

          $("<li class=\"azkar-info\">\n                <p class='azkar-name'>".concat(response[i].zekr, "</p>\n                <p class='azkar-count'>Count: \" ").concat(response[i].count, " \"</p>\n                </li>")).appendTo(eveningAzkarList);
        }
      }
    });
  }

  ;
  getEveningAzkar(); // Add event listner

  city.on('change', function () {
    prayList.html("<div class=\"spinner-border\" role=\"status\">\n  <span class=\"sr-only\">Loading...</span>\n</div>");
    getPrayerTime();
  }); // Fade out/in ramdan imsak

  imsakBtn.on('click', function () {
    imsak.css({
      opacity: "1",
      visibility: 'visible'
    });
    $('html').css('overflow', 'hidden');
  });
  imsakClose.on('click', function () {
    imsak.css({
      opacity: "0",
      visibility: 'hidden'
    });
    $('html').css('overflow', 'unset');
  });
  imsakOverLay.on('click', function () {
    imsak.css({
      opacity: "0",
      visibility: 'hidden'
    });
    $('html').css('overflow', 'unset');
  }); // Fade out/in morning azkar

  morningAzkarBtn.on('click', function () {
    morningAzkar.css({
      opacity: "1",
      visibility: 'visible'
    });
    $('html').css('overflow', 'hidden');
  });
  morningAzkarClose.on('click', function () {
    morningAzkar.css({
      opacity: "0",
      visibility: 'hidden'
    });
    $('html').css('overflow', 'unset');
  });
  morningAzkarOverlay.on('click', function () {
    morningAzkar.css({
      opacity: "0",
      visibility: 'hidden'
    });
    $('html').css('overflow', 'unset');
  }); // Fade out/in evening azkar

  eveningAzkarBtn.on('click', function () {
    eveningAzkar.css({
      opacity: "1",
      visibility: 'visible'
    });
    $('html').css('overflow', 'hidden');
  });
  eveningAzkarClose.on('click', function () {
    eveningAzkar.css({
      opacity: "0",
      visibility: 'hidden'
    });
    $('html').css('overflow', 'unset');
  });
  eveningAzkarOverlay.on('click', function () {
    eveningAzkar.css({
      opacity: "0",
      visibility: 'hidden'
    });
    $('html').css('overflow', 'unset');
  });
});