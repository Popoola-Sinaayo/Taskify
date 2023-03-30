import { Todo } from "./modal"
interface EditProps {
    id: number,
    todo: string
}

export type Actions = { type: "add"; payload: string } | { type: "remove"; payload: number } | { type: "done"; payload: number } | { type: "edit", payload: EditProps } | {type: "modify", payload: Todo[]} | { type: "addNew"; payload: string } | {type: "addNewNot", payload: string}



export const TodoReducer = (state: Todo[], action: Actions) => {
    switch (action.type) {
        case "add":
            return [...state, { id: Math.random(), todo: action.payload, isDone: false }];
        case "remove":
            return state.filter(todo => todo.id !== action.payload)
        case "done":
            return state.map(todo => todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo)
        case "edit":
            return state.map(todo => todo.id === action.payload.id ? { ...todo, todo: action.payload.todo } : todo)
        case "modify":
            return [...action.payload];
        case "addNew":
            return [...state, { id: Math.random(), todo: action.payload, isDone: true }];
        case "addNewNot":
             return [...state, { id: Math.random(), todo: action.payload, isDone: false }];
    }
}


