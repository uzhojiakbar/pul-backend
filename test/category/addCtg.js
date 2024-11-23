fetch("http://localhost:5000/api/categories", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDEyNmY2NmI1NDMyYmM1YWRkMmYyMyIsInVzZXJuYW1lIjoib3Bpc2lzIiwiaWF0IjoxNzMyMzcxMjg3LCJleHAiOjE3MzIzODIwODd9.mb85j8rTpdY1YwzteS69Z6xCpaRBSzSjUr7eDiizPQU",
  },
  body: JSON.stringify({
    name: "Food",
    type: "expense", // or "expense"
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("New Category:", data))
  .catch((error) => console.error("Error:", error));
