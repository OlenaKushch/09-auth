
import { Note, NoteTag } from "@/types/note";
import { api } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import { CheckSession } from "./clientApi";

export const checkSession = async () => {
  const response = await api.get<CheckSession>("/auth/session");
  return response;
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
    tag, }: FetchNotesProps ) => {
    const cookieStore = await cookies();
    const response = await api.get<URLResponse>('/notes', {
        params: {
            search: search,
            page, perPage: '12', ...(tag !== '' ? { tag } : {}),
         },
        headers: {
       Cookie: cookieStore.toString(), 
    },
});
return response.data;
};


export const fetchNoteById = async (id: string): Promise<Note> => {
    const cookieStore = await cookies();
    const { data } = await api.get<Note>(`/notes/${id}`, {
        headers: {
       Cookie: cookieStore.toString(), 
    },
});
    return data;
};
export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};