import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

//HTTP interceptors are used to modify the request and/or response data from the sender
export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  //Returns the entire request 'req' object and shows in console for each request made
  console.log(req, "The request Interceptor");

  //We can also add if conditions for modifying the request data only for specific request methods
  if (req.method == 'POST') {
    //We cannot directly alter the request data itself, so we clone it instead
    //We are modifying POST request headers by adding the token header in it
    const newReq = req.clone({
      headers: new HttpHeaders({'token': '293hhd28322h'})
    });

    return next(newReq);
  }
  
  return next(req);
};
