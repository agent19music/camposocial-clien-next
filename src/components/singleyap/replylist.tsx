"use client"

import React from 'react'
import { Reply } from './reply'

export const ReplyList = ({ replies }) => {
  return (
    <div className="divide-y divide-border">
      {replies?.map((reply, index) => (
        <Reply
          key={index}
          reply={reply}
        />
      ))}
    </div>
  )
}