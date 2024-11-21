// {
//     "date": "2024-11-21",
//     "category": "Food",
//     "amount": 500000,
//     "type": "expense",
//     "payment": "cash"
//   }

fetch("http://localhost:5000/api/transactions/add", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2Y5ZWFkZjdjYjMyMjQ3MDY3NTAzMSIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczMjIyMzA5NSwiZXhwIjoxNzMyMjMzODk1fQ.0Mfg-ttADi-qVw1zo6cnpQFNY5wpaDBJvKdLcxpiWAg",
  },
  body: JSON.stringify({
    date: "2024-11-21",
    category: "Food",
    amount: 500000,
    type: "expense",
    payment: "cash",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

//   {
//     "message": "Tranzaktsiya muvaffaqiyatli qo'shildi",
//     "transaction": {
//       "user": "63f9eadf7cb322470675031",
//       "date": "2024-11-21",
//       "category": "Food",
//       "amount": 500000,
//       "type": "expense",
//       "payment": "cash",
//       "_id": "63f9fda9e8d06e1234567890",
//       "__v": 0
//     }
//   }
