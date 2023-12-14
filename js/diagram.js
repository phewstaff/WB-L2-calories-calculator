export const drawPieChart = function (data) {
  const colors = [
    "#3498db",
    "#2ecc71",
    "#e74c3c",
    "#f39c12",
    "#9b59b6",
    "#34495e",
    "#1abc9c",
    "#d35400",
    "#7f8c8d",
    "#27ae60",
    "#c0392b",
    "#2980b9",
    "#8e44ad",
    "#16a085",
    "#f1c40f",
  ];

  const canvas = document.getElementById("pie");
  const ctx = canvas.getContext("2d");
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  let color,
    startAngle,
    endAngle,
    total = getTotal(data);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#000000";

  for (let i = 0; i < data.length; i++) {
    color = colors[i];
    startAngle = calculateStart(data, i, total);
    endAngle = calculateEnd(data, i, total);

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(x, y);
    ctx.arc(x, y, y - 100, startAngle, endAngle);
    ctx.fill();
    ctx.rect(canvas.width - 200, y - i * 30, 12, 12);
    ctx.fill();
    ctx.font = "13px sans-serif";
    ctx.fillText(
      data[i].name +
        " - " +
        data[i].calories +
        " (" +
        calculatePercent(data[i].calories, total) +
        "%)",
      canvas.width - 200 + 20,
      y - i * 30 + 10
    );
  }
};

const calculatePercent = function (calories, total) {
  return ((calories / total) * 100).toFixed(2);
};

const getTotal = function (data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].calories;
  }

  return sum;
};

const calculateStart = function (data, index, total) {
  if (index === 0) {
    return 0;
  }

  return calculateEnd(data, index - 1, total);
};

const calculateEndAngle = function (data, index, total) {
  const angle = (data[index].calories / total) * 360;
  const inc = index === 0 ? 0 : calculateEndAngle(data, index - 1, total);

  return angle + inc;
};

const calculateEnd = function (data, index, total) {
  return degreeToRadians(calculateEndAngle(data, index, total));
};

const degreeToRadians = function (angle) {
  return (angle * Math.PI) / 180;
};
