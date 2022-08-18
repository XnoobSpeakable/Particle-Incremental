import Decimal from 'break_eternity.js';
import { D } from "./util";

export let player = {
    version: "b1.22.0",
    upgrades: { 
        'gen': { cost: D(0), timesBought: 0 },
        'bb': { cost: D(2000), timesBought: 0},
        'speed': { cost: D(50), timesBought: 0},
        'mbup': { cost: D(50), timesBought: 0},
        'mbmult': { cost: D(1000), timesBought: 0},
        'unlockgb': { cost: D(5000), timesBought: 0},
        'gbupt': { cost: D(100), timesBought: 0},
        'gbupm': { cost: D(10000), timesBought: 0},
        'nuclearbuy': { cost: D(1e6), timesBought: 0},
        'nuclearalphabuy': { cost: D(1e6), timesBought: 0},
        'alphaacc': { cost: D(1e10), timesBought: 0},
        'tb': { cost: D(1), timesBought: 0},
        'perbang': { cost: D(4), timesBought: 0},
        'bangspeed': { cost: D(1), timesBought: 0},
        'unlockpca': { cost: D(20), timesBought: 0},
        'upgradepca': { cost: D(2), timesBought: 0},
        'boosterup': { cost: D(100), timesBought: 0},
        'boosteruppercent': { cost: D(100), timesBought: 0},
        'gboostdouble': { cost: D(1), timesBought: 0},
        'alphamachinedouble': { cost: D(1000), timesBought: 0},
        'baunlock': { cost: D(1), timesBought: 0},
        'upgradeba': { cost: D(1), timesBought: 0},
        },
    num: D(0),
    gbTimeLeft: D(0),
    gbTimeLeftCon: D(10),
    gbMult: D(1),
    pChunks: D(0),
    alphaNum: D(0),
    bangTime: 300, 
    bangTimeLeft: 1e+300, 
    eSetting: 4, 
    tempBoost: 1, 
    pcaToggle: true, 
    pcaTime: 160, 
    pcaTimeLeft: 0, 
    autoSaveDelay: 50, 
    autoSaveMode: 4, 
    autoSaveSet: 50, 
    boosterParticles: D(0),
    untilBoost: 1, 
    themeNumber: 0, 
    omegaBase: D(0),
    omegaBaseCost: D(1e10),
    omegaAlpha: D(0),
    omegaAlphaCost: D(1e12),
    baToggle: true, 
    baTime: 160, 
    baTimeLeft: 0,
};

export type UpgradeName = keyof typeof player.upgrades;
export const UpgradeNames = Object.keys(player.upgrades) as UpgradeName[];        
export function getUpgradeCost(upgradeName: UpgradeName) { return player.upgrades[upgradeName].cost }
export function setUpgradeCost(upgradeName: UpgradeName, costIn: Decimal) { player.upgrades[upgradeName].cost = (costIn) }
export function getUpgradeTimesBought(upgradeName: UpgradeName) { return player.upgrades[upgradeName].timesBought }

export function load() {
    if(localStorage.getItem('savefile') !== null) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        player = JSON.parse(localStorage.getItem('savefile')!)
    }
    const stage = Number(player.version.substring(1, 2))
    const major = Number(player.version.substring(3, 5))
    //const minor = player.version.substring(6)
    if(stage === 1 && major <= 21) {
        localStorage.removeItem('savefile');
        window.location.reload();
    }
    if(player.version !== "b1.22.0") {
        player.version = "b1.22.0";
        alert("This version is incompatible with older saves, so your progress has been wiped.");
    }
}