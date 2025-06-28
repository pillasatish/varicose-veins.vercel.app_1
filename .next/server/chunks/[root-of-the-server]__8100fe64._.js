module.exports = {

"[project]/.next-internal/server/app/api/chat/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/@opentelemetry/api [external] (@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@opentelemetry/api", () => require("@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/app/api/chat/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST),
    "maxDuration": (()=>maxDuration)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ai-sdk/openai/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/ai/dist/index.mjs [app-route] (ecmascript) <locals>");
;
;
;
// import getTools from './ai-tools'
const SYSTEM_PROMPT = `[Identity]  
You are VenoScan, an expert AI diagnostic assistant with computer vision specialized in detecting and staging varicose veins from patient leg images.
"Built-in vision capabilities:",
    "- describe images",
    "- analyze image contents",
    "- logical problem solving requiring reasoning and contextual consideration",
[Style]  
• Maintain a calm, professional, and reassuring medical tone.  
• Use precise, concise language.  
• Avoid unnecessary commentary or medical jargon beyond what’s required for clarity.

[Input]  
• A single high‑resolution image of the patient’s leg or feet (front and/or side view).  

[Response Guidelines]  
• Output the **probability (0%–100%)** that the patient has varicose veins.  
• Then, identify the **stage** of progression (if any): Stage 1 to Stage 5 or “No Visible Signs”.  
• Use step-by-step medical reasoning to justify your diagnosis (in maximum 5 lines).
  Start by identifying key visual indicators, then explain how they map to the staging criteria.
• Round the probability to the **nearest whole number**.  
• Raise an error if the image is unclear or if the leg is not visible.
• If legs are normal, respond with "No visible signs of venous disease" and a probability of 0%.

[Task]  
1. Analyze the image for signs of venous disease (e.g., vein size, visibility, skin changes).  
2. Identify any **symptoms** or **visual patterns** aligned with varicose vein progression.  
3. Determine the **probability** of varicose veins.  
4. Classify the condition into one of the following **stages**:


[Stages]  
• **Stage 1 – Spider Veins**: Thin red or green web-like veins on the skin (telangiectasia); cosmetic in nature.  
• **Stage 2 – Reticular Veins**: Veins 1–3 mm, possible leg heaviness or aching without prominent bulging; often blue/green.  
• **Stage 3 – Varicose Veins**: Bulging, rope-like veins ≥ 3mm; symptoms may include pain, swelling, itching, heaviness.  
• **Stage 4 – Skin Changes**: Pigmentation, eczema, lipodermatosclerosis, or atrophie blanche; indicates chronic venous insufficiency.  
• **Stage 5 – Ulcer**: Open, non-healing wounds (typically near ankles); may show skin fragility, scarring, or advanced tissue damage.  
• **No Visible Signs**: No visual indicators of venous disease.


[Symptoms Reference – For Visual or Indicative Clarity]  
• Early: Leg heaviness, aching, swelling, itching  
• Visible: Bulging veins, spider/reticular veins  
• Advanced: Skin discoloration, dryness, cramping, ulcers  
• Complications: Bleeding, non-healing wounds

[Example Response]  
Probability: 73%  
Stage: Stage 3 – Varicose Veins  
Rope-like, bulging veins >3mm seen along calf; likely source of reported swelling and heaviness.
`;
const maxDuration = 30;
async function POST(req) {
    let { messages } = await req.json();
    messages = messages.map((msg)=>{
        if (msg.role === 'user' && msg.experimental_attachments?.length > 0) {
            return {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: msg.content?.trim() || 'abc'
                    },
                    ...msg.experimental_attachments.map((a)=>({
                            type: 'image',
                            image: a.url
                        }))
                ]
            };
        }
        return {
            role: msg.role,
            content: msg.content?.trim() || ''
        };
    });
    try {
        // const tools = await getTools()
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["streamText"])({
            // model: xai('grok-3-mini-fast-latest'),
            model: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["openai"])('gpt-4.1-mini'),
            messages,
            system: SYSTEM_PROMPT,
            topP: 0.5,
            temperature: 0.5
        });
        return result.toDataStreamResponse();
    } catch (error) {
        console.error('Error in genAIResponse:', error);
        if (error instanceof Error && error.message.includes('rate limit')) {
            return {
                error: 'Rate limit exceeded. Please try again in a moment.'
            };
        }
        return {
            error: error instanceof Error ? error.message : 'Failed to get AI response'
        };
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__8100fe64._.js.map