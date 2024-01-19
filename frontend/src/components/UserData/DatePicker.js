import { useState ,useRef } from "react";

const DatePicker = ({joiningRef})=>{
    const ref =useRef()
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    return(
               <DatePicker  
                 selected={selectedDate}
                 onChange={handleDateChange}
                 dateFormat="dd/MM/yyyy" 
                 ref={joiningRef} >
                 </DatePicker>
    )
}

export default DatePicker