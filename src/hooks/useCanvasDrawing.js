import { useEffect, useRef, useState } from 'react';
import * as Sentry from '@sentry/browser';

export default function useCanvasDrawing() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [currentTool, setCurrentTool] = useState('brush');
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight - 60;
      saveState();
    }
    const handleResize = () => {
      if (canvas && container) {
        const imageData = canvas.toDataURL();
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight - 60;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageData;
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const saveState = () => {
    try {
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL();
      setUndoStack((prev) => [...prev, dataUrl]);
    } catch (error) {
      console.error('Error saving state:', error);
      Sentry.captureException(error);
    }
  };

  const startDrawing = (e) => {
    try {
      const pos = getMousePos(e);
      setLastPos(pos);
      setIsDrawing(true);
      console.log('Drawing started at', pos);
    } catch (error) {
      console.error('Error starting drawing:', error);
      Sentry.captureException(error);
    }
  };

  const draw = (e) => {
    try {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const pos = getMousePos(e);
      ctx.strokeStyle = currentTool === 'brush' ? currentColor : '#FFFFFF';
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      setLastPos(pos);
    } catch (error) {
      console.error('Error during drawing:', error);
      Sentry.captureException(error);
    }
  };

  const stopDrawing = () => {
    try {
      if (!isDrawing) return;
      setIsDrawing(false);
      console.log('Drawing stopped');
      saveState();
      setRedoStack([]);
    } catch (error) {
      console.error('Error stopping drawing:', error);
      Sentry.captureException(error);
    }
  };

  const handleUndo = () => {
    try {
      if (undoStack.length > 1) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        setRedoStack((prev) => [undoStack[undoStack.length - 1], ...prev]);
        const newUndoStack = undoStack.slice(0, -1);
        setUndoStack(newUndoStack);
        const img = new Image();
        img.src = newUndoStack[newUndoStack.length - 1];
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
        console.log('Undo performed');
      }
    } catch (error) {
      console.error('Error during undo:', error);
      Sentry.captureException(error);
    }
  };

  const handleRedo = () => {
    try {
      if (redoStack.length > 0) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const redoState = redoStack[0];
        setUndoStack((prev) => [...prev, redoState]);
        setRedoStack((prev) => prev.slice(1));
        const img = new Image();
        img.src = redoState;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
        console.log('Redo performed');
      }
    } catch (error) {
      console.error('Error during redo:', error);
      Sentry.captureException(error);
    }
  };

  const handleClear = () => {
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      saveState();
      console.log('Canvas cleared');
    } catch (error) {
      console.error('Error clearing canvas:', error);
      Sentry.captureException(error);
    }
  };

  const handleSave = () => {
    try {
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'drawing.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('Drawing saved');
    } catch (error) {
      console.error('Error saving drawing:', error);
      Sentry.captureException(error);
    }
  };

  const handleToolChange = (tool) => {
    try {
      setCurrentTool(tool);
      console.log('Tool changed to', tool);
    } catch (error) {
      console.error('Error changing tool:', error);
      Sentry.captureException(error);
    }
  };

  const handleColorChange = (color) => {
    try {
      setCurrentColor(color);
      console.log('Color changed to', color);
    } catch (error) {
      console.error('Error changing color:', error);
      Sentry.captureException(error);
    }
  };

  const handleBrushSizeChange = (size) => {
    try {
      setBrushSize(size);
      console.log('Brush size changed to', size);
    } catch (error) {
      console.error('Error changing brush size:', error);
      Sentry.captureException(error);
    }
  };

  return {
    canvasRef,
    containerRef,
    startDrawing,
    draw,
    stopDrawing,
    handleUndo,
    handleRedo,
    handleClear,
    handleSave,
    handleToolChange,
    handleColorChange,
    handleBrushSizeChange
  };
}