function load() {
    if(localStorage.getItem('savefile') == null) {
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
            fracmult: 2,
            hundredoveris: 0.1,
            mbupcost: 50,
            mbmultcost: 1000
          };
        }
    else {
        sf = JSON.parse(localStorage.getItem('savefile'))
    }
}

load()

document.getElementById("counter").textContent = sf.num + " particles"

function buygen() {
        if(sf.firstgenbought == false) {
            sf.firstgenbought = true
            document.getElementById("divgencost").textContent = "Cost: " + sf.gencost
        }
        if(sf.firstgenbought == true) {
            if(sf.num >= sf.gencost) {
                sf.num -= sf.gencost
                sf.gencost *= 4
                sf.genmult++
                document.getElementById("divgencost").textContent = "Cost: " + sf.gencost
            }
        }
    }

function buybb() {
    if(sf.num >= sf.bbcost) {
        sf.num -= sf.bbcost
        sf.bbcost *= 2
        document.getElementById("divbbcost").textContent = "Cost: " + sf.bbcost
        sf.inc++
    }
}


function buyspeed() {
    if(sf.num >= sf.speedcost) {
        sf.num -= sf.speedcost
        sf.intervalspeed = 1000 / sf.fracmult
        sf.fracmult++
    }
}

function mbman() {
    sf.num += sf.mbinc * sf.mbmultv
    document.getElementById("counter").textContent = sf.num + " particles"
}

function mbup() {
    if(sf.num >= sf.mbupcost) {
        sf.num -= sf.mbupcost
        sf.mbupcost *= 2
        sf.mbinc += 1
        document.getElementById("divmbupcost").textContent = "Cost: " + sf.mbupcost
    }
}

function mbmult() {
    if(sf.num >= sf.mbmultcost) {
        sf.num -= sf.mbmultcost
        sf.mbmultcost *= 3
        sf.mbmultv += 1
        document.getElementById("divmbmultcost").textContent = "Cost: " + sf.mbmult
    }
}

setInterval(() => {
    if(sf.firstgenbought) {
            sf.hundredoveris = 100 / sf.intervalspeed
            sf.num += sf.inc * sf.genmult * sf.hundredoveris
            document.getElementById("counter").textContent = sf.num.toFixed(3) + " particles"
    }
  }, 100)

function save() {
    savefile = JSON.stringify(sf)
    localStorage.setItem('savefile', savefile)
}