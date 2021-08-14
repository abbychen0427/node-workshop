//建立一個模組

let brand = "義美";
let product = "小泡芙";
let flavor = "牛奶";
let price = "NT30";

function getBrand() {
  return brand;
}

function getName() {
  return product;
}

function getFlavor() {
  return flavor;
}

//不exports的話就會是隱藏的，想要套用模組的地方用不到
function getPrice() {
  return price;
}

//JS很心機1
//看到使用者創模組就會偷偷幫你預設空物件
//exports = module.exports = {}


//雖然輸出的為module.exports但用點的方式可以更改到原生物件
// exports.getBrand = getBrand;
// exports.getName = getName;
// exports.getFlavor = getFlavor;

//JS很心機2
//想整理成物件看起來比較舒服，但其實不行。
//因為這樣會創出一個新物件，而module.exports還會是老樣子腦袋空空沒有東西
// exports = {
//   getBrand,
//   getName,
//   getFlavor
// }

//所以如果還是要用漂亮東西，直接改module.exports也是可以的，雖然exports依舊是空的但是誰管你，畢竟出去的是module.exports
module.exports = {
  getBrand,
  getName,
  getFlavor
}

//JS最心機
//請注意：雖然是寫exports 但return的其實是module.exports
//return module.exports


