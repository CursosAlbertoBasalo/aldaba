import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Action } from './models/action';

export class Store<T> {
  private _state$: BehaviorSubject<T>;
  private _actions$: BehaviorSubject<Action>;

  constructor(initialState: T) {
    this._state$ = new BehaviorSubject({ ...initialState });
    const initialAction = {
      type: 'INIT',
      payload: initialState,
    };
    this._actions$ = new BehaviorSubject(initialAction);

  }

  public getSnapshot() {
    return this.getClone(this._state$.value);
  }
  public getState$() {
    return this._state$
      .asObservable()
      .pipe(map((state) => this.getClone(state)));
  }

  public setState(newState: Partial<T>) {
    this._state$.next(this.getClone({ ...this._state$.value, ...newState }));
  }
  public dispatch(action: { type: string; payload: any }) {
    this.setState(action.payload);
    this._action$.next(action);
  }
  // public reduce(action: { type: string, payload: any }, reducer: (currentState: T,  payload:any)=>T  ) {
  //   const newState = reducer(this.getSnapshot(),  action.payload);
  //   this.setState(newState);
  //   this._action$.next(action);
  // }

  public getActions$() {
    return this._action$.asObservable();
  }

  private getClone(source: T) {
    return JSON.parse(JSON.stringify(source));
  }
  dispatch(action: Action): void {
    this.setState(action.payload);
    this._actions$.next(action);
  }

  getActions$(): Observable<Action> {
    return this._actions$.asObservable();
  }
}

// function aldaba() {
//   let uno = 0;
//   uno = 1;
//   const dos = 2;
//   dos = 1;
//   let tres: any = {
//     saldo: { cantidad: 99, moneda: '€' },
//   };
//   tres = 'patata';
//   const cuatro: any = {
//     saldo: { cantidad: 99, moneda: '€' },
//     numero: 'asdfasfd'
//   };
//   const cinco = { ...cuatro };
//   const seis = JSON.parse(JSON.stringify(cuatro));

//   cinco.saldo.cantidad;// 99
//   cinco.numero;// 'asdfasfd'

//   seis.saldo.cantidad;// 99
//   seis.numero;// 'asdfasfd'

//   cuatro.saldo.cantidad = 0;
//   cuatro.numero = '987987'

//   cinco.saldo.cantidad;//  0
//   cinco.numero;// 'asd...'

//   seis.saldo.cantidad;// 99
//   seis.numero;// 'asdfasfd'

// }
// const h = { resto: 123, fecha: '2021-12-31' };
// const y = {
//   saldo: 12,
//   bitcoins: 75,
//   acciones: [{ empresa: 'itx', cantidad: 59 }, {}],
//   hipoteca: h,
// };

// h.resto = 0;

// const x = new Store(y);

// x.getState$().subscribe((s) => {
//   console.log(s.bitcoins); // [ 75    ]
//   s.bitcoins = 666;
//   console.log(x.getSnapshot().bitcoins); // 75
// });

// x.setState({
//   saldo: 12,
//   bitcoins: 123,
//   acciones: [{ empresa: 'itx', cantidad: 59 }, {}],
// });

// x.setState({ bitcoins: 987 });

// y.bitcoins = 0;
// console.log(x.getSnapshot().bitcoins); // 75

// const z = x.getSnapshot();
// z.bitcoins = 999;
// console.log(x.getSnapshot().bitcoins); // 75
