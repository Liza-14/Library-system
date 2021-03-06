import { ServerErrorDialogComponent } from './../components/dialogs/server-error-dialog/server-error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BooksService } from '../services/books.service';
import { catchError } from 'rxjs/operators'
import Genre from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreResolver implements Resolve<Genre[]> {

  constructor(private booksService: BooksService, private dialog: MatDialog, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Genre[]> {
    return this.booksService.getGenres().pipe(
      catchError(
        error => {
          this.dialog.open(ServerErrorDialogComponent, { data: 'Problem retrieving data' });
          this.router.navigate(['/']);
          return of([]);
        }
      )
    );
  }
}
