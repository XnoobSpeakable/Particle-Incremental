import { formatb , getEl, D } from "./util";
import {
  player,
  getUpgradeTimesBought,
  getUpgradeCost,
  setUpgradeCost,
  UpgradeName
} from "./player";
import Decimal from "break_eternity.js";

// eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
declare var window: Window & Record<string, unknown>

export const currencyName = {
  num: "",
  alphaNum: " Alpha",
  omegaBase: " "
};

export type CurrencyName = keyof typeof currencyName;

export function UpdateCostVal(
  elementID: string,
  variable: Decimal,
  currency: CurrencyName = "num"
) {
  getEl(elementID).textContent =
    "Cost: " + formatb(variable) + currencyName[currency];
}

export const upgrades = {
  gen: {
    scaleFunction: scaleGen,
    costDiv: "divgencost",
    currency: "num"
  },
  bb: {
    scaleFunction: scaleMultiplier(D(2)),
    costDiv: "divbbcost",
    currency: "num"
  },
  speed: {
    scaleFunction: scaleSpeed,
    costDiv: "divspeedcost",
    currency: "num"
  },
  mbup: {
    scaleFunction: scaleMultiplier(D(1.5)),
    costDiv: "divmbupcost",
    currency: "num"
  },
  mbmult: {
    scaleFunction: scaleMultiplier(D(2)),
    costDiv: "divmbmultcost",
    currency: "num"
  },
  unlockgb: {
    scaleFunction: scaleMultiplier(D(Infinity)),
    costDiv: "divgenunlockcost",
    currency: "num"
  },
  gbupt: {
    scaleFunction: scaleMultiplier(D(5)),
    costDiv: "divgbuptcost",
    currency: "num",
    extra: GBTExtra()
  },
  gbupm: {
    scaleFunction: scaleMultiplier(D(5)),
    costDiv: "divgbupmcost",
    currency: "num",
    extra: GBMExtra()
  },
  nuclearbuy: {
    scaleFunction: scaleMultiplier(D(7)),
    costDiv: "divnuclearcost",
    currency: "num",
    extra: NBExtra()
  },
  alphaacc: {
    scaleFunction: scaleMultiplier(D(1000)),
    costDiv: "divalphaacceleratorcost",
    currency: "num"
  },
  tb: {
    scaleFunction: scaleMultiplier(D(4)),
    costDiv: "divthreeboostcost",
    currency: "alphaNum"
  },
  perbang: {
    scaleFunction: scaleMultiplier(D(4)),
    costDiv: "divperbangcost",
    currency: "alphaNum"
  },
  bangspeed: {
    scaleFunction: scaleBangSpeed,
    costDiv: "divbangspeedcost",
    currency: "alphaNum"
  },
  unlockpca: {
    scaleFunction: scaleMultiplier(D(Infinity)),
    costDiv: "divunlockpca",
    currency: "alphaNum"
  },
  upgradepca: {
    scaleFunction: scaleMultiplier(D(3)),
    costDiv: "divupgradepcacost",
    currency: "alphaNum",
    extra: PCAExtra()
  },
  boosterup: {
    scaleFunction: scaleMultiplier(D(10)),
    costDiv: "divboosterupcost",
    currency: "alphaNum"
  },
  boosteruppercent: {
    scaleFunction: scaleMultiplier(D(10)),
    costDiv: "divboosteruppercentcost",
    currency: "alphaNum"
  },
  nuclearalphabuy: {
    scaleFunction: scaleMultiplier(D(7)),
    costDiv: "divnuclearalphacost",
    currency: "alphaNum",
    extra: NABExtra()
  },
  gboostdouble: {
    scaleFunction: scaleMultiplier(D(2)),
    costDiv: "gboostdouble",
    currency: "alphaNum",
    extra: GBDExtra()
  },
  alphamachinedouble: {
    scaleFunction: scaleMultiplier(D(3)),
    costDiv: "alphamachinedouble",
    currency: "alphaNum"
  },
  baunlock: {
    scaleFunction: scaleMultiplier(D(Infinity)),
    costDiv: "divbau",
    currency: "omegaBase"
  },
  upgradeba: {
    scaleFunction: scaleBA,
    costDiv: "divupgradeba",
    currency: "omegaBase"
  }
} as const;

export function scaleMultiplier(multiplier: Decimal): (upgradeName: UpgradeName) => void {
  return function (upgradeName: UpgradeName) {
    setUpgradeCost(upgradeName, getUpgradeCost(upgradeName).times(multiplier));
  };
}

export function scaleBangSpeed(upgradeName: UpgradeName): void {
  if (getUpgradeTimesBought(upgradeName).lte(3)) {
    scaleMultiplier(D(2))(upgradeName);
  } else {
    scaleMultiplier(D(5))(upgradeName);
  }
}

export function scaleSpeed(upgradeName: UpgradeName): void {
  if(getUpgradeTimesBought(upgradeName).lt(10)) {
    setUpgradeCost(upgradeName, D(50))
  }
  else if(getUpgradeTimesBought(upgradeName).gte(10) && getUpgradeTimesBought(upgradeName).lte(1000)) {
    setUpgradeCost(upgradeName, (getUpgradeTimesBought(upgradeName).times(10).plus(100).times(getUpgradeTimesBought(upgradeName).log10())));
  }
  else {
    scaleMultiplier(D(1.1))(upgradeName)
  }
}

export function scaleGen(upgradeName: UpgradeName): void {
  if (getUpgradeCost(upgradeName).eq(0)) {
    setUpgradeCost(upgradeName, D(1000));
  } else {
    scaleMultiplier(D(4))(upgradeName);
  }
}

export function scaleBA(upgradeName: UpgradeName): void {
  setUpgradeCost(upgradeName, getUpgradeCost(upgradeName).plus(1));
}

export function GBTExtra(): void {
  player.gbTimeLeftCon = player.gbTimeLeftCon.plus(
    D(2).pow(getUpgradeTimesBought("gboostdouble")).times(20)
  );
  player.gbTimeLeft = new Decimal(0);
  player.gbTimeLeft = player.gbTimeLeftCon;
}

export function GBMExtra(): void {
  player.gbTimeLeft = new Decimal(0);
  player.gbTimeLeft = player.gbTimeLeftCon;
}

export function GBDExtra(): void {
  player.gbTimeLeftCon = player.gbTimeLeftCon.times(2);
  player.gbTimeLeft = new Decimal(0);
  player.gbTimeLeft = player.gbTimeLeftCon;
}

export function NBExtra(): void {  
  getEl("divnp").textContent =
    "Nuclear Particles: " + formatb(getUpgradeTimesBought("nuclearbuy"));
}

export function NABExtra(): void {  
  getEl("divnap").textContent =
    "Nuclear Particles: " + formatb(getUpgradeTimesBought("nuclearalphabuy"));
}

export function PCAExtra(): void {
  if (getUpgradeTimesBought("upgradepca").lte(4)) {
    player.pcaTime = Math.ceil(player.pcaTime / 2);
  } else {
    player.pcaTime = (D(10).div(getUpgradeTimesBought("upgradepca").minus(3))).ceil().toNumber()
  }
}

export function BAExtra(): void {
  if (getUpgradeTimesBought("upgradeba").lte(4)) {
    player.baTime = Math.ceil(player.baTime / 2);
  } else {
    player.baTime = (D(10).div(getUpgradeTimesBought("upgradeba").minus(3))).ceil().toNumber()
  }
}

function buyUpgrade(upgradeName: UpgradeName): void {
  const upgrade = upgrades[upgradeName];
  const oldCost = getUpgradeCost(upgradeName);
  if (player[upgrade.currency].gte(oldCost)) {
    player.upgrades[upgradeName].timesBought = player.upgrades[upgradeName].timesBought.plus(1);
    player[upgrade.currency] = player[upgrade.currency].minus(oldCost);
    upgrade.scaleFunction(upgradeName);
    //upgrade.extra(upgradeName); //TODO: fix the 2 errors here
    UpdateCostVal(
      upgrade.costDiv,
      getUpgradeCost(upgradeName),
      upgrade.currency
    );
  }
}
window.buyUpgrade = buyUpgrade;

window.buyTenSpeed = function (): void {
  while(player.num.gte(getUpgradeCost('speed'))) {
    buyUpgrade('speed');
  }
}

