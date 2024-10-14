import { Component } from '@angular/core'
import { CarouselComponent } from './carousel/carousel.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'winz-task'
}
