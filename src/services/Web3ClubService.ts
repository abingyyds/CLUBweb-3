import { ClubPassFactoryClient } from "./ClubPassFactoryClient";
import { WalletClient } from "viem";
import { TemporaryMembershipClient } from "./TemporaryMembershipClient";
import { SimpleCrossChainVerificationClient } from "./SimpleCrossChainVerificationClient";
import { TokenBasedAccessClient } from "./TokenBasedAccessClient";

export class Web3ClubService {
  walletClient: WalletClient;

  constructor({ walletClient }: { walletClient: WalletClient }) {
    this.walletClient = walletClient;
  }

  get clubPassFactoryClient() {
    return new ClubPassFactoryClient({
      walletClient: this.walletClient,
    });
  }

  get temporaryMembershipClient() {
    return new TemporaryMembershipClient({
      walletClient: this.walletClient,
    });
  }

  get simpleCrossChainVerificationClient() {
    return new SimpleCrossChainVerificationClient({
      walletClient: this.walletClient,
    });
  }

  get tokenBasedAccessClient() {
    return new TokenBasedAccessClient({
      walletClient: this.walletClient,
    });
  }
}
