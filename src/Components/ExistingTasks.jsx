import { Trash2 } from "lucide-react";
import styles from "../ModulesCss/ExistingTasks.module.css";

function ExistingTasks({ task, onDelete, onCheckedChange }) {
  function handleChange(event) {
    onCheckedChange(task.id, event.target.checked);
  }

  return (
    <li className={task.completed ? styles.apagado :""}>
      <input
        type="checkbox"
        className={styles.checkBox}
        checked={task.completed}
        onChange={handleChange}
      />
  <p className={task.completed ? styles.riscado : ""}>
    {task.description}
  </p>
      <button onClick={() => onDelete(task.id)}>
        <Trash2 size={16} />
      </button>
    </li>
  );
}
export default ExistingTasks;
