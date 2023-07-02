import { type AppType } from "next/dist/shared/lib/utils";
import { NostrAccountProvider } from "~/contexts/nostrAccount";
import { WebLNProvider } from "~/contexts/webln";

import "~/styles/globals.css";
import { NostrRelayProvider } from "~/contexts/nostrRelay";
import { BallotProvider } from "contexts/Ballot";

const relayUrls = [
  // "wss://nostr1.tunnelsats.com",
  "wss://nostr-01.bolt.observer",
  "wss://nostr-pub.wellorder.net",
  // "wss://nostr-relay.wlvs.space",
  "wss://nostr.bitcoiner.social",
  // "wss://relay.damus.io",
  "wss://relay.nostr.info",
  // "wss://relayer.fiatjaf.com",
  // "wss://offchain.pub/",
  "wss://nos.lol/",
  "wss://nostr.wine/",
];

const NostrApp: AppType = ({ Component, pageProps }) => {
  return (
    <NostrRelayProvider relayUrls={relayUrls}>
      <WebLNProvider>
        <NostrAccountProvider>
          <BallotProvider>
            <Component {...pageProps} />
          </BallotProvider>
        </NostrAccountProvider>
      </WebLNProvider>
    </NostrRelayProvider>
  );
};

export default NostrApp;
