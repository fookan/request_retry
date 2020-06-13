/**
 * axios-retryを使ったリトライ処理
 */

const axios = require('axios');
const axiosRetry = require('axios-retry');

const retryFunc = async (input, retry) => {
  const client = axios.create();
  const data = {
    id: input,
  };
  axiosRetry(client, {
    retries: retry,
    retryCondition: (error)  => {
      console.log('\t> CATCH ERROR');
      if (error.response && error.response.status) {
        if (error.response.status >= 500) {
          console.log('\t\t> RETRY');
          return true;
        }
      }
      return false;
    },
  });
  return await client.post('http://localhost:3020/update', data);
};

const main = async () => {
  const loop = 5;
  const retry = 1;
  for (let i = 0; i < loop; i += 1) {
    console.log(`*** [${i}]`);
    try {
      const { data: result } = await retryFunc(i, retry);
      console.log(`   --> [${i}] SUCCESS: ${result}`);
    } catch(err) {
      console.log(`   --> [${i}] ERROR: ${err.message}`);
    }
  }
};

main().then(() => {
    process.exit(0);
}).catch((err) => {
    console.log('*** END ERROR');
    console.log(err);
    process.exit(0);
});
