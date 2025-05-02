const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const takePhotoButton = document.getElementById('take-photo');
const sendPhotoButton = document.getElementById('send-photo');

// Acceder a la cámara
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("Error al acceder a la cámara: ", err);
  });

// Tomar foto
takePhotoButton.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/png');
  photo.src = dataUrl;
});

// Enviar foto
sendPhotoButton.addEventListener('click', () => {
  if (photo.src) {
    const link = document.createElement('a');
    link.href = photo.src;
    link.download = 'mi-foto-kaia.png';
    link.click();
  } else {
    alert('Primero toma una foto.');
  }
});
