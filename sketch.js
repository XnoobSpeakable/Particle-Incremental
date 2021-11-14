LET x = 0
let y = 1
console.log("NOPE DIDNT HELP ")
function upfunction()
{
setInterval(() => {
    x++
    document.getElementById("counter").textContent = x
    console.log(x)
}, 1000);
}
