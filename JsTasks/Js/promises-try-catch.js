var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let Myage = 10;
let promises = new Promise((resolve, reject) => Myage > 18 ? resolve("Drive") : reject("Dont Drive"));
promises.then((a) => console.log(a)).catch((e) => console.log(e));
console.log("Try Catch -->\n");
function Try_Catch() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield promises;
            console.log(data);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            console.log("finnally");
        }
    });
}
Try_Catch();
