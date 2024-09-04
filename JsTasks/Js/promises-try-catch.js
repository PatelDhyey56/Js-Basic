var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let Myage = 21;
let promises = new Promise((resolve, reject) => Myage >= 18 ? resolve("Drive :)") : reject("Drive But Safely"));
let promises2 = new Promise((resolve, reject) => Myage > 15 && Myage < 18 ? reject("Drive Safely") : resolve(promises));
let promises3 = new Promise((resolve, reject) => Myage > 10 ? resolve(promises2) : reject("Drive :)"));
promises3
    .then((p3) => {
    console.log(p3);
})
    .catch((e) => console.log(`\nError : ${e}`));
console.log("Try Catch -->\n");
(function Try_Catch() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data1 = yield promises3;
            console.log(data1);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            console.log("finnally");
        }
    });
})();
