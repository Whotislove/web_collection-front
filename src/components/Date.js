const fullDate = () => {
  const date = new Date();
  const hour = String(date.getHours());
  const minutes = String(date.getMinutes());
  const year = String(date.getFullYear()).slice(2);
  const day = String(date.getDate());
  const month = String(date.getMonth() + 1);
  return `${day}.${month}.${year} ${hour}:${minutes}`;
};

// const fullDate = `${day}.${month}.${year} ${hour}:${minutes}`;

export default fullDate;
