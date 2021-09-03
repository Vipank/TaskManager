import React,{useState,useEffect,useContext} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";
import {dateContext} from "../App"
import {storageContext} from "../App"

function CreateTask({modal,toggle,save}) {

    const [taskName, setTaskName] = useState('')
    const [description, setDescription] = useState('')
    const dateContextObject = useContext(dateContext)
    const storageContextObjet = useContext(storageContext)
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
  
    useEffect(() => {
      setStartDate(dateContextObject.dateVal)
    }, [])
    
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
      taskObj["completed"] = false
      save(taskObj)

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
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle} onClick = {handleSave}>Create</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
}

export default CreateTask
