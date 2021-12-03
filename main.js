let num = 0
let inc = 1
let speed = 1000
let speedup = 2

let uprunning = 0

function upfunction() {
    setInterval(() => {
        num += inc
        document.getElementById("counter").textContent = num + " particles"
    }, speed);
}


function callup() {
    if(uprunning == 0) {
        uprunning = 1
        upfunction()  
    }
}


function buybb() {
    if(num >= 2000) {
        num -= 2000
        inc++
    }
}

function buyspeed() {
    if(num >= 50) {
        num -= 50
        speed = 1000 / speedup
        speedup++
    }

}