console.log("Hello World")

function sum(n){
    var total= 0;
    for(let i=0; i<=n; i++){
        total+= i;
    }
    return total;
}

console.log(sum(3));
console.log(sum(10));