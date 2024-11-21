fetch(
  "http://localhost:5000/api/transactions?type=expense&startDate=2024-11-01&endDate=2024-11-30&payment=cash",
  {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2Y5ZWFkZjdjYjMyMjQ3MDY3NTAzMSIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczMjIyMzA5NSwiZXhwIjoxNzMyMjMzODk1fQ.0Mfg-ttADi-qVw1zo6cnpQFNY5wpaDBJvKdLcxpiWAg",
    },
  }
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
