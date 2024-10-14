import { Component, Input } from '@angular/core'

import type { Card } from './Card'

@Component({
  selector: 'app-carousel-item',
  standalone: true,
  imports: [],
  templateUrl: './carousel-item.component.html',
  styleUrl: './carousel-item.component.scss',
})
export class CarouselItemComponent {
  @Input({
    required: true,
  })
  card!: Card

  getImageUrl(): string {
    return `assets/${this.card.imgUrl}`
  }

  getBackgroundImageUrl(): string {
    return `url(assets/${this.card.bgUrl})`
  }
}
