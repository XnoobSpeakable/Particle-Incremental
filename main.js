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
            mbmultcost: 1000,
            gbunlocked: false,
            gbtl: 0,
            gbtlc: 10,
            gbm: 1,
            gbmc: 5,
            gbuptcost: 100,
            gbupmcost: 10000,
            alphaacccost: 1e+12,
            alphaaccelerators: 0,
            pchunks: 0,
            alphanum: 0,
            bangtime: 300,
            bangtimeleft: 1e+300,
            alphaacceleratorsleft: 0,
            alphainc: 1,
            tbcost: 1,
            tbmultiplier: 1
          };
        }
    else {
        sf = JSON.parse(localStorage.getItem('savefile'))
    }
}

function loadcut() {
    if(sf.firstgenbought == false) {
        document.getElementById("divgencost").textContent = "Cost: Free"
    }
    else {
        document.getElementById("divgencost").textContent = "Cost: " + sf.gencost
    }
    document.getElementById("divbbcost").textContent = "Cost: " + sf.bbcost
    document.getElementById("divmbupcost").textContent = "Cost: " + sf.mbupcost
    document.getElementById("divmbmultcost").textContent = "Cost: " + sf.mbmultcost
    if(sf.gbunlocked) {
        document.getElementById("divgenunlockcost").textContent = "Unlocked"
        document.getElementById("gbshow").style.display='block'
    }
    document.getElementById("divgbuptcost").textContent = "Cost: " + sf.gbuptcost
    document.getElementById("divalphaacceleratorcost").textContent = "Cost: " + sf.alphaacccost
    document.getElementById("divgbupmcost").textContent = "Cost: " + sf.gbupmcost
    document.getElementById("chunkamount").textContent = "Particle Chunks: " + sf.pchunks
    document.getElementById("divthreeboostcost").textContent = "Cost: " + sf.tbcost + " Alpha"
}

function openbase() {
    document.getElementById("Base").style.display='block'
    document.getElementById("Alpha").style.display='none'
    document.getElementById("Beta").style.display='none'
    document.getElementById("Gamma").style.display='none'
    document.getElementById("Delta").style.display='none'
    document.getElementById("Omega").style.display='none'
}

function openalpha() {
    document.getElementById("Base").style.display='none'
    document.getElementById("Alpha").style.display='block'
    document.getElementById("Beta").style.display='none'
    document.getElementById("Gamma").style.display='none'
    document.getElementById("Delta").style.display='none'
    document.getElementById("Omega").style.display='none'
}

function openbeta() {
    document.getElementById("Base").style.display='none'
    document.getElementById("Alpha").style.display='none'
    document.getElementById("Beta").style.display='block'
    document.getElementById("Gamma").style.display='none'
    document.getElementById("Delta").style.display='none'
    document.getElementById("Omega").style.display='none'
}

function opengamma() {
    document.getElementById("Base").style.display='none'
    document.getElementById("Alpha").style.display='none'
    document.getElementById("Beta").style.display='none'
    document.getElementById("Gamma").style.display='block'
    document.getElementById("Delta").style.display='none'
    document.getElementById("Omega").style.display='none'
}

function opendelta() {
    document.getElementById("Base").style.display='none'
    document.getElementById("Alpha").style.display='none'
    document.getElementById("Beta").style.display='none'
    document.getElementById("Gamma").style.display='none'
    document.getElementById("Delta").style.display='block'
    document.getElementById("Omega").style.display='none'
}

function openomega() {
    document.getElementById("Base").style.display='none'
    document.getElementById("Alpha").style.display='none'
    document.getElementById("Beta").style.display='none'
    document.getElementById("Gamma").style.display='none'
    document.getElementById("Delta").style.display='none'
    document.getElementById("Omega").style.display='block'
}

load()

loadcut() //costs, unlocks and texts (number text on page), makes saving smoother

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
                if(sf.gencost >= 1000000) {
                    document.getElementById("divgencost").textContent = "Cost: " + (sf.gencost / 1000000).toFixed(2) + " million"
                }
            }
        }
    }

function buybb() {
    if(sf.num >= sf.bbcost) {
        sf.num -= sf.bbcost
        sf.bbcost *= 2
        document.getElementById("divbbcost").textContent = "Cost: " + sf.bbcost
        if(sf.bbcost >= 1000000) {
            document.getElementById("divbbcost").textContent = "Cost: " + (sf.bbcost / 1000000).toFixed(2) + " million"
        }
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
    document.getElementById("counter").textContent = sf.num.toFixed(2) + " particles"
}

function mbup() {
    if(sf.num >= sf.mbupcost) {
        sf.num -= sf.mbupcost
        sf.mbupcost *= 2
        sf.mbinc += 1
        document.getElementById("divmbupcost").textContent = "Cost: " + sf.mbupcost
        if(sf.mbupcost >= 1000000) {
            document.getElementById("divmbupcost").textContent = "Cost: " + (sf.mbupcost / 1000000).toFixed(2) + " million"
        }
    }
}

function mbmult() {
    if(sf.num >= sf.mbmultcost) {
        sf.num -= sf.mbmultcost
        sf.mbmultcost *= 3
        sf.mbmultv += 1
        document.getElementById("divmbmultcost").textContent = "Cost: " + sf.mbmultcost
        if(sf.mbmultcost >= 1000000) {
            document.getElementById("divbbcost").textContent = "Cost: " + (sf.bbcost / 1000000).toFixed(2) + " million"
        }
    }
}

function unlockgeneratorboost() {
    if(sf.gbunlocked) {
        document.getElementById("divgenunlockcost").textContent = "Unlocked"
    }
    else {
        if(sf.num >= 5000) {
            sf.num -= 5000
            sf.gbunlocked = true
            document.getElementById("divgenunlockcost").textContent = "Unlocked"
            document.getElementById("gbshow").style.display='block'
        }
    }
}

function gbboost() {
    if(sf.gbunlocked) {
        sf.gbtl = sf.gbtlc
        document.getElementById("divgenboost").textContent = ""
    }
    else {
        document.getElementById("divgenboost").textContent = "Unlock Generator Boost first"
    }
}
function gbupt() {
    if(sf.gbunlocked) {
        if(sf.num >= sf.gbuptcost) {
            sf.num -= sf.gbuptcost
            sf.gbuptcost *= 5
            document.getElementById("divgbuptcost").textContent = "Cost: " + sf.gbuptcost
            if(sf.gbuptcost >= 1000000) {
                document.getElementById("divgbuptcost").textContent = "Cost: " + (sf.gbuptcost / 1000000).toFixed(2) + " million"
            }
            sf.gbtlc += 10
        }
    }
    else {
        document.getElementById("divgbuptcost").textContent = "Unlock Generator Boost first"
    }
}

function gbupm() {
    if(sf.gbunlocked) {
        if(sf.num >= sf.gbupmcost) {
            sf.num -= sf.gbupmcost
            sf.gbupmcost *= 5
            document.getElementById("divgbupmcost").textContent = "Cost: " + sf.gbupmcost
            if(sf.gbupmcost >= 1000000) {
                document.getElementById("divgbupmcost").textContent = "Cost: " + (sf.gbupmcost / 1000000).toFixed(2) + " million"
            }
            sf.gbmc += 5
        }
    }
    else {
        document.getElementById("divgbupmcost").textContent = "Unlock Generator Boost first"
    }
}

function alphaacc() {
    if(sf.bangtimeleft > 0 && sf.bangtimeleft < sf.bangtime) {
        document.getElementById("divalphaacceleratorcost").textContent = "Bang in progress, try again later"
    }
    else {
        if(sf.num >= sf.alphaacccost) {
            sf.num -= sf.alphaacccost
            sf.alphaacccost *= 1000
            document.getElementById("divalphaacceleratorcost").textContent = "Cost: " + sf.alphaacccost
            sf.alphaaccelerators += 1
            sf.alphaacceleratorsleft = sf.alphaaccelerators
        }
    }
}

function makechunk() {
    if(sf.num >= 1e+10) {
        sf.num -= 1e+10
        sf.pchunks += 1
        document.getElementById("chunkamount").textContent = "Particle Chunks: " + sf.pchunks
    }
}

function bang() {
    if(sf.pchunks >= 2) {
        if(sf.alphaacceleratorsleft > 0) {
            sf.alphaacceleratorsleft -= 1
            sf.pchunks -=2
            sf.bangtimeleft = sf.bangtime
            document.getElementById("chunkamount").textContent = "Particle Chunks: " + sf.pchunks
        }
    }
}

function threeboost() {
    if(sf.alphanum >= sf.tbcost) {
        sf.alphanum -= sf.tbcost
        sf.tbcost *= 4
        document.getElementById("divthreeboostcost").textContent = "Cost: " + sf.tbcost + " Alpha"
        sf.tbmultiplier *= 3
    }
}

//game loop
setInterval(() => {
    if(sf.firstgenbought) {
        if(sf.gbtl > 1) {
            sf.gbm = sf.gbmc
        }
        else {
            sf.gbm = 1
        }
    if(sf.bangtimeleft == 0) {
        sf.alphaacceleratorsleft += sf.alphaaccelerators
        sf.alphanum += sf.alphainc * sf.alphaacceleratorsleft
        document.getElementById("bangtimeleft").textContent = ""
    }
    sf.bangtimeleft -= 1
    if(sf.bangtimeleft > 0 && sf.bangtimeleft < sf.bangtime) {
        document.getElementById("bangtimeleft").textContent = "Bang time left: " + sf.bangtimeleft
    }
    sf.gbtl -= 1
    sf.hundredoveris = 100 / sf.intervalspeed

    //most important line, calculates your main "Particles" number
    sf.num += sf.inc * sf.genmult * sf.hundredoveris * sf.gbm * sf.tbmultiplier

    if(sf.num >= 1000000000) {
        document.getElementById("bangreach").style.display='none'
        document.getElementById("bangshow").style.display='block'
    }
    document.getElementById("counter").textContent = sf.num.toFixed(2) + " particles"
    if(sf.num >= 1000000) {
        document.getElementById("counter").textContent = (sf.num / 1000000).toFixed(2) + " million particles"
    }
    document.getElementById("alphacounter").textContent = sf.alphanum.toFixed(2) + " Alpha particles"
    }
  }, 100)

function save() {
    savefile = JSON.stringify(sf)
    localStorage.setItem('savefile', savefile)
}