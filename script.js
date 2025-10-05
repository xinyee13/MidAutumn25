// --- 背景音樂控制 ---
const bgMusic = document.getElementById('bgMusic');
const playButton = document.getElementById('playButton');

function playMusic() {
    bgMusic.play().then(() => {
        // 成功播放后隐藏按钮并启动烟花
        playButton.style.display = 'none';
        launchRandomFirework(); 
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
    const numParticles = Math.floor(Math.random() * 20) + 30; // 粒子数随机
    const maxVelocity = Math.random() * 3 + 4; // 粒子最大速度随机
    const spreadFactor = Math.random() * 30 + 70; // 扩散距离随机

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.backgroundColor = color;
        
        // 随机设置粒子初始大小
        const size = Math.random() * 3 + 2; // 2px 到 5px
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
            // 随机设置烟花消失时间在 1.0s 到 1.5s 之间
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
    // 随机位置 (只在上半部分天空发射)
    const x = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
    const y = Math.random() * window.innerHeight * 0.6; 
    
    setTimeout(() => {
        createFirework(x, y);
    }, 500); 

    // 每 0.8 到 2 秒發射一次
    const nextLaunchTime = Math.random() * 1200 + 800; 
    setTimeout(launchRandomFirework, nextLaunchTime);
}

// 畫面載入後啟動煙花
window.onload = launchRandomFirework;