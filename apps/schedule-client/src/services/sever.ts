import { ScheduleEvent } from '@schedulelib/event';
import { eventUrl } from '@/constants/event';

const getAllEvents = async () => {
    const response = await fetch(eventUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.statusText}`);
    }
    return response.json();
};

const getEventById: (id: string) => Promise<ScheduleEvent> = async (id: string) => {
    const response = await fetch(`${eventUrl}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch event: ${response.statusText}`);
    }
    return response.json();
};

const createEvent = async (event: Omit<ScheduleEvent, 'id'>) => {
    const response = await fetch(eventUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(event),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create event: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    return response.json();
};

const updateEvent = async (id: string, event: Omit<ScheduleEvent, 'id'>) => {
    const response = await fetch(`${eventUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(event),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update event: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    return response.json();
};

const deleteEvent = async (id: string) => {
    const response = await fetch(`${eventUrl}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete event: ${response.statusText}`);
    }

    return response.json();
};

const getAllCategories = async () => {
    const response = await fetch(`${eventUrl}/categories`);
    if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    return response.json();
};

export { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, getAllCategories };
