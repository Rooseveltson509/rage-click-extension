let clickCount = 0;

document.addEventListener("click", () => {
  clickCount++;
  if (clickCount >= 3) {
    if (document.querySelector(".floating-menu")) {
      document.querySelector(".floating-menu").remove();
    } else {
      clickCount = 0; // Reset click count
      displayMenu();
    }
  }
});

function displayMenu() {
  const floatingMenu = document.createElement("div");
  floatingMenu.className = "floating-menu";

  /*   const menuItems = ['Icon1', 'Icon2', 'Icon3'];
  menuItems.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.textContent = item;
    floatingMenu.appendChild(menuItem);
  }); */

/*   const iconUrl = chrome.runtime.getURL('images/icon.png'); 
  const icon = document.createElement('img');
  icon.src = iconUrl;
  icon.alt = 'Icon';
  icon.style.width = '24px';
  icon.style.height = '24px';
  menuItem.appendChild(icon); */
  const iconUrl = chrome.runtime.getURL('icon1.png');

  const createMenuItem = (url, iconSrc, altText) => {
    const menuItem = document.createElement("div");
    menuItem.style.margin = "10px 0";
    menuItem.style.cursor = "pointer";
    const icon = document.createElement("img");
    icon.src = iconSrc;
    icon.alt = altText;
    icon.style.width = "32px";
    icon.style.height = "32px";
    menuItem.appendChild(icon);
    menuItem.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "openTab", url });
    });
    return menuItem;
  };

  floatingMenu.appendChild(createMenuItem("icon1.png", iconUrl, "U"));
  floatingMenu.appendChild(createMenuItem("comment.png", "comment.png", "Comment"));
  floatingMenu.appendChild(createMenuItem("heart.png", "heart.png", "Heart"));
  floatingMenu.appendChild(createMenuItem("magic.png", "magic", "Magic"));

  const closeButton = document.createElement("div");
  closeButton.textContent = "✖";
  closeButton.style.backgroundColor = "#ff6347";
  closeButton.style.color = "white";
  closeButton.style.padding = "5px";
  closeButton.style.borderRadius = "50%";
  closeButton.style.cursor = "pointer";
  closeButton.style.textAlign = "center";
  closeButton.style.width = "34px";
  closeButton.addEventListener("click", () => {
    floatingMenu.style.display = "none";
  });
  floatingMenu.appendChild(closeButton);

  document.body.appendChild(floatingMenu);
}
