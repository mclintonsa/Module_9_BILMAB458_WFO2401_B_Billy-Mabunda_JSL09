// Fetch Unsplash API
const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
const unsplashData = await res.json()
document.body.style.backgroundImage = `url(${unsplashData.urls.regular})`
document.getElementById("author").textContent = `By: ${unsplashData.user.name}`

// Fetch CoinGecko API
const coinGeckoRes = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
if (!coinGeckoRes.ok) {
    throw Error("Something went wrong")
}
const coingeckoData = await coinGeckoRes.json()
document.getElementById("crypto-top").innerHTML = `
    <img src=${coingeckoData.image.small} />
    <span>${coingeckoData.name}</span>
`
document.getElementById("crypto").innerHTML += `
    <p>🎯: $${coingeckoData.market_data.current_price.usd}</p>
    <p>👆: $${coingeckoData.market_data.high_24h.usd}</p>
    <p>👇: $${coingeckoData.market_data.low_24h.usd}</p>
`

// Get current time
function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" })
}
setInterval(getCurrentTime, 1000)

// Fetch OpenWeatherMap API
navigator.geolocation.getCurrentPosition(async position => {
    const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
    if (!res.ok) {
        throw Error("Weather data not available")
    }
    const weatherData = await res.json()
    const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    document.getElementById("weather").innerHTML = `
        <img src=${iconUrl} />
        <p class="weather-temp">${Math.round(weatherData.main.temp)}º</p>
        <p class="weather-city">${weatherData.name}</p>
    `
}, err => console.error(err))