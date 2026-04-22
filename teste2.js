const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 20;
const rows = 20;
const cols = 20;

let score = 0;

const map = [
  "####################",
  "#........##........#",
  "#.####...##...####.#",
  "#..................#",
  "#.####.######.####.#",
  "#..................#",
  "#.####...##...####.#",
  "#........##........#",
  "####################"
];

let pacman = {
  x: 1,
  y: 1,
  dx: 0,
  dy: 0
};

let ghosts = [
  { x: 10, y: 5, dx: 1, dy: 0 }
];

function drawMap() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "#") {
        ctx.fillStyle = "blue";
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      } else if (map[y][x] === ".") {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(
          x * tileSize + tileSize / 2,
          y * tileSize + tileSize / 2,
          3,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
  }
}

function drawPacman() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(
    pacman.x * tileSize + tileSize / 2,
    pacman.y * tileSize + tileSize / 2,
    tileSize / 2,
    0.2 * Math.PI,
    1.8 * Math.PI
  );
  ctx.lineTo(
    pacman.x * tileSize + tileSize / 2,
    pacman.y * tileSize + tileSize / 2
  );
  ctx.fill();
}

function drawGhosts() {
  ctx.fillStyle = "red";
  ghosts.forEach(g => {
    ctx.beginPath();
    ctx.arc(
      g.x * tileSize + tileSize / 2,
      g.y * tileSize + tileSize / 2,
      tileSize / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  });
}

function movePacman() {
  const nextX = pacman.x + pacman.dx;
  const nextY = pacman.y + pacman.dy;

  if (map[nextY][nextX] !== "#") {
    pacman.x = nextX;
    pacman.y = nextY;

    if (map[nextY][nextX] === ".") {
      map[nextY] =
        map[nextY].substring(0, nextX) +
        " " +
        map[nextY].substring(nextX + 1);
      score++;
      document.getElementById("score").innerText = "Pontuação: " + score;
    }
  }
}

function moveGhosts() {
  ghosts.forEach(g => {
    const directions = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 }
    ];

    const random = directions[Math.floor(Math.random() * directions.length)];
    const nextX = g.x + random.dx;
    const nextY = g.y + random.dy;

    if (map[nextY][nextX] !== "#") {
      g.x = nextX;
      g.y = nextY;
    }

    // colisão com pacman
    if (g.x === pacman.x && g.y === pacman.y) {
      alert("Game Over!");
      location.reload();
    }
  });
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") {
    pacman.dx = 0;
    pacman.dy = -1;
  }
  if (e.key === "ArrowDown") {
    pacman.dx = 0;
    pacman.dy = 1;
  }
  if (e.key === "ArrowLeft") {
    pacman.dx = -1;
    pacman.dy = 0;
  }
  if (e.key === "ArrowRight") {
    pacman.dx = 1;
    pacman.dy = 0;
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPacman();
  drawGhosts();
  movePacman();
  moveGhosts();
}

setInterval(gameLoop, 200);