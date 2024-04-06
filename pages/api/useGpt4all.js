import { LLModel, createCompletion, DEFAULT_DIRECTORY, DEFAULT_LIBRARIES_DIRECTORY, loadModel } from 'gpt4all';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const model = await loadModel('mistral-7b-openorca.gguf2.Q4_0.gguf', { verbose: true, device: 'cpu' });  // adjust path and options as necessary
            const completion = await createCompletion(model, req.body.prompt);
            model.dispose();
            res.status(200).json({ message: completion });  // Ensure you access the correct property based on your completion result structure
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error processing your request" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
