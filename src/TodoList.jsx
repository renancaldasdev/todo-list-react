import { useState, useEffect } from "react";
import "./TodoList.css";
import NoTask from "./NoTask";

function TodoList() {
  const listStorage = localStorage.getItem("list");

  const [list, setList] = useState(listStorage ? JSON.parse(listStorage) : []);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  function addItem(form) {
    form.preventDefault();
    if (!newItem) {
      return;
    }
    setList([...list, { text: newItem, isCompleted: false }]);
    setNewItem("");
    document.querySelector("#inputEntrity").focus();
  }

  function todoFinished(index) {
    const listAux = [...list];
    listAux[index].isCompleted = !listAux[index].isCompleted;
    setList(listAux);
  }

  function deleteTask(index) {
    const listAux = [...list];
    listAux.splice(index, 1);
    setList(listAux);
  }

  function deleteAll() {
    setList([]);
  }

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={addItem}>
        <input
          id="inputEntrity"
          type="text"
          placeholder="Adicione uma tarefa"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button className="add" type="submit">
          Add
        </button>
      </form>
      <div className="listaTarefas">
        {list.length < 1 ? (
          <NoTask />
        ) : (
          list.map((item, index) => (
            <div
              className={item.isCompleted ? "item completo" : "item"}
              key={index}
            >
              <span
                onDoubleClick={() => {
                  todoFinished(index);
                }}
              >
                {item.text}
              </span>
              <button className="del" onClick={() => deleteTask(index)}>
                Deletar
              </button>
            </div>
          ))
        )}
        {list.length > 0 && (
          <button className="deleteAll" onClick={() => deleteAll()}>
            Deletar todas
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoList;
