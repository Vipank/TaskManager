export const handleSaveDataToStorage = () => {
    try {
        fetch(
        '/saveLocalStorage',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            localStorageData : localStorage
            })

        }).then(response => response.json()).then(data => {
            if(data.success){
                console.log("Saved successfully to Storage ...")
            }else{
                alert("Failed to save Data ...")
            }
        });
    }
    catch (err) {
        console.log("Some exception in Saving Data to storage")
        console.log(err)
    }
}