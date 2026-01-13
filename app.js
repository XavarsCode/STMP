// Application State
let canvas;
let ctx;
let currentLine = null;
let simulatedTrains = [];
let updateInterval = null;
let hoveredElement = null;
let mapScale = 1;
let mapOffsetX = 0;
let mapOffsetY = 0;

// Map configuration
const MAP_CONFIG = {
    centerLat: 48.8566,
    centerLon: 2.3522,
    zoom: 50000, // Pixels per degree
    width: 0,
    height: 0
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    initializeLineSelector();
    startAutoUpdate();
});

// Initialize canvas map
function initializeMap() {
    canvas = document.getElementById('map');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Add mouse event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    
    // Draw initial state
    drawMap();
}

function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    MAP_CONFIG.width = canvas.width;
    MAP_CONFIG.height = canvas.height;
    
    if (currentLine) {
        drawMap();
    }
}

// Convert lat/lon to canvas coordinates
function latLonToXY(lat, lon) {
    const x = (lon - MAP_CONFIG.centerLon) * MAP_CONFIG.zoom + MAP_CONFIG.width / 2 + mapOffsetX;
    const y = -(lat - MAP_CONFIG.centerLat) * MAP_CONFIG.zoom + MAP_CONFIG.height / 2 + mapOffsetY;
    return { x, y };
}

// Create line selector buttons
function initializeLineSelector() {
    const lineSelector = document.getElementById('line-selector');
    
    Object.keys(METRO_LINES).forEach(lineNumber => {
        const line = METRO_LINES[lineNumber];
        const button = document.createElement('button');
        button.className = 'line-button';
        button.textContent = lineNumber;
        button.style.backgroundColor = line.color;
        button.style.color = getContrastColor(line.color);
        button.onclick = () => selectLine(lineNumber);
        lineSelector.appendChild(button);
    });
}

// Select a metro line
function selectLine(lineNumber) {
    // Update button states
    document.querySelectorAll('.line-button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === lineNumber) {
            btn.classList.add('active');
        }
    });
    
    currentLine = lineNumber;
    const line = METRO_LINES[lineNumber];
    
    // Initialize trains for this line
    initializeTrains(lineNumber);
    
    // Center map on line
    centerMapOnLine(line);
    
    // Update train information display
    updateTrainList();
    
    // Display model information
    displayModelInfo(line.model);
    
    // Draw the map
    drawMap();
}

// Center map on a line
function centerMapOnLine(line) {
    // Calculate bounds
    let minLat = Infinity, maxLat = -Infinity;
    let minLon = Infinity, maxLon = -Infinity;
    
    line.stations.forEach(station => {
        minLat = Math.min(minLat, station.lat);
        maxLat = Math.max(maxLat, station.lat);
        minLon = Math.min(minLon, station.lon);
        maxLon = Math.max(maxLon, station.lon);
    });
    
    // Center on middle of bounds
    MAP_CONFIG.centerLat = (minLat + maxLat) / 2;
    MAP_CONFIG.centerLon = (minLon + maxLon) / 2;
    
    // Adjust zoom to fit
    const latRange = maxLat - minLat;
    const lonRange = maxLon - minLon;
    const maxRange = Math.max(latRange, lonRange);
    MAP_CONFIG.zoom = (MAP_CONFIG.width * 0.8) / maxRange;
}

// Draw the map
function drawMap() {
    if (!currentLine) return;
    
    // Clear canvas
    ctx.fillStyle = '#e8f4f8';
    ctx.fillRect(0, 0, MAP_CONFIG.width, MAP_CONFIG.height);
    
    const line = METRO_LINES[currentLine];
    
    // Draw metro line
    drawLine(line);
    
    // Draw stations
    drawStations(line);
    
    // Draw trains
    drawTrains();
}

// Draw metro line on canvas
function drawLine(line) {
    ctx.strokeStyle = line.color;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    line.stations.forEach((station, index) => {
        const { x, y } = latLonToXY(station.lat, station.lon);
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
}

// Draw stations on canvas
function drawStations(line) {
    line.stations.forEach(station => {
        const { x, y } = latLonToXY(station.lat, station.lon);
        
        // Draw station circle
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#3498db';
        ctx.fill();
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw station name on hover
        if (hoveredElement && hoveredElement.type === 'station' && 
            hoveredElement.data.name === station.name) {
            drawTooltip(station.name, x, y);
        }
    });
}

// Draw trains on canvas
function drawTrains() {
    simulatedTrains.forEach(train => {
        const line = METRO_LINES[train.line];
        const position = calculateTrainPosition(train, line);
        const { x, y } = latLonToXY(position.lat, position.lon);
        
        // Draw train circle
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = '#e74c3c';
        ctx.fill();
        ctx.strokeStyle = '#c0392b';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw train info on hover
        if (hoveredElement && hoveredElement.type === 'train' && 
            hoveredElement.data.id === train.id) {
            drawTrainTooltip(train, x, y);
        }
    });
}

// Draw tooltip
function drawTooltip(text, x, y) {
    ctx.font = '14px Arial';
    const metrics = ctx.measureText(text);
    const padding = 8;
    const width = metrics.width + padding * 2;
    const height = 24;
    
    // Draw background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillRect(x - width / 2, y - height - 15, width, height);
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 1;
    ctx.strokeRect(x - width / 2, y - height - 15, width, height);
    
    // Draw text
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y - height / 2 - 15);
}

// Draw train tooltip
function drawTrainTooltip(train, x, y) {
    const lines = [
        `Train ${train.id}`,
        `Modèle: ${train.model}`,
        `→ ${train.nextStation}`
    ];
    
    ctx.font = '12px Arial';
    const padding = 8;
    let maxWidth = 0;
    
    lines.forEach(line => {
        const metrics = ctx.measureText(line);
        maxWidth = Math.max(maxWidth, metrics.width);
    });
    
    const width = maxWidth + padding * 2;
    const lineHeight = 18;
    const height = lines.length * lineHeight + padding;
    
    // Draw background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillRect(x - width / 2, y - height - 20, width, height);
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 1;
    ctx.strokeRect(x - width / 2, y - height - 20, width, height);
    
    // Draw text
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    lines.forEach((line, index) => {
        ctx.fillText(line, x, y - height - 20 + padding / 2 + index * lineHeight);
    });
}

// Handle mouse move
function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    let foundElement = null;
    
    if (currentLine) {
        const line = METRO_LINES[currentLine];
        
        // Check trains
        simulatedTrains.forEach(train => {
            const position = calculateTrainPosition(train, line);
            const { x, y } = latLonToXY(position.lat, position.lon);
            const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
            
            if (distance < 15) {
                foundElement = { type: 'train', data: train };
            }
        });
        
        // Check stations
        line.stations.forEach(station => {
            const { x, y } = latLonToXY(station.lat, station.lon);
            const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
            
            if (distance < 12) {
                foundElement = { type: 'station', data: station };
            }
        });
    }
    
    if (foundElement) {
        canvas.style.cursor = 'pointer';
        hoveredElement = foundElement;
        drawMap();
    } else if (hoveredElement) {
        canvas.style.cursor = 'default';
        hoveredElement = null;
        drawMap();
    }
}

// Handle click
function handleClick(event) {
    if (hoveredElement) {
        const mapInfo = document.getElementById('map-info');
        
        if (hoveredElement.type === 'station') {
            const station = hoveredElement.data;
            mapInfo.innerHTML = `
                <h3>📍 ${station.name}</h3>
                <p><strong>Ligne:</strong> ${METRO_LINES[currentLine].name}</p>
            `;
        } else if (hoveredElement.type === 'train') {
            const train = hoveredElement.data;
            mapInfo.innerHTML = `
                <h3>🚇 Train ${train.id}</h3>
                <p><strong>Modèle:</strong> ${train.model}</p>
                <p><strong>Direction:</strong> ${train.direction === 'forward' ? 'Terminus' : 'Retour'}</p>
                <p><strong>Prochaine station:</strong> ${train.nextStation}</p>
                <p><strong>Vitesse:</strong> ${train.speed} km/h</p>
            `;
        }
    }
}

// Initialize simulated trains for a line
function initializeTrains(lineNumber) {
    const line = METRO_LINES[lineNumber];
    simulatedTrains = [];
    
    // Calculate number of trains based on line length and interval
    const lineLength = calculateLineLength(line);
    const numTrains = Math.ceil(lineLength / (line.avgSpeed * line.interval / 3600));
    
    // Create trains with different starting positions
    for (let i = 0; i < numTrains; i++) {
        const train = {
            id: `${lineNumber}-${String(i + 1).padStart(3, '0')}`,
            line: lineNumber,
            direction: i % 2 === 0 ? 'forward' : 'backward',
            currentStationIndex: Math.floor((i * line.stations.length) / numTrains),
            progress: 0, // 0 to 1, progress between current and next station
            speed: line.avgSpeed,
            model: line.model,
            nextStation: null
        };
        
        updateTrainNextStation(train, line);
        simulatedTrains.push(train);
    }
    
    updateTrainPositions();
}

// Calculate approximate line length in km
function calculateLineLength(line) {
    let length = 0;
    for (let i = 0; i < line.stations.length - 1; i++) {
        const dist = calculateDistance(
            line.stations[i].lat, line.stations[i].lon,
            line.stations[i + 1].lat, line.stations[i + 1].lon
        );
        length += dist;
    }
    return length;
}

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Update train next station
function updateTrainNextStation(train, line) {
    if (train.direction === 'forward') {
        train.nextStation = line.stations[Math.min(train.currentStationIndex + 1, line.stations.length - 1)].name;
    } else {
        train.nextStation = line.stations[Math.max(train.currentStationIndex - 1, 0)].name;
    }
}

// Update train positions (algorithm to determine position)
function updateTrainPositions() {
    if (!currentLine) return;
    
    const line = METRO_LINES[currentLine];
    
    // Update each train
    simulatedTrains.forEach(train => {
        // Increment progress based on speed (simulation)
        const progressIncrement = (train.speed / 3600) / (line.interval / 3); // Adjusted for 3 second updates
        train.progress += progressIncrement;
        
        // Check if train reached next station
        if (train.progress >= 1) {
            train.progress = 0;
            
            // Move to next station
            if (train.direction === 'forward') {
                train.currentStationIndex++;
                if (train.currentStationIndex >= line.stations.length - 1) {
                    train.direction = 'backward';
                }
            } else {
                train.currentStationIndex--;
                if (train.currentStationIndex <= 0) {
                    train.direction = 'forward';
                }
            }
            
            updateTrainNextStation(train, line);
        }
    });
    
    // Redraw map
    drawMap();
}

// Calculate train position between stations
function calculateTrainPosition(train, line) {
    const currentStation = line.stations[train.currentStationIndex];
    let nextStationIndex;
    
    if (train.direction === 'forward') {
        nextStationIndex = Math.min(train.currentStationIndex + 1, line.stations.length - 1);
    } else {
        nextStationIndex = Math.max(train.currentStationIndex - 1, 0);
    }
    
    const nextStation = line.stations[nextStationIndex];
    
    // Linear interpolation between stations
    const lat = currentStation.lat + (nextStation.lat - currentStation.lat) * train.progress;
    const lon = currentStation.lon + (nextStation.lon - currentStation.lon) * train.progress;
    
    return { lat, lon };
}

// Update train list in sidebar
function updateTrainList() {
    const trainList = document.getElementById('train-list');
    
    if (simulatedTrains.length === 0) {
        trainList.innerHTML = '<p class="placeholder">Aucun train actif</p>';
        return;
    }
    
    trainList.innerHTML = '';
    
    simulatedTrains.forEach(train => {
        const trainItem = document.createElement('div');
        trainItem.className = 'train-item';
        trainItem.innerHTML = `
            <div class="train-number">🚇 Train ${train.id}</div>
            <div class="train-status">Modèle: ${train.model}</div>
            <div class="train-next-station">➡️ Prochaine station: ${train.nextStation}</div>
        `;
        trainList.appendChild(trainItem);
    });
}

// Display model information
function displayModelInfo(modelCode) {
    const modelInfo = document.getElementById('model-info');
    const model = TRAIN_MODELS[modelCode];
    
    if (!model) {
        modelInfo.innerHTML = '<p class="placeholder">Aucune information disponible</p>';
        return;
    }
    
    modelInfo.innerHTML = `
        <div class="model-info-item">
            <h3>${model.name}</h3>
            <p><strong>Constructeur:</strong> ${model.manufacturer}</p>
            <p><strong>Années:</strong> ${model.years}</p>
            <p><strong>Lignes:</strong> ${model.lines.join(', ')}</p>
            <p><strong>Capacité:</strong> ${model.capacity}</p>
            <p>${model.description}</p>
            <p><strong>Caractéristiques:</strong></p>
            <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                ${model.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
        </div>
    `;
}

// Start automatic updates
function startAutoUpdate() {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
    
    updateInterval = setInterval(() => {
        if (currentLine) {
            updateTrainPositions();
            updateTrainList();
        }
    }, 3000); // Update every 3 seconds for smooth animation
}

// Utility function to get contrasting text color
function getContrastColor(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
}

// In a production environment, this would fetch real-time data from RATP API
async function fetchRealTimeData(lineNumber) {
    // Example API call (currently simulated)
    // In production, use: https://prim.iledefrance-mobilites.fr/fr/apis
    // or https://data.ratp.fr/api/
    
    try {
        // const response = await fetch(`${API_CONFIG.baseUrl}/schedules/${lineNumber}`);
        // const data = await response.json();
        // return data;
        
        // For now, we use simulation
        return null;
    } catch (error) {
        console.error('Error fetching real-time data:', error);
        return null;
    }
}
