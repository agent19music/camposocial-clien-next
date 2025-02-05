// chatContext.tsx
"use client";

import { createContext, ReactNode, useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import * as openpgp from 'openpgp';
import { format } from "date-fns";
import { motion } from "framer-motion";
import { AuthContext } from "./authcontext";

interface Media {
    url: string;
    type: string;
}

interface Message {
    id: number;
    senderId: string; 
    content: string;
    timestamp: Date;
    media: Media | null; 
    reactions: { userId: string; reactionType: string }[]; 
    replyTo?: number;
    isSent: boolean;
    isRead: boolean;
    encrypted: boolean;
}

interface ChatContextType {
    sendMessage: (content: string, media: FileList | null, replyTo?: number) => Promise<void>;
    getMessages: (friendId: string, batchSize: number, lastMessageId?: number) => Promise<Message | undefined>; 
    editMessage: (messageId: number, newContent: string) => Promise<void>;
    deleteMessage: (messageId: number) => Promise<void>;
    addReaction: (messageId: number, reactionType: string) => Promise<void>;
    uploadMedia: (files: FileList) => Promise<Media>;
    currentUser: any | null;
    authToken: string | null;
    friendId: string | null; 
    setFriendId: (friendId: string | null) => void; 
    messages: Message[]; 
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    getChatList: () => Promise<ChatListUser[]>;
    chatList: ChatListUser[] | undefined;
}

interface ChatListUser {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
}

export const ChatContext = createContext<ChatContextType>({
    sendMessage: async () => { },
    getMessages: async () => undefined,
    editMessage: async () => { },
    deleteMessage: async () => { },
    addReaction: async () => { },
    uploadMedia: async () => { return { url: '', type: '' }; },
    currentUser: null,
    authToken: null,
    friendId: null,
    setFriendId: () => { },
    messages: { id: 0, senderId: '', content: '', timestamp: new Date(), media: null, reactions: { userId: '', reactionType: '' }, isSent: false, isRead: false, encrypted: false },
    setMessages: () => { },
    getChatList: () => Promise<ChatListUser>,
    chatList: [],
});

interface ChatProviderProps {
    children: ReactNode;
}

export default function ChatProvider({ children }: ChatProviderProps) {
    const apiEndpoint = "http://127.0.0.1:5000";
    const { currentUser, authToken } = useContext(AuthContext);
    const [messages, setMessages] = useState<Message[]>([]);
    const [friendId, setFriendId] = useState<string | null>(null); 
    const [chatList, setChatList] = useState<ChatListUser[]>();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (friendId && currentUser && authToken) {
            getMessages(friendId, 10); 
        } else {
            setMessages([]); 
        }
    }, [friendId, currentUser, authToken]);


    const sendMessage = async (content: string, media: FileList | null, replyTo?: number) => {
        if (!currentUser ||!authToken ||!friendId) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('content', content);
            if (replyTo) {
                formData.append('reply_to_id', replyTo.toString());
            }
            if (media) {
                for (let i = 0; i < media.length; i++) {
                    formData.append('media', media[i]);
                }
            }

            const response = await fetch(`${apiEndpoint}/messages/${friendId}`, { 
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }

            const newMessageData = await response.json();


            const newMessage: Message = {
                id: newMessageData.message_id,
                senderId: currentUser.id,
                content,
                timestamp: new Date(newMessageData.timestamp), 
                media: newMessageData.media? newMessageData.media.map((m: any) => ({ url: m.media_url, type: m.media_type })): null,
                reactions: [],
                replyTo,
                isSent: true,
                isRead: false,
                encrypted: false,
            };

            setMessages([...messages, newMessage]);

        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message. Please try again.");
        }
    };

    const getMessages = async (friendId: string, batchSize: number, lastMessageId?: number) => {
        if (!currentUser ||!authToken) {
            return;
        }

        try {
            const url = new URL(`${apiEndpoint}/messages/${friendId}`);
            url.searchParams.append('batch_size', batchSize.toString());
            if (lastMessageId) {
                url.searchParams.append('last_message_id', lastMessageId.toString());
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            const messageData = await response.json();
            const fetchedMessages: Message = messageData.messages.map((msg: any) => ({
                id: msg.id,
                senderId: msg.user_id,
                content: msg.content,
                timestamp: new Date(msg.timestamp),
                media: msg.media? msg.media.map((m: any) => ({ url: m.media_url, type: m.media_type })): null,
                reactions: msg.reactions.map((r: any) => ({ userId: r.user_id, reactionType: r.reaction_type })),
                replyTo: msg.reply_to_id,
                isSent: msg.user_id === currentUser.id,
                isRead: true,
                encrypted: msg.encrypted,
            }));

            setMessages(prevMessages => {
                if (lastMessageId) {
                    return [...prevMessages,...fetchedMessages]; 
                } else {
                    return fetchedMessages; 
                }
            });

            return fetchedMessages;
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error("Failed to fetch messages.");
            return;
        }
    };

    const getChatList = async () => {
        if (!currentUser ||!authToken) {
            return;
        }
    
        try {
            const response = await fetch(`${apiEndpoint}/chat-list`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch chat list');
            }
    
            const data = await response.json();
            setChatList(data.chat_list || []);
            return data.chat_list;
    
        } catch (error) {
            console.error("Error fetching chat list:", error);
            toast.error("Failed to fetch chat list.");
            return;
        }
    };
    

    const editMessage = async (messageId: number, newContent: string) => {
        if (!currentUser ||!authToken) {
            return;
        }
        try {
            const response = await fetch(`${apiEndpoint}/messages/${messageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ content: newContent }),
            });

            if (!response.ok) {
                throw new Error('Failed to edit message');
            }

            setMessages(messages.map(msg =>
                msg.id === messageId? {...msg, content: newContent }: msg
            ));
        } catch (error) {
            console.error("Error editing message:", error);
            toast.error("Failed to edit message.");
        }
    };

    const deleteMessage = async (messageId: number) => {
        if (!currentUser ||!authToken) {
            return;
        }
        try {
            const response = await fetch(`${apiEndpoint}/messages/${messageId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete message');
            }

            setMessages(messages.filter(msg => msg.id!== messageId));
        } catch (error) {
            console.error("Error deleting message:", error);
            toast.error("Failed to delete message.");
        }
    };

    const addReaction = async (messageId: number, reactionType: string) => {
        if (!currentUser ||!authToken) {
            return;
        }
        try {
            const response = await fetch(`${apiEndpoint}/messages/${messageId}/reactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ reaction_type: reactionType }),
            });

            if (!response.ok) {
                throw new Error('Failed to add reaction');
            }

            setMessages(messages.map(msg =>
                msg.id === messageId
                  ? {...msg, reactions: [...msg.reactions, { userId: currentUser.id, reactionType }] }
                  : msg
            ));
        } catch (error) {
            console.error("Error adding reaction:", error);
            toast.error("Failed to add reaction.");
        }
    };

    const uploadMedia = async (files: FileList) => {
        if (!currentUser ||!authToken) {
            return;
        }

        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('media', files[i]);
            }

            const response = await fetch(`${apiEndpoint}/upload`, { 
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to upload media");
            }

            const data = await response.json();
            return data.media; 

        } catch (error) {
            console.error("Error uploading media:", error);
            toast.error("Failed to upload media.");
            return;
        }
    };
    console.log('====================================');
    console.log('messages', messages);
    console.log('====================================');

    const contextData: ChatContextType = {
        sendMessage,
        getMessages,
        editMessage,
        deleteMessage,
        addReaction,
        uploadMedia,
        currentUser,
        authToken,
        friendId,
        setFriendId,
        messages,
        setMessages,
        getChatList,
        chatList,
    };

    return (
        <ChatContext.Provider value={contextData}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => useContext(ChatContext);