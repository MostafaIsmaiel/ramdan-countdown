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

let city = $('#city-list'),
    prayList = $("#pray-list");

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

// Add event listner
city.on('change', function () {
    prayList.html(`<div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>`);
    getPrayerTime();
});
