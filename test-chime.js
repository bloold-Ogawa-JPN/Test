let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playTone(freq, type, duration) {
  initAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.00001,
    audioCtx.currentTime + duration
  );

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

// 57,58,59,00秒の「ポン、ポン、ポ〜ン！」を順番に鳴らす
function playChime(type) {
  initAudio();

  // 57秒（ポン）
  setTimeout(() => {
    if (type === 'electronic') {
      playTone(880, 'sine', 0.12);
    } else if (type === 'bell') {
      playTone(660, 'triangle', 0.20);
    } else if (type === 'retro') {
      playTone(1500, 'square', 0.12);
    }
  }, 0);

  // 58秒（ポン）
  setTimeout(() => {
    if (type === 'electronic') {
      playTone(880, 'sine', 0.12);
    } else if (type === 'bell') {
      playTone(660, 'triangle', 0.20);
    } else if (type === 'retro') {
      playTone(1500, 'square', 0.12);
    }
  }, 1000);

  // 59秒（ポン）
  setTimeout(() => {
    if (type === 'electronic') {
      playTone(880, 'sine', 0.12);
    } else if (type === 'bell') {
      playTone(660, 'triangle', 0.20);
    } else if (type === 'retro') {
      playTone(1500, 'square', 0.12);
    }
  }, 2000);

  // 00秒（ポ〜ン！）
  setTimeout(() => {
    if (type === 'electronic') {
      playTone(1760, 'sine', 0.35);
    } else if (type === 'bell') {
      playTone(880, 'triangle', 0.45);
    } else if (type === 'retro') {
      playTone(2200, 'square', 0.35);
    }
  }, 3000);
}
