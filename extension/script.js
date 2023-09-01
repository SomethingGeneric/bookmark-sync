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

function showElement(id) {
  document.getElementById(id).hidden = false;
}

function hideElement(id) {
  document.getElementById(id).hidden = true;
}

document.addEventListener("DOMContentLoaded", function () {

    var endpoint = "https://example.com";
    var session = "";

    var panels = ["endpointset", "endpointremove", "loginsignup", "signinbutton", "registerbutton", "signout"];

    for (const tpanel of panels) {
      hideE(tpanel);
    }

    browser.storage.local.get("session").then((result) => {
      if (result.session) {
        session = result.session;
        showE("signout");
      } else {
        console.log("There was no session token.");
        hideE("signinbutton");
        hideE("registerbutton");
      }
    });

    browser.storage.local.get("endpoint").then((result) => {
      if (result.endpoint) {
        endpoint = result.endpoint;
        console.log("There was one: " + endpoint);
        showE("endpointremove");
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
      hideElement("endpointset");
      showElement("endpointremove");
      showElement("loginsignup");
      showElement("signinbutton");
      showElement("registerbutton");
    }
    document.getElementById("endpointsetbutton").addEventListener("click", setEndpoint);

    function removeEndpoint() {
      browser.storage.local.remove("endpoint");
      console.log("Endpoint removed.");
      hideElement("endpointremove");
      showElement("endpointset");
    }
    document.getElementById("endpointremovebutton").addEventListener("click", removeEndpoint);

    function signIn() {
      auth("signin");
    }
    
    function register() {
      auth("register");
    }
    
    document.getElementById("signinbutton").addEventListener("click", signIn);
    document.getElementById("registerbutton").addEventListener("click", register);

  });
  