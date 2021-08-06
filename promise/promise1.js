let doWork = function (job, timer, isOK) {
    setTimeout(() => {
      let dt = new Date();
      if( isOK ){

      }
    //   cb(null, `完成工作: ${job} at ${dt.toISOString()}`);
    }, timer);
  };
let p = new Promise(resolve, reject);

//callback hell
//   let dt = new Date();
//   console.log(`開始工作 at ${dt.toISOString()}`);
//   doWork("刷牙", 3000, function(err, data){
//         if (err) {
//             console.error("發生錯誤:", err);
//         } else {
//             console.log(data);
//             doWork("洗臉", 3000, function(err, data){
//                 if(err){
//                     console.error("發生錯誤:", err);
//                 }else{
//                     console.log(data);
//                     doWork("吃早餐", 5000, function(err,data){
//                         if(err){
//                             console.error("發生錯誤:", err);
//                         }else{
//                             console.log(data);
//                         }
//                     })
//                 }
//             })
//         }
//   })