chrome.runtime.onInstalled.addListener(function () {
});

chrome.contextMenus.create({
  "id": "markdown",
  "title": "as Markdown",
  "contexts": ["all"],
});

chrome.contextMenus.create({
  "id": "html",
  "title": "as HTML",
  "contexts": ["all"],
});

const $textarea = document.createElement("textarea");
document.body.appendChild($textarea);

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  console.log(info, tab);
  switch (info.menuItemId) {
    case "markdown":
      copy(createMarkdownLink(tab.title, tab.url));
      break;
    case "html":
      copy(createHtmlLink(tab.title, tab.url));
      break;
  }
});

function copy(text) {
  $textarea.innerHTML = text;
  $textarea.select();
  document.execCommand("copy");
}

function createMarkdownLink(title, link) {
  return "[" + title + "](" + link + ")";
}

function createHtmlLink(title, link) {
  return '<a href="' + link + '">' + title + '</a>';
}

