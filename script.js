
const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture');
const sendBtn = document.getElementById('send');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error('Error al acceder a la cámara:', err);
  });

captureBtn.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.style.display = 'block';
});

sendBtn.addEventListener('click', () => {
  const imageData = canvas.toDataURL('image/png');

  fetch('https://formspree.io/f/tu_formulario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: imageData })
  })
  .then(response => {
    if (response.ok) {
      alert('Foto enviada exitosamente.');
    } else {
      alert('Error al enviar la foto.');
    }
  });
});
