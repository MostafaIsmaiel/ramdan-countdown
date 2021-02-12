"use strict";

(function () {
  var remainingTimeElement = document.querySelector('.container-remainingTime'),
      todayGeorgianDate = moment(),
      todayHijiriFormat = todayGeorgianDate.format('iYYYY/iM/iD'),
      todayHijiriDate = moment(todayHijiriFormat, 'iYYYY/iM/iD'),
      thisHijiriYear = parseInt(todayGeorgianDate.format('iYYYY')),
      ramadanDate = moment("".concat(thisHijiriYear, "/9/1"), 'iYYYY/iM/iD'),
      daysInRamadan = ramadanDate.daysInMonth(),
      diff = todayHijiriDate.diff(ramadanDate, 'days');

  if (diff >= 0) {
    if (diff <= daysInRamadan) {
      document.querySelector('.container').classList.add('.container--duringRamdan');
      diff = daysInRamadan - diff;
    } else {
      var nextHijiriYear = thisHijiriYear + 1;
      ramadanDate = moment("".concat(nextHijiriYear, "/9/1"), 'iYYYY/iM/iD');
      diff = todayHijiriDate.diff(ramadanDate, 'days');
    }
  }

  remainingTimeElement.textContent = Math.abs(diff).toLocaleString('ar-sa');
})();