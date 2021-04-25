export const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
};

export const getRandom = (value) => Math.ceil(Math.random() * value);

export const getTime = () => {
  const date = new Date();
  const hours = date.getHours();
  let minutes = date.getMinutes();
  if (String(minutes).length === 1) {
    minutes = `0${minutes}`;
  }
  return (`${hours}:${minutes}`);
};