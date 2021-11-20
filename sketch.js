let x = 0
let y = 1
let uprunning = 0
function callup()
{
    if(uprunning == 0)
    {
        function upfunction()
        {
            setInterval(() => {
                x++
                document.getElementById("counter").textContent = x
                console.log(x)
                uprunning = 1
            }, 1000);
        }
    }
}
