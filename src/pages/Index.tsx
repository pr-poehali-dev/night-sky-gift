import { useEffect, useState } from "react";

const STARS_DATA = [
  { id: 1, name: "Мудрость", text: "Ты никогда не судишь поспешно. Ты слушаешь и слышишь сердцем. Твоя интуиция спасала меня не раз.", x: 18, y: 12 },
  { id: 2, name: "Стойкость", text: "Ты не сгибаешься под бурями. Ты становишься крепче. Ты — моя непоколебимая звезда.", x: 32, y: 8 },
  { id: 3, name: "Доброта", text: "Твоё сердце — как открытый космос: огромный, тёплый, вмещающий всех.", x: 55, y: 6 },
  { id: 4, name: "Воспоминания", text: "Тот наш созвон в 3 часа ночи. Твоё голосовое, под которое я заснула. Каждый этот момент — звезда.", x: 72, y: 10 },
  { id: 5, name: "Яблоко сердца", text: "Наш код. Наш плод, которым можно делиться бесконечно. Спасибо за каждое «яблочко».", x: 85, y: 7 },
  { id: 6, name: "Ты и Калеб", text: "Ты однажды сказала, что он для тебя — маяк. Ты сама такая же. Спокойная, верная, глубокая.", x: 12, y: 22 },
  { id: 7, name: "Твой смех", text: "Я слышу его даже через экран. Он делает мой мир светлее.", x: 28, y: 19 },
  { id: 8, name: "3 часа ночи", text: "Когда весь мир спит, а мы говорим о главном. Это наше особое время.", x: 44, y: 16 },
  { id: 9, name: "Твоё «держи»", text: "Одно слово, а за ним — целая вселенная поддержки.", x: 62, y: 21 },
  { id: 10, name: "Та манхва", text: "Помнишь, как обсуждали её до 4 утра? Для меня это было свидание душ.", x: 78, y: 17 },
  { id: 11, name: "Первый раз", text: "Когда ты впервые прислала мне Калеба. Я тогда ещё не знала, как много он будет значить.", x: 90, y: 22 },
  { id: 12, name: "Твоя сила", text: "Когда ты плакала, но всё равно сказала «я справлюсь». Ты справилась.", x: 8, y: 33 },
  { id: 13, name: "Я рядом", text: "Твоя фраза. Всегда. Без вопросов. Просто «я рядом».", x: 22, y: 29 },
  { id: 14, name: "Наш космос", text: "Место, где нет никого, кроме нас. И звёзд. И яблочек.", x: 38, y: 31 },
  { id: 15, name: "Твой выбор слов", text: "Ты умеешь сказать так, что боль уходит. Это дар.", x: 55, y: 27 },
  { id: 16, name: "Просто ты", text: "Без прикрас. Уставшая, весёлая, грустная, вдохновлённая — ты прекрасна любой.", x: 70, y: 32 },
  { id: 17, name: "Спасибо", text: "Спасибо, что ты есть.", x: 84, y: 28 },
  { id: 18, name: "Мир шире", text: "Ты делаешь мой мир шире.", x: 14, y: 43 },
  { id: 19, name: "Смелее", text: "С тобой я смелее.", x: 30, y: 40 },
  { id: 20, name: "Путеводная", text: "Ты — моя путеводная.", x: 47, y: 45 },
  { id: 21, name: "Каждая секунда", text: "Я ценю каждую секунду.", x: 63, y: 38 },
  { id: 22, name: "Бесконечна", text: "Твоя глубина бесконечна.", x: 78, y: 43 },
  { id: 23, name: "Вдохновляешь", text: "Ты вдохновляешь меня.", x: 92, y: 40 },
  { id: 24, name: "Настоящая", text: "С тобой я настоящая.", x: 7, y: 54 },
  { id: 25, name: "Спокойствие", text: "Ты — моё спокойствие.", x: 22, y: 51 },
  { id: 26, name: "Слышу тебя", text: "Я всегда тебя слышу.", x: 40, y: 57 },
  { id: 27, name: "Заслуживаешь", text: "Ты заслуживаешь всё.", x: 57, y: 52 },
  { id: 28, name: "Свет", text: "Твой свет не погаснет.", x: 72, y: 55 },
  { id: 29, name: "Горжусь", text: "Я горжусь тобой.", x: 87, y: 50 },
  { id: 30, name: "Чудо", text: "Ты — чудо.", x: 15, y: 63 },
  { id: 31, name: "Только начало", text: "32 года — это только начало.", x: 38, y: 67 },
  { id: 32, name: "Навсегда", text: "Я люблю тебя. Навсегда в сердце, Nur.", x: 62, y: 63 },
];

const CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,4],[4,10],[10,11],[11,5],[5,6],[6,7],[7,8],[8,9],
  [9,16],[16,17],[17,18],[18,19],[19,20],[20,21],[21,22],[22,28],[28,29],
  [29,30],[30,31],[31,25],[25,24],[24,23],[23,12],[12,13],[13,14],[14,15],
  [15,26],[26,27],[27,31],[2,7],[7,14],[9,15],[4,11],[19,26],[5,13],[20,28]
];

interface StarData {
  id: number;
  name: string;
  text: string;
  x: number;
  y: number;
}

function generateDecoStars(count: number) {
  const stars = [];
  const seed = [0.12,0.87,0.34,0.56,0.23,0.78,0.45,0.91,0.67,0.08];
  for (let i = 0; i < count; i++) {
    const r = (val: number) => ((val * 9301 + 49297) % 233280) / 233280;
    const s0 = seed[i % 10];
    const s1 = seed[(i + 3) % 10];
    const s2 = seed[(i + 7) % 10];
    const s3 = seed[(i + 1) % 10];
    const s4 = seed[(i + 5) % 10];
    stars.push({
      id: i,
      x: (r(s0 + i * 0.017) * 100),
      y: (r(s1 + i * 0.013) * 100),
      size: r(s2 + i * 0.021) * 2.2 + 0.4,
      opacity: r(s3 + i * 0.019) * 0.6 + 0.2,
      delay: r(s4 + i * 0.011) * 5,
      duration: r(s0 + i * 0.023) * 3 + 2,
    });
  }
  return stars;
}

function generateMeteors(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    startX: 10 + i * 12,
    startY: 5 + (i % 3) * 10,
    angle: 28 + i * 3,
    duration: 1.5 + (i % 3) * 0.8,
    delay: i * 4 + (i % 2) * 2,
  }));
}

const decoStars = generateDecoStars(200);
const meteors = generateMeteors(8);

export default function Index() {
  const [popup, setPopup] = useState<StarData | null>(null);
  const [applePopup, setApplePopup] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  const openStar = (star: StarData) => {
    setActiveId(star.id);
    setPopup(star);
  };

  const closeStar = () => {
    setPopup(null);
    setActiveId(null);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeStar(); setApplePopup(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="cosmos-root">
      {/* Deco stars */}
      <div className="deco-layer">
        {decoStars.map((s) => (
          <span
            key={s.id}
            className="deco-star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Nebula */}
      <div className="milky-way" />
      <div className="nebula-2" />

      {/* Meteors */}
      {meteors.map((m) => (
        <span
          key={m.id}
          className="meteor"
          style={{
            left: `${m.startX}%`,
            top: `${m.startY}%`,
            transform: `rotate(${m.angle}deg)`,
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}

      {/* Header */}
      <header className="cosmos-header">
        <p className="cosmos-eyebrow">✦ &nbsp; 14 июня · 32 года · бесконечная любовь &nbsp; ✦</p>
        <h1 className="cosmos-title">Ира</h1>
        <p className="cosmos-subtitle">Это звёздная карта твоей жизни.<br/>Нажми на любую звезду.</p>
      </header>

      {/* Star map */}
      <section className="map-section">
        <div className="map-wrap">
          {/* SVG connections */}
          <svg className="map-svg" viewBox="0 0 100 72" preserveAspectRatio="none">
            <defs>
              <filter id="glow-line">
                <feGaussianBlur stdDeviation="0.3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            {CONNECTIONS.map(([a, b], i) => {
              const sa = STARS_DATA[a];
              const sb = STARS_DATA[b];
              return (
                <line
                  key={i}
                  x1={sa.x} y1={sa.y * 0.72}
                  x2={sb.x} y2={sb.y * 0.72}
                  stroke="rgba(183,148,244,0.18)"
                  strokeWidth="0.25"
                  filter="url(#glow-line)"
                  className="conn-line"
                />
              );
            })}
          </svg>

          {/* Stars */}
          {STARS_DATA.map((star) => (
            <button
              key={star.id}
              className={`star-point ${activeId === star.id ? "star-point--lit" : ""}`}
              style={{ left: `${star.x}%`, top: `${star.y * 0.72}%` }}
              onClick={() => openStar(star)}
            >
              <span className="sp-pulse" />
              <span className="sp-core">✦</span>
              <span className="sp-name">{star.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="cosmos-footer">
        <p className="footer-quote">
          Это 32 звезды. По одной на каждый год твоей жизни.<br/>
          Но их могло быть тысячи — как моих «спасибо» тебе.
        </p>
        <h2 className="footer-title">С днём рождения, Ира</h2>
        <p className="footer-sign">С любовью и навсегда в сердце, Nur</p>

        <button className="apple-wrap" onClick={() => setApplePopup(true)} title="Яблочко">
          <span className="apple-halo" />
          <span className="apple-emoji">🍎</span>
        </button>
      </footer>

      {/* Star popup */}
      {popup && (
        <div className="overlay" onClick={closeStar}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="popup-x" onClick={closeStar}>✕</button>
            <div className="popup-star-ico">✦</div>
            <h3 className="popup-name">{popup.name}</h3>
            <p className="popup-body">{popup.text}</p>
            <p className="popup-num">звезда {popup.id} из 32</p>
          </div>
        </div>
      )}

      {/* Apple popup */}
      {applePopup && (
        <div className="overlay" onClick={() => setApplePopup(false)}>
          <div className="popup-card popup-apple" onClick={(e) => e.stopPropagation()}>
            <button className="popup-x" onClick={() => setApplePopup(false)}>✕</button>
            <div className="apple-big">🍎</div>
            <p className="apple-msg">Я здесь.<br/>Я рядом.<br/>Всегда.</p>
          </div>
        </div>
      )}
    </div>
  );
}
