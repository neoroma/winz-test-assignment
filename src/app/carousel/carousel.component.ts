import { Component, ElementRef, HostListener, ViewChild } from '@angular/core'
import { CarouselItemComponent } from '../carousel-item/carousel-item.component'
import { getCards } from './cards-api'

import type { Card } from '../carousel-item/Card'

const SWIPE_TIMEOUT = 10000
const SWIPE_THRESHOLD = 120

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselItemComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef

  items: Array<Card> = []

  private currentIndex = 0
  private startX = 0
  private endX = 0
  private intervalId?: ReturnType<typeof setInterval>

  async ngOnInit() {
    this.items = await getCards()
  }

  ngAfterViewInit() {
    this.updateCarouselPosition()
  }

  ngOnDestroy() {
    this.clearInterval()
  }

  startInterval() {
    this.intervalId = setInterval(() => {
      this.next()
    }, SWIPE_TIMEOUT)
  }

  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length
    this.updateDisplayItems()
    this.updateCarouselPosition()
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length
    this.updateDisplayItems()
    this.updateCarouselPosition()
  }

  goToIndex(index: number) {
    this.currentIndex = index
    this.updateDisplayItems()
    this.updateCarouselPosition()
  }

  private updateDisplayItems() {
    console.log(this.getPreviousIndex())
    console.log(this.getNextIndex())
  }

  private getPreviousIndex(): number {
    return (this.currentIndex - 1 + this.items.length) % this.items.length
  }

  private getNextIndex(): number {
    return (this.currentIndex + 1) % this.items.length
  }

  private updateCarouselPosition() {
    const track = this.carouselTrack.nativeElement as HTMLElement
    track.style.transform = `translateX(calc(-${this.currentIndex * 100}%))`

    this.clearInterval()
    this.startInterval()
  }

  onTouchEnd() {
    const diff = this.startX - this.endX
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        this.next()
      } else {
        this.prev()
      }
    } else {
      this.updateCarouselPosition()
    }

    this.startX = 0
    this.endX = 0
  }

  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX
  }

  onTouchMove(event: TouchEvent) {
    const track = this.carouselTrack.nativeElement as HTMLElement
    this.endX = event.touches[0].clientX
    const diff = this.startX - this.endX
    track.style.transform = `translateX(calc(-${this.currentIndex * 100}% - ${diff}px))`

    event.preventDefault()
    event.stopPropagation()
  }

  @HostListener('window:resize')
  onResize() {
    this.updateCarouselPosition()
  }
}
