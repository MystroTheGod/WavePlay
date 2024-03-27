let canvasSizeSlider, lineWidthSlider;
let waveAmplitudeSlider, waveFrequencySlider, waveSpeedSlider, numWavesSlider;
let backgroundColorPicker, waveColorPicker, waveTypeSelector;
let saveBtn;

function setup() {
  const canvas = document.getElementById('myCanvas');
  createCanvas(2000, 1125);
  noFill();
  
  
  // Amplitude Control
  createP('Amplitude').style('color', '#000000').style('font-family', 'Arial');
  waveAmplitudeSlider = createSlider(1, 100, 20);
  
  // Frequency Control
  createP('Frequency').style('color', '#000000').style('font-family', 'Arial');
  waveFrequencySlider = createSlider(0.01, 0.1, 0.05, 0.01);
  
  // Speed Control
  createP('Speed').style('color', '#000000').style('font-family', 'Arial');
  waveSpeedSlider = createSlider(0.01, 0.2, 0.05, 0.01);
  
  // Number of Waves Control
  createP('Number of Waves').style('color', '#000000').style('font-family', 'Arial');
  numWavesSlider = createSlider(1, 10, 1);
  
  // Background Color Picker
  createP('Background Color').style('color', '#030303').style('font-family', 'Arial');
  backgroundColorPicker = createColorPicker('#082032');
  
  // Wave Color Picker
  createP('Wave Color').style('color', '#000000').style('font-family', 'Arial');
  waveColorPicker = createColorPicker('#FF4C29');
  
  // Wave Type Selector
  createP('Wave Type:').style('color', '#050505').style('font-family', 'Arial');
  waveTypeSelector = createSelect();
  waveTypeSelector.option('sin');
  waveTypeSelector.option('cos');
  waveTypeSelector.option('noise');
  waveTypeSelector.option('square');
  waveTypeSelector.option('triangle');
  waveTypeSelector.option('sawtooth');
  


// Line Width Control
createP('Line Width').style('color', '#000000').style('font-family', 'Arial');
lineWidthSlider = createSlider(1, 20, 10); // Min, max, default stroke weight

  
  // Save Image Button
  saveBtn = createButton('Save Image');
  saveBtn.mousePressed(() => saveCanvas('waveArt', 'png'));
}
function draw() {
  background(backgroundColorPicker.value());
  stroke(waveColorPicker.value());
  strokeWeight(10);
  let numWaves = numWavesSlider.value();
    // Adjust line width based on the slider
  strokeWeight(lineWidthSlider.value());
  
  for (let n = 0; n < numWaves; n++) {
    beginShape();
    let baseline = map(n, 0, numWaves - 1, 0, height);
    let waveSpacing = height / numWaves; 

    for (let i = 0; i < width; i++) {
      let x = i;
      let waveAmplitude = waveAmplitudeSlider.value();
      let y = baseline + getWaveValue(i, n, waveFrequencySlider.value(), waveSpeedSlider.value(), waveAmplitude, numWaves);
      vertex(x, y);
    }
    endShape();
  }
}

function getWaveValue(x, n, waveFrequency, waveSpeed, waveAmplitude, numWaves) {
  let y;
  let t = (x * waveFrequency + frameCount * waveSpeed) + n * PI / numWaves;
  
  switch (waveTypeSelector.value()) {
    case 'sin':
      y = sin(TWO_PI * t) * waveAmplitude;
      break;
    case 'cos':
      y = cos(TWO_PI * t) * waveAmplitude;
      break;
    case 'noise':
      y = noise(t) * 2 * waveAmplitude - waveAmplitude; // Normalize noise to -1,1 and scale by amplitude
      break;
    case 'square':
      y = sin(TWO_PI * t) > 0 ? waveAmplitude : -waveAmplitude;
      break;
    case 'triangle':
      y = asin(sin(TWO_PI * t)) * (2 / PI) * waveAmplitude;
      break;
    case 'sawtooth':
      y = (t - floor(t)) * 2 * waveAmplitude - waveAmplitude;
      break;
    default:
      y = sin(TWO_PI * t) * waveAmplitude;
      break;
  }
  return y;
}
