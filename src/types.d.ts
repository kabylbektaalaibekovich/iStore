interface ITodo {
  _id: string;
  name: string;
  prod: string;
  category: string;
  descreption: string;
  price: string;
  isFavorite: boolean; 
  quantity: number; 
}

interface IInitialStateType {
  todo: ITodo[];
  items: ITodo[];
  favorites: ITodo[];
  basket: ITodo[];
  prod: string; 
  name: string; 
  descreption: string;
  category: string;
  price: number | string;
  currentTodoId: string | null; 
}
