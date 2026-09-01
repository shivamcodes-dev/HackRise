// const { default: axios } = require("axios");

// const getLanguageById = (lang) => {
//   const language = {
//     "c++": 54,
//     java: 62,
//     javascript: 102,
//   };
//   return language[lang.toLowerCase()];
// };

// const submitBatch = async (submissions) => {
//   const options = {
//     method: "POST",
//     url: "https://judge0-ce.p.repidadapi.com/submission/betch",
//     params: {
//       base64_encoded: "true",
//     },
//     headers: {
//       "x-rapidapi-key": "ab99c6ec42mshfd636ec7c6687efp1b9043jsna684835b0591",
//       "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//       "Content-Type": "application/json",
//     },
//     data: {
//       submissions,
//     },
//   };

//   async function fetchData() {
//     try {
//       const response = await axios.request(options);
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return await fetchData();
// };

// const submitToken = async (resultToken) => {
//   const option = {
//     method: "GET",
//     url: "https://judge0-ce.p.rapidapi.com/submissions/betch",
//     parsms: {
//       tokens: resultToken.join(","),
//       base64_encoded: "true",
//       fields: "*",
//     },
//     headers: {
//       "x-rapidapi-key": "ab99c6ec42mshfd63ec7c6687efp1b9043jsna684835b0591",
//       "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//     },
//   };

//   async function fetchData() {
//     try {
//       const response = await axios.request(options);
//       return response.data;
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   while (true) {
//     const result = await fetchData();

//     const IsResultObtained = result.submissions.every((r) => r.status_id > 2);
//     if (IsResultObtained) return result.submissions;
//     await waiting(1000);
//   }
// };

// const waiting = async (timer) => {
//   setTimeout(() => {
//     console.log("retrying");
//     return 1;
//   }, timer);
// };
// module.exports = {
//   getLanguageById,
//   submitBatch,
//   submitToken,
// };

const axios = require("axios");

const getLanguageById = (lang) => {
  const language = {
    "c++": 54,
    java: 62,
    javascript: 102,
  };

  return language[lang.toLowerCase()];
};

const submitBatch = async (submissions) => {
  try {
    const response = await axios.post(
      "https://ce.judge0.com/submissions/batch?base64_encoded=false",
      {
        submissions,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

const submitToken = async (resultToken) => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://ce.judge0.com/submissions/batch",
        {
          params: {
            tokens: resultToken.join(","),
            base64_encoded: "false",
            fields: "*",
          },
        },
      );

      return response.data;
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  while (true) {
    const result = await fetchData();

    if (!result || !result.submissions) {
      throw new Error("Invalid response from Judge0");
    }

    const isResultObtained = result.submissions.every((r) => r.status.id > 2);

    if (isResultObtained) {
      return result.submissions;
    }

    await waiting(1000);
  }
};

const waiting = (timer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("retrying");
      resolve();
    }, timer);
  });
};

module.exports = {
  getLanguageById,
  submitBatch,
  submitToken,
};
