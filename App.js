import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable';


export default function App() {

  const intervalRef = useRef();
  const [state, setState] = useState({
    total: 0,
    isCounting: false,
  });
  
  useEffect(() => () => clearInterval(intervalRef.current), []);
  
  const { total, isCounting } = state;


  
function getFormattedTime(time) {
let newTime = time;
let newDate = new Date(newTime)
let date = new Date(time)
let minutes = newDate.getMinutes();
  if(minutes < 10){
    minutes = '0' + minutes;
  }
let seconds = newDate.getSeconds();
  if(seconds < 10){
    seconds = '0' + seconds;
  };
const milliseconds = Number.parseInt(newDate.getMilliseconds()/10);
let milisec = milliseconds >= 10 ? milliseconds : '0'+ milliseconds;

  return `${minutes}:${seconds}.${milisec}`;
}

  const onStartBtnClick = () => {
    console.log('timer')
    let delta = 0
    const clickTime = new Date().getTime();
    if (!isCounting) {
      intervalRef.current = setInterval(() => {
        const totalTime = total + new Date().getTime() - clickTime - delta;
        setState({ total: totalTime, isCounting: true });
        delta += 1.2
        console.log(delta)
      }, 0);
    } else {
      clearInterval(intervalRef.current);
      const totalTime = total + new Date().getTime() - clickTime;
      setState({ isCounting: false, total: totalTime });
    }
  };
  
  const onClearBtnClick = () => {
    clearInterval(intervalRef.current);
    setState({ isCounting: false, total: 0 });
  };

  return (
    <View style = {styles.container}>
      <View style = {styles.textBlock}>
        <Animatable.Text 
        animation={isCounting ? "pulse" : ""} iterationCount="infinite" direction="alternate"
        style = {styles.maintext}>{getFormattedTime(total)}</Animatable.Text>
      </View>
      <View style = {styles.buttonBlock}> 
        <TouchableOpacity onPress={()=> onStartBtnClick()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{isCounting ? "STOP" : "START"}</Text>
          </View>
        </TouchableOpacity>    
        <TouchableOpacity onPress={()=> onClearBtnClick()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>CLEAR</Text>
          </View>
        </TouchableOpacity>    
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonBlock: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  maintext: {
    color: '#FFFAFA',
    fontSize: 66,
  },
  
button: {
  width: 80,
  height: 45,
  margin: 30,
  justifyContent: 'center',
  borderRadius: 5,
  // backgroundColor: "none",
  borderColor: '#FA8072',
  borderWidth: 1
},


buttonText: {
  width: '100%',
  textAlign: 'center',
  fontSize: 18,
  color: '#fff'
}
})