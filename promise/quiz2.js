async function asyncF() {
    console.log(1);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(2);
        resolve();
      }, 0);
    });
    console.log(3);
  }
  
  console.log(4);
  asyncF();
  console.log(5);

  //41523

//先執行 console.log(4);
//執行asyncF();
//印出1 發現awiat 要有promise執行結果才會進行下一步 setTimeout丟給暗樁 跳出
//再印出5
//做setTimeout的暗樁好了 印出2 接著才印出3
//所以結果為41523
