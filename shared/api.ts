/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface Idea {
  id: number;
  text: string;
  votes: number;
  createdAt: string;
}

export interface IdeaCreateRequest {
  text: string;
}

export interface IdeasResponse {
  ideas: Idea[];
}

export interface IdeaResponse {
  idea: Idea;
}
