const turn = 2 * Math.PI;
const loopSeconds = 9;
export const columns = 41;
export const rows = 34;

const tiers = [
  { top: 4, bottom: 9.3, radius: 6 },
  { top: 7.5, bottom: 15, radius: 9.5 },
  { top: 11, bottom: 21, radius: 13.2 },
  { top: 15.5, bottom: 26.6, radius: 17.2 },
];
let points;

function noise(seed) {
  const value = Math.sin(seed * 134.3 + 19.17) * 34989.55;
  return value - Math.floor(value);
}

function buildTree() {
  const tree = [];
  for (const [level, tier] of tiers.entries()) {
    for (let row = 0; row < 14; row++) {
      const progress = row / 13;
      const samples = Math.ceil(15 + tier.radius * progress * 5);
      for (let index = 0; index < samples; index++) {
        const seed = level * 1643 + row * 110 + index;
        const angle = turn * (index + noise(seed)) / samples + row * 0.25;
        const drift = Math.cos(angle - level * 1.65 + progress * 0.32);
        const snow = (progress > 0.63 && (progress > 0.87 || drift > -0.3))
          || (progress < 0.3 && drift > 0.03);
        const texture = snow ? "*_:." : ".,:;=+*";
        const radius = (0.6 + (tier.radius * 0.88 - 0.6) * progress ** 0.94)
          * (1 - 0.036 * noise(seed + 663));
        tree.push({
          x: radius * Math.cos(angle),
          y: tier.top + (tier.bottom - tier.top) * progress + 0.64 * progress ** 3,
          z: radius * Math.sin(angle),
          angle,
          glyph: texture[Math.floor(noise(seed + 24) * texture.length)],
          tone: snow ? "snow" : "pine",
        });
      }
    }
  }

  for (let y = 27; y <= 31; y++) {
    for (let side = 0; side < 10; side++) {
      const angle = side / 10 * turn;
      tree.push({
        x: 1.22 * Math.cos(angle), y, z: Math.sin(angle),
        angle, glyph: side % 3 === 0 ? ":" : "|", tone: "wood",
      });
    }
  }

  const star = [
    [0, 1, 0, ":"], [0, 2, 0, "*"], [0, 3, 0, ":"],
    [-2, 2, -0.4, "-"], [2, 2, 0.4, "-"], [0.5, 2, -1.05, "+"], [-0.5, 2, 1.05, "+"],
  ];
  for (const [x, y, z, glyph] of star) {
    tree.push({ x, y, z, glyph, tone: "snow" });
  }
  return tree;
}

export function snowdriftFrame(seconds) {
  points ??= buildTree();
  const phase = (seconds % loopSeconds) / loopSeconds;
  const yaw = phase * turn;
  const cos = Math.cos(yaw);
  const sin = Math.sin(yaw);
  const wind = 3.8 * Math.sin(yaw * 2);
  const grid = Array.from({ length: rows }, () => Array(columns).fill(null));

  function put(x, y, depth, glyph, tone) {
    const row = grid[y];
    if (!row || x < 0 || x >= columns) return;
    if (!row[x] || row[x].depth < depth) row[x] = { depth, glyph, tone };
  }

  function centerline(y) {
    return 20 + wind * (Math.max(0, 30 - y) / 29) ** 2;
  }

  for (const point of points) {
    const x = cos * point.x - sin * point.z;
    const z = sin * point.x + cos * point.z;
    const scale = 1 + z * 0.008;
    const row = 17 + (point.y - 17) * scale + z * 0.115;
    let { tone } = point;
    if (tone === "pine") {
      const light = Math.cos(point.angle + yaw - 1.9);
      tone = light > 0.42 ? "green" : light < -0.45 ? "shade" : "pine";
    }
    if (tone === "snow" && z < -2) tone = "ice";
    put(Math.round(centerline(row) + x * scale), Math.round(row), z, point.glyph, tone);
  }

  // Mirror gaps from the projection around the bent trunk. The shading still rotates.
  for (const [y, row] of grid.entries()) {
    const axis = Math.round(centerline(y));
    const radius = Math.min(axis, columns - 1 - axis);
    for (let distance = 1; distance <= radius; distance++) {
      const left = axis - distance;
      const right = axis + distance;
      row[left] ??= row[right];
      row[right] ??= row[left];
    }
    row.fill(null, 0, axis - radius);
    row.fill(null, axis + radius + 1);
  }

  for (let index = 0; index < 26; index++) {
    const speed = index % 5 === 0 ? 2 : 1;
    const y = Math.floor(1 + 30 * ((noise(index * 35 + 97) + phase * speed) % 1));
    const x = 2 + 36 * noise(index * 31 + 381) + 4.8 * Math.sin(yaw + index);
    if (Math.abs(x - 20) > 4 + y * 0.38) {
      put(Math.round(x), y, -100, index % 6 === 0 ? "+" : ".", "flake");
    }
  }
  for (let x = 15; x <= 25; x++) put(x, 32, -90, ".", "ground");

  return grid;
}
