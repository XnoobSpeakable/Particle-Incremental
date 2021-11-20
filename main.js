let x = 0
let y = 1
let uprunning = 0

function upfunction() {
    setInterval(() => {
        x = x + y
        document.getElementById("counter").textContent = x
        uprunning = 1
    }, 1000);
}


function callup() {
    if(uprunning == 0) {
      upfunction()  
    }
}

function incy() {
    y++
}