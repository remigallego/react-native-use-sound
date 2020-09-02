export const toHHMMSS = (secs: number) => {
  var sec_rounded = Math.round(secs);
  var hours = Math.floor(sec_rounded / 3600);
  var minutes = Math.floor(sec_rounded / 60) % 60;
  var seconds = sec_rounded % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? '0' + v : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
};
