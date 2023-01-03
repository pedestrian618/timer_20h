import React,{ useState,useEffect,useContext} from "react";
import * as Api from "../service/api"; // 指定せず、全部読み込む。
import dig from "object-dig";
import { signInWithGoogle,logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import { FocusContext } from "../providers/FocusProvider";
import ToDoList from "./ToDoList";
import { TextField } from "@mui/material"; 
import Button  from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack"
import { useTimer } from "react-timer-hook";
import Timer from "./Timer"

const Dashboard = () => {
    const currentUser = useContext(AuthContext);
    const {focus,setFocus} = useContext(FocusContext);
    //const [状態変数, 状態を変更するための関数] = useState(状態の初期値)
    const [inputName,setInputName] = useState("");
    const [todos,setTodos] = useState([]); //初期値は配列

    // useEffect 第一引数：やりたいこと。　第二引数：依存するへんすう
    useEffect(() => {
        fetch();
    }, [currentUser])

    const fetch = async() => {
        if(dig(currentUser,'currentUser','uid') ){
            const data = await Api.initGet(currentUser.currentUser.uid);
            await setTodos(data);
        }
    }

    const formRender = () => {
        let dom
        // もしログインしていたら、TODOの入力フォーム
        if(dig(currentUser,'currentUser','uid') ){
            dom=<Box sx={{width:"100%",maxWidth:360,margin:"auto",marginBottom:4,display:"flex",alignItems:"baseline",justifyContent:"center"}}>
                <TextField variant="standard" placeholder="ToDoName" value = {inputName} sx={{marginRight:2}} onChange={(event) => setInputName(event.currentTarget.value)}/>
                <Button  variant="contained" size= "small" 
                disabled = {inputName.length>0 ? false : true} sx = {{color: '#000'}} type="button" onClick={() => post()}>追加する</Button>
                </Box>
        }else{
            dom= <Button onClick={signInWithGoogle}>ログイン</Button>
        }
        return dom
    }

    const post =async() => {
        await Api.addToDo(inputName,currentUser.currentUser.uid);
        await setInputName("");
        fetch();
    }

    return(
        <Box sx={{
            textAlign: 'center',
            marginTop: 2,
          }}>
            <ToDoList todos={todos} fetch={fetch}/>
            {formRender ()}
        </Box>
    )

};
export default Dashboard;