const chatbot= document.getElementById('chatbot');
const conversation= document.getElementById('conversation');
const inputForm= document.getElementById('input-form');
const inputField= document.getElementById('input-field');

inputForm.addEventListener('submit' , function(event) {
    event.preventDefault();
    const prompt = inputField.value;
    inputField.value='';
    const currentTime= new Date()/toLocaleTimeString([], {hour: '2-digit', minute: "2-digit"});

    let message = document.createElement('div')
    message.classList.add('chatbot-message', 'user-manage');
    message.innerHTML = '<p class="chatbot-text" sentTime="${currentTime})">${prompt}</p>';
    conversation.appendChild(message);
    let params = (new URL(document.location)).searchParams;
    let botname = params.get("bot");

    console.log(botname);
    const formData = new FormData();
    formData.append("botname", botname);
    formData.append("prompt", prompt);

    fetch('/chatbot' , {
        method: 'POST',
        body: formData
    }).then(response => response.text())
    .then(data => {
        console.log(data)
        message = document.createElement('div');
        message.classList.add('chatbot-message', 'chatbot');
        message.innerHTML = '<p class="chatbot-text" sentTime="${currentTime}">${data}</p>';
        conversation.appendChild(message);
        message.scrollIntoView({behaviour: "smooth" });
    });
});




