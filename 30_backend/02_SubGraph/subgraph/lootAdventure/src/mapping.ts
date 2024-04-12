import { BigInt } from "@graphprotocol/graph-ts";

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
  TransferSingle as TransferSingleEquipmentEvent,
  TransferBatch as TransferBatchEquipmentEvent,
  EquipmentNft as EquipmentNftContract
  // EquipmentNft as EquipmentNftContract
} from "../generated/EquipmentNft/EquipmentNft"

import { 
  TransferSingle as TransferArtifactNftEvent,
} from "../generated/ArtifactNft/ArtifactNft"

import { 
  TransferSingle as TransferJobNftEvent,
} from "../generated/JobNft/JobNft"

import { 
  Transfer as TransferLaCoinEvent,
} from "../generated/LaCoin/LaCoin"

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
  soulLootNft.seed = soulLootNftContract.getSeed(event.params.tokenId);
  soulLootNft.rTokenId = soulLootNftContract.getRTokenId(event.params.tokenId);
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
  rLootNft.hp = rLootNftContract.getMaxHp(event.params.tokenId);
  rLootNft.atk = rLootNftContract.getAttack(event.params.tokenId);
  rLootNft.def = rLootNftContract.getDefence(event.params.tokenId);
  rLootNft.turn = rLootNftContract.getTurn(event.params.tokenId);
  rLootNft.rec = rLootNftContract.getRecovery(event.params.tokenId);
  rLootNft.weapon = rLootNftContract.getWeapon(event.params.tokenId);
  rLootNft.chest = rLootNftContract.getChest(event.params.tokenId);
  rLootNft.head = rLootNftContract.getHead(event.params.tokenId);
  rLootNft.waist = rLootNftContract.getWaist(event.params.tokenId);
  rLootNft.foot = rLootNftContract.getFoot(event.params.tokenId);
  rLootNft.hand = rLootNftContract.getHand(event.params.tokenId);
  rLootNft.neck = rLootNftContract.getNeck(event.params.tokenId);
  rLootNft.ring = rLootNftContract.getRing(event.params.tokenId);
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

  let equipmentNftContract = EquipmentNftContract.bind(event.address);
  equipment.coinToLevelUp = equipmentNftContract.getAmountByToken(event.params._tokenId);

  equipment.level = event.params._level;
  equipment.rarity = event.params._rarity;
  equipment.name = event.params._name;
  equipment.type = event.params._equipmentType
  equipment.save();
}

export function handleTransferSingleEquipment(event: TransferSingleEquipmentEvent): void {
  let equipment = Equipment.load(event.params.id.toString());
  if(!equipment) {
    equipment = new Equipment(event.params.id.toString());
  } 
  equipment.owner = event.params.to.toHexString();
  equipment.save();
}

export function handleTransferBatchEquipment(event: TransferBatchEquipmentEvent): void {
  for(var i = 0; i < event.params.ids.length; i++) {
    let id = event.params.ids[i].toString();
    let equipment = Equipment.load(id);
    if(!equipment) {
      equipment = new Equipment(id);
    } 
    equipment.owner = event.params.to.toHexString();
    equipment.save();   
  }
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

export function handleTransferLaCoin(event: TransferLaCoinEvent): void {
  let fromUser = User.load(event.params.from.toHexString());
  if(!fromUser) {
    fromUser = new User(event.params.from.toHexString());
  }
  let toUser = User.load(event.params.to.toHexString());
  if(!toUser) {
    toUser = new User(event.params.to.toHexString());
  }
  if(!fromUser.coin) {
    fromUser.coin = BigInt.fromI32(0);
  }
  if(!toUser.coin) {
    toUser.coin = BigInt.fromI32(0);
  }
  fromUser.coin = (fromUser.coin as BigInt).minus(event.params.value);
  toUser.coin = (toUser.coin as BigInt).plus(event.params.value);
  fromUser.save();
  toUser.save();
}
