let splitTabed; // button test changes
let splitAnki; // button
let exchange; // button
let filter; // input
let shuffle; //button
let data; // https://www.google.com/search?sxsrf=ALeKk00R07khvDlEfB30pzaN1AZ8SrKPoQ%3A1606682937535&ei=OQnEX7eQIPiFwPAPvYm68Ao&q=p5js+data+from+text+file&oq=p5js+data+from+text+file&gs_lcp=CgZwc3ktYWIQAzoECCMQJ1D_8QhY6fYIYNL5CGgAcAB4AIABgAGIAcUEkgEDNC4ymAEAoAEBqgEHZ3dzLXdpesABAQ&sclient=psy-ab&ved=0ahUKEwj3kIiu0KjtAhX4AhAIHb2EDq4Q4dUDCA0&uact=5 
let originalText; // textarea
let translateText; // textarea
let typedText; // textarea
let v_originalText; // text
let v_translateText; // text
let hideCheckbox; 
// const log;

function setup() {
  noCanvas();
  splitTabed = select('#splitTabed');
  splitAnki = select('#splitAnki');
  exchange = select('#exchange');
  filter = select('#filter');
  shuffle = select('#shuffle');
  originalText = select('#originalText').style('font-size', "18pt");
  translateText = select('#translateText').style('font-size', "18pt");
  typedText = select('#typedText').style('font-size', "18pt");
  log = select('#log').style('font-size', "18pt");
  hideCheckbox = createCheckbox('show', false).style('font-size', "18pt");

  splitTabed.mousePressed(splitTabedClick);
  splitAnki.mousePressed(splitAnkiClick);
  exchange.mousePressed(exchangeClick);
  filter.changed(filterChanged);
  shuffle.mousePressed(shuffleClick);
  originalText.mouseOver(showMouse);
  originalText.mouseOut(hideMouse);
  typedText.input(updateText);
  hideCheckbox.changed(hideText);
  hideCheckbox.mouseOver(overCheckbox);
  hideCheckbox.mouseOut(outCheckbox);
  // textareas synchronization
  // typedText.onscroll(typedTextScrolling);
  // typedText.addEventListener()

}

// function keyPressed() {
// 	if ( key === 'f' ) {  // f === 70
// 		let fs = fullscreen();
// 		fullscreen(!fs);
//   }
// }

function typedTextScrolling(){
  log.value('You scrolling');
}

// function logScroll(e){
//   log.textContent = `Scroll position: ${e.target.scrollTop}`;
// }

function splitTabedClick(){
  // originalText.html('test original text');
  // secondText.html('test second text');
  // typedText.html('test typed text');

  v_translateText = originalText.value().replace(/^.+\t/gm, "");
  v_originalText = originalText.value().replace(/^(.+)(\t).+/gm, "$1");
  translateText.value(v_translateText);
  originalText.value(v_originalText);

}

function splitAnkiClick(){
  v_translateText = originalText.value().replace(/({{c1::)(.+)(}} )(.+)/gm, "$4");
  v_originalText = originalText.value().replace(/({{c1::)(.+)(}} )(.+)/gm, "$2");
  translateText.value(v_translateText);
  originalText.value(v_originalText);
}

function exchangeClick(){
  v_translateText = translateText.value();
  translateText.value(originalText.value());
  originalText.value(v_translateText);
}

function filterChanged(){
  originalText.value('The filtered data will appear here.'); // regex ^((?!data).)*\n
}

function shuffleClick(){
  textToLinesOriginal = split(originalText.value().replace(/\n\s*$(?!\n)/gm, ""), '\n');
  textToLinesTranslate = split(translateText.value().replace(/\n\s*$(?!\n)/gm, ""), '\n');
  let sh_textToLinesTranslate = "";
  let sh_textToLinesOriginal = "", n = textToLinesOriginal.length, i;
  while (n) {
    i = Math.floor(Math.random() * textToLinesOriginal.length);

    if (i in textToLinesOriginal) {
      // sh_textToLinesOriginal.push(textToLinesOriginal[i]);
      sh_textToLinesOriginal = sh_textToLinesOriginal + textToLinesOriginal[i] + '\n';
      sh_textToLinesTranslate = sh_textToLinesTranslate + textToLinesTranslate[i] + '\n';
      delete textToLinesOriginal[i];
      delete textToLinesTranslate[i];
      n--;
    }
  }
  originalText.value(sh_textToLinesOriginal);
  translateText.value(sh_textToLinesTranslate);
}


// function updateSize() {
//   paragraph.style('font-size', slider.value() + 'pt');
// }

function updateText() {
  var inputLength = typedText.value().length;
  if (typedText.value() == originalText.value().substring(0,inputLength)) {
    typedText.style("color", '#009462');
  } else {
    typedText.style("color", '#ff0000');
  }
}

function hideText(){
  if(this.checked()){
    originalText.style("color",'#202000');
    // originalText.show();
  } else {
    originalText.style("color", '#ffffff');
    // originalText.hide();
  }
}

function showMouse(){
  originalText.style("color", '#202000');
  originalText.value(originalText.value().replace(/„|”|“/g, "\""));
  originalText.value(originalText.value().replace(/’/g, "\'"));
  // // originalText.value(originalText.value().replace(/\n/g, " "));
  // originalText.value(originalText.value().replace(/\n\n/g, "\n"));
  // originalText.value(originalText.value().replace(/ +/g, " "));
}

function hideMouse(){
  originalText.style("color", '#ffffff');
}

function overCheckbox(){
  // console.log('Button Split translate is clicked');
  hideCheckbox.style("color", '#ffffff');
  // hideCheckbox.checked=true;
}

function outCheckbox(){
  hideCheckbox.style("color", '#202000');
  // hideCheckbox.checked=false;
}