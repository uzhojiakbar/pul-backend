fetch("http://localhost:5000/api/transactions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDEyNmY2NmI1NDMyYmM1YWRkMmYyMyIsInVzZXJuYW1lIjoib3Bpc2lzIiwiaWF0IjoxNzMyMzU2OTI5LCJleHAiOjE3MzIzNjc3Mjl9.Y4N2hBW_XULSZ4ujz0ml-bSSb2wN0ckT0PDO4X2QcvI",
  },
  body: JSON.stringify({
    category: "Transport xarajatlari",
    amount: 50000,
    description: "Taxi",
    type: "expense", // or "income"
    payment: "UZS", // UZS or USD
    typeMoney: "karta", // karta or naqt
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("New Transaction:", data))
  .catch((error) => console.error("Error:", error));
