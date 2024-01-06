import React, { useEffect, useState } from 'react'
import TaskListItem from './TaskListItem'
function TaskList({tasks, removeTask, updateTask, doneTask}) {
    const[priority,setPriority]=useState(false)
    const[filteredTasks, setFilteredTasks]=useState(tasks)

    function handlePriorityFilter(){
        setPriority(prev=>!prev)
    }
    useEffect(()=>{
        setFilteredTasks(tasks) 
    },[tasks]) //taskta veya priorityde değişiklik olursa bu fonksiyonu çağır
    useEffect(()=>{
        priority?setFilteredTasks(tasks.filter(
            item=>item.priority===priority)):setFilteredTasks(tasks)
    },[priority])


  return (
    <>
    <div className='p-4 bg-light mb-5 border rounded mt-5'>
        <p className='mb-3'>Görevler</p>

        <span onClick={handlePriorityFilter} className={`btn btn-sm ${!priority? "btn-info": "btn-primary"} float-end`}>{!priority?"Öncelikli olanları göster": "Hepsini göster"}</span>

      <ul className='list-group my-3'>
        {filteredTasks.map((item, index)=>
        <TaskListItem key={index}
         item={item} updateTask={updateTask} removeTask={removeTask} doneTask={doneTask}  />)}
        </ul>
    </div>
    </>
  )
}

export default TaskList
