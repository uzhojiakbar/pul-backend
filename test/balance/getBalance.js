fetch("http://localhost:5000/api/balance", {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDEyNmY2NmI1NDMyYmM1YWRkMmYyMyIsInVzZXJuYW1lIjoib3Bpc2lzIiwiaWF0IjoxNzMyMzcxMjg3LCJleHAiOjE3MzIzODIwODd9.mb85j8rTpdY1YwzteS69Z6xCpaRBSzSjUr7eDiizPQU",
  },
})
  .then((response) => response.json())
  .then((data) => console.log("Balance:", data))
  .catch((error) => console.error("Error:", error));
