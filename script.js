function processRoute() {
    const inputStr = document.getElementById('jsonInput').value;
    try {
        const data = JSON.parse(inputStr);
        const { grid, start, targets } = data; // [cite: 28-32]

        // 1. Logic: Inhibit movement through obstacles (1) [cite: 22]
        // 2. Logic: Only Up, Down, Left, Right movement 
        
        // Placeholder for BFS/A* Algorithm result
        const result = {
            "total_steps": 0, // Calculate this based on path length
            "path": [start],   // Your algorithm should fill this array [cite: 39]
            "targets_collected": targets.length
        };

        document.getElementById('jsonOutput').innerText = JSON.stringify(result, null, 2);
        renderGrid(grid, result.path, targets);
    } catch (e) {
        alert("Invalid JSON format!");
    }
}

function renderGrid(grid, path, targets) {
    const container = document.getElementById('grid-container');
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${grid[0].length}, 40px)`;

    grid.forEach((row, rIdx) => {
        row.forEach((cell, cIdx) => {
            const div = document.createElement('div');
            div.className = 'cell';
            if (cell === 1) div.classList.add('obstacle'); // [cite: 17]
            if (cell === 2) div.classList.add('target');   // [cite: 18]
            
            // Check if this coordinate is part of the path
            if (path.some(p => p[0] === rIdx && p[1] === cIdx)) {
                div.classList.add('path-highlight');
            }
            container.appendChild(div);
        });
    });
}