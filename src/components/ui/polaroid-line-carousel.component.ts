import { NEW_CAROUSEL_DESIGNS } from '../../shared/new-candle-designs';
import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild, ViewChildren, QueryList, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BULK_CANDLE_IMAGES, BULK_CANDLE_LABELS } from '../../shared/bulk-candle-images';

interface CandleSlide {
  image: string;
  title: string;
  caption: string;
  alt: string;
  productId?: string;
  corporate?: boolean;
}

@Component({
  selector: 'app-polaroid-line-carousel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './polaroid-line-carousel.component.html',
  styleUrl: './polaroid-line-carousel.component.scss'
})
export class PolaroidLineCarouselComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stage') stage!: ElementRef<HTMLElement>;
  @ViewChild('line') line!: ElementRef<SVGPathElement>;
  @ViewChildren('card') cards!: QueryList<ElementRef<HTMLElement>>;
  readonly slides: CandleSlide[] = [
    { image: '/optimized/mini bouquet.jpg.webp', title: 'Mini Bouquet Candle', caption: 'A little bouquet, handcrafted with love.', alt: 'Mini Bouquet Candle', productId: 'mini-bouquet' },
    { image: '/optimized/heart tealight.jpg.webp', title: 'Heart Tealight Candles', caption: 'Little hearts for thoughtful gifts.', alt: 'Heart Tealight Candles', corporate: true },
    { image: '/optimized/Sunflower Garden Candle.jpg.webp', title: 'Sunflower Garden Candle', caption: 'A little garden, a little sunshine, poured with love.', alt: 'Sunflower Garden Candle with yellow flowers and green leaves in a glass bowl', productId: 'sunflower-garden' },
    { image: '/optimized/heart tealights.jpg.webp', title: 'Pastel Heart Tealights', caption: 'A little colour, a little glow.', alt: 'Pastel Heart Tealights', corporate: true },
    { image: '/optimized/ocean.jpg.webp', title: 'Coastal daydreams', caption: 'A small escape, poured with love.', alt: 'Ocean inspired decorative candle' },
    { image: '/optimized/TrioJar.jpg.webp', title: 'Trio Jar Candle', caption: 'Three layers, one lovely glow.', alt: 'Trio Jar Candle', productId: 'trio-jar' },
    { image: '/optimized/heartofroses.jpg.webp', title: 'From the heart', caption: 'Thoughtful little gifts for your favourite people.', alt: 'Heart of roses candle' },
    { image: '/optimized/peony.jpg.webp', title: 'Petal by petal', caption: 'Beautiful details. A softer kind of glow.', alt: 'Handcrafted peony candle' },
    { image: '/optimized/coffee.jpg.webp', title: 'Latte Coffee Candle', caption: 'A café-inspired favourite from our best sellers.', alt: 'Latte Coffee Candle', productId: 'latte-coffee' },
    { image: '/optimized/berry-bliss.jpg.webp', title: 'Berry Bliss Candle', caption: 'A berry-sweet favourite from our best sellers.', alt: 'Berry Bliss Candle', productId: 'berry-bliss' },
    { image: '/optimized/vanilla.jpg.webp', title: 'Vanilla Chocolate Candle', caption: 'A dessert-inspired favourite from our best sellers.', alt: 'Vanilla Chocolate Candle', productId: 'vanilla-chocolate' },
    { image: '/optimized/rose.jpg.webp', title: 'Rose Candle', caption: 'A floral favourite from our best sellers.', alt: 'Rose Candle', productId: 'rose-candle' },
    { image: '/optimized/rosedesign2.jpg.webp', title: 'Rose Design 2', caption: 'A blooming favourite from our best sellers.', alt: 'Rose Design 2', productId: 'rose-design-2' },
    { image: '/optimized/heart.jpg.webp', title: 'Heart Candle', caption: 'A heartfelt favourite from our best sellers.', alt: 'Heart Candle', productId: 'heart-candle' },
    { image: '/optimized/angelwings.jpg.webp', title: 'Angel Wings Candle', caption: 'A thoughtful favourite from our best sellers.', alt: 'Angel Wings Candle', productId: 'angel-wings' },
    // Curate daisies to one purple slide near the end, one multicolour and one pink-ribbon pouch.
    // Keep just one bubble candle photo.
    ...BULK_CANDLE_IMAGES.filter(image =>
      (!BULK_CANDLE_LABELS[image].includes('Daisy') || image === '/optimized/Bulk/color%20daisy.jpg.webp' || image === '/optimized/Bulk/daisy%201.jpg.webp') &&
      (!BULK_CANDLE_LABELS[image].includes('Sunflower Gift Cards') || image === '/optimized/Bulk/sunflower.jpg.webp') &&
      image !== '/optimized/Bulk/IMG20260430233751.jpg.webp' &&
      (!BULK_CANDLE_LABELS[image].startsWith('Bubble') || image === '/optimized/Bulk/IMG20260505143330.jpg.webp')
    ).map((image): CandleSlide => ({
      image: BULK_CANDLE_LABELS[image] === 'Sunflower Favours' ? '/optimized/bulk sunflower.jpg.webp' : BULK_CANDLE_LABELS[image] === 'Sunflower Gift Cards' ? '/optimized/sunflower card.jpg.webp' : image,
      title: BULK_CANDLE_LABELS[image],
      caption: 'Custom candles for corporate gifts, weddings, and celebrations.',
      alt: BULK_CANDLE_LABELS[image] + ' — custom candle order',
      corporate: true
    })),
    ...NEW_CAROUSEL_DESIGNS.filter(design => design.productId !== 'mini-bouquet' && !design.title.includes('Tealight')).map(design => ({ ...design, alt: design.title, caption: 'Thoughtful details, handcrafted with love.' })),
    { image: '/optimized/Bulk/IMG20260428230012.jpg.webp', title: 'Purple Daisy Gift Cards', caption: 'A little bloom, a thoughtful thank you.', alt: 'Purple-centred daisy candles on gift cards', corporate: true },
    { image: '/optimized/icedmacha.jpg.webp', title: 'Slow mornings', caption: 'Your favourite café moment, reimagined in wax.', alt: 'Iced matcha drink candle' }
  ];
  active = signal(1);
  paused = signal(false);
  dragging = false;
  private width = 0;
  private height = 0;
  private cw = 300;
  private spacing = 324;
  private off = 324;
  private target = 324;
  private velocity = 0;
  private angles = this.slides.map(() => 0);
  private angularVelocities = this.slides.map(() => 0);
  private drag: { x: number; off: number; lastX: number; time: number; speed: number; moved: boolean } | null = null;
  private lastTouch = 0;
  private raf = 0;
  private timer = 0;
  private observer?: ResizeObserver;
  private reduce = false;
  private media?: MediaQueryList;
  private motionChange = (e: MediaQueryListEvent) => { this.reduce = e.matches; };
  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    this.media = matchMedia('(prefers-reduced-motion: reduce)');
    this.reduce = this.media.matches;
    this.media.addEventListener('change', this.motionChange);
    this.zone.runOutsideAngular(() => {
      this.observer = new ResizeObserver(() => {
        const r = this.stage.nativeElement.getBoundingClientRect();
        this.width = r.width; this.height = r.height;
        this.cw = Math.max(150, Math.min(300, r.width * .62, r.height * .7));
        this.spacing = this.cw * 1.12;
        this.off = this.target = this.active() * this.spacing;
        this.stage.nativeElement.style.setProperty('--card-width', this.cw + 'px');
      });
      this.observer.observe(this.stage.nativeElement);
      let prev = performance.now();
      const frame = (now: number) => {
        const dt = Math.min(.033, (now - prev) / 1000); prev = now;
        if (this.width && !document.hidden) this.render(now, dt);
        this.raf = requestAnimationFrame(frame);
      };
      this.raf = requestAnimationFrame(frame);
      this.timer = window.setInterval(() => {
        if (!this.reduce && !this.paused() && !document.hidden && !this.drag && performance.now() - this.lastTouch > 4500) {
          this.target = ((this.active() + 1) % this.slides.length) * this.spacing;
        }
      }, 4500);
    });
  }
  private render(now: number, dt: number) {
    const before = this.off;
    if (!this.drag?.moved) {
      if (this.reduce) { this.off = this.target; this.velocity = 0; }
      else {
        this.velocity += (70 * (this.target - this.off) - 2 * Math.sqrt(70) * this.velocity) * dt;
        this.off += this.velocity * dt;
      }
    }
    const lineVelocity = this.drag?.moved ? this.drag.speed * 1000 : -(this.off - before) / Math.max(dt, .001);
    const near = this.nearest(this.off);
    if (near !== this.active()) this.zone.run(() => this.active.set(near));
    const y0 = Math.max(30, this.height * .09), sag = 46;
    this.line.nativeElement.setAttribute('d', `M0 ${y0} Q${this.width / 2} ${y0 + 2 * sag} ${this.width} ${y0}`);
    this.cards.forEach((ref, i) => {
      const x = this.width / 2 + i * this.spacing - this.off;
      const t = Math.min(1, Math.max(0, x / this.width));
      if (this.reduce) this.angles[i] = this.angularVelocities[i] = 0;
      else {
        this.angularVelocities[i] += (-38 * this.angles[i] - 4.2 * this.angularVelocities[i] + lineVelocity * .0034) * dt;
        this.angles[i] = Math.max(-.6, Math.min(.6, this.angles[i] + this.angularVelocities[i] * dt + Math.sin(now / 1300 + i * 1.7) * .0009));
      }
      ref.nativeElement.style.transform = `translate(${x - this.cw / 2}px,${y0 + 4 * sag * t * (1 - t) - 6}px) rotate(${this.angles[i]}rad)`;
      ref.nativeElement.style.visibility = x < -this.cw || x > this.width + this.cw ? 'hidden' : 'visible';
      ref.nativeElement.style.zIndex = String(this.slides.length - Math.abs(i - near));
    });
  }
  private nearest(off: number) { return Math.max(0, Math.min(this.slides.length - 1, Math.round(off / this.spacing))); }
  goTo(index: number) {
    this.lastTouch = performance.now();
    this.target = Math.max(0, Math.min(this.slides.length - 1, index)) * this.spacing;
  }
  step(dir: number) { this.goTo(Math.round(this.target / this.spacing) + dir); }
  key(e: KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); this.step(e.key === 'ArrowRight' ? 1 : -1); }
    if (e.key === 'Home') { e.preventDefault(); this.goTo(0); }
    if (e.key === 'End') { e.preventDefault(); this.goTo(this.slides.length - 1); }
  }
  down(e: PointerEvent) {
    if (e.button !== 0 || (e.target as HTMLElement).closest('.controls')) return;
    this.lastTouch = performance.now();
    this.drag = { x: e.clientX, off: this.off, lastX: e.clientX, time: e.timeStamp, speed: 0, moved: false };
  }
  move(e: PointerEvent) {
    const d = this.drag; if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) { d.moved = true; this.dragging = true; this.stage.nativeElement.setPointerCapture(e.pointerId); }
    if (!d.moved) return;
    d.speed = .7 * (e.clientX - d.lastX) / Math.max(1, e.timeStamp - d.time) + .3 * d.speed;
    d.lastX = e.clientX; d.time = e.timeStamp;
    const max = (this.slides.length - 1) * this.spacing;
    let off = d.off - dx;
    if (off < 0) off *= .35;
    if (off > max) off = max + (off - max) * .35;
    this.off = off;
  }
  up(e: PointerEvent) {
    const d = this.drag; this.drag = null; this.dragging = false; if (!d) return;
    if (this.stage.nativeElement.hasPointerCapture(e.pointerId)) this.stage.nativeElement.releasePointerCapture(e.pointerId);
    if (d.moved) { this.velocity = -d.speed * 1000; this.goTo(this.nearest(this.off - d.speed * 180)); }
    else { const card = (e.target as HTMLElement).closest<HTMLElement>('[data-index]'); if (card) this.goTo(Number(card.dataset['index'])); }
  }
  cancel(e: PointerEvent) { if (this.drag) { this.drag.moved = true; this.drag.speed = 0; this.up(e); } }
  ngOnDestroy() {
    cancelAnimationFrame(this.raf); clearInterval(this.timer); this.observer?.disconnect();
    this.media?.removeEventListener('change', this.motionChange);
  }
}
