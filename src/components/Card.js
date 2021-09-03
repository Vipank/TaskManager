import React, {useState,useContext} from 'react';
import { Tooltip } from 'reactstrap';

import {dateContext} from "../App"
import {storageContext} from "../App"
import {handleSaveDataToStorage} from "../SaveToStorage"

const Card = ({taskObj, index,openModal}) => {
    const dateContextObject = useContext(dateContext)
    const storageContextObjet = useContext(storageContext)

    const [tooltipCompleted, setTooltipCompleted] = useState(false);
    const toggleTooltipCompleted = () => setTooltipCompleted(!tooltipCompleted);
    const [tooltipDeleted, setTooltipDeleted] = useState(false);
    const toggleTooltipDeleted = () => setTooltipDeleted(!tooltipDeleted);
    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]
    const handleDelete = () => {
        let arr = JSON.parse(localStorage.getItem(storageContextObjet.storageKeyTaskList))
        arr.splice(index, 1);
        localStorage.setItem(storageContextObjet.storageKeyTaskList,JSON.stringify(arr))
        handleSaveDataToStorage()
        window.location.reload()
    }

    const handleSetComplete = () => {
        let arr = JSON.parse(localStorage.getItem(storageContextObjet.storageKeyTaskList))
        arr.forEach(function(item, i) { if (i == index) item.completed = true; });
        localStorage.setItem(storageContextObjet.storageKeyTaskList,JSON.stringify(arr))
        handleSaveDataToStorage()
        window.location.reload()
    }
    return (
        <div class = "card-wrapper mr-5 mb-5" >
            <div class = "card-top" style={{"background-color": colors[index%5].primaryColor}}></div>
            <div class = "task-holder">
                <div onClick={openModal} class = "card-header" style={{"background-color": colors[index%5].secondaryColor}}>{taskObj.Name}</div>
                <div  style={{"position": "absolute", "left" : "20px", "bottom" : "20px"}}>
                    <div className={taskObj.completed  ? "progress-div-completed" :"progress-div-not-completed"}>
                    {taskObj.completed  ? "Completed" : "In Progress"}
                    </div>
                </div>
                <div  style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                    <i id="completeIcon" class = "far fa-check-circle mr-3" style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick={handleSetComplete}></i>
                    <Tooltip target="completeIcon" placement="bottom" isOpen={tooltipCompleted} autohide={false} toggle={toggleTooltipCompleted}>
                        Marks as completed
                    </Tooltip>
                    <i id="deleteIcon" class="fas fa-trash-alt" style = {{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick={handleDelete}></i>
                    <Tooltip target="deleteIcon" placement="bottom" isOpen={tooltipDeleted} autohide={false} toggle={toggleTooltipDeleted}>
                        Delete
                    </Tooltip>
                </div>
        </div>
        </div>
    );
};

export default Card;