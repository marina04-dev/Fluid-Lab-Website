import React, { createContext, useContext, useReducer, useCallback } from 'react';
import api from '../services/api';

const ContentContext = createContext();

// Initial state
const initialState = {
    content: {},
    team: [],
    projects: [],
    publications: [],
    loading: false,
    error: null
};

// Action types
const ContentActionTypes = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_CONTENT: 'SET_CONTENT',
    SET_TEAM: 'SET_TEAM',
    SET_PROJECTS: 'SET_PROJECTS',
    SET_PUBLICATIONS: 'SET_PUBLICATIONS',
    UPDATE_CONTENT_ITEM: 'UPDATE_CONTENT_ITEM',
    ADD_TEAM_MEMBER: 'ADD_TEAM_MEMBER',
    UPDATE_TEAM_MEMBER: 'UPDATE_TEAM_MEMBER',
    ADD_PROJECT: 'ADD_PROJECT',
    UPDATE_PROJECT: 'UPDATE_PROJECT',
    ADD_PUBLICATION: 'ADD_PUBLICATION',
    UPDATE_PUBLICATION: 'UPDATE_PUBLICATION',
    CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
function contentReducer(state, action) {
    switch (action.type) {
        case ContentActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case ContentActionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case ContentActionTypes.SET_CONTENT:
            return {
                ...state,
                content: action.payload,
                loading: false,
                error: null
            };
        case ContentActionTypes.SET_TEAM:
            return {
                ...state,
                team: action.payload,
                loading: false,
                error: null
            };
        case ContentActionTypes.SET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                loading: false,
                error: null
            };
        case ContentActionTypes.SET_PUBLICATIONS:
            return {
                ...state,
                publications: action.payload,
                loading: false,
                error: null
            };
        case ContentActionTypes.UPDATE_CONTENT_ITEM:
            return {
                ...state,
                content: {
                    ...state.content,
                    [action.payload.key]: action.payload
                }
            };
        case ContentActionTypes.ADD_TEAM_MEMBER:
            return {
                ...state,
                team: [...state.team, action.payload]
            };
        case ContentActionTypes.UPDATE_TEAM_MEMBER:
            return {
                ...state,
                team: state.team.map(member => 
                    member._id === action.payload._id ? action.payload : member
                )
            };
        case ContentActionTypes.ADD_PROJECT:
            return {
                ...state,
                projects: [action.payload, ...state.projects]
            };
        case ContentActionTypes.UPDATE_PROJECT:
            return {
                ...state,
                projects: state.projects.map(project => 
                    project._id === action.payload._id ? action.payload : project
                )
            };
        case ContentActionTypes.ADD_PUBLICATION:
            return {
                ...state,
                publications: [action.payload, ...state.publications]
            };
        case ContentActionTypes.UPDATE_PUBLICATION:
            return {
                ...state,
                publications: state.publications.map(pub => 
                    pub._id === action.payload._id ? action.payload : pub
                )
            };
        case ContentActionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

// Provider component
export function ContentProvider({ children }) {
    const [state, dispatch] = useReducer(contentReducer, initialState);

    // Generic error handler
    const handleError = useCallback((error) => {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        dispatch({
        type: ContentActionTypes.SET_ERROR,
        payload: errorMessage
        });
    }, []);

    // Fetch content by section or key
    const fetchContent = useCallback(async (section = null, key = null) => {
        dispatch({ type: ContentActionTypes.SET_LOADING, payload: true });
        
        try {
            const params = {};
            if (section) params.section = section;
            if (key) params.key = key;
            
            const response = await api.get('/content', { params });
            
            if (key) {
                // Single content item
                dispatch({
                    type: ContentActionTypes.UPDATE_CONTENT_ITEM,
                    payload: response.data
                });
            } else {
                // Multiple content items - organize by key
                const contentByKey = {};
                    response.data.forEach(item => {
                    contentByKey[item.key] = item;
                });
                
                dispatch({
                    type: ContentActionTypes.SET_CONTENT,
                    payload: contentByKey
                });
            }
        } catch (error) {
            handleError(error);
        }
    }, [handleError]);

    // Fetch team members
    const fetchTeam = useCallback(async () => {
        dispatch({ type: ContentActionTypes.SET_LOADING, payload: true });
        
        try {
            const response = await api.get('/team');
            dispatch({
                type: ContentActionTypes.SET_TEAM,
                payload: response.data
            });
        } catch (error) {
            handleError(error);
        }
    }, [handleError]);

    // Fetch projects
    const fetchProjects = useCallback(async (filters = {}) => {
        dispatch({ type: ContentActionTypes.SET_LOADING, payload: true });
        
        try {
            const response = await api.get('/projects', { params: filters });
            dispatch({
                type: ContentActionTypes.SET_PROJECTS,
                payload: response.data
            });
        } catch (error) {
            handleError(error);
        }
    }, [handleError]);

    // Fetch publications
    const fetchPublications = useCallback(async (filters = {}) => {
        dispatch({ type: ContentActionTypes.SET_LOADING, payload: true });
        
        try {
            const response = await api.get('/publications', { params: filters });
            dispatch({
                type: ContentActionTypes.SET_PUBLICATIONS,
                payload: response.data
            });
        } catch (error) {
            handleError(error);
        }
    }, [handleError]);

    // Get content by key with fallback
    const getContent = useCallback((key, fallback = '') => {
        return state.content[key]?.content || fallback;
    }, [state.content]);

    // Clear error
    const clearError = useCallback(() => {
        dispatch({ type: ContentActionTypes.CLEAR_ERROR });
    }, []);

    // Update content (admin function)
    const updateContent = useCallback(async (id, data) => {
        try {
            const response = await api.put(`/content/${id}`, data);
            dispatch({
                type: ContentActionTypes.UPDATE_CONTENT_ITEM,
                payload: response.data.content
            });
            return { success: true };
        } catch (error) {
            handleError(error);
            return { success: false, error: error.response?.data?.message };
        }
    }, [handleError]);

    // Create content (admin function)
    const createContent = useCallback(async (data) => {
        try {
            const response = await api.post('/content', data);
            dispatch({
                type: ContentActionTypes.UPDATE_CONTENT_ITEM,
                payload: response.data.content
            });
            return { success: true };
        } catch (error) {
            handleError(error);
            return { success: false, error: error.response?.data?.message };
        }
    }, [handleError]);

    const value = {
        ...state,
        fetchContent,
        fetchTeam,
        fetchProjects,
        fetchPublications,
        getContent,
        updateContent,
        createContent,
        clearError
    };

    return (
        <ContentContext.Provider value={value}>
            {children}
        </ContentContext.Provider>
    );
}

// Custom hook to use content context
export function useContent() {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
}