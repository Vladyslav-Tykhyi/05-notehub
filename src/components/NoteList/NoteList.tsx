import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import styles from "./NoteList.module.css";
import { deleteNote } from "../services/noteService";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error("Помилка при видаленні нотатки:", error);
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Ви впевнені, що хочете видалити цю нотатку?")) {
      deleteNoteMutation.mutate(id);
    }
  };

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.listItem}>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <button
              className={styles.button}
              onClick={() => handleDelete(note.id)}
              disabled={deleteNoteMutation.isPending}
            >
              {deleteNoteMutation.isPending ? "Видалення..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
