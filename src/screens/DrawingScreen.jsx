import React from 'react';
import Toolbar from '../components/Toolbar.jsx';
import useCanvasDrawing from '../hooks/useCanvasDrawing.js';

function DrawingScreen() {
  const {
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
  } = useCanvasDrawing();

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-white">
      <div className="h-16 flex items-center justify-around bg-gray-200 border-b box-border">
        <Toolbar
          onToolChange={handleToolChange}
          onColorChange={handleColorChange}
          onBrushSizeChange={handleBrushSizeChange}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onClear={handleClear}
          onSave={handleSave}
        />
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="bg-white flex-1"
      />
      <div className="fixed bottom-2 left-2">
        <a href="https://www.zapt.ai" target="_blank" rel="noreferrer" className="text-sm text-gray-600 underline">
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}

export default DrawingScreen;