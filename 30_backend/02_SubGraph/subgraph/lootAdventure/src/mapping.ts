import {
  AccountCreated as AccountCreatedEvent,
} from "../generated/ERC6551Registry/ERC6551Registry"

import { 
  Transfer as TransferSoulLootNftEvent,
  SoulLootNft as SoulLootNftContract
} from "../generated/SoulLootNft/SoulLootNft"

import { 
  Transfer as TransferRlootNftEvent,
  RLootNft as RLootNftContract
} from "../generated/RLootNft/RLootNft"

import { 
  UpdateEquips as UpdateEquipsEvent,
} from "../generated/SoulControler/SoulControler"

import { 
  updateEquipment as UpdateEquipmentEvent,
} from "../generated/EquipmentNft/EquipmentNft"

import { 
  TransferSingle as TransferArtifactNftEvent,
} from "../generated/ArtifactNft/ArtifactNft"

import { 
  TransferSingle as TransferJobNftEvent,
} from "../generated/JobNft/JobNft"

import {
  SoulLootNftAccount,
  SoulLootNft,
  User,
  RLootNft,
  Equipped,
  Equipment,
  ArtifactNftMinted
} from "../generated/schema"

export function handleAccountCreated(event: AccountCreatedEvent): void {
  let soulLootNftAccount = new SoulLootNftAccount(
    event.params.account.toHexString()
  )
  soulLootNftAccount.save()
  let soulLootNft = SoulLootNft.load(
    event.params.tokenId.toString()
  )
  if(!soulLootNft) {
    soulLootNft = new SoulLootNft(
      event.params.tokenId.toString()
    )
  }
  soulLootNft.account = event.params.account.toHexString();
  soulLootNft.save();
}

export function handleTransferSoulLootNft(event: TransferSoulLootNftEvent): void {
  let user = User.load(event.params.to.toHexString());
  if(!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
  let soulLootNft = SoulLootNft.load(
    event.params.tokenId.toString()
  )
  if(!soulLootNft) {
    soulLootNft = new SoulLootNft(
      event.params.tokenId.toString()
    )
  }
  let soulLootNftContract = SoulLootNftContract.bind(event.address);
  soulLootNft.hp = soulLootNftContract.getMaxHp(event.params.tokenId);
  soulLootNft.atk = soulLootNftContract.getAttack(event.params.tokenId);
  soulLootNft.def = soulLootNftContract.getDefence(event.params.tokenId);
  soulLootNft.turn = soulLootNftContract.getTurn(event.params.tokenId);
  soulLootNft.rec = soulLootNftContract.getRecovery(event.params.tokenId);
  soulLootNft.owner = event.params.to.toHexString();
  soulLootNft.save();
}

export function handleTransferRLootNft(event: TransferRlootNftEvent): void {
  let user = User.load(event.params.to.toHexString());
  if(!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
  let rLootNft = RLootNft.load(
    event.params.tokenId.toString()
  )
  if(!rLootNft) {
    rLootNft = new RLootNft(
      event.params.tokenId.toString()
    )
  }
  let rLootNftContract = RLootNftContract.bind(event.address);
  let tokenURI = rLootNftContract.tokenURI(event.params.tokenId);
  rLootNft.tokenURI = tokenURI;
  rLootNft.owner = event.params.to.toHexString();
  rLootNft.save();
}

export function handleUpdateEquips(event: UpdateEquipsEvent): void {
  let equipped = new Equipped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  equipped.weapon = event.params.equips.weapon.toString();
  equipped.cheastArmor = event.params.equips.cheastArmor.toString();
  equipped.headArmor = event.params.equips.headArmor.toString();
  equipped.waistArmor = event.params.equips.waistArmor.toString();
  equipped.footArmor = event.params.equips.footArmor.toString();
  equipped.handArmor = event.params.equips.handArmor.toString();
  equipped.necklace = event.params.equips.necklace.toString();
  equipped.ring = event.params.equips.ring.toString();
  equipped.save();
  let soulLootNftAccount = SoulLootNftAccount.load(event.params.owner.toHexString());
  if(!soulLootNftAccount) {
    soulLootNftAccount = new SoulLootNftAccount(event.params.owner.toHexString());
    soulLootNftAccount.save();
  }
  soulLootNftAccount.equipped = event.transaction.hash.concatI32(event.logIndex.toI32());
  soulLootNftAccount.save();
}

export function handleUpdateEquipment(event: UpdateEquipmentEvent): void {
  let equipment = Equipment.load(event.params._tokenId.toString());
  if(!equipment) {
    equipment = new Equipment(event.params._tokenId.toString());
  }
  equipment.level = event.params._level;
  equipment.rarity = event.params._rarity;
  equipment.save();
}

export function handleTransferArtifactNft(event: TransferArtifactNftEvent): void {
  let artifactNftMinted = new ArtifactNftMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  artifactNftMinted.tokenId = event.params.id;
  artifactNftMinted.owner = event.params.to.toHexString();
  artifactNftMinted.save();
}

export function handleTransferJobNft(event: TransferJobNftEvent): void {
  let soulLootNftAccount = SoulLootNftAccount.load(event.params.to.toHexString());
  if(soulLootNftAccount) {
    soulLootNftAccount.job = event.params.id;
    soulLootNftAccount.save();
  }
}
