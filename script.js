const bgMusic = document.getElementById("bgMusic");
const canvas = document.getElementById("starfield");
const context = canvas.getContext("2d");
const messageEl = document.getElementById("message");
const button = document.getElementById("valentinesButton");
const finalNote = document.getElementById("finalNote");
const pinkGlow = document.getElementById("pinkGlow");
const mainContent = document.getElementById("mainContent");
const finalText = document.getElementById("finalText");
let globalFade = 0; // 0 = no fade, 1 = fully black
let heartMode = false;
let pulseScale = 1;
let backgroundBrightness = 1;
let pulseDirection = 1;
let heartGlowStrength = 0;
let pulseSpeed = 0.0012;
let finalTextShown = false;

const name = "Cutie";
const senderName = "Arpit";

const emailjsConfig = {
    publicKey: "ZfyjcNhadIY3VxohM",
    serviceId: "service_upmw86n",
    templateId: "template_cceovxn",
    toEmail: "arpittiwarijpr@gmail.com",
};

const story = [
"Somewhere between India and Nepal,",
"I found you — and everything started making sense.",

"I was just a traveler in life,",
"and you became the destination I never knew I was searching for.",

"You say I deserve better,",
"but I truly believe I already have the best.",
"When I have you, I don’t feel the need for anything more.",

"Every moment with you feels too short — like time is jealous of us.",

"It might sound cheesy…",
"but I love cheese, and I love you.",
"So I guess that makes perfect sense.",

"I love you so very much,",
"my cutuu. ❤️",

"— Yours always, Arpit"
];

const emailMessage = `My Tharu ji,

Happy Valentine’s Day, My Love,

Loving you has been the most beautiful part of my life.

You are not just my girlfriend — you are my strength, my motivation, and my safe place. Every day with you makes me want to grow, to achieve more, and to become a better man.

Your love fills the empty spaces in my heart and turns ordinary moments into something magical. When I look at you, I don’t just see the present — I see my peace, my happiness, and my future.

Thank you for choosing me, for believing in me, and for loving me the way you do.

I am yours — today and always.

With all my heart,

Love,
${senderName}`;

const timings = story.map(() => 3200);
const fadeDuration = 700;

let currentIndex = 0;
let lastChange = performance.now();
let isFading = false;

const stars = 520;
const colorrange = [210, 250, 310];
const starArray = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.bottom = "0px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

function initStars() {
    starArray.length = 0;
    for (let i = 0; i < stars; i += 1) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.4 + 0.2;
        const hue = colorrange[getRandom(0, colorrange.length - 1)];
        const sat = getRandom(45, 80);
        const opacity = Math.random();
        const drift = (Math.random() - 0.5) * 0.06;
        starArray.push({ x, y, radius, hue, sat, opacity, drift });
    }
}

function drawStars() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (heartMode) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
    
        context.save();
        context.beginPath();
        context.arc(centerX, centerY, 180 * pulseScale, 0, Math.PI * 2);
    
        context.shadowBlur = 80 * heartGlowStrength;
        // Warmth factor increases as scene fades
        const warmth = 1 - bgMusic.volume;

        // Interpolate between pink and warm rose/gold
        const r = 255;
        const g = Math.floor(105 + 80 * warmth);   // 105 → 185
        const b = Math.floor(180 - 100 * warmth);  // 180 → 80

        context.shadowColor = `rgba(${r}, ${g}, ${b}, 0.9)`;
        context.fillStyle = `rgba(${r}, ${g}, ${b}, 0.15)`;
    
        context.fill();
        context.restore();
    }
    for (let i = 0; i < stars; i += 1) {
        const star = starArray[i];
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        const isHeartStar = heartMode && star.targetX !== undefined && star.targetY !== undefined;
        const finalOpacity = isHeartStar
            ? Math.min(1, star.opacity + 0.3)
            : star.opacity * backgroundBrightness;
        context.fillStyle = `hsla(${star.hue}, ${star.sat}%, 88%, ${finalOpacity})`;
        context.fill();
    }
    // Global cinematic fade overlay
    if (globalFade > 0) {
        context.fillStyle = `rgba(0, 0, 0, ${globalFade})`;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function updateStars() {

    // Update pulse ONLY once per frame
    if (heartMode) {
        heartGlowStrength += (1 - heartGlowStrength) * 0.02;
        pulseScale += pulseSpeed * pulseDirection;

        if (pulseScale > 1.08 || pulseScale < 0.95) {
            pulseDirection *= -1;
        }
        backgroundBrightness += (0.15 - backgroundBrightness) * 0.01;
    }

    for (let i = 0; i < stars; i += 1) {
        const star = starArray[i];

        if (heartMode && star.targetX !== undefined && star.targetY !== undefined){

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            const offsetX = (star.targetX - centerX) * pulseScale;
            const offsetY = (star.targetY - centerY) * pulseScale;

            const pulsedX = centerX + offsetX;
            const pulsedY = centerY + offsetY;

            star.x += (pulsedX - star.x) * 0.05;
            star.y += (pulsedY - star.y) * 0.05;
        }
    }
}
function fadeMusicVolume(targetVolume, duration) {
    const startVolume = bgMusic.volume;
    const volumeChange = targetVolume - startVolume;
    const startTime = performance.now();

    function adjustVolume(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        let newVolume = startVolume + volumeChange * progress;

        // Safety clamp
        newVolume = Math.max(0, Math.min(1, newVolume));
        bgMusic.volume = newVolume;

        if (progress < 1) {
            requestAnimationFrame(adjustVolume);
        }
    }

    requestAnimationFrame(adjustVolume);
}

function setMessage(text) {
    messageEl.textContent = text;
}

function advanceStory(time) {
    const elapsed = time - lastChange;
    const wait = timings[currentIndex] || 3000;

    if (!isFading && elapsed > wait - fadeDuration) {
        isFading = true;
        messageEl.classList.add("is-fading");
    }

    if (elapsed >= wait) {
        currentIndex = Math.min(currentIndex + 1, story.length - 1);
        setMessage(story[currentIndex]);
        messageEl.classList.remove("is-fading");
        isFading = false;
        lastChange = time;
    }
}
document.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.volume = 0.6;
        bgMusic.play().catch(() => {});
    }
}, { once: true });

button.addEventListener("click", () => {
    bgMusic.play().catch(() => {});
    mainContent.classList.add("zoom-effect");
    const sparkleInterval = setInterval(createSparkle, 200);
    const heartInterval = setInterval(createHeart, 300);
    heartMode = true;
    heartGlowStrength = 0;
    formHeartShape();
    fadeMusicVolume(0.15, 4000);
    // setTimeout(() => {
    //     finalText.classList.add("show");
    // }, 2500);
    setTimeout(() => {
        fadeMusicVolume(0.25, 3000);
    }, 8000);
    button.disabled = true;
    button.textContent = "Sending...";
    finalNote.textContent = `Happy Valentine's Day, ${name}. I will keep choosing you, every single day. ❤️`;
    finalNote.classList.remove("hidden");
    pinkGlow.classList.add("active");

    if (!window.emailjs) {
        button.textContent = "Sent from my heart";
        return;
    }

    emailjs.init(emailjsConfig.publicKey);

    const payload = {
        to_name: name,
        from_name: senderName,
        message: emailMessage,
        to_email: emailjsConfig.toEmail,
    };

    emailjs
        .send(emailjsConfig.serviceId, emailjsConfig.templateId, payload)
        .then(() => {
            button.textContent = "A piece of my heart reached you ❤️"
        })
        .catch((error) => {
            console.error("EmailJS error:", error);
            button.textContent = "Still yours, always ❤️";
        });
    // After 20 seconds, start cinematic fade
    setTimeout(() => {
        clearInterval(sparkleInterval);
        clearInterval(heartInterval);
        startGlobalFade(6000);
    }, 20000);
});

function animate(time) {
    drawStars();
    updateStars();
    advanceStory(time);
    window.requestAnimationFrame(animate);
}

function formHeartShape() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < starArray.length; i++) {
        const t = (i / starArray.length) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y =
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t);

        starArray[i].targetX = centerX + x * 12;
        starArray[i].targetY = centerY - y * 12;
    }
}

function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    sparkle.style.left = Math.random() * window.innerWidth + "px";
    sparkle.style.bottom = "0px";

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 6000);
}
function startGlobalFade(duration) {
    const startTime = performance.now();
    fadeMusicVolume(0, duration);
    function fadeStep(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
    
        globalFade = progress * 0.9;
    
        // Slow the heartbeat
        pulseSpeed += (0.00005 - pulseSpeed) * 0.015;
        backgroundBrightness += (0.05 - backgroundBrightness) * 0.02;

        // When almost finished fading, gently settle the heart
        // Soften glow near the very end
        if (progress > 0.85) {
            heartGlowStrength += (0.35 - heartGlowStrength) * 0.03;
        }

        if (progress >= 1 && !finalTextShown) {
            finalTextShown = true;
            finalText.classList.add("show");
            bgMusic.pause(); // optional clean ending
        }
    
        if (progress < 1) {
            requestAnimationFrame(fadeStep);
        }
    }

    requestAnimationFrame(fadeStep);
}

resizeCanvas();
initStars();
setMessage(story[0]);

window.addEventListener("resize", () => {
    resizeCanvas();
    initStars();
});
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

window.requestAnimationFrame(animate);


