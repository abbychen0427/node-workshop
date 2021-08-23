function processStockDay(stockCode, rawData) {
  //allData.data
  return formattedData = rawData.map((item)=>{
    //去掉逗號
    item = item.map((value) => {
      return value.replace(/,/g, "");
    });
    //日期去掉/轉變為數字 再加上19110000
    item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;
    //在陣列最前面加上代碼資料
    item.unshift(stockCode);
    console.log(item);
    return item;
  })
}

module.exports = {
  processStockDay,
}