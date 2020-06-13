/**
 * promiseを利用したリトライ処理
 */
const axios = require('axios');
const retryFunc = async (input, retryCount) => {
  return new Promise((resolve, reject) => {
    console.log(` # retryCount:${retryCount}`);
    axios
      .post('http://localhost:3000/update', { id: input })
      .then((res) => {
        console.log(`      > [${input}] RESOLVE`);
        resolve(res);
      })
      .catch((err) => {
        console.log(`   > [${input}] RETRY(${retryCount}) ${err.message}`);
        if (retryCount === 0) {
          console.log(`      > [${input}] REJECT`);
          reject(err);
        } else {
          console.log(`      > [${input}] RETRY`);
          retryFunc(input, retryCount - 1).then((result) => resolve(result)).catch((err2) => reject(err2));
        }
      });
  });
};

const main = async () => {
  const loop = 5;
  const retry = 3;
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
  console.log('*** END ERROR', err);
  process.exit(0);
});
