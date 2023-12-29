import React, {useState} from 'react'
import Alert from "./components/Alert";
import Button from "./components/Button";
function App() {
  const [alertVisible, setAlertVisible] = useState(false)
  return (
    <div>
        {alertVisible &&
          <Alert onClose={() => setAlertVisible(false)}>
             My alert
          </Alert>
        }
        <Button color="success" onClick={() => setAlertVisible(true)}>My button</Button>
    </div>
  )
}

export default App
