
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const download = document.getElementById('download');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  });

snap.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = 1080;
  canvas.height = 1350;
  
  // Fondo blanco tipo Polaroid
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Imagen de video
  context.drawImage(video, 90, 90, 900, 900);

  // Texto en parte inferior
  context.fillStyle = 'black';
  context.font = '36px Arial';
  context.fillText('Tenemos hoy, te quiero hoy', 250, 1300);

  // Mostrar y permitir descargar
  const image = canvas.toDataURL('image/png');
  download.href = image;
  download.style.display = 'inline-block';
  canvas.style.display = 'block';
});
