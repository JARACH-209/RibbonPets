;(function PetWidget() {
  'use strict';

  const NAV_H    = 54;
  const PET_H    = 28;
  const PET_TOP  = NAV_H - PET_H;
  const MAX_PETS = 4;
  const BASE_SPD = 1.6;
  const EM       = '#047857';
  const EM_B     = '#059669';
  const EM_L     = '#d1fae5';

  /* ── STYLES ─────────────────────────────── */
  const css = document.createElement('style');
  css.textContent = `
#pet-launcher{
  position:fixed;bottom:24px;right:24px;z-index:10000;
  width:42px;height:42px;border-radius:50%;border:1px solid #e5e5e5;
  background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;
  box-shadow:0 2px 12px rgba(0,0,0,.06);font-size:18px;line-height:1;
  transition:transform .2s,box-shadow .3s,border-color .3s,background .3s;
  animation:petBtnPulse 2.5s ease-in-out infinite;
}
#pet-launcher:hover{transform:scale(1.1);border-color:${EM};box-shadow:0 4px 20px rgba(4,120,87,.18)}
#pet-launcher.has-pets{background:${EM};border-color:${EM};animation:none}
#pet-launcher.has-pets:hover{background:#065f46}
@keyframes petBtnPulse{0%,100%{box-shadow:0 2px 12px rgba(0,0,0,.06)}50%{box-shadow:0 2px 16px rgba(4,120,87,.18)}}

.rp{position:fixed;top:${PET_TOP}px;z-index:101;pointer-events:none;transition:opacity .3s}
.rp.spawn{animation:petPop .32s ease-out forwards}
.rp.walk{animation:petBob .22s ease-in-out infinite}
.rp.walk .lg-1{animation:lsw .22s ease-in-out infinite alternate}
.rp.walk .lg-2{animation:lsw .22s ease-in-out infinite alternate-reverse}
.rp.walk .lg-3{animation:lsw .22s ease-in-out infinite alternate-reverse}
.rp.walk .lg-4{animation:lsw .22s ease-in-out infinite alternate}
.rp .tp{animation:tw .55s ease-in-out infinite alternate;transform-origin:100% 100%}
.rp.sit .tp{animation:tws 1.1s ease-in-out infinite alternate}
.rp .zzz{position:absolute;top:-14px;right:2px;font-size:9px;opacity:0;pointer-events:none;animation:zf 1.6s ease-in-out infinite}

@keyframes lsw{from{transform:rotate(-18deg)}to{transform:rotate(18deg)}}
@keyframes petBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.5px)}}
@keyframes tw{from{transform:rotate(-12deg)}to{transform:rotate(12deg)}}
@keyframes tws{from{transform:rotate(-6deg)}to{transform:rotate(6deg)}}
@keyframes petPop{0%{transform:scale(0) translateY(8px);opacity:0}60%{transform:scale(1.12) translateY(-1px);opacity:1}100%{transform:scale(1) translateY(0);opacity:1}}
@keyframes zf{0%{opacity:0;transform:translateY(0) scale(.7)}35%{opacity:.8}100%{opacity:0;transform:translateY(-12px) scale(1.1)}}

@media(max-width:640px){#pet-launcher{bottom:16px;right:16px;width:38px;height:38px;font-size:16px}}
`;
  document.head.appendChild(css);

  /* ── SVG BUILDERS ───────────────────────── */
  function runSvg(dir) {
    const f = dir === 'left' ? 'transform="scale(-1,1) translate(-36,0)"' : '';
    return `<svg viewBox="0 0 36 28" width="36" height="28" style="overflow:visible"><g ${f}>
<path class="tp" d="M3,18 Q0,10 5,6" stroke="${EM}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
<ellipse cx="16" cy="19" rx="9" ry="5.5" fill="${EM}"/>
<circle cx="27" cy="14" r="5.5" fill="${EM}"/>
<polygon points="23,10 25.5,4 28,10" fill="${EM}"/>
<polygon points="27,9 29.5,3.5 32,9" fill="${EM_B}"/>
<circle cx="28.8" cy="13" r="1" fill="${EM_L}"/>
<circle cx="25.8" cy="13.5" r=".8" fill="${EM_L}"/>
<circle cx="30.2" cy="15.2" r=".45" fill="${EM_B}"/>
<rect class="lg-1" x="10" y="23" width="2" height="5" rx="1" fill="${EM}" style="transform-origin:11px 23px"/>
<rect class="lg-2" x="15" y="23" width="2" height="5" rx="1" fill="${EM}" style="transform-origin:16px 23px"/>
<rect class="lg-3" x="19" y="23" width="2" height="5" rx="1" fill="${EM}" style="transform-origin:20px 23px"/>
<rect class="lg-4" x="23" y="23" width="2" height="5" rx="1" fill="${EM}" style="transform-origin:24px 23px"/>
</g></svg>`;
  }

  function sitSvg(dir) {
    const f = dir === 'left' ? 'transform="scale(-1,1) translate(-28,0)"' : '';
    return `<svg viewBox="0 0 28 28" width="28" height="28" style="overflow:visible"><g ${f}>
<path class="tp" d="M2,22 Q-1,16 3,12" stroke="${EM}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
<ellipse cx="13" cy="18" rx="6.5" ry="8" fill="${EM}"/>
<circle cx="17" cy="9" r="5.5" fill="${EM}"/>
<polygon points="13,5 15.5,0 18,5" fill="${EM}"/>
<polygon points="17,4 19.5,-.5 22,4" fill="${EM_B}"/>
<circle cx="18.8" cy="8" r="1" fill="${EM_L}"/>
<circle cx="15.8" cy="8.5" r=".8" fill="${EM_L}"/>
<rect x="8" y="24" width="2" height="4" rx="1" fill="${EM}"/>
<rect x="13" y="24" width="2" height="4" rx="1" fill="${EM}"/>
<rect x="17" y="24" width="2" height="4" rx="1" fill="${EM}"/>
</g></svg>`;
  }

  function sleepSvg(dir) {
    const f = dir === 'left' ? 'transform="scale(-1,1) translate(-28,0)"' : '';
    return `<svg viewBox="0 0 28 28" width="28" height="28" style="overflow:visible"><g ${f}>
<path class="tp" d="M2,22 Q-1,16 3,12" stroke="${EM}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
<ellipse cx="13" cy="18" rx="6.5" ry="8" fill="${EM}"/>
<circle cx="17" cy="9" r="5.5" fill="${EM}"/>
<polygon points="13,5 15.5,0 18,5" fill="${EM}"/>
<polygon points="17,4 19.5,-.5 22,4" fill="${EM_B}"/>
<line x1="17.5" y1="8" x2="20" y2="8" stroke="${EM_L}" stroke-width=".8" stroke-linecap="round"/>
<line x1="14.5" y1="8.5" x2="17" y2="8.5" stroke="${EM_L}" stroke-width=".8" stroke-linecap="round"/>
<rect x="8" y="24" width="2" height="4" rx="1" fill="${EM}"/>
<rect x="13" y="24" width="2" height="4" rx="1" fill="${EM}"/>
<rect x="17" y="24" width="2" height="4" rx="1" fill="${EM}"/>
</g></svg>`;
  }

  /* ── PET CLASS ──────────────────────────── */
  class Pet {
    constructor() {
      this.el = document.createElement('div');
      this.el.className = 'rp spawn walk';
      this.dir = Math.random() > 0.5 ? 'right' : 'left';
      this.x = this.dir === 'right' ? -40 : window.innerWidth + 10;
      this.state = 'run';
      this.timer = 0;
      this.dur = 3500 + Math.random() * 4000;
      this.spd = BASE_SPD + (Math.random() - 0.5) * 0.8;
      this.alive = true;
      this.last = performance.now();

      this.el.innerHTML = runSvg(this.dir);
      this.el.style.left = this.x + 'px';
      document.body.appendChild(this.el);

      setTimeout(() => this.el.classList.remove('spawn'), 320);
      this._raf = requestAnimationFrame(this._tick.bind(this));
    }

    _tick(now) {
      if (!this.alive) return;
      const dt = now - this.last;
      this.last = now;
      this.timer += dt;

      if (this.timer >= this.dur) this._next();

      if (this.state === 'run') {
        const sign = this.dir === 'right' ? 1 : -1;
        this.x += sign * this.spd;
        if (this.x > window.innerWidth + 20) { this.dir = 'left'; this.el.innerHTML = runSvg('left'); }
        else if (this.x < -44) { this.dir = 'right'; this.el.innerHTML = runSvg('right'); }
        this.el.style.left = this.x + 'px';
      }

      this._raf = requestAnimationFrame(this._tick.bind(this));
    }

    _next() {
      this.timer = 0;
      const r = Math.random();

      if (this.state === 'run') {
        if (r < 0.45) {
          // flip direction, keep running
          this.dir = this.dir === 'right' ? 'left' : 'right';
          this.el.innerHTML = runSvg(this.dir);
          this.dur = 2500 + Math.random() * 4500;
        } else if (r < 0.78) {
          // sit
          this.state = 'sit';
          this.el.classList.remove('walk');
          this.el.classList.add('sit');
          this.el.innerHTML = sitSvg(this.dir);
          this.dur = 2000 + Math.random() * 2000;
        } else {
          // sleep
          this.state = 'sleep';
          this.el.classList.remove('walk');
          this.el.classList.add('sit');
          this.el.innerHTML = sleepSvg(this.dir) + '<span class="zzz">💤</span>';
          this.dur = 2500 + Math.random() * 2500;
        }
      } else {
        // back to running
        this.state = 'run';
        this.el.className = 'rp walk';
        if (Math.random() > 0.5) this.dir = this.dir === 'right' ? 'left' : 'right';
        this.el.innerHTML = runSvg(this.dir);
        this.dur = 3000 + Math.random() * 4000;
      }
    }

    destroy() {
      this.alive = false;
      cancelAnimationFrame(this._raf);
      this.el.style.opacity = '0';
      setTimeout(() => this.el.remove(), 300);
    }
  }

  /* ── LAUNCHER BUTTON ────────────────────── */
  const pets = [];
  const btn = document.createElement('button');
  btn.id = 'pet-launcher';
  btn.innerHTML = '🐱';
  btn.title = 'Release a cat!';
  btn.setAttribute('aria-label', 'Release a desktop pet cat');
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    if (pets.length >= MAX_PETS) {
      // clear all
      pets.forEach(p => p.destroy());
      pets.length = 0;
      btn.classList.remove('has-pets');
      btn.title = 'Release a cat!';
      return;
    }
    pets.push(new Pet());
    btn.classList.add('has-pets');
    btn.title = pets.length >= MAX_PETS ? 'Click to clear all pets' : 'Release another cat!';
  });
})();
