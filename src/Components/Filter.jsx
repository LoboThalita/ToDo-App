import styles from "../ModulesCss/Filter.module.css";

function Filter({ tasks, onCheckedFilter }) {
    function handleFilter(event) {
      onCheckedFilter(event.target.checked);
    }
  
    function CounterChecked() {
      const completedTasks = tasks.filter((task) => task.completed);
      return <span>{completedTasks.length}</span>;
    }
  
    return (
      <div className={styles.div}>
        <input
          type="checkbox"
          onChange={handleFilter}
        />
        <span>Filtrar tarefas concluídas</span>
        <div className={styles.counter}>
          <p>
            <CounterChecked /> de {tasks.length}
          </p>
        </div>
      </div>
    );
  }
  
  export default Filter;
  