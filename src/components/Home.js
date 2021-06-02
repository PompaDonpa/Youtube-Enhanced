import React from 'react'
import { FormControl, InputLabel, Input, TextField } from '@material-ui/core'

const handleSubmit = () => {}

const handleInputChange = e => {}

const Home = () => {
  return (
    <div>
      <form  noValidate autoComplete='off'>

        <TextField   id="standard-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }} />
      </form>
    </div>
  )
}

export default Home
