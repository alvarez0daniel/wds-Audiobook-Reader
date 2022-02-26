const video = document.querySelector('video');

async function setup() {
  const stream = await navigator.mediaDevices.getUserMedia({ video:true });
  video.srcObject = stream;
}
setup();