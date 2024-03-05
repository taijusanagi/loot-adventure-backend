import { ethereum,Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  AccountCreated as AccountCreatedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent
} from "../generated/ERC6551Registry/ERC6551Registry"
import {
  AccountCreated,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TbaList,
} from "../generated/schema"
// import { SoulLootNft } from '../generated/SoulLootNft/SoulLootNft'

// function getLootNftOwner(address_: Address, tokenId_: BigInt): Bytes {
//   const _instance = SoulLootNft.bind(address_)
//   const _onwer = _instance.try_ownerOf(tokenId_)
//   return _onwer.value
// }

export function handleAccountCreated(event: AccountCreatedEvent): void {
  let entity = new AccountCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.implementation = event.params.implementation
  entity.chainId = event.params.chainId
  entity.tokenContract = event.params.tokenContract
  entity.tokenId = event.params.tokenId
  entity.salt = event.params.salt
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()

  let entityList = new TbaList(
    event.params.account
  )
  entityList.implementation = event.params.implementation
  entityList.chainId = event.params.chainId
  entityList.tokenContract = event.params.tokenContract
  entityList.tokenId = event.params.tokenId
  entityList.salt = event.params.salt
  // entityList.owner = getLootNftOwner(event.params.tokenContract, event.params.tokenId)
  entityList.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
