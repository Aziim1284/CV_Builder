// const handleInputChange = ({field, value ,setError ,setFormdata}) => {
//     setFormdata((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));

//     switch (field) {
//       case 'name':
//         const nameRegex = /^[A-Za-z]{2,10}$/;
//         setError((prevErrors) => ({
//           ...prevErrors,
//           name: nameRegex.test(value) ? '' : 'Please enter a valid name (2 to 10 characters, only letters)',
//         }));
//         break;

//       case 'email':
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         setError((prevErrors) => ({
//           ...prevErrors,
//           email: emailRegex.test(value) ? '' : 'Please enter a valid email address',
//         }));
//         break;

//       case 'phone':
//         const phoneRegex = /^\d{10,12}$/;
//         setError((prevErrors) => ({
//           ...prevErrors,
//           phone: phoneRegex.test(value) ? '' : 'Please enter a valid phone number',
//         }));
        
//         break;
//         case 'address':
//         const addregx = /^[a-zA-Z0-9\s]+$/;
//         setError((prevErrors) => ({
//           ...prevErrors,
//           address: addregx.test(value) ? '' : 'Please Enter text in between 2-50 character',
//         }));
        
//         break;
//         case 'pincode':
//           const pinRegx = /^\d{6}$/;
//           setError((prevErrors) => ({
//             ...prevErrors,
//             pincode: pinRegx.test(value) ? '' : 'Please Enter 6 digits pincode number' ,
//           }));
          
//           break;  case 'city':
//           const cityregx = /^[A-Za-z]{3,20}$/;
//           setError((prevErrors) => ({
//             ...prevErrors,
//             city: cityregx.test(value) ? '' : 'Please Enter text in between 3-20 character',
//           }));
          
//           break;
//           case 'state':
//             const stateRegx = /^[A-Za-z]{5,20}$/;
//             setError((prevErrors) => ({
//               ...prevErrors,
//               state: stateRegx.test(value) ? '' : 'Please Enter text in between 5-20 character',
//             }));
            
//             break;
//             case 'introduction':
//             const introRegx = /^[a-zA-Z0-9\s]+$/;
//             setError((prevErrors) => ({
//               ...prevErrors,
//               introduction: introRegx.test(value) ? '' : 'Specials characters are not allowed ',
//             }));
            
//             break;

//       // Add more cases for other fields if needed

//       default:
//         break;
//     }
//   };
//   export default handleInputChange