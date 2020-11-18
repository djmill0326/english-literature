function isInBounds(x, y, offsetX, offsetY, width, height) {
  return (
    x >= offsetX &&
    x <= offsetX + width &&
    y >= offsetY &&
    y <= offsetY + height
  );
}

function stripPx(property) {
  return parseFloat(property.substr(0, property.length - 2));
}

var images = document.getElementsByTagName("img");
var popup = document.createElement("div");
var popupImg = document.createElement("img");
var isPopupOpen = false;
var hoverEl = document.createElement("div");
hoverEl.id = "hover-info";
hoverEl.innerText = "Click to expand.";
popup.id = "popup";
popup.appendChild(popupImg);
popupImg.id = "popup-img";

for (var i = 0; i < images.length; i++) {
  var img = images[i];

  img.onmouseenter = function () {
    document.body.appendChild(hoverEl);
  };

  img.onmouseleave = function () {
    document.body.removeChild(hoverEl);
  };

  img.onmousemove = function (e) {
    hoverEl.style.left = e.pageX + "px";
    hoverEl.style.top = e.pageY + "px";
  };

  img.onclick = function (e) {
    e.stopPropagation();
    popupImg.src = img.src;
    document.body.appendChild(popup);
    document.body.classList.add("modal-open");
    isPopupOpen = true;
    popup.focus();
  };
}

var animTime = 300;

function clearPopup() {
  popup.classList.add("remove");
  isPopupOpen = false;

  setTimeout(function () {
    document.body.removeChild(popup);
    popup.classList.remove("remove");
  }, animTime);
}

popup.onclick = function (e) {
  if (e.target !== popupImg) {
    clearPopup();
  }
};

window.addEventListener("keydown", function (e) {
  if (isPopupOpen && e.key === "Escape") {
    clearPopup();
  }
});
