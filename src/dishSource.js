import { PROXY_URL, PROXY_KEY } from './apiConfig.js';

export function searchDishes(searchParams) {
        
    const endpoint = '/recipes/complexSearch';
    let url = `${PROXY_URL}${endpoint}`;

    if (searchParams) {
        const queryParams = new URLSearchParams(searchParams).toString();
        url += `?${queryParams}`;
    }

    const options = {
        method: 'GET',
        headers: {
        'X-DH2642-Key': PROXY_KEY,
        'X-DH2642-Group': '108', 
        },
    };

    return fetch(url, options)
        .then(response => {
        if (!response.ok) {
            throw new Error(`network respond error, code:${response.status}`);
        }
        return response.json();
        })
        .then(data => {
        return data.results;
        })
        .catch(error => {
        console.error('wrong request:', error);
        throw error;
        });
}


export function getMenuDetails(ids_array) {
    if (!Array.isArray(ids_array) || ids_array.length === 0) {
      return Promise.reject(new Error('ids_array must not be empty'));
    }
  
    const endpoint = '/recipes/informationBulk';
    let url = `${PROXY_URL}${endpoint}`;
  
    const ids = ids_array.join(',');
  
    const params = new URLSearchParams({ ids });
  
    url += `?${params.toString()}`;
  
    const options = {
      method: 'GET',
      headers: {
        'X-DH2642-Key': PROXY_KEY,
        'X-DH2642-Group': '108', 
      },
    };
  
    return fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`network respond error, code:${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('wrong request:', error);
        throw error;
      });
  }
 


  export function getDishDetails(id) {
    return getMenuDetails([id])
      .then(dishArray => {
        return dishArray[0]; 
      })
      .catch(error => {
        console.error('error when extract dish details', error);
        throw error;
      });
  }
  