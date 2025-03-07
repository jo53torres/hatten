const API_KEY = "sk-25bdf166a9ee4e3ab13a215033059b8c"; // Reemplázala con tu clave
const API_URL = "https://api.deepseek.com/v1/chat/completions"; // URL de la API (ajústala según la documentación)

async function sendMessage(userMessage) {
    const responseContainer = document.getElementById("response");

    // Mostrar mensaje del usuario
    responseContainer.innerHTML += `<p><strong>Tú:</strong> ${userMessage}</p>`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}` // Autenticación con la API Key
            },
            body: JSON.stringify({
                model: "deepseek-chat", // Ajustar según el modelo disponible
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;

        // Mostrar respuesta del bot
        responseContainer.innerHTML += `<p><strong>Asistente:</strong> ${botReply}</p>`;

    } catch (error) {
        responseContainer.innerHTML += `<p style="color:red;">Error en la respuesta</p>`;
        console.error("Error:", error);
    }
}
