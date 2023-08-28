document.getElementById("addBookmark").addEventListener("click", function () {
    fetch("https://example.com/api/data") // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        const bookmarkTitle = data.title; // Assuming the API response contains a title field
        const bookmarkURL = data.url;     // Assuming the API response contains a URL field

        browser.bookmarks.create({
          title: bookmarkTitle,
          url: bookmarkURL
        }).then(() => {
          console.log("Bookmark added:", bookmarkTitle);
        }).catch(error => {
          console.error("Error adding bookmark:", error);
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  });