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
    'creating-perfect-ambiance': {
      id: 'creating-perfect-ambiance',
      title: 'Creating the Perfect Ambiance',
      content: `
        <h2>Transform Your Space with Candles</h2>
        <p>Candles have the magical ability to transform any space instantly. Our handcrafted candles from Kerala are designed to help you create the perfect atmosphere for every occasion.</p>
        
        <h3>Living Room Elegance</h3>
        <p>Place larger pillar candles on coffee tables and mantels. Use multiple candles of varying heights to create visual interest.</p>
        
        <h3>Bedroom Serenity</h3>
        <p>Opt for calming scents like lavender or vanilla. Place candles on bedside tables for a romantic, peaceful atmosphere.</p>
        
        <h3>Dining Room Drama</h3>
        <p>Use unscented candles during meals to avoid competing with food aromas. Taper candles in elegant holders create sophisticated dining experiences.</p>
        
        <h3>Bathroom Spa Experience</h3>
        <p>Create a spa-like retreat with eucalyptus or mint-scented candles. Always ensure proper ventilation and safe placement.</p>
        
        <h3>Special Occasions</h3>
        <p>Our custom Kerala candles can be designed for birthdays, weddings, and festivals. Each candle tells a story of celebration.</p>
        
        <p>Let Flame to Fable help you create memories with the perfect ambiance for every moment.</p>
      `,
      date: 'December 18, 2025',
      author: 'Flame to Fable Team'
    },
    'our-journey': {
      id: 'our-journey',
      title: 'The Story Behind Flame to Fable',
      content: `
        <h2>A Journey That Started with a Simple Watermelon Candle</h2>
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
        <p>And just like that, without overthinking, I decided to take a leap of faith.</p>
        
        <p>I created a YouTube channel, an Instagram page, and even a Gmail account, all under one name - <strong>Flame to Fable</strong>.</p>
        
         <br/>
        <p>A space where every candle tells a story.<br>
        A place where warmth meets creativity.<br>
        Where each flame whispers a fable of light, love, and craftsmanship.</p>
        
        <br/>
       
        <p>Today, from our workshop in Kerala, we create handmade candles that bring joy, warmth, and beauty to homes across India. Each candle carries the same passion and wonder that started with that first watermelon candle.</p>
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