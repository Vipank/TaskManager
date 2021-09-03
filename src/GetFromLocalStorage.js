export const getFromLocalStorage = () =>{
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
    }else{
      console.log("Error in Fetching Data from Storage File")
    }
   });
 }
 catch (err) {
   console.log("Some exception in Fetching Data from storage")
   console.log(err)

 }
}