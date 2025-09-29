import "dotenv/config";

const getGeminiAPIResponse = async(message) => {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': `${process.env.GEMINI_API_KEY}`, 
        },
        body: JSON.stringify({
            model: "gemini-2.5-flash",
            contents: [{
                role: "user",
                parts: [{
                    text: message
                }]
            }]
        })
    };

    try{
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", options);
        const data = await response.json();
        return data?.candidates?.[0].content?.parts?.[0]?.text; //reply
    } catch(err) {
        console.log(err);
    }
}

export default getGeminiAPIResponse;