let x = 0
let y = 1
function upfunction()
{
setInterval(() => {
    x++
    document.getElementById("counter").textContent = x
    console.log(x)
}, 1000);
}
