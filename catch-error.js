let gifButton = document.querySelector("button");
let search = document.querySelector("#userSearch");
let number = document.querySelector("#number");
let gifContainer = document.querySelector(".gif-container");

// корректный fetch запрос:
// fetch(
//     `https://api.giphy.com/v1/gifs/search?api_key=AUR1oawy4r9z1QfA3jhCx7utLuYnNup9&q=${search.value}&limit=${number.value}&offset=0&rating=g&lang=en`
//   )

gifButton.addEventListener("click", function () {
  console.log(search.value);
  fetch(
    // некорректный fetch запрос, чтобы проверить вывод ошибки в alert:
    `https://api.giphy.com/v1/gifs/search?api_key=AUR1oawy4r9z1QfA3jhCx7utLuYnNup9&q=${search.value}&limit=${number.value}&offset=0&rating=g&lang=en`
  )
    .then((res) => {
      try {
        if (window.navigator.onLine == false)
          throw new Error("Check Internet connection...");
      } catch (error) {
        alert("WEB ERROR: " + error.message);
      }
      try {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Check the validity of the entered request");
      } catch (error) {
        alert("ERROR: INVALID REQUEST! " + error.message);
      }
    })
    .then((elem) => {
      console.log(elem);
      gifContainer.innerHTML = "";
      search.value = "";
      number.value = "";
      for (let i = 0; i < elem.data.length; i++) {
        gifContainer.innerHTML += `<div><img src="${elem.data[i].images.downsized.url}"></div>`;
      }
    })
    .catch((error) => console.log(error));
});

// window.addEventListener("offline", () => {
//   //   try {
//   //     if (navigator.onLine) {
//   //       console.log("Connected Internet");
//   throw new Error(alert("Check Internet connection..."));
//   //     }
//   //   } catch (error) {
//   //     alert("No Internet: " + error.message);
//   //   }
// });
