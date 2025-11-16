import { User } from "@/types/user";

import { Note, NoteTag } from "@/types/note";
import { nextServer } from "./api";

export interface Credentials {
  email: string;
  password: string;
}

export const register = async (creds: Credentials) => {
    const { data } = await nextServer.post<User>('/auth/register', creds);

    return data;
}
export interface EditMe {
    username: string;

}
export const updateMe = async (data: EditMe) => {
  const response = await nextServer.patch<User>('/users/me', data);
  return response.data;
};
export const login = async (creds: Credentials) => {
    const { data } = await nextServer.post<User>('/auth/login', creds);

    return data;
}
export const logout = async () => {
    const response = await nextServer.post('/auth/logout');
    return response.data;
}
export interface CheckSession {
    success: boolean;
}

export const checkSession = async () => {
    const { data } = await nextServer.get<CheckSession>('/auth/session');
    return data;
}

export const getMe = async (): Promise<User> => {
    const { data } = await nextServer.get<User>('/users/me');

    return data;
};

export interface URLResponse {
  notes: Note[],
  totalPages: number
}

export type FetchNotesProps = {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag | '';
}

export const fetchNotes = async ({
    page,
    search,
    tag, }: FetchNotesProps) => {
    const response = await nextServer.get<URLResponse>('/notes', {
        params: {
            search: search,
            page, perPage: '12', ...(tag !== '' ? { tag } : {}),

        },
    });
    return response.data;
};
export interface NewNoteData {
  title: string;
  content?: string;
  tag: NoteTag;
}

export const createNote = async (newNoteData: NewNoteData): Promise<Note> => {
    const res = await nextServer.post<Note>("/notes", newNoteData);
    return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
    const res = await nextServer.delete<Note>(`/notes/${noteId}`);
    return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const { data } = await nextServer.get<Note>(`/notes/${id}`);
    return data;
};
