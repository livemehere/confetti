import Confetti from "./src/Confetti.js";


new Confetti();


document.querySelector('button').addEventListener('click', () => {
    document.querySelector('#desc').style.display = 'none';
})
