function load() {
    if(localStorage.getItem('savefile') == "") {
        sf = {
            num: 0,
            inc: 1,
            mbinc: 1,
            firstgenbought: false,
            gencost: 1000,
            genmult: 1,
            mbmultv: 1,
            bbcost: 2000,
            speedcost: 50,
            intervalspeed: 1000,
            fracmult: 2
          };
        }
    else {
        sf = JSON.parse(localStorage.getItem('savefile'))
    }
}

load()

document.getElementById("counter").textContent = sf.num + " particles"

function run() {
    sf.num += sf.inc * sf.genmult
    document.getElementById("counter").textContent = sf.num + " particles"
}

function buygen() {
        if(sf.firstgenbought == false) {
            sf.firstgenbought = true
            var interval = setInterval(run, sf.intervalspeed);
            document.getElementById("divgencost").textContent = "Cost: " + sf.gencost
        }
        if(sf.firstgenbought == true) {
            if(sf.num >= sf.gencost) {
                sf.num -= sf.gencost
                sf.gencost *= 4
                clearInterval(interval)
                sf.genmult++
                document.getElementById("divgencost").textContent = "Cost: " + sf.gencost
                interval = setInterval(run, sf.intervalspeed);
            }
        }
    }

function buybb() {
    if(sf.num >= sf.bbcost) {
        sf.num -= sf.bbcost
        sf.bbcost *= 2
        document.getElementById("divbbcost").textContent = "Cost: " + sf.bbcost
        clearInterval(interval)
        sf.inc++
        interval = setInterval(run, sf.intervalspeed);
    }
}


function buyspeed() {
    if(sf.num >= sf.speedcost) {
        sf.num -= sf.speedcost
        clearInterval(interval)
        sf.intervalspeed = 1000 / sf.fracmult
        sf.interval = setInterval(run, sf.intervalspeed);
        sf.fracmult++
    }
}

function cheat() {
    sf.num += 1000
    document.getElementById("counter").textContent = sf.num + " particles"
}
/*
function mbman() {
    sf.num += sf.mbinc * sf.mbmultv
    document.getElementById("counter").textContent = sf.num + " particles"
}

function mbup() {

}

function mbmult() {

}*/

function save() {
    savefile = JSON.stringify(sf)
    localStorage.setItem('savefile', savefile)
}