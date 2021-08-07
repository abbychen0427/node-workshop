
// 請問下列程式碼印出的順序為何？

function syncF() {
    console.log(1);
  
    setTimeout(() => {
      console.log(2);
    }, 0);
    console.log(3);
  }
  
  console.log(4);
  syncF();
  console.log(5);

//41352

//先執行 console.log(4);
//執行syncF();
//印出1 setTimeout丟給暗樁 印出3
//再印出5
//做setTimeout的暗樁好了 印出2
//所以結果為41352
