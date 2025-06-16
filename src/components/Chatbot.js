"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Send as SendIcon,
  Chat as ChatIcon,
  Close as CloseIcon,
  Grass as GrassIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import axios from "axios";

// Sample predefined questions for crop disease detection
const predefinedQuestions = [
  { id: 1, text: "How do I identify fungal infections on crops?", icon: <GrassIcon color="success" /> },
  { id: 2, text: "What are common wheat diseases?", icon: <GrassIcon color="success" /> },
  { id: 3, text: "How to treat bacterial infections in plants?", icon: <SearchIcon color="success" /> },
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm AgriBot. Ask me about crop diseases!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    const userMessage = { id: messages.length + 1, text: input, sender: "user", timestamp: new Date() };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/chatbot/", { message: input });
      const botMessage = { id: messages.length + 2, text: response.data.response, sender: "bot", timestamp: new Date() };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { id: messages.length + 2, text: "Error processing request. Try again!", sender: "bot", timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Fab color="success" aria-label="chat" onClick={toggleDrawer} sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
        <ChatIcon />
      </Fab>
      <Drawer anchor="right" open={open} onClose={toggleDrawer} sx={{ "& .MuiDrawer-paper": { width: { xs: "100%", sm: 380 }, height: "100%", display: "flex", flexDirection: "column" } }}>
        <Box sx={{ bgcolor: "success.main", color: "white", p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: "success.dark", mr: 1 }}><ChatIcon /></Avatar>
            <Typography variant="h6">AgriBot</Typography>
          </Box>
          <IconButton color="inherit" onClick={toggleDrawer} aria-label="Close chat"><CloseIcon /></IconButton>
        </Box>
        <Box sx={{ p: 2, bgcolor: "background.paper" }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Suggested Questions:</Typography>
          <List dense>{predefinedQuestions.map((q) => (
            <ListItem key={q.id} button onClick={() => setInput(q.text)}>
              <ListItemIcon>{q.icon}</ListItemIcon>
              <ListItemText primary={q.text} primaryTypographyProps={{ variant: "body2", noWrap: true }} />
            </ListItem>
          ))}</List>
        </Box>
        <Divider />
        <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto", display: "flex", flexDirection: "column", bgcolor: "#f5f5f5" }}>
          {messages.map((message) => (
            <Box key={message.id} sx={{ display: "flex", justifyContent: message.sender === "user" ? "flex-end" : "flex-start", mb: 2 }}>
              {message.sender === "bot" && <Avatar sx={{ bgcolor: "success.main", width: 32, height: 32, mr: 1, mt: 0.5 }}><ChatIcon sx={{ fontSize: 18 }} /></Avatar>}
              <Box sx={{ maxWidth: "75%" }}>
                <Paper elevation={1} sx={{ p: 1.5, bgcolor: message.sender === "user" ? "success.main" : "white", color: message.sender === "user" ? "white" : "text.primary", borderRadius: 2 }}>
                  <Typography variant="body1">{message.text}</Typography>
                </Paper>
              </Box>
              {message.sender === "user" && <Avatar sx={{ bgcolor: "secondary.main", width: 32, height: 32, ml: 1, mt: 0.5 }}>U</Avatar>}
            </Box>
          ))}
          {loading && <CircularProgress sx={{ alignSelf: "center", mt: 2 }} />}
          <div ref={messagesEndRef} />
        </Box>
        <Box sx={{ p: 2, bgcolor: "background.paper", borderTop: 1, borderColor: "divider" }}>
          <TextField fullWidth placeholder="Ask about crop diseases..." variant="outlined" size="small" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} />
          <IconButton color="success" onClick={handleSendMessage} disabled={input.trim() === "" || loading} sx={{ ml: 1 }}><SendIcon /></IconButton>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatBot;