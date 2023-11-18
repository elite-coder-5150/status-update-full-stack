import { Reply } from "./reply";
export interface StatusUpdate {
    id: number;
    user_id: number;
    status_text: string;
    created_at: Date;
    updated_at?: Date;
    likes: number;
    replies: Reply[];
  }
  
  