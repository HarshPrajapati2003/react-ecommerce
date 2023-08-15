export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/orders/own")
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/users/own")
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/users/"+update.id,{
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data = await response.json()
    resolve({data})
  }
  );
}

