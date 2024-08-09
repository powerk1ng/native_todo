import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useReducer, useRef} from 'react';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'addTodo': {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        done: false,
        editable: false,
      };

      if (!action.payload.trim()) {
        alert('Error, please enter a valid todo');
        return state;
      }

      return {
        ...state,
        inputValue: '',
        todos: [...state.todos, newTodo],
      };
    }

    case 'changeAddTodoText': {
      return {
        ...state,
        inputValue: action.payload,
      };
    }

    case 'deleteTodo': {
      const updatedTodos = state.todos.filter((todo) => {
        return todo.id !== action.payload;
      });

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case 'updateTodo': {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {...todo, ...action.payload.update};
        }

        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
      };
    }
  }
};

const Home = (props) => {
  const {_, height} = Dimensions.get('window');

  const initialState = {
    todos: [],
    inputValue: '',
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);
  const inputRef = useRef({});

  const today = useMemo(() => {
    return new Date()
      .toLocaleDateString()
      .split('/')
      .map((x) => (x < 0 ? x : `0${x}`))
      .join('.');
  }, []);

  const handleInputChange = (text) => {
    dispatch({type: 'changeAddTodoText', payload: text});
  };

  const handleAddTodo = () => {
    dispatch({type: 'addTodo', payload: state.inputValue});
  };

  const handleChildTodoChange = (id, text) => {
    dispatch({type: 'updateTodo', payload: {id, update: {text}}});
  };

  const editTodo = async (id, currentEditable) => {
    dispatch({
      type: 'updateTodo',
      payload: {id, update: {editable: !currentEditable}},
    });

    if (!currentEditable) {
      setTimeout(() => {
        inputRef.current[id]?.focus();
      });
    }
  };

  const deleteTodo = (id) => {
    dispatch({type: 'deleteTodo', payload: id});
    delete inputRef.current[id];
  };

  return (
    <ScrollView className="flex-grow flex-">
      <View className="flex-1 flex-col">
        <ImageBackground
          source={{
            uri: 'https://images.pexels.com/photos/1226302/pexels-photo-1226302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          resizeMode="cover"
          style={{
            height: height - 50,
          }}>
          <View className="px-4 py-2 bg-white flex flex-row justify-between">
            <Text className="text-xl italic text-black">GYM LOG</Text>
            <Text className="text-2xl font-bold text-primary">{today}</Text>
          </View>
          <View className="my-2 px-2 flex flex-row">
            <TextInput
              value={state.inputValue}
              onChangeText={handleInputChange}
              className="bg-white py-1 px-2 flex-grow text-black"
              placeholder="Add your todo here!"
            />
            <TouchableOpacity
              className="py-2 px-4 bg-primary"
              onPress={handleAddTodo}
              activeOpacity={0.8}>
              <Text className="text-white">Add Todo</Text>
            </TouchableOpacity>
          </View>
          <View className="px-2 flex gap-2">
            {state.todos.map((todo) => (
              <View key={todo.id} className="flex flex-row">
                <TextInput
                  editable={todo.editable}
                  ref={(ref) => (inputRef.current[todo.id] = ref)}
                  onChangeText={(text) => handleChildTodoChange(todo.id, text)}
                  value={todo.text}
                  className={`bg-white py-1 px-2 flex-grow ${
                    todo.editable ? 'text-black' : 'text-gray-300'
                  }`}
                />
                <TouchableOpacity
                  onPress={() => editTodo(todo.id, todo.editable)}
                  className={`py-2 px-4 w-[65px]  ${
                    todo.editable ? 'bg-green-500' : 'bg-primary'
                  }`}>
                  <Text className="text-white text-center">
                    {todo.editable ? 'Save' : 'Edit'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="py-2 px-4 bg-red-500"
                  onPress={() => deleteTodo(todo.id)}>
                  <Text className="text-white">Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default Home;
