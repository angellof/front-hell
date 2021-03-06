import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { PhotoService } from './../service/photo-service';
import { Observable } from 'rxjs';
import { Photo } from '../photo/photo';

@Injectable({ providedIn: 'root' })
export class PhotoListResolver implements Resolve<Observable<Photo[]>>{


  constructor(private service: PhotoService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> | Observable<Observable<Photo[]>> | Promise<Observable<Photo[]>> {
    const userName = route.params.userName;
    //const randomPageNumber = Math.floor(Math.random() * 6) + 1;
    return this.service.listPhotosFromUserPaginated(userName, 1);
  }
}