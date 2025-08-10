// client/src/contexts/ContentContext.jsx - UPDATED VERSION με delete functionality
import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import api from "../services/api";

const ContentContext = createContext();

// Initial state
const initialState = {
  content: {},
  team: [],
  projects: [],
  publications: [],
  loading: false,
  error: null,
};

// Action types
const ContentActionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_CONTENT: "SET_CONTENT",
  SET_TEAM: "SET_TEAM",
  SET_PROJECTS: "SET_PROJECTS",
  SET_PUBLICATIONS: "SET_PUBLICATIONS",
  UPDATE_CONTENT_ITEM: "UPDATE_CONTENT_ITEM",
  DELETE_CONTENT_ITEM: "DELETE_CONTENT_ITEM",
  ADD_TEAM_MEMBER: "ADD_TEAM_MEMBER",
  UPDATE_TEAM_MEMBER: "UPDATE_TEAM_MEMBER",
  DELETE_TEAM_MEMBER: "DELETE_TEAM_MEMBER",
  ADD_PROJECT: "ADD_PROJECT",
  UPDATE_PROJECT: "UPDATE_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  ADD_PUBLICATION: "ADD_PUBLICATION",
  UPDATE_PUBLICATION: "UPDATE_PUBLICATION",
  DELETE_PUBLICATION: "DELETE_PUBLICATION",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer
function contentReducer(state, action) {
  switch (action.type) {
    case ContentActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ContentActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ContentActionTypes.SET_CONTENT:
      return {
        ...state,
        content: action.payload,
        loading: false,
        error: null,
      };
    case ContentActionTypes.SET_TEAM:
      return {
        ...state,
        team: action.payload,
        loading: false,
        error: null,
      };
    case ContentActionTypes.SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
        error: null,
      };
    case ContentActionTypes.SET_PUBLICATIONS:
      return {
        ...state,
        publications: action.payload,
        loading: false,
        error: null,
      };
    case ContentActionTypes.UPDATE_CONTENT_ITEM:
      return {
        ...state,
        content: {
          ...state.content,
          [action.payload.key]: action.payload,
        },
      };
    case ContentActionTypes.DELETE_CONTENT_ITEM:
      const newContent = { ...state.content };
      delete newContent[action.payload];
      return {
        ...state,
        content: newContent,
      };
    case ContentActionTypes.ADD_TEAM_MEMBER:
      return {
        ...state,
        team: [...state.team, action.payload],
      };
    case ContentActionTypes.UPDATE_TEAM_MEMBER:
      return {
        ...state,
        team: state.team.map((member) =>
          member._id === action.payload._id ? action.payload : member
        ),
      };
    case ContentActionTypes.DELETE_TEAM_MEMBER:
      return {
        ...state,
        team: state.team.filter((member) => member._id !== action.payload),
      };
    case ContentActionTypes.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case ContentActionTypes.UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        ),
      };
    case ContentActionTypes.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };
    case ContentActionTypes.ADD_PUBLICATION:
      return {
        ...state,
        publications: [...state.publications, action.payload],
      };
    case ContentActionTypes.UPDATE_PUBLICATION:
      return {
        ...state,
        publications: state.publications.map((publication) =>
          publication._id === action.payload._id ? action.payload : publication
        ),
      };
    case ContentActionTypes.DELETE_PUBLICATION:
      return {
        ...state,
        publications: state.publications.filter(
          (publication) => publication._id !== action.payload
        ),
      };
    case ContentActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

// Provider component
export function ContentProvider({ children }) {
  const [state, dispatch] = useReducer(contentReducer, initialState);

  // Error handler
  const handleError = useCallback((error) => {
    const message =
      error.response?.data?.message || error.message || "An error occurred";
    dispatch({
      type: ContentActionTypes.SET_ERROR,
      payload: message,
    });
    dispatch({ type: ContentActionTypes.SET_LOADING, payload: false });
  }, []);

  // Fetch content
  const fetchContent = useCallback(async () => {
    dispatch({ type: ContentActionTypes.SET_LOADING, payload: true });

    try {
      const response = await api.get("/content");

      // Convert array to key-value object
      const contentObj = {};
      response.data.forEach((item) => {
        contentObj[item.key] = item;
      });

      dispatch({
        type: ContentActionTypes.SET_CONTENT,
        payload: contentObj,
      });
    } catch (error) {
      handleError(error);
    }
  }, [handleError]);

  // Fetch team members
  const fetchTeam = useCallback(async () => {
    dispatch({ type: ContentActionTypes.SET_LOADING, payload: true });

    try {
      const response = await api.get("/team");
      dispatch({
        type: ContentActionTypes.SET_TEAM,
        payload: response.data,
      });
    } catch (error) {
      handleError(error);
    }
  }, [handleError]);

  // Fetch projects
  const fetchProjects = useCallback(
    async (filters = {}) => {
      dispatch({ type: ContentActionTypes.SET_LOADING, payload: true });

      try {
        const response = await api.get("/projects", { params: filters });
        dispatch({
          type: ContentActionTypes.SET_PROJECTS,
          payload: response.data,
        });
      } catch (error) {
        handleError(error);
      }
    },
    [handleError]
  );

  const fetchPublications = useCallback(
    async (filters = {}) => {
      dispatch({ type: ContentActionTypes.SET_LOADING, payload: true });

      // Δέχεται και το search term
      const { search, publicationType } = filters;

      try {
        const response = await api.get("/publications", {
          params: {
            search,
            type: publicationType,
          },
        });
        dispatch({
          type: ContentActionTypes.SET_PUBLICATIONS,
          payload: response.data,
        });
      } catch (error) {
        handleError(error);
      }
    },
    [handleError]
  );

  // Get content by key with fallback
  const getContent = useCallback(
    (key, fallback = "") => {
      return state.content[key]?.content || fallback;
    },
    [state.content]
  );

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: ContentActionTypes.CLEAR_ERROR });
  }, []);

  // Content CRUD operations
  const updateContent = useCallback(
    async (key, data) => {
      try {
        // First try to update existing content
        let response;
        try {
          response = await api.put(`/content/${key}`, data);
        } catch (error) {
          if (error.response?.status === 404) {
            // If content doesn't exist, create it
            response = await api.post("/content", { ...data, key });
          } else {
            throw error;
          }
        }

        dispatch({
          type: ContentActionTypes.UPDATE_CONTENT_ITEM,
          payload: response.data.content || response.data,
        });

        return { success: true };
      } catch (error) {
        handleError(error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    [handleError]
  );

  const createContent = useCallback(
    async (data) => {
      try {
        const response = await api.post("/content", data);
        dispatch({
          type: ContentActionTypes.UPDATE_CONTENT_ITEM,
          payload: response.data.content || response.data,
        });
        return { success: true };
      } catch (error) {
        handleError(error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    [handleError]
  );

  const deleteContent = useCallback(
    async (key) => {
      try {
        await api.delete(`/content/${key}`);
        dispatch({
          type: ContentActionTypes.DELETE_CONTENT_ITEM,
          payload: key,
        });
        return { success: true };
      } catch (error) {
        handleError(error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    [handleError]
  );

  // Team CRUD operations
  const createTeamMember = useCallback(
    async (data) => {
      try {
        const response = await api.post("/team", data);
        dispatch({
          type: ContentActionTypes.ADD_TEAM_MEMBER,
          payload: response.data.teamMember,
        });
        return { success: true };
      } catch (error) {
        handleError(error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    [handleError]
  );

  const updateTeamMember = useCallback(
    async (id, data) => {
      try {
        const response = await api.put(`/team/${id}`, data);
        dispatch({
          type: ContentActionTypes.UPDATE_TEAM_MEMBER,
          payload: response.data.teamMember,
        });
        return { success: true };
      } catch (error) {
        handleError(error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    [handleError]
  );

  const deleteTeamMember = useCallback(
    async (id) => {
      try {
        await api.delete(`/team/${id}`);
        dispatch({
          type: ContentActionTypes.DELETE_TEAM_MEMBER,
          payload: id,
        });
        return { success: true };
      } catch (error) {
        handleError(error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    [handleError]
  );

  // Project CRUD operations
  const createProject = useCallback(
    async (data) => {
      try {
        const response = await api.post("/projects", data);
        dispatch({
          type: ContentActionTypes.ADD_PROJECT,
          payload: response.data.project,
        });
        return { success: true };
      } catch (error) {
        handleError(error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    [handleError]
  );

  const updateProject = useCallback(
    async (id, data) => {
      try {
        const response = await api.put(`/projects/${id}`, data);
        dispatch({
          type: ContentActionTypes.UPDATE_PROJECT,
          payload: response.data.project,
        });
        return { success: true };
      } catch (error) {
        handleError(error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    [handleError]
  );

  const deleteProject = useCallback(
    async (id) => {
      try {
        await api.delete(`/projects/${id}`);
        dispatch({
          type: ContentActionTypes.DELETE_PROJECT,
          payload: id,
        });
        return { success: true };
      } catch (error) {
        handleError(error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    [handleError]
  );

  // Publication CRUD operations
  const createPublication = useCallback(
    async (data) => {
      try {
        const response = await api.post("/publications", data);
        dispatch({
          type: ContentActionTypes.ADD_PUBLICATION,
          payload: response.data.publication,
        });
        return { success: true };
      } catch (error) {
        handleError(error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    [handleError]
  );

  const updatePublication = useCallback(
    async (id, data) => {
      try {
        const response = await api.put(`/publications/${id}`, data);
        dispatch({
          type: ContentActionTypes.UPDATE_PUBLICATION,
          payload: response.data.publication,
        });
        return { success: true };
      } catch (error) {
        handleError(error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    [handleError]
  );

  const deletePublication = useCallback(
    async (id) => {
      try {
        await api.delete(`/publications/${id}`);
        dispatch({
          type: ContentActionTypes.DELETE_PUBLICATION,
          payload: id,
        });
        return { success: true };
      } catch (error) {
        handleError(error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    [handleError]
  );

  // Fetch single project by ID
  const fetchProjectById = useCallback(
    async (id) => {
      dispatch({ type: ContentActionTypes.SET_LOADING, payload: true });

      try {
        const response = await api.get(`/projects/${id}`);
        // Don't update the projects array, just return the project
        dispatch({ type: ContentActionTypes.SET_LOADING, payload: false });
        return { success: true, data: response.data };
      } catch (error) {
        handleError(error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    [handleError]
  );

  // Fetch single publication by ID
  const fetchPublicationById = useCallback(
    async (id) => {
      dispatch({ type: ContentActionTypes.SET_LOADING, payload: true });

      try {
        const response = await api.get(`/publications/${id}`);
        // Don't update the publications array, just return the publication
        dispatch({ type: ContentActionTypes.SET_LOADING, payload: false });
        return { success: true, data: response.data };
      } catch (error) {
        handleError(error);
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
    [handleError]
  );

  const value = {
    ...state,
    // Data fetching
    fetchContent,
    fetchTeam,
    fetchProjects,
    fetchPublications,
    getContent,
    clearError,

    // Content operations
    updateContent,
    createContent,
    deleteContent,

    // Team operations
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,

    // Project operations
    createProject,
    updateProject,
    deleteProject,
    fetchProjectById,

    // Publication operations
    createPublication,
    updatePublication,
    deletePublication,
    fetchPublicationById,
  };

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

// Custom hook to use content context
export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
