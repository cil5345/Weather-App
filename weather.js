
let timer = moment().format("MMM Do YY");
$("#timer").text(timer)

let cityHistory = []
let lastCityInput = JSON.parse(localStorage.getItem("cityHistory"));

console.log(lastCityInput)
if (lastCityInput !== null) {
    cityHistory = lastCityInput;
}

function loadSearchHistory() {
    $(".list-group").empty();
    for (let i = 0; i < cityHistory.length; i++) {
        let cityList = $("<li>")
        cityList.addClass("list-group-item");
        cityList.text(cityHistory[i]);
        $(".list-group").prepend(cityList);
    }
}

loadSearchHistory();

console.log(cityHistory)
// magnify button to search for weather
$("#search-button").on("click", function (event) {
    event.preventDefault();
    // console.log("click")

    let cityInput = $("#city-input").val()
    let apiKey = "f51dbc2519fac64bc97a239cb843f0ae"
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + cityInput + "&units=imperial&appid=" + apiKey;
    let fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=Imperial&appid=" + apiKey;
    // console.log(cityInput)
    // console.log(queryURL)

    cityHistory.push(cityInput)
    loadSearchHistory();
    console.log(cityHistory)

    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));


    // ===================== main card ============================================

    // $("#city-input").empty()
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        let city = $("<h2>").text(response.name)
        let temperature = response.main.temp;
        let humidity = response.main.humidity
        let wind = (response.wind.speed)
        let iconcode = response.weather[0].icon
        let iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";

        // console.log(response)

        $("#wicon").attr("src", iconURL);
        $(".city").html(city);
        $(".temp").html("<span>Temperature : " + temperature + " &#8457" + "</span>");
        $(".humidity").html("Humidity: " + humidity + "%" + "</span>");
        $(".wind").html("Windspeed: " + wind + "</span>");
    });

    // ===================== main card ============================================
    // ===================== 5 day card ============================================

    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
    }).then(function ({ list }) {

        let weatherDiv = $("#fiveDayDiv");
        weatherDiv.empty();

        for (let i = 0; i < list.length; i = i + 8) {
            const temp = list[i + 5];
            let fiveDayTemperature = temp.main.temp;
            let fiveDayHumidity = temp.main.humidity;
            let fiveDayIconCode = list[i].weather[0].icon
            let fiveDayIconURL = "http://openweathermap.org/img/w/" + fiveDayIconCode + ".png";
            let divItem =
                `<div class="card fivedaycard"  style="width: 10rem; height: 14rem;">
                            <div class="card-body fivedaycardcolor">
                                <h5 class="card-title">${moment.unix(temp.dt).format('l')}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${"temp: " + fiveDayTemperature + "&#8457"}</h6>
                                <div id="icon"><img id="wiconfiveday" src="${fiveDayIconURL}" alt="Weather icon"></div>
                                <p class="card-text">${"Humidity " + fiveDayHumidity + "%"}<p>
                            </div>
                        </div>`
            weatherDiv.append(divItem);


        }



        // ===================== 5 day card ============================================




    });

});

// ==============================INITIAL START PAGE OF PHILADELPHIA==================================

let apiKey = "f51dbc2519fac64bc97a239cb843f0ae"
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=philadelphia&units=imperial&appid=" + apiKey;
let fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=philadelphia&units=Imperial&appid=" + apiKey;
// console.log(cityInput)

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {

    let city = $("<h2>").text(response.name)
    let temperature = response.main.temp;
    let humidity = response.main.humidity
    let wind = (response.wind.speed)

    let iconcode = response.weather[0].icon
    let iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";

    // console.log(response)

    $("#wicon").attr("src", iconURL);
    $(".city").html(city);
    $(".temp").html("<span>Temperature : " + temperature + " &#8457" + "</span>");
    $(".humidity").html("Humidity: " + humidity + "%" + "</span>");
    $(".wind").html("Windspeed: " + wind + "</span>");
});






$.ajax({
    url: fiveDayQueryURL,
    method: "GET"
}).then(function ({ list }) {

    let weatherDiv = $("#fiveDayDiv");
    weatherDiv.empty();
    console.log(list)


    // console.log(list[0].weather[0].icon)

    for (let i = 0; i < list.length; i = i + 8) {
        const temp = list[i + 5];
        let fiveDayTemperature = temp.main.temp;
        let fiveDayHumidity = temp.main.humidity;
        let fiveDayIconCode = list[i].weather[0].icon
        let fiveDayIconURL = "http://openweathermap.org/img/w/" + fiveDayIconCode + ".png";
        let divItem =
            `<div class="card fivedaycard"  style="width: 10rem; height: 14rem;">
                        <div class="card-body fivedaycardcolor">
                            <h5 class="card-title">${moment.unix(temp.dt).format('l')}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${"temp: " + fiveDayTemperature + "&#8457"}</h6>
                            <div id="icon"><img id="wiconfiveday" src="${fiveDayIconURL}" alt="Weather icon"></div>
                            <p class="card-text">${"Humidity " + fiveDayHumidity + "%"}<p>
                        </div>
                    </div>`
        weatherDiv.append(divItem);

    }








});

