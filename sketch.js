var x = 0
let y = 1
console.log("let is now var")
function upfunction()
{
setInterval(() => {
    x++
    document.getElementById("counter").textContent = x
    console.log(x)
}, 1000);
}
