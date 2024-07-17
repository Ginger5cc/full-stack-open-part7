import { useState } from "react"

export const useField = (name) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = (event) => {
        event.target.value=''
    }

    if (name ==='remove') 
        return reset
    else return {
        name,
        value,
        onChange
    }
}