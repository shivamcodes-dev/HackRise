const axios = require("axios");

async function runCode() {
  const res = await axios.post(
    "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
    {
      source_code: "print('Hello Shivam')",
      language_id: 71,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  console.log(res.data);
}

runCode();
