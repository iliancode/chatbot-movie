const express = require('express');
const cors = require('cors');
const path = require('path');
const { InferenceClient } = require("@huggingface/inference");
const { getMovieRecommendations } = require('./movieRecommendations');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const hfClient = new InferenceClient( process.env.HF_TOKEN);

app.use(cors());
app.use(express.json());

// force la suppression du cache pour le dev
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/chat', async (req, res) => {
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
                console.log(' Réponse:');
                res.json({ response: chatCompletion.choices[0].message.content });
                return;
            }
            
        } catch (apiError) {
            console.log('modèle IA fail:', apiError.message);
        }

        res.json({ response: getMovieRecommendations(message) });

    } catch (error) {
        console.error('Erreur :', error.message);
        res.json({ response: getMovieRecommendations(message) });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`serveur sur : http://localhost:${PORT}`);
});
