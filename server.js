const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(cors({ origin: "*" }));
// Serve dynamic UI JSON
app.get("/ui_config", (req, res) => {
    const uiConfig = {
        "views": [
            {
                "type": "Text",
                "text": "🔥 Updated UI: Hello from Server!",
                "style": { "fontSize": 24, "color": "blue", "textAlign": "center" }
            },
            {
                "type": "Button",
                "text": "Click Me",
                "action": "dynamicButtonClick"
            }
        ]
    };
    res.json(uiConfig);
});

// Serve updated JavaScript logic
app.get("/logic.js", (req, res) => {
    const logic = `function dynamicFunction() { return "🚀 Logic Updated from Server!"; }`;
    res.type("application/javascript");
    res.send(logic);
});


// Start the server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
