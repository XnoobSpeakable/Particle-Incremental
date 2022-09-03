import {
   load,
   loadSettings,
   getUpgradeTimesBought,
   getUpgradeCost,
   player,
   playerSettings,
   UpgradeNames,
   getSaveString,
} from './player';
import { UpdateCostVal, upgrades } from './upgrades';
import { format, formatb, getEl, D,  onBought, onBoughtInc } from './util';
import Decimal from 'break_eternity.js';

// eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
declare var window: Window & Record<string, unknown>;

loadSettings();

const themes = [
   {
      textColor: '#EBEBEB',
      bgColor: '#696969',
      buttonColor: '#999999',
      borderColor: '#000000',
      themeName: 'Dark',
   },
   {
      textColor: '#EFEFEF',
      bgColor: '#333333',
      buttonColor: '#ADADAD',
      borderColor: '#000000',
      themeName: 'Darker',
   },
   {
      textColor: '#000000',
      bgColor: '#EEEEEE',
      buttonColor: '#DFDFDF',
      borderColor: '#333333',
      themeName: 'Light',
   },
   {
      textColor: '#000000',
      bgColor: '#EEEEEE',
      buttonColor: '#DFDFDF',
      borderColor: '#F33333',
      themeName: 'Red Borders',
   },
   {
      textColor: '#CCCCCC',
      bgColor: '#000000',
      buttonColor: '#CCCCCC',
      borderColor: '#CCCCCC',
      themeName: 'Black',
   },
   {
      textColor: '#EEEEEE',
      bgColor: '#000000',
      buttonColor: '#EEEEEE',
      borderColor: '#EEEEEE',
      themeName: 'High contrast black',
   },
   {
      textColor: '#000000',
      bgColor: '#FF91AF',
      buttonColor: '#FFA1BF',
      borderColor: '#FFD1FF',
      themeName: 'Pink',
   },
   {
      textColor: '#3DD7DE',
      bgColor: '#191970',
      buttonColor: '#3DD7DE',
      borderColor: '#3DD7DE',
      themeName: 'Blue',
   },
   {
      textColor: '#000000',
      bgColor: '#FFFACD',
      buttonColor: '#FFD700',
      borderColor: '#FFD700',
      themeName: 'Yellow',
   },
   {
      textColor: '#000000',
      bgColor: '#DEB2EF',
      buttonColor: '#8A7AED',
      borderColor: '#6A5ACD',
      themeName: 'Purple',
   },
];
function themeExec(): void {
   const { textColor, bgColor, buttonColor, borderColor, themeName } =
      themes[playerSettings.themeNumber];
   //@ts-expect-error style isn't read only
   getEl('diventirebody').style =
      'color: ' + textColor + "; font-family: 'Times New Roman'";
   document.body.style.backgroundColor = bgColor;
   const className = document.getElementsByClassName(
      'button'
   ) as HTMLCollectionOf<HTMLElement>;
   for (let i = 0; i < className.length; i++) {
      className[i].style.backgroundColor = buttonColor;
   }
   const className2 = document.getElementsByClassName(
      'withtheoutline'
   ) as HTMLCollectionOf<HTMLElement>;
   for (let i = 0; i < className2.length; i++) {
      className2[i].style.border = '0.2em solid ' + borderColor;
   }
   getEl('whattheme').textContent = 'Theme: ' + themeName;
}

window.theme = function (): void {
   playerSettings.themeNumber = (playerSettings.themeNumber + 1) % themes.length;
   themeExec();
   saveSettings();
};
function prePUD(): void {
   getEl('tabopenfactory').style.display = 'none';
   getEl('tabopenalpha').style.display = 'none';
   getEl('tabopenbeta').style.display = 'none';
   getEl('tabopengamma').style.display = 'none';
   getEl('tabopendelta').style.display = 'none';
   getEl('tabopenomega').style.display = 'none';
}
function passiveUnlockDisplay(): void {
   if (player.num.gte(1e9)) {
      getEl('tabopenalpha').style.display = 'inline';
      getEl('tabopenomega').style.display = 'inline';
   }
   if (/*player.alphaNum.gte(1e9) &&*/ playerSettings.useExperimental) { //TODO: remove exprimental when you want
      getEl('tabopenbeta').style.display = 'inline';
   }
   if (playerSettings.useExperimental) { //TODO: remove exprimental when you want
      getEl('tabopengamma').style.display = 'inline';
   }
   if (playerSettings.useExperimental) { //TODO: remove exprimental when you want
      getEl('tabopendelta').style.display = 'inline';
   }
   if (/*player.num.gte(1e5) &&*/ playerSettings.useExperimental) { //TODO: remove exprimental when you want
      getEl('tabopenfactory').style.display = 'inline';
   }
   if (playerSettings.useExperimental) { //TODO: remove exprimental when you want
      getEl('tabopenachievements').style.display = 'inline';
   }
}

const autosaveElement = getEl('autosaving');
const delayArray = [600, 300, 150, 100, 50, 20, 10, undefined];

function autoSaveSet(): void {
   const delay = delayArray[playerSettings.autoSaveMode];
   playerSettings.autoSaveSet = playerSettings.autoSaveDelay = delay ?? 1e308;
   autosaveElement.textContent = delay
      ? 'On, delay: ' + format(delay / 10) + 's'
      : 'Off';
}

window.autosavesettings = function (): void {
   playerSettings.autoSaveMode = (playerSettings.autoSaveMode + 1) % delayArray.length;
   autoSaveSet();
   saveSettings();
};

function loadMisc(): void {
   themeExec();
   prePUD();
   passiveUnlockDisplay();
   autoSaveSet();
   for (const upgradeName of UpgradeNames) {
      const upgrade = upgrades[upgradeName];
      UpdateCostVal(
         upgrade.costDiv,
         getUpgradeCost(upgradeName),
         upgrade.currency
      );
   }
   if (getUpgradeTimesBought('gen').eq(0)) {
      getEl('divgencost').textContent = 'Cost: Free';
   } else {
      UpdateCostVal('divgencost', getUpgradeCost('gen'));
   }
   if (getUpgradeTimesBought('unlockgb').eq(1)) {
      getEl('gbshow').style.display = 'block';
      getEl('divgenunlockcost').style.display = 'none';
      getEl('gbunlockbutton').style.display = 'none';
   }
   getEl('divnp').textContent =
      'Nuclear Particles: ' + formatb(getUpgradeTimesBought('nuclearbuy'));
   getEl('divnap').textContent =
      'Nuclear Alpha Particles: ' +
      formatb(getUpgradeTimesBought('nuclearalphabuy'));
   getEl('chunkamount').textContent =
      'Particle Chunks: ' + formatb(player.pChunks);
   if (getUpgradeTimesBought('unlockpca').eq(1)) {
      getEl('pcashow').style.display = 'block';
      getEl('divunlockpca').style.display = 'none';
      getEl('divunlockpcabutton').style.display = 'none';
      getEl('untilpca').textContent =
         format(player.pcaTimeLeft) + ' left until next autobuy';
      getEl('divtogglepca').style.display = 'inline-block';
      if (player.pcaToggle) {
         getEl('divtogglepca').textContent = 'On';
      } else {
         getEl('divtogglepca').textContent = 'Off';
      }
   }
   if (getUpgradeTimesBought('baunlock').eq(1)) {
      getEl('bashow').style.display = 'block';
      getEl('divbau').style.display = 'none';
      getEl('divbauextra').style.display = 'none';
      getEl('baunlockbutton').style.display = 'none';
      getEl('untilba').textContent =
         format(player.baTimeLeft) + ' left until next autobuy';
      getEl('divtoggleba').style.display = 'inline-block';
      if (player.baToggle) {
         getEl('divtoggleba').textContent = 'On';
      } else {
         getEl('divtoggleba').textContent = 'Off';
      }
   }
   getEl('omegabasecost').textContent =
      'Cost: ' + formatb(player.omegaBaseCost);
   getEl('divobase').textContent = 'You have ' + formatb(player.omegaBase);
   getEl('omegaalphacost').textContent =
      'Cost: ' + formatb(player.omegaAlphaCost);
   getEl('divoalpha').textContent = 'You have ' + formatb(player.omegaAlpha);
}

function makeElementMap(...names: string[]): { [k: string]: HTMLElement } {
   const entries = names.map(function (x) {
      return [x, getEl(x)] as const;
   });
   return Object.fromEntries(entries);
}
const tabElements = makeElementMap(
   'Base',
   'Factory',
   'Alpha',
   'Beta',
   'Gamma',
   'Delta',
   'Omega',
   'Achievements',
   'Stats',
   'Settings',
   'Tutorial'
);
const tabOmegaElements = makeElementMap(
   'oBase',
   'oAlpha',
   'oBeta',
   'oGamma',
   'oDelta',
   'oOmega'
);
function hideElements(elements: {
   [x: string]: { style: { display: string } };
}) {
   for (const name in elements) {
      elements[name].style.display = 'none';
   }
}
window.openTab = function (tab: string): void {
   if (tab in tabOmegaElements) {
      hideElements(tabOmegaElements);
   } else {
      hideElements(tabElements);
   }
   getEl(tab).style.display = 'block';
};

load();
loadMisc();
window.saveExport = function (): void {
   // eslint-disable-next-line @typescript-eslint/no-floating-promises
   navigator.clipboard.writeText(save());
};
window.saveImport = function (): void {
   getEl('importareaid').style.display = 'block';
   getEl('saveimportconfirm').style.display = 'block';
};
window.saveImportConfirm = function (): void {
   const saveEl = getEl('importareaid');
   if (!(saveEl instanceof HTMLTextAreaElement)) {
      throw new Error('wrong element type');
   }
   const savefile = saveEl.value; // really should check for an empty value here
   localStorage.setItem(window.location.pathname, savefile);
   window.location.reload();
};
window.setting1e4 = function (): void {
   playerSettings.eSetting = 4;
   loadMisc();
   saveSettings();
};
window.setting1e6 = function (): void {
   playerSettings.eSetting = 6;
   loadMisc();
   saveSettings();
};

window.experimentalToggle = function () {
   playerSettings.useExperimental = !playerSettings.useExperimental
   if(playerSettings.useExperimental) {
      getEl('nextfeature').style.display = 'block'
      getEl('tabopenfactory').style.display = 'inline';
      getEl('tabopenbeta').style.display = 'inline';
      getEl('tabopengamma').style.display = 'inline';
      getEl('tabopendelta').style.display = 'inline';
      getEl('tabopenachievements').style.display = 'inline';
   }
   else {
      getEl('nextfeature').style.display = 'none'
      getEl('tabopenfactory').style.display = 'none';
      getEl('tabopenbeta').style.display = 'none';
      getEl('tabopengamma').style.display = 'none';
      getEl('tabopendelta').style.display = 'none';
      getEl('tabopenachievements').style.display = 'none';
   }
   getEl('experimentoggle').textContent = playerSettings.useExperimental.toString()
}

window.mbman = function (): void {
   const gain: Decimal = onBoughtInc(
      'mbup',
      '*',
      'mbmult', '*', 'nuclearbuy'
   );
   player.num = player.num.plus(gain);
   getEl('counter').textContent = formatb(player.num) + ' particles';
};

window.gbboost = function (): void {
   player.gbTimeLeft = player.gbTimeLeftCon;
};

function makechunk(): void {
   if (player.num.gte(1e9)) {
      player.num = player.num.minus(1e9);
      player.pChunks = player.pChunks.plus(1);
      getEl('chunkamount').textContent =
         'Particle Chunks: ' + formatb(player.pChunks);
   }
}
window.makechunk = makechunk;

function bang(): void {
   if (player.pChunks.gte(2)) {
      if (
         getUpgradeTimesBought('alphaacc').gt(0) &&
         !(player.bangTimeLeft >= 0 && player.bangTimeLeft <= player.bangTime)
      ) {
         player.pChunks = player.pChunks.minus(2);
         player.bangTimeLeft = player.bangTime;
         getEl('chunkamount').textContent =
            'Particle Chunks: ' + formatb(player.pChunks);
         getEl('boostersmaintext').style.display = 'block';
      }
   }
}
window.bang = bang;

window.togglepca = function (): void {
   if (getUpgradeTimesBought('unlockpca').eq(1)) {
      player.pcaToggle = !player.pcaToggle;
      getEl('divtogglepca').style.display = 'inline-block';
      if (player.pcaToggle) {
         getEl('divtogglepca').textContent = 'On';
      } else {
         getEl('divtogglepca').textContent = 'Off';
      }
   }
};

window.buyomegabase = function (): void {
   if (player.num.gte(player.omegaBaseCost)) {
      player.num = player.num.minus(player.omegaBaseCost);
      player.omegaBase = player.omegaBase.plus(1);
      player.omegaBaseCost = player.omegaBaseCost.times(10);
      getEl('omegabasecost').textContent =
         'Cost: ' + formatb(player.omegaBaseCost);
      getEl('divobase').textContent = 'You have ' + formatb(player.omegaBase);
   }
};

window.buyomegaalpha = function (): void {
   if (player.alphaNum.gte(player.omegaAlphaCost)) {
      player.alphaNum = player.alphaNum.minus(player.omegaAlphaCost);
      player.omegaAlpha = player.omegaAlpha.plus(1);
      player.omegaAlphaCost = player.omegaAlphaCost.times(100);
      getEl('omegaalphacost').textContent =
         'Cost: ' + formatb(player.omegaAlphaCost);
      getEl('divoalpha').textContent = 'You have ' + formatb(player.omegaAlpha);
   }
};

window.buyomegabeta = function (): void {
   /* TODO: implement this */
};
window.buyomegagamma = function (): void {
   /* TODO: implement this */
};
window.buyomegadelta = function (): void {
   /* TODO: implement this */
};

window.toggleba = function (): void {
   if (getUpgradeTimesBought('baunlock').eq(1)) {
      player.baToggle = !player.baToggle;
      getEl('divtoggleba').style.display = 'inline-block';
      if (player.baToggle) {
         getEl('divtoggleba').textContent = 'On';
      } else {
         getEl('divtoggleba').textContent = 'Off';
      }
   }
};
/* TODO:
const features = { 
   GB: {displayName: "Generator boost", unlocksAt: D(5000), currency: ""},
   Factory: {displayName: "Factory", unlocksAt: D(1e5), currency: ""},
   NP: {displayName: "Nuclear Particles", unlocksAt: D(1e6), currency: ""},
   Bang: {displayName: "Bang", unlocksAt: D(1e9), currency: ""},
   BA: {displayName: "Bang Autobuyer (in Omega tab)", unlocksAt: D(1e10), currency: ""},
   PCA: {displayName: "Particle Chunk Autobuyer", unlocksAt: D(20), currency: " Alpha "},
}
function nextFeatureHandler(): void {
   let nextFeature = features['GB']
   const percentage = D(100).times((player.num.log10()).div(nextFeature.unlocksAt.log10()))
   getEl('nextfeature').textContent =
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      "Reach" + nextFeature.unlocksAt + nextFeature.currency + "particles to unlock Generator boost (" + percentage + ")"

}*/

function fgbtest(): void {
   if (getUpgradeTimesBought('gen').gt(0)) {
      getEl('boostsection').style.display = 'flex';
      getEl('bigboosttext').style.display = 'block';
      getEl('veryouterboost').style.display = 'block';
      if (player.gbTimeLeft.greaterThan(0)) {
         player.gbMult = getUpgradeTimesBought('gbupm').times(5).plus(5);
      } else {
         player.gbMult = D(1);
      }
      if (getUpgradeTimesBought('unlockgb').eq(1)) {
         getEl('gbshow').style.display = 'block';
         getEl('divgenunlockcost').style.display = 'none';
         getEl('gbunlockbutton').style.display = 'none';
      }

      player.bangTime = Math.ceil(
         300 / Math.pow(2, getUpgradeTimesBought('bangspeed').toNumber())
      );
      
    //   const alphaGain: Decimal = onBought(
    //      'alphaacc', '*', ['perbang', '+', D(1)], '*',['nuclearalphabuy', '+', D(1)], '*', [D(2), '^', 'alphamachinedouble']
    //      );

               const alphaGain: Decimal = onBought(
                  'alphaacc', ['perbang', '+', D(1)], ['nuclearalphabuy', '+', D(1)], [D(2), '^', 'alphamachinedouble']
               );

      if (player.bangTimeLeft === 0) {
         player.alphaNum = player.alphaNum.plus(alphaGain);
         getEl('bangtimeleft').textContent = '';
      }

/* const gain =
   (getUpgradeTimesBought('bb') + 1) *
   getUpgradeTimesBought('gen') *
   (getUpgradeTimesBought('speed') / 10 + 0.1) *
   player.gbMult *
   (getUpgradeTimesBought('nuclearbuy') + 1) *
   (getUpgradeTimesBought('nuclearbuy') + 1) *
   Math.pow(3, getUpgradeTimesBought('tb')) *
   player.tempBoost *
   (1 +
      ((player.boosterParticles / 100) *
         (getUpgradeTimesBought('boosteruppercent') + 1)) /
         100);
*/

      const gain: Decimal = onBought(        
            ['bb', '+', D(1)], '*', 'gen', '*', ['speed', '/', D(10), '+', D(0.1)], '*', player.gbMult, '*', [['nuclearbuy', '+', D(1)], '^', D(2)], '*', 
            [D(3), '^', 'tb'], '*', D(player.tempBoost), '*', [D(1), '+', [[player.boosterParticles, '+', D(1)], '/', D(100), '*', [['boosteruppercent', '+', D(1)], '/', D(100)]]]
    );

      getEl('particlesperclick').textContent =
         'You are getting ' +
                  formatb ( onBought( ['mbup', '+', D(1)], '*', ['mbmult', '+', D(1)], '*',['nuclearbuy', '+', D(1)])
         ) +
         ' particles per click';
      
      getEl('alphapb').textContent =
         'You are getting ' + formatb(alphaGain) + ' Alpha/bang';
      getEl('bangtimeconst').textContent =
         'Currently, bangs take ' + format(player.bangTime / 10) + ' seconds.';
      player.bangTimeLeft -= 1;
      if (player.bangTimeLeft >= 0 && player.bangTimeLeft <= player.bangTime) {
         getEl('bangtimeleft').textContent =
            'Bang time left: ' + format(player.bangTimeLeft / 10);
         getEl('bangbutton').style.display = 'none';
      } else {
         getEl('bangbutton').style.display = 'block';
      }
      if (player.gbTimeLeft.greaterThan(0)) {
         player.gbTimeLeft = player.gbTimeLeft.minus(1);
      }
      getEl('divgbtl').textContent =
         'Boost Time Left: ' + formatb(player.gbTimeLeft.div(10));

      player.untilBoost -= 1;
      if (player.untilBoost === 0) {
         player.untilBoost = 10;
         const totalGain: Decimal = player.alphaNum.times(
            getUpgradeTimesBought('boosterup').plus(1)
         );
         player.boosterParticles = player.boosterParticles.plus(totalGain);
         const percentBoostDisplay: string = formatb(
            player.boosterParticles.times(
               getUpgradeTimesBought('boosteruppercent').plus(1).div(100)
            )
         );
         // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
         getEl('boostersmaintext').textContent =
            'You are currently getting ' +
            formatb(totalGain) +
            ' booster particles per alpha particle per second, resulting in a +' +
            percentBoostDisplay +
            '% boost to base particle production';
      }
      getEl('bpamount').textContent =
         'You have ' + formatb(player.boosterParticles) + ' booster particles';

      if (player.num.gte(1e6) && player.num.lessThan(1e12)) {
         player.tempBoost = 1.5;
         getEl('tmp').style.display = 'block';
      } else {
         player.tempBoost = 1;
         getEl('tmp').style.display = 'none';
      }

      //nextFeatureHandler() TODO:

      getEl('omegabasecost').textContent =
         'Cost: ' + formatb(player.omegaBaseCost);
      getEl('divobase').textContent = 'You have ' + formatb(player.omegaBase);
      getEl('omegaalphacost').textContent =
         'Cost: ' + formatb(player.omegaAlphaCost);
      getEl('divoalpha').textContent = 'You have ' + formatb(player.omegaAlpha);

      player.num = player.num.plus(gain);
      getEl('particlespersecond').textContent =
         'You are getting ' + formatb(gain.times(10)) + ' particles/s';

      if (player.num.gte(1e6)) {
         getEl('nuclearreach').style.display = 'none';
         getEl('nuclearshow').style.display = 'block';
      }
      if (player.alphaNum.gte(1e6)) {
         getEl('nuclearalphareach').style.display = 'none';
         getEl('nuclearalphashow').style.display = 'block';
      }
      if (player.num.gte(1e9)) {
         getEl('bangreach').style.display = 'none';
         getEl('bangshow').style.display = 'block';
      }
      getEl('counter').textContent = formatb(player.num) + ' particles';
      getEl('alphacounter').textContent =
         formatb(player.alphaNum) + ' Alpha particles';
   }
}

function pcatest(): void {
   if (getUpgradeTimesBought('unlockpca').eq(1)) {
      getEl('pcashow').style.display = 'block';
      getEl('divunlockpca').style.display = 'none';
      getEl('divunlockpcabutton').style.display = 'none';
      if (player.pcaToggle === true) {
         if (player.pcaTimeLeft === 0) {
            player.pcaTimeLeft = player.pcaTime;
            makechunk();
         }
         player.pcaTimeLeft -= 1;
         getEl('untilpca').textContent =
            format(player.pcaTimeLeft / 10) + ' left until next autobuy';
      }
   }
}

function batest(): void {
   if (getUpgradeTimesBought('baunlock').eq(1)) {
      getEl('bashow').style.display = 'block';
      getEl('divbau').style.display = 'none';
      getEl('divbauextra').style.display = 'none';
      getEl('baunlockbutton').style.display = 'none';
      if (player.baToggle === true) {
         if (player.baTimeLeft === 0) {
            player.baTimeLeft = player.baTime;
            bang();
         }
         player.baTimeLeft -= 1;
         getEl('untilba').textContent =
            format(player.baTimeLeft) + ' left until next autobuy';
      }
   }
}

function savinginloop(): void {
   playerSettings.autoSaveDelay -= 1;
   if (playerSettings.autoSaveDelay === 0) {
      playerSettings.autoSaveDelay = playerSettings.autoSaveSet;
      save();
   }
}

//game loop
setInterval(() => {
   passiveUnlockDisplay();
   pcatest();
   batest();
   fgbtest();
   getEl('stat').textContent = getSaveString()
      .replace(/","/g, '",\n"')
      .replace(/},"/g, '",\n"');
   savinginloop();
}, 100);

function saveReplace(_key: string, value: unknown): unknown {
   if (value instanceof Decimal) {
      return 'D#' + value.toString();
   }
   return value;
}

function saveSettings(): void {
   const settingfile = JSON.stringify(playerSettings);
   localStorage.setItem(window.location.pathname + "settings", settingfile);
}
window.saveSettings = saveSettings;


function save(): string {
   const savefile = JSON.stringify(player, saveReplace);
   localStorage.setItem(window.location.pathname, savefile);
   saveSettings();
   return savefile;
}
window.save = save;

window.reset = function (): void {
   saveSettings();
   localStorage.removeItem(window.location.pathname);
   window.location.reload();
};
console.log(window.location.pathname);
