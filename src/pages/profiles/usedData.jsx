
import React ,{useState}from "react";
import ImageShow from "../../components/common/image";

const UserDataShow = (props) => {
      const [idData, setIdData] = useState(0)
      const {UserId}=props;
     const obj=[{id:1, Name:'abc', gender : 'Female', age:21 },{ id:2,fName:'abc', lName: 'xyd', age:21 },{id:3, fName:'abc', lName: 'xyd', age:21 }]
   
     return (
    <div>
        {obj.filter(data=>data.id==idData ).map((iData)=>{
           return (
               <div>
                   {iData.age}
                   {iData.gender}
               </div> )
        }
       )}
      <ImageShow srcLink='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'/>
        
     </div>
     )
};

export default UserDataShow;
