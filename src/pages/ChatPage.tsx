// src/pages/ChatPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Typography, List, ListItem, ListItemText, TextField, Button, Paper } from '@mui/material';
import { useUserStore } from '../store/userStore';

interface ChatMessage {
    id: string;
    message: string;
    sender: {
        id: string;
        userName: string;
        firstName: string;
        lastName: string;
    };
    timestamp: string;
}

const ChatPage: React.FC = () => {
    const { jobId, receiverId } = useParams<{ jobId: string; receiverId: string }>();
    const { user, token } = useUserStore();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await axios.get(`https://freelance-backend-production-beb9.up.railway.app/chats/${jobId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        };

        fetchChatHistory();
    }, [jobId, token]);

    const sendMessage = async () => {
        if (input && user && jobId) {
            try {
                const newMessage = {
                    receiverId,
                    jobId,
                    message: input,
                };

                const response = await axios.post('https://freelance-backend-production-beb9.up.railway.app/chats', newMessage, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setMessages((prevMessages) => [...prevMessages, response.data]);
                setInput('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Chat for Job {jobId}
                </Typography>
                <Paper elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
                    <List>
                        {messages.map((msg) => (
                            <ListItem key={msg.id} divider>
                                <ListItemText
                                    primary={`${msg.sender.firstName} ${msg.sender.lastName} (${msg.sender.userName})`}
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="textPrimary">
                                                {msg.message}
                                            </Typography>
                                            <br />
                                            <Typography component="span" variant="body2" color="textSecondary">
                                                {new Date(msg.timestamp).toLocaleString()}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" color="primary" onClick={sendMessage}>
                    Send
                </Button>
            </Box>
        </Container>
    );
};

export default ChatPage;
