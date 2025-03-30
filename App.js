import React, { useState, useEffect } from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet } from "react-native";

// Server URLs
const SERVER_URL = "http://192.168.130.189:3000";
const UI_CONFIG_URL = `${SERVER_URL}/ui_config`;
const LOGIC_URL = `${SERVER_URL}/logic.js`;

const App = () => {
  const [uiConfig, setUiConfig] = useState(null);
  const [dynamicMessage, setDynamicMessage] = useState("Loading...");

  useEffect(() => {
    // Fetch UI config
    fetch(UI_CONFIG_URL)
      .then(response => response.json())
      .then(data => setUiConfig(data))
      .catch(error => console.error("Error fetching UI config:", error));

    // Fetch and execute updated JavaScript logic
    fetch(LOGIC_URL)
      .then(response => response.text())
      .then(jsCode => {
        console.log(jsCode + "; return dynamicFunction");
        const dynamicFunction = new Function(jsCode + "; return dynamicFunction")();
        console.log(dynamicFunction());
        setDynamicMessage(dynamicFunction());
      })
      .catch(error => console.error("Error fetching logic.js:", error));
  }, []);

  const handleAction = (action) => {
    if (action === "dynamicButtonClick") {
      alert("🎉 Dynamic Button Clicked!");
    }
  };

  if (!uiConfig) return <ActivityIndicator size="large" color="blue" />;

  return (
    <View style={styles.container}>
      {uiConfig.views.map((view, index) => {
        if (view.type === "Text") {
          return <Text key={index} style={[styles.text, view.style]}>{view.text}</Text>;
        }
        if (view.type === "Button") {
          return <Button key={index} title={view.text} onPress={() => handleAction(view.action)} />;
        }
        return null;
      })}

      {/* Show message from updated logic.js */}
      <Text style={styles.message}>{dynamicMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  text: { fontSize: 18, marginBottom: 10 },
  message: { fontSize: 16, color: "green", marginTop: 20 },
});

export default App;
