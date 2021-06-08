import React, { createContext, useCallback, useContext, useState } from 'react'
import ToastContainer from '../components/ToastContainer'
import { v4 as uuid } from 'uuid';

export interface ToastMessage {
    id: string
    type?: 'success' | 'error' | 'info' | 'warning'
    title: string
    time: 'short' | 'medium' | 'long'
}

interface ToastContextData {
    addToast(message: Omit<ToastMessage, 'id'>): void
    removeToast(id: string): void
}

const ToastContext = createContext<ToastContextData>({ } as ToastContextData)

export const ToastProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<ToastMessage[]>([])

    const addToast = useCallback(({ type, title, time }: Omit<ToastMessage, 'id'>) => {
        const id = uuid()

        const toast = {
            id,
            type,
            title,
            time,
        }

        setMessages(oldMessages => [...oldMessages, toast])
    }, [])

    const removeToast = useCallback((id: string) => {
        setMessages(oldMessages => oldMessages.filter(message => message.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages}/>
        </ToastContext.Provider>
    )
} 

export function useToast(): ToastContextData {
    const context = useContext(ToastContext)

    if(!context) {
        throw new Error('useToast must be used within an ToastProvider')
    }

    return context
}