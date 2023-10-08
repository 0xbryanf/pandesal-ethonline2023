"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var protocol_kit_1 = require("@safe-global/protocol-kit");
require("dotenv/config");
var api_kit_1 = require("@safe-global/api-kit");
var protocol_kit_2 = require("@safe-global/protocol-kit");
/**
 * @dev Initialization of Signers, Providers and EthAdapter.
 * We will be creating a Safe on the Goerli testnet.
 */
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var RPC_URL, provider, owner1Signer, owner2Signer, owner3Signer, ethAdapterOwner1, txServiceUrl, safeService, safeFactory, safeAccountConfig, _a, saltNonce, safeSdk, safeSdkOwner1, safeAddress, safeAmount, transactionParameters, tx, destination, amount, safeTransactionData, safeTransaction, safeTxHash, senderSignature, _b, _c, pendingTransactions, transaction, transactionHash, ethAdapterOwner2, safeSdkOwner2, signature, response, safeTransaction2, ethAdapterOwner3, safeSdkOwner3, executeTxResponse, receipt, afterBalance;
    var _d, _e;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                RPC_URL = process.env.ALCHEMY_GOERLI_API;
                provider = new ethers_1.ethers.providers.JsonRpcProvider(RPC_URL);
                owner1Signer = new ethers_1.ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY, provider);
                owner2Signer = new ethers_1.ethers.Wallet(process.env.OWNER_2_PRIVATE_KEY, provider);
                owner3Signer = new ethers_1.ethers.Wallet(process.env.OWNER_3_PRIVATE_KEY, provider);
                ethAdapterOwner1 = new protocol_kit_1.EthersAdapter({
                    ethers: ethers_1.ethers,
                    signerOrProvider: owner1Signer
                });
                txServiceUrl = 'https://safe-transaction-goerli.safe.global';
                safeService = new api_kit_1.default({ txServiceUrl: txServiceUrl, ethAdapter: ethAdapterOwner1 });
                return [4 /*yield*/, protocol_kit_2.SafeFactory.create({ ethAdapter: ethAdapterOwner1 })];
            case 1:
                safeFactory = _g.sent();
                _d = {};
                return [4 /*yield*/, owner1Signer.getAddress()];
            case 2:
                _a = [
                    _g.sent()
                ];
                return [4 /*yield*/, owner2Signer.getAddress()];
            case 3:
                _a = _a.concat([
                    _g.sent()
                ]);
                return [4 /*yield*/, owner3Signer.getAddress()];
            case 4:
                safeAccountConfig = (_d.owners = _a.concat([
                    _g.sent()
                ]),
                    _d.threshold = 2,
                    _d);
                saltNonce = Date.now().toString();
                return [4 /*yield*/, safeFactory.predictSafeAddress(safeAccountConfig, saltNonce)];
            case 5:
                safeSdk = _g.sent();
                return [4 /*yield*/, safeFactory.deploySafe({ safeAccountConfig: safeAccountConfig, saltNonce: saltNonce })];
            case 6:
                safeSdkOwner1 = _g.sent();
                return [4 /*yield*/, safeSdkOwner1.getAddress()];
            case 7:
                safeAddress = _g.sent();
                if (safeSdk === safeAddress) {
                    console.log(true, "The deployed safe is similar to predicted safe");
                }
                else {
                    console.log(false, "The safe  that was deployed is different to the predicted safe.");
                }
                console.log('Your Safe has been deployed:');
                console.log("https://goerli.etherscan.io/address/".concat(safeAddress));
                console.log("https://app.safe.global/gor:".concat(safeAddress));
                safeAmount = ethers_1.ethers.utils.parseUnits('0.01', 'ether').toHexString();
                transactionParameters = {
                    to: safeAddress,
                    value: safeAmount
                };
                return [4 /*yield*/, owner1Signer.sendTransaction(transactionParameters)];
            case 8:
                tx = _g.sent();
                console.log('Fundraising.');
                console.log("Deposit transaction: https://goerli.etherscan.io/tx/".concat(tx.hash));
                destination = "0x01195c0Ff074973773F3546a2f4b8E9C5B08Aad9";
                amount = ethers_1.ethers.utils.parseUnits('0.005', 'ether').toString();
                safeTransactionData = {
                    to: destination,
                    data: '0x',
                    value: amount
                };
                return [4 /*yield*/, safeSdkOwner1.createTransaction({ safeTransactionData: safeTransactionData })];
            case 9:
                safeTransaction = _g.sent();
                console.log('safeTransaction:', safeTransaction);
                return [4 /*yield*/, safeSdkOwner1.getTransactionHash(safeTransaction)];
            case 10:
                safeTxHash = _g.sent();
                console.log('safeTxHash:', safeTxHash);
                return [4 /*yield*/, safeSdkOwner1.signTransactionHash(safeTxHash)];
            case 11:
                senderSignature = _g.sent();
                console.log('senderSignature', senderSignature);
                _c = (_b = safeService).proposeTransaction;
                _e = {
                    safeAddress: safeAddress,
                    safeTransactionData: safeTransaction.data,
                    safeTxHash: safeTxHash
                };
                return [4 /*yield*/, owner1Signer.getAddress()];
            case 12: return [4 /*yield*/, _c.apply(_b, [(_e.senderAddress = _g.sent(),
                        _e.senderSignature = senderSignature.data,
                        _e)])
                // Get Pending transactions
            ];
            case 13:
                _g.sent();
                return [4 /*yield*/, safeService.getPendingTransactions(safeAddress)];
            case 14:
                pendingTransactions = (_g.sent()).results;
                console.log('pendingTransactions', pendingTransactions);
                transaction = pendingTransactions[0];
                transactionHash = transaction.safeTxHash;
                console.log('transactionHash', transactionHash);
                ethAdapterOwner2 = new protocol_kit_1.EthersAdapter({
                    ethers: ethers_1.ethers,
                    signerOrProvider: owner2Signer
                });
                return [4 /*yield*/, protocol_kit_1.default.create({
                        ethAdapter: ethAdapterOwner2,
                        safeAddress: safeAddress
                    })];
            case 15:
                safeSdkOwner2 = _g.sent();
                return [4 /*yield*/, safeSdkOwner2.signTransactionHash(transactionHash)];
            case 16:
                signature = _g.sent();
                console.log('signature:', signature);
                return [4 /*yield*/, safeService.confirmTransaction(transactionHash, signature.data)];
            case 17:
                response = _g.sent();
                console.log('response', response);
                return [4 /*yield*/, safeService.getTransaction(transactionHash)];
            case 18:
                safeTransaction2 = _g.sent();
                console.log('safeTransaction2', safeTransaction2);
                ethAdapterOwner3 = new protocol_kit_1.EthersAdapter({
                    ethers: ethers_1.ethers,
                    signerOrProvider: owner2Signer
                });
                return [4 /*yield*/, protocol_kit_1.default.create({
                        ethAdapter: ethAdapterOwner3,
                        safeAddress: safeAddress
                    })];
            case 19:
                safeSdkOwner3 = _g.sent();
                return [4 /*yield*/, safeSdkOwner3.executeTransaction(safeTransaction2)];
            case 20:
                executeTxResponse = _g.sent();
                console.log('executeTxResponse', executeTxResponse);
                return [4 /*yield*/, ((_f = executeTxResponse.transactionResponse) === null || _f === void 0 ? void 0 : _f.wait())];
            case 21:
                receipt = _g.sent();
                console.log('receipt', receipt);
                console.log('Transaction executed:');
                console.log("https://goerli.etherscan.io/tx/".concat(receipt === null || receipt === void 0 ? void 0 : receipt.transactionHash));
                return [4 /*yield*/, safeSdkOwner1.getBalance()];
            case 22:
                afterBalance = _g.sent();
                console.log("The final balance of the Safe: ".concat(ethers_1.ethers.utils.formatUnits(afterBalance, 'ether'), " ETH"));
                return [2 /*return*/];
        }
    });
}); };
main()
    .then(function () { return process.exit(0); })
    .catch(function (error) {
    console.error(error);
    process.exit(1);
});
