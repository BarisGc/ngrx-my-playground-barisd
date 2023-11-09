import { Component, Input, SimpleChanges } from '@angular/core';
import { Book, generateInitialBook } from '../models/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent {
  @Input() book: Book = generateInitialBook();
}
