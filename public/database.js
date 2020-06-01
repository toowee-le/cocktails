const getData = async () => {
    const response = await fetch('/api/favorites');
    const data = await response.json();
    console.log(data);
}

getData();