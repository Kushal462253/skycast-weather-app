let btn = document.getElementById("searchBtn");
let cityInput = document.getElementById("cityInput");
let temprature = document.getElementById("temprature");
let cityname = document.getElementById("cityname");
let condition = document.getElementById("condition");
let icon = document.getElementById("icon");
let feelslike = document.getElementById("feelslike");

btn.addEventListener("click", () => {

    if (cityInput.value.trim() === "") {
        temprature.innerText = "Enter city name";
        return;
    }

    temprature.innerText = "Loading...";

    const api_key = `https://api.weatherapi.com/v1/current.json?key=e884e49500a94e69811163154241309&q=${cityInput.value}`

    fetch(api_key)
        .then(res => {
            if (!res.ok) {
                throw new Error("City not found");
            }
            return res.json();
        })
        .then(data => {

            console.log("Condition from API:", data.current.condition.text);

            cityname.innerText = data.location.name + ", " + data.location.country;
            temprature.innerText = "Temperature: " + data.current.temp_c + " °C";
            condition.innerText = "Condition: " + data.current.condition.text;
            feelslike.innerText = "Feels like: " + data.current.feelslike_c + " °C";
            icon.src = "https:" + data.current.condition.icon;

            let weather = data.current.condition.text.toLowerCase();

            if (weather.includes("rain")) {
                document.body.style.backgroundImage =
                    "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1600&q=80')";
            }
            else if (weather.includes("clear") || weather.includes("sun")) {
                document.body.style.backgroundImage =
                    "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80')"
            }
            else if (weather.includes("cloud") || weather.includes("overcast")) {
                document.body.style.backgroundImage =
                    "url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=1600&q=80')"
                        }
            else if (weather.includes("fog") || weather.includes("mist")) {
                document.body.style.backgroundImage=
                    "url('https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80')"
            }
            else {
                document.body.style.backgroundImage =
                    "url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1600&q=80')";
}

            
        })
        .catch(() => {
            cityname.innerText = "";
            temprature.innerText = "City not found";
            condition.innerText = "";
            feelslike.innerText = "";
            icon.src = "";
        });
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btn.click();
    }
});