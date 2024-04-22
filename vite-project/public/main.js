import '../public/stylesheets/style.css'
import '../public/javascript/globalmessaging.js'


function navigate() {

}

// Websocket code from ICE-04
// ws = new WebSocket( 'ws://127.0.0.1:5173' )

// ws.onopen = () => {
//   ws.onmessage = async msg => {
//     const message = await msg.data.text();
//     console.log(msg.data.text())
//     const messageElement = document.createElement("div");
//     messageElement.innerText = await "Them: " + message;
//     messageElement.style.backgroundColor = 'green';
//     messageElement.style.margin = "auto";
//     messageElement.style.width = "200px"
//     textArea.appendChild(messageElement);
//   }
// }

// button.onclick = e => {
//   if (!(input.value === "")) {
//   const messageElement = document.createElement("div");
//   messageElement.innerText = "You: " + input.value;
//   messageElement.style.backgroundColor = 'blue';
//   textArea.appendChild(messageElement);
//   messageElement.style.margin = "auto";
//   messageElement.style.width = "200px"
//   ws.send(input.value)
//   input.value = "";
//   } 
// }
