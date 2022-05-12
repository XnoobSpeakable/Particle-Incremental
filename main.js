function load() {
    if(localStorage.getItem('savefile') == null) {
        sf = {
            version: "b1.14.1",
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
            nuclearcost: 1e+6,
            npoff: 1,
            alphaacccost: 1e+10,
            alphaaccelerators: 0,
            pchunks: 0,
            alphanum: 0,
            bangtime: 300,
            bangtimeleft: 1e+300,
            alphaacceleratorsleft: 0,
            alphainc: 1,
            tbcost: 1,
            tbmultiplier: 1,
            perbangmult: 1,
            pbcost: 4,
            esetting: 1e+4,
            tempboost: 1,
            bangspeedcost: 1,
            bangspeedbought: 0,
            pcaunlocked: false,
            pcatoggle: true,
            pcaupcost: 2,
            pcatime: 160,
            pcatimeleft: 0,
            pcaupbought: 0,
            pcafracmult: 2,
            autosavedelay: 300,
            autosavemode: 1,
            autosaveset: 300,
            boosterparticles: 0,
            bppercent: 1,
            bpgainmult: 1,
            untilboost: 1,
            bpupcost: 100,
            bppercentcost: 100,
            themenumber: 0
          };
        }
    else {
        sf = JSON.parse(localStorage.getItem('savefile'))
    }
    if(sf.version != "b1.14.1") { 
        if(!sf.tempboost) {sf.tempboost = 1}
        if (!sf.bangspeedcost) {sf.bangspeedcost = 1}
        if(!sf.bangspeedbought) {sf.bangspeedbought = 0}
        if(sf.pcaunlocked === null) {sf.pcaunlocked = false}
        if(sf.pcatoggle === null) {sf.pcatoggle = true}
        if(!sf.pcaupcost) {sf.pcaupcost = 2}
        if(!sf.pcatime) {sf.pcatime = 160}
        if(!sf.pcatimeleft) {sf.pcatimeleft = 0}
        if(!sf.pcaupbought) {sf.pcaupbought = 0}
        if(!sf.pcafracmult) {sf.pcafracmult = 2}
        if(!sf.autosavedelay) {sf.autosavedelay = 300}
        if(!sf.autosavemode) {sf.autosavemode = 1}
        if(!sf.autosaveset) {sf.autosaveset = 300}
        if(!sf.boosterparticles) {
            sf.boosterparticles = 0
        }
        if(!sf.bppercent) {
            sf.bppercent = 1
        }
        if(!sf.bpgainmult) {
            sf.bpgainmult = 1
        }
        if(!sf.untilboost) {
            sf.untilboost = 1
        }
        if(!sf.bpupcost) {
            sf.bpupcost = 100
        }
        if(!sf.bppercentcost) {
            sf.bppercentcost = 100
        }
        if(!sf.themenumber) {
            sf.themenumber = 100
        }
        alert("Your save was created in an older version of the game, which may cause problems. I have coded backwards compatibility with older saves, but I cannot guarantee that it will work properly.")
        sf.alphaacccost = 1e+10
        sf.version = "b1.14.1"
    }
}

function theme() {
    sf.themenumber += 1
    themeexec()
}

function themeexec() {
    switch (sf.themenumber % 2) {
        case 0:
            document.body.style.backgroundColor = "#EEEEEE"
            var className = document.getElementsByClassName('button');
            for(var i=0;i < className.length;i++){
                className[i].style.backgroundColor = "#DFDFDF"
            }
            break;
        case 1:
            document.body.style.backgroundColor = "#777777"
            var className = document.getElementsByClassName('button');
            for(var i=0;i < className.length;i++){
                className[i].style.backgroundColor = "#999999"
            }
            break;
    }
}

function loadcut() {
    themeexec()
    if(sf.firstgenbought == false) {
        document.getElementById("divgencost").textContent = "Cost: Free"
    }
    else {
        document.getElementById("divgencost").textContent = "Cost: " + format(sf.gencost)
    }
    document.getElementById("divbbcost").textContent = "Cost: " + format(sf.bbcost)
    document.getElementById("divmbupcost").textContent = "Cost: " + format(sf.mbupcost)
    document.getElementById("divmbmultcost").textContent = "Cost: " + format(sf.mbmultcost)
    if(sf.gbunlocked) {
        document.getElementById("divgenunlockcost").textContent = "Unlocked"
        document.getElementById("gbshow").style.display='block'
    }
    document.getElementById("divgbuptcost").textContent = "Cost: " + format(sf.gbuptcost)
    document.getElementById("divalphaacceleratorcost").textContent = "Cost: " + format(sf.alphaacccost)
    document.getElementById("divgbupmcost").textContent = "Cost: " + format(sf.gbupmcost)
    document.getElementById("chunkamount").textContent = "Particle Chunks: " + format(sf.pchunks)
    document.getElementById("divthreeboostcost").textContent = "Cost: " + format(sf.tbcost) + " Alpha"
    document.getElementById("divperbangcost").textContent = "Cost: " + format(sf.pbcost) + " Alpha"
    document.getElementById("divnuclearcost").textContent = "Cost: " + format(sf.nuclearcost)
    document.getElementById("divnp").textContent = "Nuclear Particles: " + format(sf.npoff - 1)
}

function pretab() {
    document.getElementById("Base").style.display='none'
    document.getElementById("Alpha").style.display='none'
    document.getElementById("Beta").style.display='none'
    document.getElementById("Gamma").style.display='none'
    document.getElementById("Delta").style.display='none'
    document.getElementById("Omega").style.display='none'
    document.getElementById("Stats").style.display='none'
    document.getElementById("Settings").style.display='none'
}
function openbase() {pretab();document.getElementById("Base").style.display='block'}
function openalpha() {pretab();document.getElementById("Alpha").style.display='block'}
function openbeta() {pretab();document.getElementById("Beta").style.display='block'}
function opengamma() {pretab();document.getElementById("Gamma").style.display='block'}
function opendelta() {pretab();document.getElementById("Delta").style.display='block'}
function openomega() {pretab();document.getElementById("Omega").style.display='block'}
function openstats() {pretab();document.getElementById("Stats").style.display='block'}
function opensettings() {pretab();document.getElementById("Settings").style.display='block'}

load()
loadcut()

function setting1e4() {sf.esetting = 1e+4;loadcut()}
function setting1e6() {sf.esetting = 1e+6;loadcut()}

function format(n) {
    if(n >= sf.esetting) {
        let e = Math.floor(Math.log10(n));
        let m = n / Math.pow(10, e);
        return `${m.toFixed(2)}e${e}`;
    }
    else {
        return n.toFixed(2)
    }
} //tysm Diamboy for this function, I modified it with the if statement later.

function buygen() {
    if(sf.firstgenbought == false) {
        sf.firstgenbought = true
        document.getElementById("divgencost").textContent = "Cost: " + format(sf.gencost)
    }
    if(sf.firstgenbought == true) {
        if(sf.num >= sf.gencost) {
            sf.num -= sf.gencost
            sf.gencost *= 4
            sf.genmult++
            document.getElementById("divgencost").textContent = "Cost: " + format(sf.gencost)
        }
    }
}

function buybb() {
if(sf.num >= sf.bbcost) {
    sf.num -= sf.bbcost
    sf.bbcost *= 2
    document.getElementById("divbbcost").textContent = "Cost: " + format(sf.bbcost)
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
document.getElementById("counter").textContent = format(sf.num) + " particles"
}

function mbup() {
if(sf.num >= sf.mbupcost) {
    sf.num -= sf.mbupcost
    sf.mbupcost *= 2
    sf.mbinc += 1
    document.getElementById("divmbupcost").textContent = "Cost: " + format(sf.mbupcost)
}
}

function mbmult() {
if(sf.num >= sf.mbmultcost) {
    sf.num -= sf.mbmultcost
    sf.mbmultcost *= 3
    sf.mbmultv += 1
    document.getElementById("divmbmultcost").textContent = "Cost: " + format(sf.mbmultcost)
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
        document.getElementById("divgbuptcost").textContent = "Cost: " + format(sf.gbuptcost)
        sf.gbtlc += 20
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
        document.getElementById("divgbupmcost").textContent = "Cost: " + format(sf.gbupmcost)
        sf.gbmc += 5
    }
}
else {
    document.getElementById("divgbupmcost").textContent = "Unlock Generator Boost first"
}
}

function nuclearbuy() {
if(sf.num >= sf.nuclearcost) {
    sf.num -= sf.nuclearcost
    sf.nuclearcost *= 7
    document.getElementById("divnuclearcost").textContent = "Cost: " + format(sf.nuclearcost)
    sf.npoff += 1
    document.getElementById("divnp").textContent = "Nuclear Particles: " + format(sf.npoff - 1)
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
        document.getElementById("divalphaacceleratorcost").textContent = "Cost: " + format(sf.alphaacccost)
        sf.alphaaccelerators += 1
        sf.alphaacceleratorsleft = sf.alphaaccelerators
    }
}
}

function makechunk() {
if(sf.num >= 1e+9) {
    sf.num -= 1e+9
    sf.pchunks += 1
    document.getElementById("chunkamount").textContent = "Particle Chunks: " + format(sf.pchunks)
}
}

function bang() {
if(sf.pchunks >= 2) {
    if(sf.alphaacceleratorsleft > 0) {
        sf.alphaacceleratorsleft -= sf.alphaaccelerators
        sf.pchunks -=2
        sf.bangtimeleft = sf.bangtime
        document.getElementById("chunkamount").textContent = "Particle Chunks: " + format(sf.pchunks)
        document.getElementById("boostersmaintext").style.display='block'
    }
}
}

function threeboost() {
    if(sf.alphanum >= sf.tbcost) {
        sf.alphanum -= sf.tbcost
        sf.tbcost *= 4
        document.getElementById("divthreeboostcost").textContent = "Cost: " + format(sf.tbcost) + " Alpha"
        sf.tbmultiplier *= 3
    }
}

function perbang() {
    if(sf.alphanum >= sf.pbcost) {
        sf.alphanum -= sf.pbcost
        sf.pbcost *= 4
        document.getElementById("divperbangcost").textContent = "Cost: " + format(sf.pbcost) + " Alpha"
        sf.perbangmult += 1
    }
}

function bangspeed() {
    if(sf.alphanum >= sf.bangspeedcost) {
        sf.alphanum -= sf.bangspeedcost
        sf.bangspeedbought += 1
        if(sf.bangspeedbought <= 3) {
            sf.bangtime = Math.ceil(sf.bangtime / 2)
            sf.bangspeedcost *= 2
            document.getElementById("divbangspeedcost").textContent = "Cost: " + format(sf.bangspeedcost) + " Alpha"
        }
        else {
            sf.bangtime = Math.ceil(sf.bangtime / 2)
            sf.bangspeedcost *= 5
            document.getElementById("divbangspeedcost").textContent = "Cost: " + format(sf.bangspeedcost) + " Alpha"
        }
    }
}

function unlockpca() {
    if(sf.alphanum >= 20) {
        sf.alphanum -= 20
        document.getElementById("divunlockpca").textContent = "Unlocked"
        sf.pcaunlocked = true
    }
}

function upgradepca() {
    if(sf.pcaunlocked) {
        if(sf.alphanum >= sf.pcaupcost) {
            sf.alphanum -= sf.pcaupcost
            sf.pcaupcost *= 3
            sf.pcaupbought += 1
            if(sf.pcaupbought <= 4) {
                sf.pcatime = Math.ceil(sf.pcatime / 2)
            }
            else {
                sf.pcatime = Math.ceil(10 / sf.pcafracmult)
                sf.pcafracmult++
            }
            document.getElementById("divupgradepcacost").textContent = "Cost: " + format(sf.pcaupcost) + " Alpha"
        }
    }
}

function togglepca() {
    if(sf.pcaunlocked == true) {
        sf.pcatoggle = !sf.pcatoggle
        document.getElementById("divtogglepca").style.display='inline-block'
        if(sf.pcatoggle == true) {
            document.getElementById("divtogglepca").textContent = "On"
        }
        else {
            document.getElementById("divtogglepca").textContent = "Off"
        }
    }
}

function autosavesettings() {
    if(sf.autosavemode == 5) {
        sf.autosavemode = 0
    }
    else {
    sf.autosavemode++
    }
    if(sf.autosavemode == 0) {
        sf.autosaveset = 600
        document.getElementById("autosaving").textContent = "On, delay: 60s"
        sf.autosavedelay = 600
    }
    if(sf.autosavemode == 1) {
        sf.autosaveset = 300
        document.getElementById("autosaving").textContent = "On, delay: 30s"
        sf.autosavedelay = 300
    }
    if(sf.autosavemode == 2) {
        sf.autosaveset = 150
        document.getElementById("autosaving").textContent = "On, delay: 15s"
        sf.autosavedelay = 150
    }
    if(sf.autosavemode == 3) {
        sf.autosaveset = 100
        document.getElementById("autosaving").textContent = "On, delay: 10s"
        sf.autosavedelay = 100
    }
    if(sf.autosavemode == 4) {
        sf.autosaveset = 50
        document.getElementById("autosaving").textContent = "On, delay: 5s"
        sf.autosavedelay = 50
    }
    if(sf.autosavemode == 5) {
        sf.autosaveset = 1e+300
        document.getElementById("autosaving").textContent = "Off"
        sf.autosavedelay = 1e+300
    }
}

function boosterup() {
    if(sf.alphanum >= sf.bpupcost) {
        sf.alphanum -= sf.bpupcost
        sf.bpupcost *= 10
        sf.bpgainmult += 1
        document.getElementById("divboosterupcost").textContent = format(sf.bpupcost) + " Alpha particles"
    }
}

function boosteruppercent() {
    if(sf.alphanum >= sf.bpuppercentcost) {
        sf.alphanum -= sf.bpuppercentcost
        sf.bpuppercentcost *= 10
        sf.bppercent += 1
        document.getElementById("divboosteruppercentcost").textContent = format(sf.bpuppercentcost) + " Alpha particles"
    }
}

function fgbtest() {
    if(sf.firstgenbought) {
        document.getElementById("boostsection").style.display='block'
        if(sf.gbtl > 1) {
            sf.gbm = sf.gbmc
        }
        else {
            sf.gbm = 1
        }
        if(sf.bangtimeleft == 0) {
            sf.alphaacceleratorsleft += sf.alphaaccelerators
            sf.alphanum += sf.alphainc * sf.alphaacceleratorsleft * sf.perbangmult
            document.getElementById("bangtimeleft").textContent = ""
        }
        sf.bangtimeleft -= 1
        if(sf.bangtimeleft > 0 && sf.bangtimeleft < sf.bangtime) {
            document.getElementById("bangtimeleft").textContent = "Bang time left: " + sf.bangtimeleft
        }
        sf.gbtl -= 1
        sf.hundredoveris = 100 / sf.intervalspeed
        
        sf.untilboost -= 1
        if(sf.untilboost == 0) {
            sf.untilboost = 10
            sf.boosterparticles += sf.alphanum * sf.bpgainmult
            document.getElementById("boostersmaintext").textContent = "You are currently getting " + format(sf.bpgainmult) + " booster particles per alpha particle per second, resulting in a +" + format(sf.boosterparticles * sf.bppercent) + "% boost to base particle production"
        }

        if(sf.num > 1e+6 && sf.num < 1e+12) {
            sf.tempboost = 1.5
            document.getElementById("tmp").style.display='block'
        }
        else {
            sf.tempboost = 1
            document.getElementById("tmp").style.display='none'
        }

        //most important line, calculates your main "Particles" number
        sf.num += sf.inc * sf.genmult * sf.hundredoveris * (sf.gbm * sf.npoff) * sf.npoff * sf.tbmultiplier * sf.tempboost * (1 + ((sf.boosterparticles / 100) * sf.bppercent))

        if(sf.num >= 1000000) {
            document.getElementById("nuclearreach").style.display='none'
            document.getElementById("nuclearshow").style.display='block'
        }
        if(sf.num >= 1000000000) {
            document.getElementById("bangreach").style.display='none'
            document.getElementById("bangshow").style.display='block'
        }
        document.getElementById("counter").textContent = format(sf.num) + " particles"
        document.getElementById("alphacounter").textContent = format(sf.alphanum) + " Alpha particles"
        sf.autosavedelay -= 1
        if(sf.autosavedelay == 0) {
            sf.autosavedelay = sf.autosaveset
            save()
        }
    }
}

function pcatest() {
    if(sf.pcaunlocked == true) {
        if(sf.pcatoggle == true) {
            if(sf.pcatimeleft == 0) {
                sf.pcatimeleft = sf.pcatime
                makechunk()
            }
            sf.pcatimeleft -= 1
            document.getElementById("untilpca").textContent = sf.pcatimeleft + " left until next autobuy"
        }
    }
}

//game loop
setInterval(() => {
    pcatest()
    fgbtest()
    document.getElementById("stat").textContent = JSON.stringify(sf)
    }, 100)


function save() {
    savefile = JSON.stringify(sf)
    localStorage.setItem('savefile', savefile)
}

function reset() {
    localStorage.removeItem('savefile');
}