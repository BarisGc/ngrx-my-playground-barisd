import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  template: `
    <mat-sidenav
      #sidenav
      [opened]="open"
      (keydown.escape)="sidenav.close()"
      (closedStart)="closeMenu.emit()"
    >
      <mat-nav-list>
        <ng-content></ng-content>
      </mat-nav-list>
    </mat-sidenav>
  `,
  styles: [
    `
      mat-sidenav {
        width: 300px;
      }
    `,
  ],
})
export class SidenavComponent {
  @Input() open = false;
  @Output() closeMenu = new EventEmitter<void>();
}
