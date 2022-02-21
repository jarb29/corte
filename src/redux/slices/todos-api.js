import Axios from 'axios';
import { apiEndpoint } from '../../config';

export async function getTodosFiles(idToken) {
  console.log('Fetching todos');

  const response = await Axios.get(`${apiEndpoint}/gettodos`, {
    headers: {
      'Content-Type': 'application/json',
      // prettier-ignore
      'Authorization': `Bearer ${idToken}`
    }
  });

  console.log('Todos:', response);
  return response.data.items;
}

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

export async function getUploadUrl(idToken, todoId) {
  const response = await Axios.post(`${apiEndpoint}/todos/${todoId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      // prettier-ignore
      'Authorization': `Bearer ${idToken}`
    }
  });

  return response.data.uploadUrl;
}

export async function uploadFile(uploadUrl, file) {
  console.log(uploadUrl, file);
  const result = await Axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': 'application/pdf'
    }
  });
  console.log('Result: ', result);
}

// export async function uploadFile(uploadUrl, file) {
//   console.log(uploadUrl, 'inside put file');
//   console.log(file, 'inside put file');
//   // await Axios.put(uploadUrl, file);
//   const blobData = new Blob([new Uint8Array(file)], { type: 'application/pdf' });

//   const result = await fetch(uploadUrl, {
//     method: 'POST',
//     body: blobData
//   });

//   console.log('Result: ', result);
// }
