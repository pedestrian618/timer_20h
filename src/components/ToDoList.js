import React,{ useState,useEffect,useContext} from "react";
import * as Api from "../service/api"; // 指定せず、全部読み込む。
import dig from "object-dig";
import { signInWithGoogle,logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import { FocusContext } from "../providers/FocusProvider"
import { ListItem,IconButton, ListItemIcon } from "@mui/material";
//import DeleteIcon from "@mui/icons-material/Delete";
//import ListItemAvatar from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio"
import Checkbox from "@mui/material/Checkbox";

const ToDoList = (props) => {

    const [selectedTask, setSelectedTask] = React.useState('');
    const {focus,setFocus} = useContext(FocusContext);

    const deleteHandle = async(id) => {
        await Api.todoDelete(id);
        props.fetch();
    }

    const checkHandle = async(id) =>{
        await Api.toggleComplete(id);
        props.fetch();
    }
    
    //ラジオボタンを押した時に、データベースから最新の状態を取りにいく。
    const radioHandle = async(todo) =>{
      const newTodo = await Api.getTodo(todo.id)
      console.log(newTodo)
      setSelectedTask(newTodo.id);
      setFocus(newTodo);
    }

    const todoList = props.todos.map((todo)=>{
        //同一タグが続く場合、keyで一個一個のあたいが固有であることを明示する必要がある。
        //onclickは無名関数で渡さないと呼ばれたとき消される。
        return(
            //<li key={todo.id}>{todo.content}<button type="button" onClick={() => deleteHandle(todo.id)}>削除</button></li>
            //<Checkbox checked={todo.isComplete } onChange={() => checkHandle(todo.id)}/>
            <ListItem
                  key = {todo.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteHandle(todo.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
            >
              <ListItemIcon>
                <Radio
                checked={selectedTask === todo.id}
                onClick={()=> radioHandle(todo)}
                name='TaskTimeControlRadio'/>
              </ListItemIcon>
              <ListItemText primary={todo.content}/>
            </ListItem>
        );
    });
    return(
      <Box sx={{
        maxWidth: 360,
        margin: 'auto',
        justifyContent:"center"
      }}>
            <h2>20時間やることリスト</h2>
            <ul>{todoList}</ul>
      </Box>
    )
}
export default ToDoList;