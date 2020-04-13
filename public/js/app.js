// console.log("from client side JS")

// Example for fetch function
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetching the weather information 
const getWeather = (searchString, callback) => {
    fetch("http://localhost:3000/weather?search=" + searchString).then(response => {
        response.json().then(data => {
            if (data.error) {
                callback(data.error, undefined);
            } else {
                callback(undefined, data)
            }
        })
    })
}

const weatherForm = document.querySelector('form');
const searchString = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = 'From JavaScript';

weatherForm.addEventListener('submit', (e) => {
    // prevent default function is called to prevent browser refresh when calling the event listener function on submit.
    e.preventDefault();
    messageOne.textContent = 'From JavaScript';
    messageTwo.textContent = "Loading Weather Data!!!"
    let weatherForecast = getWeather(searchString.value, (error, data) => {
        if (error) {
            console.log(error)
            return messageTwo.textContent = error;
        } else {
            console.log(data)
            messageOne.textContent = "Location: " + data.location;
            messageTwo.textContent = "Weather Info: " + data.weatherinfo;
            return;
        }
    })
})