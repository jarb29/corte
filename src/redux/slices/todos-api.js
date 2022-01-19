import Axios from 'axios';
import { apiEndpoint } from '../../config';

// export async function getTodos(idToken: string): Promise<Todo[]> {
//   console.log('Fetching todos')

//   const response = await Axios.get(`${apiEndpoint}/todos`, {

//     headers: {

//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${idToken}`
//     },
//   })

//   console.log('Todos:', response)
//   return response.data.items
// }

// export async function createTodo(
//   idToken: string,
//   newTodo: CreateTodoRequest
// ): Promise<Todo> {
//   const response = await Axios.post(`${apiEndpoint}/todos`,  JSON.stringify(newTodo), {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${idToken}`
//     }
//   })
//   return response.data.item
// }

// export async function patchTodo(
//   idToken: string,
//   todoId: string,
//   updatedTodo: UpdateTodoRequest
// ): Promise<void> {
//   await Axios.patch(`${apiEndpoint}/todos/${todoId}`, JSON.stringify(updatedTodo), {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${idToken}`
//     }
//   })
// }

// export async function deleteTodo(
//   idToken: string,
//   todoId: string
// ): Promise<void> {
//   await Axios.delete(`${apiEndpoint}/todos/${todoId}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${idToken}`
//     }
//   })
// }

export async function getUploadUrl(
  //   idToken,
  todoId
) {
  console.log('ccccccc');
  const response = await Axios.post(`${apiEndpoint}/todos/${todoId}/attachment`, '', {
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*'
    //   //   'Authorization': `Bearer ${idToken}`
    // }
  });
  return response.data.uploadUrl;
}

export async function uploadFile(uploadUrl, file) {
  console.log(uploadUrl, file, 'inside put file');
  // await Axios.put(uploadUrl, file);

  await Axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': 'application/pdf'
    }
  });
}

// export async function uploadFile(uploadUrl, file) {
//   console.log(uploadUrl, file, 'inside put file');
//   // await Axios.put(uploadUrl, file);

//   await fetch(uploadUrl, {
//     method: 'PUT',
//     body: file
//   });
// }
