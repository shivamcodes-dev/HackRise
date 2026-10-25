const axios = require("axios");

async function testJudge0() {
  try {
    const response = await axios.post(
      "https://ce.judge0.com/submissions/batch?base64_encoded=false",
      {
        submissions: [
          {
            language_id: 54,
            source_code: `#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}`,
            stdin: "2 3",
            expected_output: "5",
          },
          {
            language_id: 62,
            source_code: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.print(a + b);
    }
}`,
            stdin: "2 3",
            expected_output: "5",
          },
          {
            language_id: 102,
            source_code: `const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\\s+/);
console.log(Number(input[0]) + Number(input[1]));`,
            stdin: "2 3",
            expected_output: "5",
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
      },
    );

    console.log("Judge0 API Response:");
    console.log(response.data);
  } catch (error) {
    console.error("Judge0 Error:", error.response?.data || error.message);
  }
}

testJudge0();
