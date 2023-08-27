document.addEventListener("DOMContentLoaded", function () {

    var endpoint = "https://example.com";

    var panels = ["endpointset", "endpointremove"];

    for (const tpanel of panels) {
      document.getElementById(tpanel).hidden = true;
    }

    browser.storage.local.get("endpoint").then((result) => {
      if (result.endpoint) {
        endpoint = result.endpoint;
        console.log("There was one: " + endpoint);
        document.getElementById("endpointremove").hidden = false;
      } else {
        console.log("There was none.");
        document.getElementById("endpointset").hidden = false;
      }
    });

    document.getElementById("endpointsetbutton").addEventListener("click", function () {
      endpoint = document.getElementById("theend").value;
      browser.storage.local.set({ endpoint: endpoint });
      console.log("Endpoint set to: " + endpoint);
      document.getElementById("endpointset").hidden = true;
    });

    document.getElementById("endpointremovebutton").addEventListener("click", function () {
      browser.storage.local.remove("endpoint");
      console.log("Endpoint removed.");
      document.getElementById("endpointremove").hidden = true;
      document.getElementById("endpointset").hidden = false;
    });

  });
  