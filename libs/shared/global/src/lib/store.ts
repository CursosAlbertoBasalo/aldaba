import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
export class Store<T> {
  private _state$: BehaviorSubject<T>;
  constructor(initialState: T) {
    this._state$ = new BehaviorSubject({ ...initialState });
  }
  public getSnapshot() {
    return { ...this._state$.value };
  }
  public getState$() {
    return this._state$.asObservable().pipe(map((state) => ({ ...state })));
  }
  public setState(newState: Partial<T>) {
    this._state$.next({ ...this._state$.value, ...newState });
  }
}

const h = { resto: 123, fecha: '2021-12-31' };
const y = {
  saldo: 12,
  bitcoins: 75,
  acciones: [{ empresa: 'itx', cantidad: 59 }, {}],
  hipoteca: h,
};

h.resto = 0;

const x = new Store(y);

x.getState$().subscribe((s) => {
  console.log(s.bitcoins); // [ 75    ]
  s.bitcoins = 666;
  console.log(x.getSnapshot().bitcoins); // 75
});

x.setState({
  saldo: 12,
  bitcoins: 123,
  acciones: [{ empresa: 'itx', cantidad: 59 }, {}],
});

x.setState({ bitcoins: 987 });

y.bitcoins = 0;
console.log(x.getSnapshot().bitcoins); // 75

const z = x.getSnapshot();
z.bitcoins = 999;
console.log(x.getSnapshot().bitcoins); // 75
