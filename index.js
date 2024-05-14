document.addEventListener("DOMContentLoaded", function () {
  const perPage = 10; // Number of items per page
  let currentPage = 1;
  let totalPages = 1;

  const cryptoContainer = document.getElementById("crypto-container");
  const prevPageBtn = document.getElementById("prevPageBtn");
  const nextPageBtn = document.getElementById("nextPageBtn");

  function fetchData(page) {
    fetch(
      `https://api.coinranking.com/v2/coins?limit=${perPage}&offset=${
        (page - 1) * perPage
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        cryptoContainer.innerHTML = ""; // Clear previous data

        const coins = data.data.coins;
        coins.forEach((crypto) => {
          const cryptoCard = document.createElement("div");
          cryptoCard.classList.add("crypto-card");

          const cryptoName = document.createElement("div");
          cryptoName.classList.add("crypto-name");
          cryptoName.textContent = crypto.name;

          const cryptoSymbol = document.createElement("div");
          cryptoSymbol.classList.add("crypto-symbol");
          cryptoSymbol.textContent = `Symbol: ${crypto.symbol}`;

          const cryptoPrice = document.createElement("div");
          cryptoPrice.classList.add("crypto-price");
          cryptoPrice.textContent = `Price: $${crypto.price}`;

          const cryptoMarketCap = document.createElement("div");
          cryptoMarketCap.classList.add("crypto-market-cap");
          cryptoMarketCap.textContent = `Market Cap: $${crypto.marketCap}`;

          const cryptoChange = document.createElement("div");
          cryptoChange.classList.add("crypto-change");
          cryptoChange.textContent = `24h Change: ${crypto.change}%`;

          cryptoCard.appendChild(cryptoName);
          cryptoCard.appendChild(cryptoSymbol);
          cryptoCard.appendChild(cryptoPrice);
          cryptoCard.appendChild(cryptoMarketCap);
          cryptoCard.appendChild(cryptoChange);

          cryptoContainer.appendChild(cryptoCard);
        });

        totalPages = Math.ceil(data.data.stats.total / perPage);
        updatePaginationButtons();
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function updatePaginationButtons() {
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
  }

  prevPageBtn.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      fetchData(currentPage);
    }
  });

  nextPageBtn.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      fetchData(currentPage);
    }
  });

  // Fetch data for the initial page
  fetchData(currentPage);
});
