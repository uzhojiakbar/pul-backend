fetch("http://localhost:5000/api/categories", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2Y5ZWFkZjdjYjMyMjQ3MDY3NTAzMSIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczMjIyMzA5NSwiZXhwIjoxNzMyMjMzODk1fQ.0Mfg-ttADi-qVw1zo6cnpQFNY5wpaDBJvKdLcxpiWAg",
  },
  body: JSON.stringify({
    name: "Transport xarajatlari",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("New Category:", data))
  .catch((error) => console.error("Error:", error));
