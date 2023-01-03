import React, { useContext } from "react";
import dig from "object-dig";
import { signInWithGoogle,logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const Header = () => {
    const currentUser = useContext(AuthContext);
    console.log(currentUser)

    const buttonRender = () => {
        let bottunDom
        if(dig(currentUser,'currentUser','uid') ){
            bottunDom= <Button variant="contained" sx = {{color: '#fff'}} onClick={logOut}>ログアウト</Button>
        }else{
            bottunDom= <Button variant="contained" sx = {{color: '#fff'}} onClick={signInWithGoogle}>ログイン</Button>
        }
        return bottunDom
    }
    return(
        <AppBar position="static">
        <Toolbar sx={{ justifyContent:'space-between' }}>
            <Typography variant="h6" >
                20H Timer
            </Typography>
        {buttonRender ()}
        </Toolbar>
    </AppBar>
    )
}
export default Header;