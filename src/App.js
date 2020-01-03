import React from 'react';
import LEDMatrix from './LEDMatrix';

import './App.css';

class App extends React.Component {
  constructor (props) {
    super (props);

    let width = 16 * 4, height = 16 * 2;
    let bitmap = new Array (width * height);
    //this.drawRandom (width, height, bitmap);

    this.state = {bitmap, width, height};

    setInterval (this.update.bind (this), 300);

    this.drawClock (width, height, bitmap);
  }

  update () {
    let width = 16 * 4, height = 16 * 2;
    let bitmap = new Array (width * height);
    //this.drawRandom (width, height, bitmap);
    this.drawClock (width, height, bitmap);

    this.setState ({bitmap});
  }

  drawRandom (width, height, bitmap) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        bitmap[j + i * width] = Math.round (Math.random ());
      }
    }
  }

  drawClock (width, height, bitmap) {
    var ctx = document.getElementById ('canvas').getContext ('2d');

    var now = new Date ();
    var h = now.getHours ();
    var hs = '' + parseInt (h / 10) + h % 10;
    var m = now.getMinutes ();
    var ms = '' + parseInt (m / 10) + m % 10;
    var s = now.getSeconds ();
    var ss = '' + parseInt (s / 10) + s % 10;

    // 面の塗りを設定する（単一色）
    ctx.fillStyle = 'rgba(0,0,0,1.0)';

    // 矩形を面描画する
    ctx.fillRect (0, 0, 64, 32);

    ctx.font = '16px Osaka-mono';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'rgba(255,255,255,1.0)';
    //ctx.fillText (hs + ':' + ms + ':' + ss, 0, 0, 64);
    ctx.fillText ('遅延', 0, 8);

    var image_data = ctx.getImageData (0, 0, 64, 32);
    //console.log (image_data);
    let sum = 0;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let index = j + i * width;
        let a = image_data.data[index * 4 + 3];
        let r = image_data.data[index * 4] * 255 / a;
        let g = image_data.data[index * 4 + 1] * 255 / a;
        let b = image_data.data[index * 4 + 2] * 255 / a;

        sum += 0.2126 * r + 0.7152 * g + 0.0722 * b;
      }
    }
    sum = sum / height / width;
    console.log (sum);

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let index = j + i * width;
        let a = image_data.data[index * 4 + 3];
        let r = image_data.data[index * 4] * 255 / a;
        let g = image_data.data[index * 4 + 1] * 255 / a;
        let b = image_data.data[index * 4 + 2] * 255 / a;

        if (0.2126 * r + 0.7152 * g + 0.0722 * b < sum) {
          bitmap[index] = 0;
        } else {
          bitmap[index] = 1;
        }
      }
    }
    //bitmap[index] = Math.round (r + g + b) < 0 ? 0 : 1;
  }

  render () {
    return (
      <div className="App">
        <LEDMatrix
          width={this.state.width}
          height={this.state.height}
          bitmap={this.state.bitmap}
        />
      </div>
    );
  }
}

export default App;
