import logo from './logo.svg';
import react,{useContext, createContext,useState,useEffect} from "react"
import './App.css';
import TodoList from "./components/TodoList"
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css";
import {getFromLocalStorage} from "./GetFromLocalStorage"
import { Spinner } from 'reactstrap';

export const dateContext = createContext()
export const storageContext = createContext()

function App() {
  const [dateVal, setDateVal] = useState(new Date());
  const [dataFetched,setDataFetched] = useState(false)
  useEffect(() =>  {
    try {
      fetch(
       '/getLocalStorage',
       {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
  
     }).then(response => response.json()).then(data => {
      if(data.success){
        const dataStored = data.data
        console.log(dataStored)
        Object.keys(dataStored).forEach(function (key) {
          localStorage.setItem(key, dataStored[key]);
        });
        setDataFetched(true)
      }else{
        console.log("Error in Fetching Data from Storage File")
      }
     });
   }
   catch (err) {
     console.log("Some exception in Fetching Data from storage")
     console.log(err)
  
   }
  }, [])

  return (
    <dateContext.Provider value={{dateVal:dateVal,setDateVal:setDateVal}}>
      <storageContext.Provider value={{storageKeyTaskList:dateVal.toLocaleDateString()+"_TASKLIST",storageKeyEditorState:dateVal.toLocaleDateString()+"_EDITOR"}}>
        <div className="App">
            {dataFetched ? <TodoList /> :
              <Spinner color="primary" />
            }
        </div>
      </storageContext.Provider>
    </dateContext.Provider>
  );
}

export default App;
