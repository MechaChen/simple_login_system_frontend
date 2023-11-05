import * as yup from 'yup';

import SlsButton from './Slscomponents/SlsButton'
import SlsInput from './Slscomponents/SlsInput'

import './App.css'

const passwordSchema = yup.string().min(6);

function App() {

  return (
    <>
      <SlsButton variant="outlined">
        Home
      </SlsButton>
      <SlsInput schema={passwordSchema} />
    </>
  )
}

export default App
