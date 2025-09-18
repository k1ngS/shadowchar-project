import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { Auth } from './auth';

// Variáveis de estado para lidar com o refresh do token
// Elas ficam fora da função para manter o estado entre as chamadas
let isRefreshing = false;
let refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

// Função auxiliar para adicionar o token ao cabeçalho
const addToken = (request: HttpRequest<any>, token: string) => {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// O Interceptor Funcional
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Injeta os serviços necessários dentro da função
  const authService = inject(Auth);

  req = req.clone({
    withCredentials: true,
  });

  const accessToken = authService.getToken();

  // Se tivermos um token, clona a requisição e adiciona o cabeçalho
  if (accessToken) {
    req = addToken(req, accessToken);
  }

  // Passa a requisição adiante e trata os erros
  return next(req).pipe(
    catchError((error) => {
      // Se o erro for 401 (Não Autorizado)
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Lida com a renovação do token
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return authService.refreshToken().pipe(
            switchMap((token: any) => {
              isRefreshing = false;
              refreshTokenSubject.next(token.access_token);
              // Tenta a requisição original novamente com o novo token
              return next(addToken(req, token.access_token));
            }),
            catchError((err) => {
              isRefreshing = false;
              authService.logout(); // Se a renovação falhar, desloga o usuário
              return throwError(() => err);
            })
          );
        } else {
          // Se já houver uma renovação em andamento, espera ela terminar
          return refreshTokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(jwt => {
              return next(addToken(req, jwt));
            })
          );
        }
      }
      // Para outros erros, apenas os repassa
      return throwError(() => error);
    })
  );
};
