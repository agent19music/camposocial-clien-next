"use client";

import { createContext, ReactNode, useState, useEffect, useContext } from "react";

interface EventContextProps {
  events: any[];
  setCategory: (category: string) => void;
  isLoading: boolean;
  onchange: boolean;
  setOnchange: (value: boolean) => void;
}

const defaultValue: EventContextProps = {
  events: [],
  setCategory: () => {},
  isLoading: false,
  onchange: false,
  setOnchange: () => {},
};

export const EventContext = createContext<EventContextProps>(defaultValue);

interface EventProviderProps {
  children: ReactNode;
}

export default function EventProvider({ children }: EventProviderProps) {
  const apiEndpoint =
    "http://vitapharm-server-env.eba-k5q68s3p.eu-north-1.elasticbeanstalk.com/api/vitapharm";

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [onchange, setOnchange] = useState(false);
  const [category, setCategory] = useState("Fun"); // Default category

  // Fetch events when the component mounts or when `onchange` changes
  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiEndpoint}/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data); // Initially set filteredEvents to all events
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setEvents([]);
        setFilteredEvents([]);
        setIsLoading(false);
      });
  }, [apiEndpoint, onchange]);

  // Filter events based on category
  useEffect(() => {
    if (category) {
      const filtered = events.filter((event) => event.category === category);
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [category, events]);

  const contextData = {
    events: filteredEvents,
    setCategory,
    isLoading,
    onchange,
    setOnchange,
  };

  return (
    <EventContext.Provider value={contextData}>
      {children}
    </EventContext.Provider>
  );
}

// To use the context
export const useEventContext = () => useContext(EventContext);
