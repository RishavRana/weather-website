// fetch("http://localhost:3000/weather?address=patna").then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(error);
//         } else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msg-1");
const msgTwo = document.querySelector("#msg-2");

//msgOne.textContent = "From JS File";

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    msgOne.textContent = "Loading.......";
    msgTwo.textContent = "Please Wait.....!!";

    const location = search.value;
    fetch("/weather?address=" + location + "").then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error;
                msgTwo.textContent = "Try Again..!!";
            } else {
                msgOne.textContent = data.location;
                msgTwo.textContent = data.forecast;
            }
        });
    });
});