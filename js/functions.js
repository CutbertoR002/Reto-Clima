const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".secCiud .cities");
const apiKey = "4d8fb5b93d4af21d66a2948710284366";

form.addEventListener("submit", e => {
    e.preventDefault();
    var nombreciuda = input.value;
    const listItems = list.querySelectorAll(".secCiud .city");
    const listItemsArray = Array.from(listItems);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${nombreciuda}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
        const { main, name, sys, weather, coord} = data;
        const icon = `http://openweathermap.org/img/w/${weather[0]["icon"]}.png`;
        const li = document.createElement("tr");
        li.classList.add("city");
        const imp = `
        <td>
        <h2 class="city-name" data-name="${name},${sys.country}">
            <span>${name}</span>
            <br>
            <sup>${sys.country}</sup>
        </h2>
        </td>
        <td class="city-temp"><span >Temperatura: </span>${Math.round(main.temp)}<sup>°C</sup></td>
        <td class="city-press"><span>Sens. Ter: </span>${main.feels_like}<sup>°C</sup></div>
        <td class="city-press"><span>Presion At: </span>${main.pressure}<sup>hPa</sup></div>
        <td class="city-press"><span>Humedad: </span>${main.humidity}<sup>%</sup></div>
        <td class="city-temp"><span>Temp. Max: </span>${Math.round(main.temp_max)}<sup>°C</sup></td>
        <td class="city-press"><span>longitud: </span>${coord.lon}<sup>°</sup></td>
        <td class="city-press"><span>latitud: </span>${coord.lat}<sup>°</sup></td>
        <td>   
        <figure>
            <img class="city-icon" src="${icon}" alt="">
        <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
        </td>
        `;
        li.innerHTML = imp;
        list.appendChild(li);
    })
    .catch((error) => {
    console.log(error);
    });
});