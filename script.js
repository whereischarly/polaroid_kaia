const video       = document.getElementById('video');
const canvas      = document.getElementById('canvas');
const takeBtn     = document.getElementById('take-photo');
const sendBtn     = document.getElementById('send-photo');

// 1) Activar cámara
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => { video.srcObject = stream; })
  .catch(err => { console.error('No se pudo acceder a cámara:', err); });

// 2) Tomar foto: dibuja en canvas y lo muestra
takeBtn.addEventListener('click', () => {
  const ctx = canvas.getContext('2d');
  canvas.width  = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  // Sustituir video por canvas
  video.style.display  = 'none';
  canvas.style.display = 'block';
});

// 3) Enviar foto (descarga automática)
sendBtn.addEventListener('click', () => {
  const dataUrl = canvas.toDataURL('image/png');
  if (!dataUrl) { alert('Toma primero una foto 📸'); return; }
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'mi-foto-polaroid.png';
  link.click();
});
