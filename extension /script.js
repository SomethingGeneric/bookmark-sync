function auth(mode) {
  if (mode == "signin") {

  } else if (mode == "register") {

  } else {
    return false;
  }
}

function showE(id) {
  document.getElementById(id).hidden = false;
}

function hideE(id) {
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

    document.getElementById("endpointsetbutton").addEventListener("click", function () {
      endpoint = document.getElementById("theend").value;
      browser.storage.local.set({ endpoint: endpoint });
      console.log("Endpoint set to: " + endpoint);
      hideE("endpointset");
      showE("endpointremove");
      showE("loginsignup");
      showE("signinbutton");
      showE("registerbutton");
    });

    document.getElementById("endpointremovebutton").addEventListener("click", function () {
      browser.storage.local.remove("endpoint");
      console.log("Endpoint removed.");
      hideE("endpointremove");
      showE("endpointset");
    });

    document.getElementById("signinbutton").addEventListener("click", auth("signin"));

    document.getElementById("registerbutton").addEventListener("click", auth("register"));

  });
  