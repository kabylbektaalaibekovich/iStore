import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


const saveItemsToLocalStorage = (items: ITodo[]) => {
    localStorage.setItem('basketItems', JSON.stringify(items));
};

const loadItemsFromLocalStorage = (): ITodo[] => {
    return JSON.parse(localStorage.getItem('basketItems') || '[]');
};


const saveFavoritesToLocalStorage = (items: ITodo[]) => {
    localStorage.setItem('favorites', JSON.stringify(items));
};

const loadFavoritesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
};
const initialState: IInitialStateType = { 
    todo: [],
    favorites: loadFavoritesFromLocalStorage(),
    items: loadItemsFromLocalStorage(),
    prod: '',
    name: '',
    category: '',
    descreption: '',
    price: '',
    currentTodoId: null, 
};

let API = import.meta.env.VITE_Api;

export const postTodo: any = createAsyncThunk('todo/post', async (newTodo) => {
    const { data } = await axios.post(API, newTodo);
    return data;
}); 

export const getTodo: any = createAsyncThunk('todo/get', async () => {
    const { data } = await axios.get(API);
    return data;
});

export const delTodo: any = createAsyncThunk('todo/del', async (_id: string) => {
    const { data } = await axios.delete(`${API}/${_id}`);
    return data;
});

export const editTodo: any = createAsyncThunk('todo/edit', async (updatedTodo: ITodo) => {
    const { _id, ...rest } = updatedTodo; 
    const { data } = await axios.patch(`${API}/${_id}`, rest);
    return data; 
});

export const addToBasket: any = createAsyncThunk('todo/basket', async (product: ITodo) => {
    const { data } = await axios.post(`${API}/basket`, product);
    return data;
});


export const TodoCreateSlice = createSlice({
    name: 'Todo',
    initialState,
    reducers: {
        setProd: (state, action: PayloadAction<string>) => {
            state.prod = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setDescreption: (state, action: PayloadAction<string>) => {
            state.descreption = action.payload;
        },
        setPrice: (state, action: PayloadAction<string>) => {
            state.price = action.payload;
        },
        setCurrentTodoId: (state, action: PayloadAction<string | null>) => {
            state.currentTodoId = action.payload;
        },

        addFavorite(state, action: PayloadAction<ITodo>) {
            const existingItem = state.favorites.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.favorites.push(action.payload); 
                saveFavoritesToLocalStorage(state.favorites); 
            }
        },
        removeFavorite(state, action: PayloadAction<string>) {
            state.favorites = state.favorites.filter(item => item._id !== action.payload);
            saveFavoritesToLocalStorage(state.favorites);
        },
      
        addItemToBasket: (state, action: PayloadAction<ITodo>) => {
            const existingItem = state.items.find(item => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += 1; 
            } else {
              const newItem = { ...action.payload, quantity: 1 };
                state.items.push(newItem);
            }
            saveItemsToLocalStorage(state.items); // Сохраняем в localStorage
        },
        incrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item._id === action.payload);
            if (item) {
                item.quantity += 1; 
            }
            saveItemsToLocalStorage(state.items); 
        },
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item._id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1; 
                } else {
                    state.items = state.items.filter(item => item._id !== action.payload); // Удаляем, если количество 0
                }
            }
            saveItemsToLocalStorage(state.items); 
        },
        removeFromBasket: (state, action: PayloadAction<string>) => {
          const itemId = action.payload;
          const itemIndex = state.items.findIndex(item => item._id === itemId);
          if (itemIndex >= 0) {
              state.items.splice(itemIndex, 1); 
          } else {
              console.error(`Item with ID ${itemId} not found in basket.`);
          }
          saveItemsToLocalStorage(state.items); 
      },
  },
    extraReducers: (builder) => {
        builder
            .addCase(postTodo.fulfilled, (state, action) => {
                state.todo.push(action.payload); 
            })
            .addCase(getTodo.fulfilled, (state, action) => {
                state.todo = action.payload;
            })
            .addCase(delTodo.fulfilled, (state, action) => {
                const id: string = action.meta.arg; 
                state.todo = state.todo.filter(todo => todo._id !== id);
            })
            .addCase(editTodo.fulfilled, (state, action) => {
                const index = state.todo.findIndex(todo => todo._id === action.payload._id);
                if (index !== -1) {
                    state.todo[index] = action.payload; // обновление товара
                }
            })
            .addCase(addToBasket.fulfilled, (state, action) => {
                state.items.push(action.payload);
                saveItemsToLocalStorage(state.items); 
            });
    }
});

// Экспорт действий
export const { 
    setProd, 
    setName, 
    setCategory,
    setDescreption, 
    setPrice, 
    setCurrentTodoId,
    addItemToBasket,
    incrementQuantity,
    decrementQuantity,
    removeFromBasket ,
    addFavorite,
    removeFavorite
} = TodoCreateSlice.actions;

export default TodoCreateSlice.reducer;
