import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  wallet: any = "";
  walletExists: boolean = false;

  constructor(private authService: AuthService, private walletService: WalletService) { }

  ngOnInit(): void {
    this.walletService.getWallet(this.authService.getCurrentLoggedIn()).subscribe((res) => {
      this.wallet = res.payload.data();
      this.walletExists = res.payload.exists;
      console.log(this.walletExists);
      if(!this.walletExists) {
        console.log('got in');
        this.walletService.createWallet(this.authService.getCurrentLoggedIn());
      }
    });
  }

  addGold() {
    this.walletService.updateGold(this.authService.getCurrentLoggedIn(), 100, this.wallet.amountGold, "add", "amountGold");
  }

}
