fetch("http://localhost:5000/api/balance/adjust", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDEyNmY2NmI1NDMyYmM1YWRkMmYyMyIsInVzZXJuYW1lIjoib3Bpc2lzIiwiaWF0IjoxNzMyMzcxMjg3LCJleHAiOjE3MzIzODIwODd9.mb85j8rTpdY1YwzteS69Z6xCpaRBSzSjUr7eDiizPQU",
  },
  body: JSON.stringify({
    amount: 10000,
    currency: "UZS", // yoki "USD"
    type: "income", // yoki "expense"
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("Adjusted Balance:", data))
  .catch((error) => console.error("Error:", error));
