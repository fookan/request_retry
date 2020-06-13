/* 
 * リトライをwhileループで実装する
 */
const axios = require('axios');

const testFunc = async (input) => {
  let retry = 3;
  let result = false;
  while (retry > 0) {
    retry -= 1;
    try {
      const { data } = await axios.post('http://localhost:3000/update', { id: input });
      result = true;
      console.log(`*** [${input}] OK ${data}`);
      break;p
    } catch (err) {
      if (retry > 0) {
        console.log(`*** [${input}] RETRY(${retry}) ${err.message}`);
      } else {
        console.log(`*** [${input}] ERROR ${err.message}`);
      }
    }
  }
  return result;
};

const main = async () => {
  const loop = 10;
  
  for (let i = 1; i <= loop; i += 1) {
    console.log(`>>> [${i}]`);
    const result = await testFunc(i);
  }
};

main().then(() => {
  process.exit(0);
}).catch((err) => {
  console.log('*** END ERROR');
  console.log(err);    
  process.exit(0);
});
