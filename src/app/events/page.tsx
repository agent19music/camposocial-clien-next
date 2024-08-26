"use client"
import CommentList from '@/components/comment';
import React from 'react'
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { FC, useState } from "react";
import EventCard from '@/components/event';
import { MouseEvent } from "react";

export default function Events() {
  const comments = [
    {
      image: null,
      username: "HappyCoder",
      text: "I love this feature! 😍🔥",
      dateCreated: "2024-08-20T10:30:00Z",
    },
    {
      image: null,
      username: "DevGuru",
      text: "Well done! Keep up the great work! 💪💻",
      dateCreated: "2024-08-21T15:45:00Z",
    },
    {
      image: null,
      username: "BugHunter",
      text: "I found a small issue, but it’s nothing major 🐞🚀",
      dateCreated: "2024-08-22T09:15:00Z",
    },
    {
      image: null,
      username: "UIWizard",
      text: "The new design looks amazing! ✨🎨",
      dateCreated: "2024-08-23T13:50:00Z",
    },
    {
      image: null,
      username: "CodeMaster",
      text: "This is super useful, thanks! 🙌📚",
      dateCreated: "2024-08-24T08:25:00Z",
    },
  ];
  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement>, 
    eventId: string, 
    localCommentText: string
  ): void => {
    e.preventDefault();
  
    if (!localCommentText) {
     
      return;
    }
  
    if (localCommentText.length > 300) {
      return;
    }
  
    if (localCommentText !== '') {
      sendComment(localCommentText, eventId);  // Assuming sendComment is defined elsewhere
    }
  };
 
  const sendComment = async (commentText: string, eventId: string): Promise<void> => {
    const apiEndpoint = "YOUR_API_ENDPOINT"; // Define your API endpoint here
    const authToken = "YOUR_AUTH_TOKEN"; // Replace with your actual token retrieval logic
  
    try {
      const response = await fetch(`${apiEndpoint}/comment-event/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken ?? ''}`,  // Safe fallback if authToken is undefined
        },
        body: JSON.stringify({ text: commentText, event_id: eventId }),
      });
  
      if (response.ok) {
       console.log("yaay");
         // Assuming setOnchange is a function elsewhere
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };
  
  return (
    <div>
        <h1 className='flex justify-center col place-items-center'>Events</h1>
        <EventCard comments={comments} poster='/eventposter.png' description='Like plants so much you wanna fuck them ? pull up' date="27/03/2024" entry_fee={'500'} eventId='1' title='Plant your own garden' handleSubmit={handleSubmit}/>
        <EventCard comments={comments} poster='/y2kparty.png' description='Early 2000s themed party. Pull up' date="27/03/2024" entry_fee={'500'} eventId='1' title='Y2K Party' handleSubmit={handleSubmit}/>
        <EventCard comments={comments} poster='/ramenposter.png' description='Vibe and slurp on ramen' date="27/03/2024" entry_fee={'500'} eventId='1' title='Ramen' handleSubmit={handleSubmit}/>

    </div>
  )
}
