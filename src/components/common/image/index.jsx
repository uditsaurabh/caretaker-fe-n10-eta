import React from "react";
import { Image } from "antd";


const ImageShow = (props) => {
const{srcLink}=props
  return (
    <>
      <Image src={srcLink} style={{width:20 ,height:40}} />
             
    </>
  );
};

export default ImageShow;
