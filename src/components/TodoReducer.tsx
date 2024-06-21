export interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  export type TodoActionType = 
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'DELETE_TODO'; payload: number }
    | { type: 'EDIT_TODO'; payload: { id: number; text: string } }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'CLEAR_COMPLETED' };
  
  export const todoReducer = (state: Todo[], action: TodoActionType): Todo[] => {
    switch (action.type) {
      case 'ADD_TODO':
        return [...state, { id: Date.now(), text: action.payload, completed: false }];
      case 'DELETE_TODO':
        return state.filter(todo => todo.id !== action.payload);
      case 'EDIT_TODO':
        return state.map(todo =>
          todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        );
      case 'TOGGLE_TODO':
        return state.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        );
      case 'CLEAR_COMPLETED':
        return state.filter(todo => !todo.completed);
      default:
        return state;
    }
  };
  