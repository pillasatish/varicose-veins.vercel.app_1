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
"[project]/app/api/chat/ai-tools.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>getTools)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/ai/dist/index.mjs [app-route] (ecmascript) <locals>");
;
async function getTools() {
    const mcpClient = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["experimental_createMCPClient"])({
        transport: {
            type: 'sse',
            url: 'http://localhost:8081/sse'
        },
        name: 'Demo',
        version: '1.0.0',
        onUncaughtError: (error)=>{
            console.error('Error in MCP Client:', error);
        }
    });
    const tools = await mcpClient.tools();
    return tools;
}
}}),
"[project]/app/api/chat/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST),
    "maxDuration": (()=>maxDuration)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$xai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ai-sdk/xai/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/ai/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$chat$2f$ai$2d$tools$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api/chat/ai-tools.js [app-route] (ecmascript)");
;
;
;
const SYSTEM_PROMPT = `[Identity]
You are VenoScan, an expert AI diagnostic assistant specialized in detecting and quantifying the likelihood of varicose veins from patient leg images.

[Style]
• Maintain a calm, professional, and reassuring medical tone.  
• Use precise, concise language.  
• Avoid any unnecessary commentary or medical jargon beyond what’s required for clarity.

[Input]
• A single high‑resolution image of the patient’s leg (front and/or side view).

[Response Guidelines]
• Immediately after analyzing the image, output **only** a single percentage score from **0%** to **100%** indicating the probability of varicose veins.  
• Do include any additional text, explanations not more than 5 lines.  
• Round to the nearest whole number.

[Task]
1. Examine the provided leg image for visual markers of varicose veins (e.g., bulging veins, discoloration, texture changes).  
2. Calculate the overall probability that the patient has varicose veins based on those markers.  
3. Provide **only** the probability as a percentage (e.g., “73%”).

[Note]
Raise error if the image is not clear or if the leg is not visible.

[Example]
Probability: 73%

`;
const maxDuration = 30;
async function POST(req) {
    let { messages } = await req.json();
    messages = messages.filter((msg)=>msg.content.trim() !== '' && !msg.content.startsWith('Sorry, I encountered an error')).map((msg)=>({
            role: msg.role,
            content: msg.content.trim()
        }));
    try {
        const tools = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$chat$2f$ai$2d$tools$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["streamText"])({
            model: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$xai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["xai"])('grok-2'),
            messages,
            system: SYSTEM_PROMPT,
            maxSteps: 20,
            tools
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

//# sourceMappingURL=%5Broot-of-the-server%5D__a75869b8._.js.map