// INTERFACE

interface NextObserver<T> {
  closed?: boolean;
  next: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
}
interface ErrorObserver<T> {
  closed?: boolean;
  next?: (value: T) => void;
  error: (err: any) => void;
  complete?: () => void;
}
interface CompletionObserver<T> {
  closed?: boolean;
  next?: (value: T) => void;
  error?: (err: any) => void;
  complete: () => void;
}
interface Unsubscribable {
  unsubscribe(): void;
}
interface Subscribable<T>{
  subscirbe(observer?:PartialObserver<T>): Unsubscribable;
  subscribe(next: (value: T) => void, error: null | undefined, complete: () => void): Unsubscribable;
  subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable;
}
interface Observer<T> {
  closed?: boolean;
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}

 interface SubscriptionLike extends Unsubscribable {
  unsubscribe(): void;
  readonly closed: boolean;
}
//ERROR------------------
interface UnsubscriptionError extends Error {
  readonly errors: any[];
}

interface UnsubscriptionErrorCtor {
  new(errors: any[]): UnsubscriptionError;
}

function UnsubscriptionErrorImpl(this: any, errors: any[]) {
  Error.call(this);
  this.message = errors ?
  `${errors.length} errors occurred during unsubscription:
${errors.map((err, i) => `${i + 1}) ${err.toString()}`).join('\n  ')}` : '';
  this.name = 'UnsubscriptionError';
  this.errors = errors;
  return this;
}

UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
const UnsubscriptionError: UnsubscriptionErrorCtor = UnsubscriptionErrorImpl as any;
//-----------------
type TeardownLogic = Unsubscribable | Function | void;
type InteropObservable<T> = { [Symbol.observable]: () => Subscribable<T>; };
type SubscribableOrPromise<T> = Subscribable<T> | Subscribable<never> | PromiseLike<T> | InteropObservable<T>;
type ObservableInput<T> = SubscribableOrPromise<T> | ArrayLike<T> | Iterable<T>;
type PartialObserver<T> = NextObserver<T> | ErrorObserver<T> | CompletionObserver<T>;




//CLASSES


/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
//#region 
class Subscription implements SubscriptionLike {

  /** @nocollapse */
  public static EMPTY: Subscription = (function (empty: any) {
    empty.closed = true;
    return empty;
  }(new Subscription()));

  public closed: boolean = false;
  /** @internal */
  protected _parent: Subscription = null;
  /** @internal */
  protected _parents: Subscription[] = null;
  /** @internal */
  private _subscriptions: SubscriptionLike[] = null;

  constructor(unsubscribe?: () => void) {
    if (unsubscribe) {
      (<any>this)._unsubscribe = unsubscribe;
    }
  }

  unsubscribe(): void {
    let hasErrors = false;
    let errors: any[];

    if (this.closed) {
      return;
    }

    let { _parent, _parents, _unsubscribe, _subscriptions } = (<any>this)
    this.closed = true;
    this._parent = null;
    this._parents = null;
    this._subscriptions = null;

    let index = -1;
    let len = _parents ? _parents.length : 0;

    while (_parent) {
      _parent.remove(this);
      // if this._parents is null or index >= len,
      // then _parent is set to null, and the loop exits
      _parent = ++index < len && _parents[index] || null;
    }

    if (isFunction(_unsubscribe)) {
      let trial = tryCatch(_unsubscribe).call(this);
      if (trial === errorObject) {
        hasErrors = true;
        errors = errors || (
          [errorObject.e]
        )
      }
    }

    if (isArray(_subscriptions)) {

      index = -1;
      len = _subscriptions.length;

      while (++index < len) {
        const sub = _subscriptions[index];
        if (isObject(sub)) {
          let trial = tryCatch(sub.unsubscribe).call(sub);
          if (trial === errorObject) {
            hasErrors = true;
            errors = errors || [];
            let err = errorObject.e;
            if (err instanceof UnsubscriptionError) {
              errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
            } else {
              errors.push(err);
            }
          }
        }
      }
    }

    if (hasErrors) {
      throw new UnsubscriptionError(errors);
    }
  }
}

function flattenUnsubscriptionErrors(errors: any[]) {
  return errors.reduce((errs, err) => errs.concat((err instanceof UnsubscriptionError) ? err.errors : err), []);
}
//#endregion


/**
* Implements the {@link Observer} interface and extends the
* {@link Subscription} class. While the {@link Observer} is the public API for
* consuming the values of an {@link Observable}, all Observers get converted to
* a Subscriber, in order to provide Subscription-like capabilities such as
* `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
* implementing operators, but it is rarely used as a public API.
*
* @class Subscriber<T>
*/
//#region 
class Subscriber<T> extends Subscription implements Observer<T>{
  next: (value: T) => void; error: (err: any) => void;
  complete: () => void;
}

//#endregion
class Observable<T> implements Subscribable<T>{
  constructor(subcribe?:(this:Observable<T>,subscribe:Subcbire))
  subscirbe(observer) {
    return `subsciced ${observer}`;
  }
}

class Subject extends Observable, Observer {

}


class ColdObservable implements ICold, IObserverble {
  private observer = new Array();
  constructor() {}
  beginEmittingItems() {}
  subscirbe(observer) {}
}

const obs = new Observable();
const sub = new Subject();

obs.subscirbe(sub);


/** @function */
/** Utils */
//#region 
//Utils tryCatcher
const errorObject: any = { e: {} };
let tryCatchTarget: Function;

function tryCatcher(this: any): any {
  try {
    return tryCatchTarget.apply(this, arguments);
  } catch (e) {
    errorObject.e = e;
    return errorObject;
  }
}

function tryCatch<T extends Function>(fn: T): T {
  tryCatchTarget = fn;
  return <any>tryCatcher;
}

//Utils isFunction
function isFunction(x:any): x is Function{
  return typeof x==='function';
}

const isArray = Array.isArray || (<T>(x: any): x is T[] => x && typeof x.length === 'number');

function isObject(x: any): x is Object {
  return x != null && typeof x === 'object';
}
//#endregion