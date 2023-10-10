import { Trash2 } from "lucide-react";
function ExistingTasks({ task, onDelete, onCheckedChange }) {
  function handleChange(event) {
    onCheckedChange(task.id, event.target.checked);
  }

  return (
    
    <li>
      <input type="checkbox" checked={task.purchased} onChange={handleChange} />
      <p>{task.description}</p>
      <button onClick={() => onDelete(item.id)}>
        <Trash2 size={16} />
      </button>
    </li>
  );
}
export default ExistingTasks;