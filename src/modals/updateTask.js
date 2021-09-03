import React,{useState,useEffect,useContext} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";
import {dateContext} from "../App"
import {storageContext} from "../App"
import {handleSaveDataToStorage} from "../SaveToStorage"


function UpdateTask({modal,toggle,update,updateIndex}) {

    const [taskName, setTaskName] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState( new Date());
    const [endDate, setEndDate] = useState();
    const [completed,setCompleted] = useState();
    const dateContextObject = useContext(dateContext)
    const storageContextObjet = useContext(storageContext)

    useEffect(() => {
        let udpateObj = JSON.parse(localStorage.getItem(storageContextObjet.storageKeyTaskList))[updateIndex]
        setTaskName(udpateObj.Name)
        setDescription(udpateObj.Description)
        setStartDate(new Date(parseInt(udpateObj.startDate)))
        setEndDate(new Date(parseInt(udpateObj.endDate)))
        setCompleted(udpateObj.completed == "true" || udpateObj.completed == true ? true : false)
    }, [dateContextObject])

    const hanndleChange = (e)=>{
      const name = e.target.name
      const value = e.target.value
      if(name == "taskName"){
        setTaskName(value)
      }else if(name == "description"){
        setDescription(value)
      }
    }

    const handleSave = () =>{
      let taskObj = {}
      taskObj["Name"] = taskName
      taskObj["Description"] = description
      taskObj["startDate"] = startDate.valueOf()
      taskObj["endDate"] = endDate.valueOf()
      taskObj["completed"] = completed
      update(taskObj,updateIndex)
    }

    const handleStatusChange = () =>{
        let status = document.getElementById("task_status").value
        setCompleted(status == "true" ? true : false)
    }
    return (  
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Task</ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group">
              <label>Task Name</label>
              <input type="text" className="form-control" value={taskName} onChange={hanndleChange} name="taskName" />
            </div>
            <div className="form-group"  >
                <label>Description</label>
                <textarea rows="6" className="form-control" value={description} onChange={hanndleChange} name="description"></textarea>
            </div>
            <div className="form-group">
              <label>Start Date</label>{' '}
              <DatePicker selected={startDate} className="form-control" onChange={date => setStartDate(date)} />
            </div>
            <div className="form-group">
              <label className="mr-1">End Date</label>{' '}
              <DatePicker selected={endDate} className="form-control" onChange={date => setEndDate(date)} />
            </div>
            <div className="form-group">
                <label className="mr-4">Status</label>{' '}
                <select name="status" id="task_status" onChange={handleStatusChange}>
                    <option selected = {completed ? true : false} value={"true"}>Completed</option>
                    <option selected = {!completed ? true : false} value={"false"}>Progress</option>
                </select>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle} onClick = {handleSave}>Save</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
}

export default UpdateTask
