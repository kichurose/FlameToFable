import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  currentPost: BlogPost | null = null;
  postId: string = '';

  private blogPosts: { [key: string]: BlogPost } = {
    'art-of-candle-care': {
      id: 'art-of-candle-care',
      title: 'The Art of Candle Care',
      content: `
        <h2>Making Your Handcrafted Candles Last Longer</h2>
        <p>At Flame to Fable, we create premium handcrafted candles in Kerala with care and attention to detail. To help you get the most out of your candles, here are our expert tips for proper candle care.</p>
        
        <h3>1. Trim the Wick</h3>
        <p>Always trim your wick to 1/4 inch before lighting. This prevents excessive smoke and ensures a clean, even burn.</p>
        
        <h3>2. First Burn Matters</h3>
        <p>Allow your candle to burn for 2-3 hours on the first use to create an even wax pool across the surface.</p>
        
        <h3>3. Burn Time Limits</h3>
        <p>Never burn a candle for more than 4 hours at a time. This preserves the fragrance and prevents overheating.</p>
        
        <h3>4. Storage Tips</h3>
        <p>Store your Kerala-made candles in a cool, dry place away from direct sunlight to maintain their quality and scent.</p>
        
        <p>Follow these simple steps to enjoy your Flame to Fable candles for the longest time possible!</p>
      `,
      date: 'December 20, 2025',
      author: 'Flame to Fable Team'
    },
    'our-journey': {
      id: 'our-journey',
      title: 'The Story Behind Flame to Fable',
      content: `
        <h2>A Journey That Started with a Simple Inspiration</h2>
        <br/>
        <p>One quiet morning, while scrolling through my phone, something instantly caught my attention - a girl making a watermelon-shaped candle. It was vibrant, playful, and incredibly cute. That moment sparked a thought: Why not give this a try myself?</p>
         <br/>
        <p>Curious and excited, I searched online and found the perfect candle-making kit. I poured my heart into creating my first candle, unsure of how it would turn out. When I shared it on Instagram and YouTube, the response was overwhelming. The appreciation and encouragement I received gave me the confidence to keep going.</p>
         <br/>
        <p>Without waiting any longer, I tried making another candle-this time, a cloud candle. Soft, dreamy, and beautiful, it felt like another small success in my growing journey.</p>
        
       <br/>
        <p>But my love for candles began much earlier.</p>
        
        <br/>
        <p>As a child, my father once brought home gel wax. I still remember how fascinated I was seeing it for the first time-smooth, fluffy, and crystal clear. That moment stayed with me. From then on, I found myself drawn to small, artistic candles that felt magical in their own way.</p>
         <br/>
        <p>As I grew older, I often browsed candle stores, admiring the designs-but the prices were always high. That's when a simple thought occurred to me:</p>
        
        <blockquote style="border-left: 4px solid #7c3aed; padding-left: 20px; margin: 24px 0; font-style: italic; color: #4c1d95;">
        "Why not create something beautiful, affordable, and still uncompromising on quality?"
        </blockquote>
        
       <br/>
        <p>Without overthinking it, I chose to take a leap of faith and brought <b>Flame to Fable</b> to life—launching a YouTube channel, an Instagram page.</p>
        
        
        
         <br/>
        <p>A space where every candle tells a story.<br>
        A place where warmth meets creativity.<br>
        Where each flame whispers a fable of light, love, and craftsmanship.</p>
        
        <br/>
       
        <p>Today, from our workshop in Kerala, we create handmade candles that bring joy, warmth, and beauty to homes across India. Each candle carries the same passion and wonder that started this journey.</p>
         <br/>
        <p>Every gel wax candle reminds me of that childhood fascination. Every custom design reflects our commitment to making beautiful, affordable candles without compromising on quality.</p>
        
        <p style="text-align: center; font-style: italic; margin-top: 32px; color: #7c3aed; font-size: 1.1em;">
        And so, the candle-making journey continues…<br><br>
        - Flame to Fable
        </p>
      `,
      date: 'December 15, 2025',
      author: 'Flame to Fable Team'
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.currentPost = this.blogPosts[this.postId] || null;
    });
  }
}