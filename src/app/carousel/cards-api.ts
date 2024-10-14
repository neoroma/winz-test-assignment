import type { Card } from '../carousel-item/Card'

const inMemoryCards: Array<Card> = [
  {
    id: 0,
    title: 'WinzUp Loyalty Program',
    content: 'Get up to <mark>35% in rewards</mark>: daily rakeback, weekly cashback and level-up bonuses',
    actionLabel: 'Join now',
    imgUrl: 'winzup_mob.png',
    bgUrl: 'winzup-bg-mob.webp',
  },
  {
    id: 1,
    title: "Valentine's Fortune Drops",
    content: 'Trigger random prizes and win a share of <mark>€30,000!</mark>',
    actionLabel: 'Learn more',
    imgUrl: 'ValentinesFortuneDrops_mob-pic.png',
    bgUrl: 'ValentinesFortuneDrops_mob-bg.png',
  },
  {
    id: 2,
    title: 'Wheel of Winz',
    content: 'Spin the wheel to win up to <mark>€15,000</mark> weekly',
    actionLabel: 'Spin now',
    imgUrl: 'wheel-mob.png',
    bgUrl: 'wheel-mob-bg.webp',
  },
]

export const getCards = () => new Promise<Array<Card>>((resolve) => resolve(inMemoryCards))
