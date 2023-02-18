const apiKey = "48716ee51db928e8693f12b2a85f4f97"; 

		function getWeather() {
			const cityInput = document.getElementById("city-input");
			const city = cityInput.value;

			if (city.trim() === "") {
				alert("Please enter a city name.");
				return;
			}

			const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

			fetch(url)
				.then(response => response.json())
				.then(data => {
					const weatherCards = document.getElementById("weather-cards");
					weatherCards.innerHTML = "";

					for (let i = 0; i < data.list.length; i += 8) {
						const date = new Date(data.list[i].dt * 1000);
						const iconUrl = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`;
						const temp = Math.round(data.list[i].main.temp);
						const description = data.list[i].weather[0].description;

						const card = `
							<div class="card">
								<h3>${date.toDateString()}</h3>
								<img src="${iconUrl}" alt="${description}">
								<p>${temp} &deg;C</p>
                                <p>${description}</p>
							</div>
						`;
						weatherCards.innerHTML += card;
					}
				})
				.catch(error => {
					console.error(error);
					alert("Failed to get weather information. Please try again later.");
				});
		}
