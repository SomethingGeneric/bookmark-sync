function auth(mode) {

  var endpoint = "";

  browser.storage.local.get("endpoint").then((result) => {
    if (result.endpoint) {
      endpoint = result.endpoint;
    } else{
      return false;
    }
  });

  const data = {
    "username": document.getElementById("username").value,
    "password": document.getElementById("password").value
  };

  const other = {
    body: data,
    method: "post"
  };

  var m = ""; 

  if (mode == "signin") {
    m = "/login";
  } else if (mode == "register") {
    m = "/register";
  }

  fetch(endpoint+m, other).then(data=>{console.log(data);}).then(res=>{console.log(res);}).catch(error=>console.log(error));
  
  return true;
  
  }
  
  function fetchBookmarks() {
    fetch(endpoint + '/bookmarks')
      .then(response => response.json())
      .then(bookmarks => {
        bookmarks.forEach(bookmark => {
          if (!bookmarkExists(bookmark)) {
            addBookmark(bookmark);
          }
        });
  
        getLocalBookmarks().forEach(localBookmark => {
          if (!bookmarks.includes(localBookmark)) {
            removeBookmark(localBookmark);
          }
        });
      })
      .catch(error => console.log(error));
  }

function showElement(id) {
  document.getElementById(id).hidden = false;
}

function hideElement(id) {
  document.getElementById(id).hidden = true;
}

function updateButtonVisibility(sessionExists) {
  if (sessionExists) {
    hideElement("signinbutton");
    hideElement("registerbutton");
  } else {
    showElement("signinbutton");
    showElement("registerbutton");
  }
}

function checkSessionStatus() {
  return new Promise((resolve, reject) => {
    browser.storage.local.get("session").then((result) => {
      resolve(!!result.session);
    }).catch(reject);
  });
}

document.addEventListener("DOMContentLoaded", function () {

    var endpoint = "https://example.com";
    var session = "";

    var panels = ["endpointset", "endpointremove", "loginsignup", "signinbutton", "registerbutton", "signout"];

    for (const tpanel of panels) {
      hideE(tpanel);
    }

    checkSessionStatus().then((sessionExists) => {
      updateButtonVisibility(sessionExists);
    }).catch(console.error);
        showE("signout");
      } else {
        console.log("There was no session token.");
        hideE("signinbutton");
        hideE("registerbutton");
      }
        showE("loginsignup");
      } else {
        console.log("There was none.");
        showE("endpointset");
      }
    });

    function setEndpoint() {
      endpoint = document.getElementById("theend").value;
      browser.storage.local.set({ endpoint: endpoint });
      console.log("Endpoint set to: " + endpoint);
      hideE("endpointset");
      showE("endpointremove");
      showE("loginsignup");
      checkSessionStatus().then((sessionExists) => {
        updateButtonVisibility(sessionExists);
      }).catch(console.error);
    });

    function removeEndpoint() {
      browser.storage.local.remove("endpoint");
      console.log("Endpoint removed.");
      hideE("endpointremove");
      showE("endpointset");
      checkSessionStatus().then((sessionExists) => {
        updateButtonVisibility(sessionExists);
      }).catch(console.error);
    });

    document.getElementById("signinbutton").addEventListener("click", function () {  
      auth("signin")
    });

    function signIn() {
      auth("signin");
    }
    
    function register() {
      auth("register");
    }
    
    document.getElementById("signinbutton").addEventListener("click", signIn);
    document.getElementById("registerbutton").addEventListener("click", register);

  });
  