const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let cryptoData = [];

// Fetch Data Using .then
function fetchDataWithThen() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      cryptoData = data;
      renderTable(cryptoData);
    })
    .catch(error => console.error("Error fetching data with .then:", error));
}

// Fetch Data Using async/await
async function fetchDataWithAsyncAwait() {
  try {
    const response = await fetch(apiUrl);
    cryptoData = await response.json();
    renderTable(cryptoData);
  } catch (error) {
    console.error("Error fetching data with async/await:", error);
  }
}

// Render Data in Table
function renderTable(data) {
  const tableBody = document.getElementById("cryptoTable");
  tableBody.innerHTML = ""; // Clear previous data

  data.forEach(coin => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${coin.image}" alt="${coin.name}" width="30" /></td>
      <td>${coin.name}</td>
      <td>${coin.symbol}</td>
      <td>${coin.current_price}</td>
      <td>${coin.total_volume}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Search Functionality
function searchData() {
  const query = document.getElementById("search").value.toLowerCase();
  const filteredData = cryptoData.filter(coin =>
    coin.name.toLowerCase().includes(query)
  );
  renderTable(filteredData);
}

// Sort by Market Cap
function sortByMarketCap() {
  const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sortedData);
}

// Sort by Percentage Change
function sortByPercentageChange() {
  const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  renderTable(sortedData);
}

// Fetch data using your preferred method
fetchDataWithAsyncAwait(); // Or use fetchDataWithThen();
