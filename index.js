// Connecting the client side to the server using websocket API
const socket = new WebSocket("ws://localhost:8080/nodeserver.js"); // Adjust the path as needed


const form = document.getElementById('form-input');
const messageInp = document.getElementById("messageInp");
let container = document.getElementById("container");
let notificationSound = document.getElementById("notificationSound");

// append function to append the div
let appendChild = (name, position,message)=>{
var createdDiv = document.createElement('div');
createdDiv.innerText = `${name} : ${message}`;
createdDiv.classList.add("message");
createdDiv.classList.add(position);
container.append(createdDiv);
}
// Append the div when user sends the message
form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const message = messageInp.value;
    appendChild("you" ,"right", message);
    socket.send(JSON.stringify({type : 'send',text : message, name : name}));
    messageInp.value = "";
})

const name = prompt("Enter your name");

// sending the message to server on joining the new user
socket.onopen = () => {
    console.log("WebSocket connection opened");
    socket.send(JSON.stringify({type : 'new-user-joined', name : name}));
};

// Handling of the events from the server 
socket.onmessage = (event) => {
    try {
         console.log("this is running");
        const message = JSON.parse(event.data);
        const messageType = message.type;
         console.log("hellow world");
        switch (messageType) {
            case 'user-joined':
                {
                    appendChild(message.name, "right", "joined the chat");
                    notificationSound.play();
                }
                break;
            case 'recieve':
                {
                    appendChild(message.name, "left", message.text)
                    notificationSound.play();
                }
                break;
            case 'leave':
                {
                    appendChild(message.name, "right", "leave the chat")
                    notificationSound.play();
                }
                break;
            default:
                console.log('Unknown message type:', messageType);
        }
    } catch (error) {
        console.error('Error parsing message:', error);
    }
  };
// Handlig events End.............................

// Code for appending the child div to container

