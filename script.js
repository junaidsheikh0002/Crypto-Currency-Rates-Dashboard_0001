document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "YOUR_API_KEY";
    const apiUrl = `http://api.coinlayer.com/api/live?access_key=${apiKey}`;
    const usdToPkrRate = 280; // Example conversion rate for USD to PKR (update this with a live rate if available)

    const cryptoDataContainer = document.getElementById("crypto-data");
    const searchInput = document.getElementById("search");

    // Fetch data from CoinLayer API
    async function fetchCryptoData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.success) {
                displayCryptoData(data.rates);
            } else {
                cryptoDataContainer.innerHTML = "<p>Failed to load data.</p>";
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            cryptoDataContainer.innerHTML = "<p>Error fetching data. Please try again later.</p>";
        }
    }

    // Display data on the dashboard
    function displayCryptoData(rates) {
        cryptoDataContainer.innerHTML = "";
        for (const [currency, rateInUsd] of Object.entries(rates)) {
            const rateInPkr = rateInUsd * usdToPkrRate;
            const cryptoItem = document.createElement("div");
            cryptoItem.classList.add("crypto-item");
            cryptoItem.innerHTML = `
                <h3>${currency}</h3>
                <p class="rate-usd">Rate in USD: $${rateInUsd.toFixed(2)}</p>
                <p class="rate-pkr">Rate in PKR: Rs ${rateInPkr.toFixed(2)}</p>
            `;
            cryptoDataContainer.appendChild(cryptoItem);
        }
    }

    // Filter functionality
    searchInput.addEventListener("input", function() {
        const query = searchInput.value.toLowerCase();
        const cryptoItems = document.querySelectorAll(".crypto-item");
        cryptoItems.forEach(item => {
            const currencyName = item.querySelector("h3").textContent.toLowerCase();
            if (currencyName.includes(query)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });

    // Fetch data on load
    fetchCryptoData();
});