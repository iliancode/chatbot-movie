const { InferenceClient } = require("@huggingface/inference");// Fallback function si l'API IA ne marche pasfunction getMovieRecommendations(query) {    return `Voici quelques recommandations de films basées sur "${query}" :\n\n1. **Inception** - Un thriller de science-fiction complexe\n2. **The Matrix** - Action cyberpunk révolutionnaire\n3. **Interstellar** - Science-fiction émotionnelle\n4. **Pulp Fiction** - Crime culte de Tarantino\n5. **The Dark Knight** - Super-héros sombre et réaliste`;}module.exports = async (req, res) => {    // CORS    res.setHeader('Access-Control-Allow-Origin', '*');    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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

        // Essayer l'API Hugging Face
        try {
            const hfClient = new InferenceClient(process.env.HF_TOKEN);
            
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
                return res.json({ response: chatCompletion.choices[0].message.content });
            }
            
        } catch (apiError) {
            console.log('IA API failed:', apiError.message);
        }

        // Fallback si l'IA ne marche pas
        return res.json({ response: getMovieRecommendations(message) });

    } catch (error) {
        console.error('Erreur:', error);
        return res.json({ response: getMovieRecommendations(req.body?.message || 'films populaires') });
    }

