import React,{ useState,useEffect,useContext, useRef} from "react";
import * as Api from "../service/api"; // 指定せず、全部読み込む。
import { useTimer } from "react-timer-hook";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import { AuthContext } from "../providers/AuthProvider";
import { FocusContext } from "../providers/FocusProvider";
import dig from "object-dig";
import { Task } from "@mui/icons-material";

const Timer = ({ expiryTimestamp }) => {
    const currentUser = useContext(AuthContext);
    const {focus,setFocus} = useContext(FocusContext);
    const previousFocus = useRef();

    useEffect(()=>{
        console.log(focus);
        console.log(previousFocus.current);
        if(previousFocus.current){updateTaskTime(previousFocus.current.id,timeLeft())};
        setTime(focus.timeSecond);
        previousFocus.current = focus;
    },[focus])

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
      } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
    
    const updateTaskTime = async(id,newTaskTime) => {
        await Api.updateTaskTime(id,newTaskTime);
    }

    const startTimer = () => {
        start();
    }

    const timeLeft = () => {
        return hours*3600 + minutes*60 + seconds;
    }

    const pauseTimer = () => {
        pause()
        updateTaskTime(focus.id,timeLeft())
        console.log(timeLeft())
    }

    const setTime = (timeSecond) => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + timeSecond);
        restart(time);
        pause();
    }

    if(dig(currentUser,'currentUser','uid') ){
      return (
        <Box sx = {{textAlign: 'center'}} >
          <Box sx={{fontSize: '30px'}}>{focus.content}</Box>
          <Box sx={{fontSize: '100px'}}>
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </Box>
            <Button variant="outlined" onClick={startTimer} style={{ borderRadius: '30px' }} sx={{marginRight:2}}>Start</Button>
            <Button variant="outlined" onClick={pauseTimer} style={{ borderRadius: '30px' }}>Pause</Button>
        </Box>
      );
        }

}
export default Timer