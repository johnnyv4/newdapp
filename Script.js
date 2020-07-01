if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/bb8f432a6cd34435811f2c72a378d25a'));
  }

/*
if (window.web3){
    window.web3 = new Web3(ethereum);
    console.log(window.web3);

}
*/


window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            console.log("await ethereum enable");
            // Acccounts now exposed
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});



var contractAddress = '0x5008afCBAB37b3b6625C4901A63704c18a5b598F'; // Add Your Contract address here!!!

var contractAbi = [
              {
                "constant": false,
                "inputs": [
                  {
                    "internalType": "string",
                    "name": "_where",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "_what",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "_howmuch",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "_when",
                    "type": "string"
                  }
                ],
                "name": "setProduct",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "constant": true,
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "_index",
                    "type": "uint256"
                  }
                ],
                "name": "getProduct",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
              }
            ];

var contract = new web3.eth.Contract(contractAbi, contractAddress);

//$('#output_result').html("works");
//def_account = web3.eth.defaultAccount;
//web3.eth.defaultAccount = "0x3D768Dc196d5ea92370Aaa7Bd02Da103A12D9711";

function getAccounts(callback) {
    web3.eth.getAccounts((error,result) => {
        if (error) {
            console.log(error);
        } else {
            callback(result);
        }
    });
};
var def_account = "";

getAccounts(function(result) {
    //console.log(result[0]);
    def_account = result[0];
});

console.log(def_account);

//def_account = web3.eth.defaultAccount;
//console.log(def_account);


$('form.input').on('submit', function(event) {
  event.preventDefault();
  where = document.getElementById('where').value;
  what = document.getElementById("what").value;
  quantity = document.getElementById('quantity').value;
  when = document.getElementById('when').value;

  web3.eth.getAccounts().then(function(accounts) {
    contract.methods.setProduct(where,what,quantity,when).send({ from: accounts[0], gas: 150000 }).on('receipt', function(receipt){
  //  contract.methods.setProduct(where,what,quantity,when).send({gas: 150000 }).on('receipt', function(receipt){

      tx_hash = receipt.transactionHash
      blk_hash = receipt.blockHash
      gas_used = receipt.gasUsed
      $('#tx_hash').html("Transaction hash: "+tx_hash);
      $('#blk_hash').html("Block Hash: "+blk_hash);
      $('#gas_used').html("Gas Used: "+gas_used);

    });
  });
});


$('form.get_data').on('submit', function(event) {
  event.preventDefault();
  index = document.getElementById('index').value;
  contract.methods.getProduct(index).call(function(err,result){
    where = result[0];
    what = result[1];
    quantity = result[2];
    when = result[3];
    $('#output_where').html("Where: "+where);
    $('#output_what').html("What: "+what);
    $('#output_quantity').html('Quantity: '+quantity);
    $('#output_when').html('When: '+when);
    });
  });

     /* contract.methods.greet().call(function(err, result) {
      //console.log(err, result)
      $('#greeting').html(result);
      });

      */