fetch("/api/events/random")
  .then((response) => response.json())
  .then((json) => console.log(json));