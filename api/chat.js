const { InferenceClient } = require("@huggingface/inference");
const { getMovieRecommendations } = require('../movieRecommendations');

const hfClient = new InferenceClient(process.env.HF_TOKEN);

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        console.log('Message utilisateur:', message);

        try {
            const chatCompletion = await hfClient.chatCompletion({
                model: "deepseek-ai/DeepSeek-V3-0324",
                messages: [
                    {
                        role: "system",
                        content: "Tu es un assistant de recommandation de films serviable. Fournis 3-5 recommandations de films spécifiques basées sur la demande de l'utilisateur. Inclus de brèves descriptions et explique pourquoi chaque film est un bon choix. Formate ta réponse clairement avec des recommandations numérotées. Réponds toujours en français."
                    },
                    {
                        role: "user",
                        content: `Peux-tu recommander des films pour : ${message}`
                    }
                ],
            });
            
            if (chatCompletion.choices && chatCompletion.choices.length > 0) {
                console.log('Réponse IA reçue');
                return res.json({ response: chatCompletion.choices[0].message.content });
            }
            
        } catch (apiError) {
            console.log('Modèle IA fail:', apiError.message);
        }

        return res.json({ response: getMovieRecommendations(message) });

    } catch (error) {
        console.error('Erreur :', error.message);
        return res.json({ response: getMovieRecommendations(message) });
    }
};
