fetch("http://localhost:5000/api/categories/6741ca5ec144c83eac901f33", {
  method: "DELETE",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDEyNmY2NmI1NDMyYmM1YWRkMmYyMyIsInVzZXJuYW1lIjoib3Bpc2lzIiwiaWF0IjoxNzMyMzU2OTI5LCJleHAiOjE3MzIzNjc3Mjl9.Y4N2hBW_XULSZ4ujz0ml-bSSb2wN0ckT0PDO4X2QcvI",
  },
})
  .then((response) => response.json())
  .then((data) => console.log("Category Deleted:", data))
  .catch((error) => console.error("Error:", error));
