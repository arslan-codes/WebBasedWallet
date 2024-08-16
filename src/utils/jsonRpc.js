export async function sendJsonRpcRequest(url, method, params) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: new Date().getTime(),
        method,
        params,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.result;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
}

// Test `sendJsonRpcRequest` utility
(async () => {
  try {
    const result = await sendJsonRpcRequest(
      "https://eth-mainnet.g.alchemy.com/v2/Xy4Y5_8R2ks3ytY6JeL4az8I4Z6w5Hj5",
      "eth_blockNumber",
      []
    );
    console.log("Test result:", result);
  } catch (error) {
    console.error("Test error:", error);
  }
})();
