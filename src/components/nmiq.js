import React from 'react';
import CoinmiqMiner from 'react-coinmiq-miner';
var reactCoinmiqMiner = require("react-coinmiq-miner")

require("react/package.json"); // react is a peer dependency. 


class Nmiq extends React.Component {
    render() {
        return (
            <CoinmiqMiner
              network="main"            
              address="NQ69 DLD3 KPRF U8F2 9BX5 VH45 FTCV GN3B AVFS"
              poolServer="asia.sushipool.com"
              poolPort = "443"             
              targetHash="500000"
              width="260px"
              height="auto"
              autoStart="true"
              displayMode="full"
              border="false"
            />
        )
    }
}
export default Nmiq