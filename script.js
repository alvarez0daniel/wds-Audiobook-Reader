const video = document.querySelector('video');
const textElem = document.querySelector('[data-text]');

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

    // create target canvas to store image for processing
    const canvas = document.createElement('canvas');
    canvas.width = video.width;
    canvas.height = video.height;

    // recognize text from processing image; read aloud and display text
    document.addEventListener('keypress', async ( e ) => {
      // take processing image and store in canvas
      if (!e.code == 'Space') return;
      canvas.getContext('2d').drawImage(video, 0, 0, video.width, video.height)
      const { data: { text } } = await worker.recognize(canvas);
      
      // clean up text and play audio
      speechSynthesis.speak(
        new SpeechSynthesisUtterance(text.replace(/\s/g, " "))
      );

      // display processed text
      textElem.textContent = text;
    });
  });
}

// run
setup();