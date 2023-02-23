const handleSubmit = async (data, url) => {
    console.log("handleSubmit",data)
  
    const submitRequest = async (reqBody) => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: reqBody }),
        })
        const json = await res.json();
        console.log('response-JSON',json)
        return { response: json, error: undefined };
        // return 'success'
      } catch (error) {
        return { response: undefined, error: error };
      }
    };
  
    return await submitRequest(data);
  };
  
  export default handleSubmit;