const video = document.querySelector('video');

async function setup() {
  // connect webcam stream to video element src
  const stream = await navigator.mediaDevices.getUserMedia({ video:true });
  video.srcObject = stream;

  // add event listener on play
  video.addEventListener('playing', async () => {
    // initialize Tesseract worker
    const worker = Tesseract.createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
  });
}
setup();