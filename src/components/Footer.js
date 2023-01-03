import React from "react";
import Box from "@mui/material/Box";

const Footer = () =>{

    return (
        <Box sx={{
            width:"100%",
            height : "56px",
            display : "flex",
            justifyContent : "center",
            alignItems : "center",
            color : "#fff",
            backgroundColor:'primary.main',
            position:"fixed", //スクロールしても動かない。
            bottom:0, //画面の下に合わせる
        }}>copyright Tsubasa Murate</Box>
    )
};

export default Footer;
 