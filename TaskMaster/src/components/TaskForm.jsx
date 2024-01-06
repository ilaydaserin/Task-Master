import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { v4 as uuidv4 } from "uuid";
import './TaskForm.css'

function TaskForm() {
  const emptyForm = { task: "", priority: false, isDone: false };
  const [formData, setFormData] = useState(emptyForm);
  const [tasks, setTasks] = useState([]);
  const [taskChangeCount, setTaskChangeCount] = useState(0);

  useEffect(() => {
    if (taskChangeCount > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [taskChangeCount]);

  useEffect(() => {
    const localStorageTasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(localStorageTasks ?? []);
  }, []);

  function removeTask(uuid) {
    console.log(uuid);
    setTasks((prev) => prev.filter((item) => item.uuid != uuid));
    setTaskChangeCount((prev) => prev - 1);
  }

  function updateTask(uuid) {
    console.log(uuid);
    const task = tasks.find((item) => item.uuid == uuid);
    console.log(task);
    setFormData(task);
    setFormData({ ...task, isEdit: true });
    setTaskChangeCount((prev) => prev + 1);
  }
  function doneTask(uuid) {
    const taskIndex = tasks.findIndex((item) => item.uuid == uuid);
    const task = tasks[taskIndex];
    task.isDone = !task.isDone;
    const newTasks = tasks.slice();
    newTasks[taskIndex] = task;
    setTasks(newTasks);
    setTaskChangeCount((prev) => prev + 1);
  }

  function handleInputChange(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]:
          event.target.type == "checkbox"
            ? event.target.checked
            : event.target.value,
      };
    });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formData.isEdit) {
      const taskIndex = tasks.findIndex((item) => item.uuid === formData.uuid);
      const newTasks = tasks.slice();
      newTasks[taskIndex] = { ...formData };
      setTasks(newTasks);
      setFormData(emptyForm);
      event.target.reset();
    } else if (formData.task.length > 0) {
      formData.uuid = uuidv4();
      setTasks((prev) => [...prev, formData]);
    }
    setTaskChangeCount((prev) => prev + 1);
    setFormData(emptyForm);
    event.target.reset();
    console.log(tasks);
  }
  return (
    <div className="body">
    <div className="mycontainer ">
      <div className="take-note">
      <h2>Good Notes</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-form-label">
            Task
          </label>
          <div>
            <input
              type="text"
              onChange={handleInputChange}
              className="form-control"
              id="inputEmail3"
              name="task"
              value={formData.task}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input
                className="form-check-input"
                onChange={handleInputChange}
                type="checkbox"
                id="priority"
                name="priority"
                checked={formData.priority}
              />
              <label className="form-check-label" htmlFor="priority">
                Öncelikli
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
      </div>
      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        updateTask={updateTask}
        doneTask={doneTask}
      />
    </div>
    </div>
  );
}

export default TaskForm;
