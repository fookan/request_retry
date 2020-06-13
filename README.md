# 概要
axiosでのリクエストをリトライする処理を実装   
実装したパターンは以下の３つ
1. whileで指定回数リトライする
2. promisを利用してリトライする
3. axios-retryを利用してリトライする

# 使用方法
1. サーバーを立ちあげる。 PORT=3020 npm start
2. 確認したい処理のjsファイルを実行する。例： node retry_while.js

## 注意点
axios-retryは、requireしたaxiosで、axios.postとすると上手くいかなかった。  
リトライのたびに、axiosをcreateしてエラーとなる。  
１回のリトライの度に過去に失敗したリトライ回数分（正確に数えてないが）、上記のエラーが発生している。 

