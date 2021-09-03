import React, { useState,useEffect,useContext } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {dateContext} from "../App"
import {storageContext} from "../App"
import {getFromLocalStorage} from "../GetFromLocalStorage"

function TextEditor() {
  const dateContextObject = useContext(dateContext)
  const storageContextObjet = useContext(storageContext)
  const [editorState, setEditorState] = useState('');
  const handleOnChange = (editorState) =>{
    setEditorState(editorState)
    localStorage.setItem(storageContextObjet.storageKeyEditorState,editorState)
  }
  useEffect(() => {
            
      getFromLocalStorage()
      if(localStorage.getItem(storageContextObjet.storageKeyEditorState)){
          setEditorState(localStorage.getItem(storageContextObjet.storageKeyEditorState))
      }else{
        setEditorState('')
      }
  }, [dateContextObject.dateVal])

  useEffect(() => {
    if(localStorage.getItem(storageContextObjet.storageKeyEditorState)){
      setEditorState(localStorage.getItem(storageContextObjet.storageKeyEditorState))
    }else{
      setEditorState('')
    }
  }, [])


  return (
    <ReactQuill theme="snow" value={editorState} onChange={handleOnChange}/>
  );
}

export default TextEditor