// * Yuboriladigan malumot (json):
// {
//   username: "test",
//   password: "test",
// }

// * QAYTADIGAN MALUMOT:
// {
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2Y5ZWFkZjdjYjMyMjQ3MDY3NTAzMSIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTczMjIyMjY0OSwiZXhwIjoxNzMyMjMzNDQ5fQ.GmLiZwgfVef4Bcwr1V8dvlSREoA8rcV5y4umcPRez8E',
//   id: '673f9eadf7cb322470675031',
//   username: 'test'
// }

// * Chiqishi mumkun bolgan xatolar:

fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "test",
    password: "test",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
