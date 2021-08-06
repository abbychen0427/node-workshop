let doWork = function (job, timer, isOK) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
        resolve(`完成工作: ${job} at ${dt.toISOString()}`);
      } else {
        reject(`${job}失敗`);
      }
    }, timer);
  });
};
let job1 = doWork("刷牙", 3000, true);
job1
  .then((resolve) => {
    console.log("第 1 個 then", resolve);
    return doWork("吃早餐", 3000, true);
  })
  .then((resolve) => {
    console.log("第 2 個 then", resolve);
    return doWork("寫功課", 5000, false);
  })
  .then((resolve) => {
    console.log("第 3 個 then", resolve);
    return doWork("買午餐", 2000, true);
  })
  .then((resolve) => {
    console.log("第 4 個 then", resolve);
    return doWork("吃午餐", 4000, true);
  })
  .catch((reject) => {
    // 捕捉上面所有的錯誤
    console.log("計劃趕不上變化", reject);
  })
  .finally(() => {
    // 無論成功或失敗都會在這裡
    console.log("一天結束");
  });
