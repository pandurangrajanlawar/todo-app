import React from 'react';

import {SafeAreaView,
     StyleSheet,
     View,
     Text,
     TextInput,
     TouchableOpacity,
     Flatlist,
     Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const COLORS = {primary: '#1f145c', white: '#fff'};

const App = () => {
    const [TextInput,setTextInput]= React.useState (' ');
    const[todos, setTodos] = React.useState([]);
    React.useEffect(()=>{
getTodosFromUserDevice(todos);
    }, [todos]);
React.useEffect(()=> {
    saveTodoTouserDevice();
}, [todos])
const ListItem = ({todo}) => {
    return (
         <View Style={styles.listItems}>
        <View style={{flex :1}}>
            <Text
             style={{fontWeight: 'bold',
            fontSize: 15,
             color: COLORS.primary,
        textDecorationLine: todo?.completed?'line-through': 'none',
        }}>
         {todo?.task}
        </Text>
      </View>
      {!todo?.completed && (
        <TouchableOpacity style={[styles.actionIcon]}>
          <Icon name="done" size={20} color={COLORS.white} onPress={()=>markTodoComplete(todo?.id)} />
      </TouchableOpacity>
      )}
     <TouchableOpacity style={[styles.actionIcon, {backgroundColor: 'red'}]}
      onPress={()=>deleteTodo(todo?.id)}>
     <Icon name="done" size={20} color= {COLORS.white} />
 </TouchableOpacity>
 </View>
    );
};
const saveTodoTouserDevice = async(todos)=>{
    try {
        const stringifyTodos = JSON.stringify(todos)
        await AsyncStorage.setItem('todos', stringifyTodos);
      } catch (e) {
          console.log(e);
        // saving error
      }

};
const getTodosFromUserDevice = async () =>{
    try{
      const todos = await AsyncStorage.getItem('todos');
      if(todos != null){
      setTodos(JSON.parse(todos));
      }
    } catch (error) {
     console.log(error);
    }
};
const addTodo = () => {
    if(TextInput == ''){
Alert.alert('Error','Please input todo');
}
else {
    const newTodo = {
    id: Math.random(),
    task: TextInput,
    completed: false,
};
setTodos([...todos, newTodo]);
setTextInput('');
}
};

const markTodoComplete = (todoId) =>{
const newTodos = todos.map((items)=>{
    if(item.id == todoId) {
        return {...item,completed:true};
 }
 return item;
});
setTodos(newTodos);
};

const deleteTodo = (todoId) =>{
    const newTodos = todos.filter(item => item.id != todos);
    setTodos(newTodos);
};
const clearTodos = () => {
    Alert.alert('Confirm','Clear todos?',[
        {
        text:'Yes',
        onPress: () => setTodos([]),
        },
        {text: 'No'},
    ]);
    
};
    return (
     <SafeAreaView style={{flex:1,backgroundColor: COLORS.white}}>
         <View style={styles.header}>
             <Text Style={{fontWeight: 'bold, fontsize: 20, color: COLORS.primary'}}>
                 TODO APP
                 </Text>
                 <Icon name="delete" size={25} color="red" onPress={clearTodos} />
         </View>
         <Flatlist 
         showsVerticalScrollIndicator={false}
         contentContainerStyle={{padding: 20,paddingBottom: 100}}
         date={todos}
          renderItems={({item}) => <ListItem todo={item} />}
          />
         <View style={styles.footer}>
             <View style= {styles.inputContainer}>
                 <TextInput placeholder="Add Todo"
                 value={TextInput}
                  onChangeText={(text)=>setTextInput(text)} />
             </View>
             </View>
        <TouchableOpacity onPress={addTodo}>
            <View style={styles.iconContainer}>
                <Icon name="add" color={COLORS.white} size={30} />
            </View>
        </TouchableOpacity>
     </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    actionIcon:{
        height: 25,
        width: 25,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        marginleft: 5,
        borderRadius: 3,
    },
    listItems: {
        padding: 20,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        elevation: 12,
        borderRadius:7,
        marginVertical: 10,
 },
 header: {
     padding: 20,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
 },
 footer: {
 position: 'absolute',
 bottom: 0,  
 backgroundColor: COLORS.white,
 width: '100%',
 flexDirection: 'row',
 alignItems: 'center',
 paddingHorizontal: 20,
},
inputContainer: {
    backgroundColor:COLORS.white,
    elevation: 40,
    flex: 1,
    height:50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
},
iconContainer: {
    height: 50,

    width: 50,
  backgroundColor: COLORS.primary,
  borderRadius: 25,
  elevation: 40,
  justifyContent: 'center',
  alignItems: 'center',
},
}),


export default App;