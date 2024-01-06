import React from 'react'

function TaskListItem({item, updateTask, removeTask,doneTask}) {
  return (
    <div>
      <li className={`list-group-item ${item.isDone && 'bg-success bg-gradients'}`} key={item.uuid}>
        {item.priority && <span  className='badge text-bg-secondary me-2'>Öncelikli</span>}
        {item.task}
        <div className="btn-group float-end" role='group'>
        <span onClick={()=>doneTask(item.uuid)} className='btn btn-sm btn-success float-end'>Done</span>
        <span onClick={()=>updateTask(item.uuid)} className='btn btn-sm btn-info float-end'>Update</span>
        <span onClick={()=>removeTask(item.uuid)} className='btn btn-sm btn-danger float-end'>Delete</span>
        </div></li>
    </div>
  )
}

export default TaskListItem
