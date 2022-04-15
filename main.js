//this is stolen code
function openTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

//this is not stolen code
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

load()

document.getElementById("counter").textContent = sf.num + " particles"

function gbbexec() {
    for(let i = 0; i < sf.gblen; i++) {
        
    }
}

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
        document.getElementById("divmbmultcost").textContent = "Cost: " + sf.mbmultcost
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
    }
    sf.bangtimeleft -= 1
    if(sf.bangtimeleft > 0 && sf.bangtimeleft < sf.bangtime) {
        document.getElementById("bangtimeleft").textContent = "Bang time left: " + sf.bangtimeleft
    }
    sf.gbtl -= 1
    sf.hundredoveris = 100 / sf.intervalspeed

    //most important line, calculates your main "Particles" number
    sf.num += sf.inc * sf.genmult * sf.hundredoveris * sf.gbm * sf.tbmultiplier

    document.getElementById("counter").textContent = sf.num.toFixed(3) + " particles"
    document.getElementById("alphacounter").textContent = sf.alphanum.toFixed(3) + " Alpha particles"
    }
  }, 100)

function save() {
    savefile = JSON.stringify(sf)
    localStorage.setItem('savefile', savefile)
}