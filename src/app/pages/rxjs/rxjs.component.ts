import { Component, OnInit, OnDestroy } from '@angular/core';
import { retry, map, filter } from 'rxjs/operators';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable()
      // .pipe(retry(2))
      .subscribe(
        (numero) => {
          console.log('subs', numero);
        },
        (error) => console.log('el error es', error),
        () => console.log('el obs se terminó')
      );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('la pagina se va a cerrar');
  }

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      const intervalor = setInterval(() => {
        contador++;
        const salida = {
          valor: contador,
        };
        observer.next(salida);
        /* if (contador === 3) {
          clearInterval(intervalor);
          observer.complete();
        } */
        /* if (contador === 2) {
          observer.error('fatal');
        } */
      }, 1000);
      // en el pipe obtengo la respuesta del observador
    }).pipe(
      map((resp) => {
        return resp.valor;
      }),
      filter((valor, index) => {
        if (valor % 2 === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );
  }
}
