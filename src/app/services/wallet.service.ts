import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Wallet } from '../models/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private af: AngularFirestore) { }

  createWallet(id: string) {
    return this.af.collection('wallet').doc(id).set(
      {
        uid: id,
        amountGold: 0,
        amountEmerald: 0,
        amountPlatinium: 0
      }
    )
  }

  getWallet(id: string) {
    return this.af.collection('wallet').doc<Wallet>(id).snapshotChanges();
  }

  updateGold(id: string, amount: number, currentAmount: number, type: string, param: string) {
    let payload: any = { };
    if(type === 'add') {
      payload[`${param}`] = currentAmount + amount;
    } else if(type === 'sub') {
      payload[`${param}`] = currentAmount - amount;
    } else if(type === 'set') {
      payload[`${param}`] = amount;
    }
    return this.af.collection('wallet').doc(id).update(payload)
  }

}
