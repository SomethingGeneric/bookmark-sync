function auth(mode) {

  var endpoint = "";

  function getEndpoint() {
    return new Promise((resolve, reject) => {
      browser.storage.local.get("endpoint").then((result) => {
        if (result.endpoint) {
          resolve(result.endpoint);
        } else{
          function auth(mode, endpoint) {
          
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
          
          getEndpoint().then((endpoint) => {
            auth("signin", endpoint);
          }).catch((error) => {
            console.error(error);
          });

function showE(id) {
  document.getElementById(id).hidden = false;
}

function hideE(id) {
  document.getElementById(id).hidden = true;
}

function updateButtonVisibility(sessionExists) {
  if (sessionExists) {
    hideE("signinbutton");
    hideE("registerbutton");
  } else {
    showE("signinbutton");
    showE("registerbutton");
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

    browser.storage.local.get("session").then((result) => {
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

    function setEndpoint(endpoint) {
      browser.storage.local.set({ endpoint: endpoint });
      console.log("Endpoint set to: " + endpoint);
      hideE("endpointset");
      showE("endpointremove");
      showE("loginsignup");
      checkSessionStatus().then((sessionExists) => {
        updateButtonVisibility(sessionExists);
      }).catch(console.error);
    }
    
    document.getElementById("endpointsetbutton").addEventListener("click", function () {
      var endpoint = document.getElementById("theend").value;
      setEndpoint(endpoint);
    });

    document.getElementById("endpointremovebutton").addEventListener("click", function () {
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

    document.getElementById("registerbutton").addEventListener("click", function () {
      auth("register")
    });

  });
  