import { Note } from "@/types/note";
import axios from "axios";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const baseURL= `${API_URL}/api`;

export const nextServer = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export interface CheckSession {
  success: boolean;
}