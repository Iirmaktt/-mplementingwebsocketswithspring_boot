// ShapeCanvas Component
// This component handles the canvas rendering of shapes

class ShapeCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.ctx = null;
    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        this.ctx = canvas.getContext('2d');
    }

    componentDidUpdate(prevProps) {
        if (prevProps.shapes !== this.props.shapes) {
            this.drawShapes();
        }
    }

    drawShapes = () => {
        if (!this.ctx || !this.props.shapes) return;

        const { width = 800, height = 600 } = this.props;
        const ctx = this.ctx;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw background grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y < height; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Draw all shapes
        this.props.shapes.forEach(shape => {
            this.drawShape(shape);
        });
    }

    drawShape = (shape) => {
        const ctx = this.ctx;
        
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.angle);
        
        // Set color and opacity based on movement
        const alpha = shape.isMoving ? 1.0 : 0.6;
        ctx.fillStyle = shape.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.strokeStyle = shape.isMoving ? '#FFFFFF' : '#CCCCCC';
        ctx.lineWidth = shape.isMoving ? 2 : 1;
        
        const halfSize = shape.size / 2;
        
        switch (shape.type) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(0, 0, halfSize, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                break;
                
            case 'rectangle':
                ctx.fillRect(-halfSize, -halfSize, shape.size, shape.size);
                ctx.strokeRect(-halfSize, -halfSize, shape.size, shape.size);
                break;
                
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(0, -halfSize);
                ctx.lineTo(-halfSize, halfSize);
                ctx.lineTo(halfSize, halfSize);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                break;
        }
        
        ctx.restore();
    }

    render() {
        const { width = 800, height = 600 } = this.props;
        
        return (
            <div className="canvas-container">
                <canvas 
                    ref={this.canvasRef}
                    id="shapeCanvas"
                    width={width} 
                    height={height}
                />
            </div>
        );
    }
}

// WebSocket Hook (for functional components)
const useWebSocket = () => {
    const [stompClient, setStompClient] = React.useState(null);
    const [connected, setConnected] = React.useState(false);
    const [messageCount, setMessageCount] = React.useState(0);

    const connect = () => {
        const socket = new SockJS('/ws/shapes');
        const client = Stomp.over(socket);
        
        client.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            setConnected(true);
            setStompClient(client);
        }, function (error) {
            console.log('STOMP error: ' + error);
            setConnected(false);
        });
    };

    const disconnect = () => {
        if (stompClient) {
            stompClient.disconnect();
            setConnected(false);
            setStompClient(null);
        }
    };

    const subscribe = (topic, callback) => {
        if (stompClient && connected) {
            return stompClient.subscribe(topic, function (message) {
                const data = JSON.parse(message.body);
                setMessageCount(prev => prev + 1);
                callback(data);
            });
        }
    };

    const send = (destination, message) => {
        if (stompClient && connected) {
            stompClient.send(destination, {}, JSON.stringify(message));
        }
    };

    return {
        connect,
        disconnect,
        subscribe,
        send,
        connected,
        messageCount
    };
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ShapeCanvas, useWebSocket };
} 