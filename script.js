// --- JITTER FIX: Lock the height using CSS variables ---
function setViewportHeight() {
    // Calculate the actual viewport height in pixels (1% of the window height)
    let vh = window.innerHeight * 0.01;
    // Set the value of the custom property --vh to the calculated value
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Run immediately and on resize events
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
// -------------------------------------------------------------------


// --- 背景音樂控制 ---
const bgMusic = document.getElementById('bgMusic');
const playButton = document.getElementById('playButton');

function playMusic() {
    bgMusic.play().then(() => {
        // 成功播放后隐藏按钮
        playButton.style.display = 'none';
        
        // ***** 關鍵修復: 延遲煙花啟動 100 毫秒，避免瀏覽器在點擊後發生抖動/縮放 *****
        setTimeout(() => {
             launchRandomFirework();
        }, 100); 
        // ******************************************************************************

    }).catch(error => {
        // 自动播放失败，保持按钮可见
        console.log("音乐播放失败，等待用户互动。", error);
    });
}

// --- 煙花邏輯 ---
const fireworksContainer = document.getElementById('fireworks-container');
// 多色煙花
const COLORS = [
    '#FF4500',  // 橙红色
    '#FFD700',  // 金色 (黄色)
    '#00BFFF',  // 天蓝色
    '#FF1493',  // 深粉红色
    '#9370DB',  // 紫罗兰色
    '#FFA07A',  // 浅橙色
    '#FFFFFF'   // 白色
];

function createFirework(x, y) {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const numParticles = Math.floor(Math.random() * 20) + 30;
    const maxVelocity = Math.random() * 3 + 4;
    const spreadFactor = Math.random() * 30 + 70;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.backgroundColor = color;
        
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        const angle = Math.random() * 2 * Math.PI;
        const velocity = Math.random() * (maxVelocity) + 1; 

        const targetX = x + velocity * spreadFactor * Math.cos(angle);
        const targetY = y + velocity * spreadFactor * Math.sin(angle);

        fireworksContainer.appendChild(particle);

        setTimeout(() => {
            const duration = Math.random() * 0.5 + 1.0; 
            particle.style.transition = `all ${duration}s ease-out`; 
            particle.style.transform = `translate(${targetX - x}px, ${targetY - y}px)`;
            particle.style.opacity = '0';
            
            setTimeout(() => {
                particle.remove();
            }, duration * 1000); 
        }, 10); 
    }
}

// 定時發射煙花，高頻率
function launchRandomFirework() {
    const x = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
    const y = Math.random() * window.innerHeight * 0.6; 
    
    setTimeout(() => {
        createFirework(x, y);
    }, 500); 

    const nextLaunchTime = Math.random() * 1200 + 800; 
    setTimeout(launchRandomFirework, nextLaunchTime);
}