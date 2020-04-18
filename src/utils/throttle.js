const throttle = (func, time) => {
  let timer = null;
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func();
      }, time);
    }
  };
};

export default throttle;
