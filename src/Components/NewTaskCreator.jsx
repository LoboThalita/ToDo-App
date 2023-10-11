import { useRef,useState } from "react";
import styles from "../ModulesCss/NewTaskCreator.module.css";

function NewTaskCreator({ onSubmit }) {
  const inputRef = useRef(null);
  const [description, setDescription] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = {
        description
    }
    await onSubmit(formData);

    setDescription("");

    inputRef.current?.focus();
  }
  return (
    <form onSubmit={(event) => handleSubmit(event)}
    className={styles.form}>
      <div>
        <input
          className={styles.input}
          type="text"
          ref={inputRef}
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Passear com o cachorro"
          minLength={1}
          required
        />
      </div>
      <button
        type="submit"
        className={styles.button}
        aria-label="Criar tarefa"
      >
        Criar tarefa
      </button>
    </form>
  );
}

export default NewTaskCreator;
