const video = document.querySelector('video');

async function setup() {
  // connect webcam stream to video element src
  const stream = await navigator.mediaDevices.getUserMedia({ video:true });
  video.srcObject = stream;
}
setup();