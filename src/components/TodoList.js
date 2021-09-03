import React,{useState,useEffect,useContext} from 'react'
import CreateTask from '../modals/createTask'
import Card from "./Card"
import TextEditor from "./TextEditor"
import UpdateTask from '../modals/updateTask'
import DatePicker from "react-datepicker";

import {dateContext} from "../App"
import {storageContext} from "../App"
import {handleSaveDataToStorage} from "../SaveToStorage"
import {getFromLocalStorage} from "../GetFromLocalStorage"

function TodoList() {

    const dateContextObject = useContext(dateContext)
    const storageContextObjet = useContext(storageContext)

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [modalUpdate, setModalUpdate] = useState(false);
    const toggleUpdateModal = () => setModalUpdate(!modalUpdate);
    const [updateIndex,setUpdateIndex] = useState(-1)
    const [navigators,setNavigators] = useState([
        {
            "name" : "Your Tasks",
            "type" : "myTask",
            "isActive" : true
        },
        {
            "name" : "Team Tasks",
            "type" : "teamTask",
            "isActive" : false
        },
        {
            "name" : "Deadlines",
            "type" : "deadline",
            "isActive" : false
        }
    ])

    const [taskList,setTaskList] = useState([])
    const saveTask = (taskObj) =>{
        let tempList = taskList
        tempList.unshift(taskObj)
        localStorage.setItem(storageContextObjet.storageKeyTaskList,JSON.stringify(tempList))
        setTaskList(tempList)
        setModal(false)
        handleSaveDataToStorage()
        window.location.reload()
    }

    const updateTask = (taskObj,index) => {
        let arr = JSON.parse(localStorage.getItem(storageContextObjet.storageKeyTaskList))
        arr.forEach(function(item, i) { if (i == index) arr[i] = taskObj; });
        localStorage.setItem(storageContextObjet.storageKeyTaskList,JSON.stringify(arr))
        toggleUpdateModal(false)
        handleSaveDataToStorage()
        window.location.reload()
    }

    const handleSaveDataToStorageFile = () => {
        handleSaveDataToStorage()
    }
    const handleGetDataFromStorageFile = () =>{
        getFromLocalStorage()
        window.location.reload()
    }
    const handleUpdateModalCall = (index) => {
        setModalUpdate(true)
        setUpdateIndex(index)
    }

    useEffect(() => {
        let arr = localStorage.getItem(storageContextObjet.storageKeyTaskList)
        if(arr){
            let taskListObj = JSON.parse(arr)
            setTaskList(taskListObj)
        }else{
            setTaskList([])
        }
    }, [dateContextObject])

    useEffect(() => {
        if(sessionStorage.getItem("DATE_SELECTED")){
            dateContextObject.setDateVal(new Date(parseInt(sessionStorage.getItem("DATE_SELECTED"))))
        }
    }, [])

    return (
        <>
            <div className="header text-center">
                <h3>Todo List</h3>
                <div className="create-task-button">
                    <button className="btn btn-primary" onClick = {()=>setModal(true)}>Create Task</button>
                </div>
                <div  className="date-selecter-container">
                    <div className={"date-selecter"}>
                        <label>Select Date</label>
                        <DatePicker selected={dateContextObject.dateVal} className="form-control" onChange={date => {
                            sessionStorage.setItem("DATE_SELECTED",date.valueOf())
                            dateContextObject.setDateVal(date)
                        }}/>
                    </div>
                </div>
                <div className={"get-storage-data-button"}>
                    <button className="btn btn-danger" onClick={handleGetDataFromStorageFile}>Get Data From Storage </button>
                </div>
            </div>
            <div className="bottom-container">
                <div className="side-nav">
                    {taskList && taskList.map((task,index) => <Card taskObj={task} index={index} key={index} openModal={()=>handleUpdateModalCall(index)} />)}
                </div>
                <div className="meeting-notes-container">
                    {/* <div className="meeting-notes"> */}
                        <div className = "notes-header p-2">
                            Meeting Notes
                        </div>
                        <div className="editor">
                            <TextEditor/>
                        </div>
                        <div className="save-button">
                            <button className="btn btn-success" onClick={handleSaveDataToStorageFile}>Save Data to Storage </button>
                        </div>
                        
                    {/* </div> */}
                </div>
            </div>
            {modal ?
            <CreateTask modal = {modal} toggle = {toggle} save = {saveTask} />
            :<></>}
            {modalUpdate ?
            <UpdateTask modal = {modalUpdate} toggle = {toggleUpdateModal} update = {updateTask} updateIndex={updateIndex} />
            :<></>}
        </>
    )
}

export default TodoList
