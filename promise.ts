type Resolve = void;
type Reject = void;
class Then {
  resolve: Resolve;
  reject: Reject;
  constructor(private onResolve: void, private onReject: void) {
    this.resolve = onResolve;
    this.reject = onReject;
  }
}

class Promises {
  _thens: Array<any>;
  constructor(private thens: any) {
    this._thens = thens;
  }

  public then(onResolve: void, onReject: void): void {
    this._thens.push(new Then(onResolve, onReject));
  }

  public resolve(val) {
    this._complete("resolve", val);
  }

  public reject(ex) {
    this._complete("reject", ex);
  }

  private _complete(which: string, arg) {
    // switch over to sync then()
    this.then =
      which === "resolve"
        ? (resolve: any, reject: any) => {
            resolve && resolve(arg);
          }
        : (resolve: any, reject: any) => {
            reject && reject(arg);
          };
    // disallow multiple calls to resolve or reject
    this.resolve = this.reject = function() {
      throw new Error("Promise already completed.");
    };
    // complete all waiting (async) then()s
    var aThen,
      i = 0;
    while ((aThen = this._thens[i++])) {
      aThen[which] && aThen[which](arg);
    }
    delete this._thens;
  }
}
