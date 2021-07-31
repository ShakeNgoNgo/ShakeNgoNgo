document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("shake").addEventListener("click", function () {
    execute("shake");
    document.getElementById("shake").classList.add('active');
    document.getElementById("slide").classList.remove('active');
    document.getElementById("clear").classList.remove('active');
  });
  document.getElementById("slide").addEventListener("click", function () {
    execute("slide");
    document.getElementById("shake").classList.remove('active');
    document.getElementById("slide").classList.add('active');
    document.getElementById("clear").classList.remove('active');
  });
  document.getElementById("clear").addEventListener("click", function () {
    clear();
    document.getElementById("shake").classList.remove('active');
    document.getElementById("slide").classList.remove('active');
    document.getElementById("clear").classList.add('active');
  });
});
const shakeCSSCode =
  "var shakeKeyFrame = '@keyframes shake {0% { transform: translate(1px, 1px) rotate(0deg); }10% { transform: translate(-1px, -2px) rotate(-1deg); }20% { transform: translate(-3px, 0px) rotate(1deg); }30% { transform: translate(3px, 2px) rotate(0deg); }40% { transform: translate(1px, -1px) rotate(1deg); }50% { transform: translate(-1px, 2px) rotate(-1deg); }60% { transform: translate(-3px, 1px) rotate(0deg); }70% { transform: translate(3px, 1px) rotate(-1deg); }80% { transform: translate(-1px, -1px) rotate(1deg); }90% { transform: translate(1px, 2px) rotate(0deg); }100% { transform: translate(1px, -2px) rotate(-1deg); }}'";
const slideCSSCode =
  "var slideKeyFrame = '@keyframes slide {0% { transform: translate(0vw, 0px) ; }25% { transform: translate(-75vw, 0px) ; }50% { transform: translate(0vw, 0px) ; }75% { transform: translate(75vw, 0px) ; }100% { transform: translate(0vw, 0px) ; }}'";
const shakeCode =
  "var shakeCode = 'body {animation: shake 0.1s;animation-iteration-count: infinite;}'";
const slideCode =
  "var slideCode = 'body {animation: slide 7s;animation-iteration-count: infinite;}'";
const removeFromHead =
  "var old = document.getElementById('shake2ngo'); if(old) document.getElementsByTagName('head')[0].removeChild(old);";
const appendToHead =
  "if(style) document.getElementsByTagName('head')[0].appendChild(style);";
const getCreateStyleCode = (type) => {
  switch (type) {
    case "shake":
      return "var style = document.createElement('style');style.type = 'text/css';style.id='shake2ngo';style.innerHTML = shakeCode + ' ' + shakeKeyFrame;";
    case "slide":
      return "var style = document.createElement('style');style.type = 'text/css';style.id='shake2ngo';style.innerHTML = slideCode + ' ' + slideKeyFrame;";
    default:
      return "";
  }
};
const getAnimateCode = (type) => {
  switch (type) {
    case "shake":
      return shakeCode;
    case "slide":
      return slideCode;
    default:
      return "";
  }
};
const getCSSCode = (type) => {
  switch (type) {
    case "shake":
      return shakeCSSCode;
    case "slide":
      return slideCSSCode;
    default:
      return "";
  }
};
const execute = (type) => {
  let cssCode = getCSSCode(type);
  let animateCode = getAnimateCode(type);
  let styleCode = getCreateStyleCode(type);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: cssCode,
    });
    chrome.tabs.executeScript(tabs[0].id, {
      code: animateCode,
    });
    chrome.tabs.executeScript(tabs[0].id, {
      code: styleCode,
    });
    chrome.tabs.executeScript(tabs[0].id, {
      code: removeFromHead,
    });
    chrome.tabs.executeScript(tabs[0].id, {
      code: appendToHead,
    });
  });
};
const clear = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: removeFromHead,
    });
  });
};
