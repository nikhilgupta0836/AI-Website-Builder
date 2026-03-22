const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const model = "openrouter/free";

export const generateResponse = async (prompt) => {
    const res = await fetch(openRouterUrl, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            // Required for free-tier priority in 2026
            "HTTP-Referer": "http://localhost:3000", 
            "X-Title": "Nikhil-Web-Builder"
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { 
                    role: "system", 
                    content: "Return ONLY valid raw JSON. No markdown code blocks. Use \\n for newlines. Escape all internal double quotes with a backslash." 
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.1, // Lower temperature = more stable JSON
            max_tokens: 4000  // Essential to avoid the 402/credit error
        }),
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error("openRouter err: " + err);
    }

    const data = await res.json();
    let content = data.choices[0].message.content;

    // --- SAFETY LAYER: Clean the response before returning ---
    try {
        // 1. Remove markdown backticks if the AI accidentally included them
        content = content.replace(/```json|```/g, "").trim();
        
        // 2. Test if it's valid JSON
        JSON.parse(content); 
        
        return content;
    } catch (e) {
        console.error("JSON Parse Error at content:", content);
        throw new Error("AI returned invalid JSON format. Please try again.");
    }
};
