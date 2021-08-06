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
//async await 語法糖 才是人讀的code
async function allDayRoutine() {
  //對false要報錯還是得用try catch
  try {
    let resolve1 = await doWork("刷牙", 3000, true);
    console.log(resolve1);
    let resolve2 = await doWork("吃早餐", 3000, true);
    console.log(resolve2);
    let resolve3 = await doWork("寫功課", 5000, false);
    console.log(resolve3);
    let resolve4 = await doWork("買午餐", 2000, true);
    console.log(resolve4);
    let resolve5 = await doWork("吃午餐", 4000, true);
    console.log(resolve5);
  } catch (reject) {
    console.log("計劃趕不上變化", reject);
  }
}

allDayRoutine();
