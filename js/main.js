// Calculation ramadan count down
(function () {
    let remainingTimeElement = $(".container-remainingTime"),
        todayGeorgianDate = moment(),
        todayHijiriFormat = todayGeorgianDate.format("iYYYY/iM/iD"),
        todayHijiriDate = moment(todayHijiriFormat, "iYYYY/iM/iD"),
        thisHijiriYear = parseInt(todayGeorgianDate.format("iYYYY")),
        ramadanDate = moment(`${thisHijiriYear}/9/1`, "iYYYY/iM/iD"),
        daysInRamadan = ramadanDate.daysInMonth(),
        diff = todayHijiriDate.diff(ramadanDate, "days");

    if (diff >= 0) {
        if (diff <= daysInRamadan) {
            $(".container-text").addClass('container--duringRamdan');
            diff = daysInRamadan - diff;
        } else {
            let nextHijiriYear = thisHijiriYear + 1;

            ramadanDate = moment(`${nextHijiriYear}/9/1`, "iYYYY/iM/iD");
            diff = todayHijiriDate.diff(ramadanDate, "days");
        }
    }

    remainingTimeElement.text(Math.abs(diff).toLocaleString("ar-sa"));
})();

// variables
let city = $('#city-list'),
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
    eveningAzkarList = $('#evening-azkar-list');



// Fetch prayer times
function getPrayerTime() {
    const today = new Date().toISOString().slice(0, 10);

    $.ajax({
        method: "GET",
        url: `https://api.pray.zone/v2/times/day.json?city=${city.val()}&date=${today}&school=2&timeformat=1`,
        success: function (response, status, request) {
            const times = response.results.datetime[0].times;
            prayList.html("");
            for (let [key, value] of Object.entries(times)) {
                if (key == 'Sunrise' || key == 'Sunset' || key == 'Midnight') {
                    continue;
                }
                $(`<li class='pray-info'>
                <p class='pray-name'>${key}</p>
                <p class='pray-time'>${value}</p>
                </li>`).appendTo(prayList);
            }
        },
        error: function (request, status, error) {
            console.log(request);
            console.log(status);
            console.log(error);
        },
    });
};

// Fetch morning azkar
function getMorningAzkar() {
    $.ajax({
        method: "GET",
        url: "json/azkar.json",
        success: function (response, status, request) {
            for (let i = 0; i <= response.length - 1; i += 1) {
                if (response[i].category !== 'أذكار الصباح') {
                    continue;
                }
                // console.log(response[i]);
                $(`<li class="azkar-info">
                <p class='azkar-name'>Zekr: ${response[i].zekr}</p>
                <p class='azkar-count'>Count: " ${response[i].count} "</p>
                </li>`).appendTo(morningAzkarList);
            }
        }
    });
};
getMorningAzkar();

// Fetch evening azkar
function getEveningAzkar() {
    $.ajax({
        method: "GET",
        url: "json/azkar.json",
        success: function (response, status, request) {
            for (let i = 0; i <= response.length - 1; i += 1) {
                if (response[i].category !== 'أذكار المساء') {
                    continue;
                }
                console.log(response[i]);
                $(`<li class="azkar-info">
                <p class='azkar-name'>Zekr: ${response[i].zekr}</p>
                <p class='azkar-count'>Count: " ${response[i].count} "</p>
                </li>`).appendTo(eveningAzkarList);
            }
        }
    });
};
getEveningAzkar();

// Auto fade out
(function autoFadOut() {
    imsak.fadeOut(0);
    morningAzkar.fadeOut(0);
    eveningAzkar.fadeOut(0);
})();


// Add event listner

city.on('change', function () {
    prayList.html(`<div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>`);
    getPrayerTime();
});

// Fade out/in ramdan imsak
imsakBtn.on('click', function () {
    imsak.fadeIn();
    $('html').css('overflow', 'hidden');
});

imsakClose.on('click', function () {
    imsak.fadeOut();
    $('html').css('overflow', 'unset');

});

imsakOverLay.on('click', function () {
    imsak.fadeOut();
    $('html').css('overflow', 'unset');

});


// Fade out/in morning azkar
morningAzkarBtn.on('click', function () {
    morningAzkar.fadeIn();
    $('html').css('overflow', 'hidden');
});

morningAzkarClose.on('click', function () {
    morningAzkar.fadeOut();
    $('html').css('overflow', 'unset');

});

morningAzkarOverlay.on('click', function () {
    morningAzkar.fadeOut();
    $('html').css('overflow', 'unset');

});

// Fade out/in evening azkar
eveningAzkarBtn.on('click', function () {
    eveningAzkar.fadeIn();
    $('html').css('overflow', 'hidden');
});

eveningAzkarClose.on('click', function () {
    eveningAzkar.fadeOut();
    $('html').css('overflow', 'unset');

});

eveningAzkarOverlay.on('click', function () {
    eveningAzkar.fadeOut();
    $('html').css('overflow', 'unset');

});
