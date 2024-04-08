import { useRef, useState } from 'react';
import './App.css';

type Todo = {
  id: string | number;
  name: string | undefined;
}

function App() {
  const nameRef = useRef<HTMLInputElement>(null); 
  const changeNameRef = useRef<HTMLInputElement>(null); 
  const [id, setId] = useState<number | null | string>(null);
  const todo:string | null = localStorage.getItem("todos");
  const local:Todo[] = todo ? JSON.parse(todo):[];
  const [todos, setTodos] = useState<Todo[]>(local);

  function validate(nameRef:any): boolean {
    if (!nameRef.current?.value) {
      alert("Taskni kiriting!");
      nameRef.current?.focus();
      return false;
    }
    return true
  }

  function handleClick() {
    const isValid = validate(nameRef);
    if (isValid) {
      let todo: Todo = {
        id: Date.now(),
        name:nameRef.current?.value,
      }
      if (nameRef.current && nameRef.current.value !== undefined) {
        setTodos(prevTodos => [...prevTodos, todo]);
        let copied:Todo[] = JSON.parse(JSON.stringify(todos));
        copied.push(todo);
        localStorage.setItem("todos", JSON.stringify(copied));
        nameRef.current.value = '';
      } 
    }  
    }
    
    function handleDelete(id:number|string){
      const isDelete:boolean = confirm("Rostdan ham o'chirmoqchimisiz?");
      if (isDelete) {
        let copied:Todo[] = JSON.parse(JSON.stringify(todos));
        copied = copied.filter(el => el.id !== id);
        setTodos(copied);
        localStorage.setItem("todos", JSON.stringify(copied));

      }
    }

    function handleEdit(): void{
      let copied:Todo[] = JSON.parse(JSON.stringify(todos));
        copied = copied.map(el => {
            if (el.id === id) {
             el.name = changeNameRef.current?.value === '' ? el.name : changeNameRef.current?.value;
            }
          return el;
        });
        setTodos(copied);
        localStorage.setItem("todos", JSON.stringify(copied));
        if (changeNameRef.current) {
          changeNameRef.current.value = '';
        }
    }

  return (
    <>
    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel"  aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">New Task</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Name:</label>
                <input ref={changeNameRef} type="text" className="form-control" id="recipient-name"/>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button onClick={handleEdit} data-bs-dismiss="modal" aria-label="Close" type="button" className="btn btn-primary">Send message</button>
          </div>
        </div>
      </div>
    </div>


      <div className="todoWrap">
        <div className="todo">
          <input ref={nameRef} type="text" className="todo__input" />
          <button onClick={handleClick} className="todo__button">Add</button>
        </div>
        <table className='todoOutput'>
          <thead>
            <tr>
              <th>N:</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              local.length > 0 && local.map((el:Todo, index:number) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.name}</td>
                    <td className='actionss'>
                      <i onClick={() => handleDelete(el.id)} className="fa-solid fa-trash"></i>
                      <i onClick={() => {setId(el.id)}} className="fa-regular fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat"></i>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App;
