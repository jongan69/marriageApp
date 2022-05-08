// alchemy-nft-api/fetch-script.js
import 'isomorphic-fetch';

const getList = async (req, res) => {
  // Setup request options:
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  // Replace with your Alchemy API key:
  const apiKey = 'kDK2eoBKMgQ6IMQfaoXZW4l-th7wYzeE';
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;
  // Replace with the wallet address you want to query:
  const ownerAddr = req.address;
  const fetchURL = `${baseURL}?owner=${ownerAddr}`;

  // Make the request and print the formatted response:
  fetch(fetchURL, requestOptions)
    .then(response => response.json())
    .then(response => JSON.stringify(response, null, 2))
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

export default getList;
