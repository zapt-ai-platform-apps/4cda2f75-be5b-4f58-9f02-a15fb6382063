import React from 'react';

export default function Toolbar({
  onToolChange,
  onColorChange,
  onBrushSizeChange,
  onUndo,
  onRedo,
  onClear,
  onSave
}) {
  return (
    <>
      <button onClick={() => onToolChange('brush')} className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded">
        Brush
      </button>
      <button onClick={() => onToolChange('eraser')} className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded">
        Eraser
      </button>
      <div className="flex items-center space-x-2">
        <span>Color:</span>
        <button onClick={() => onColorChange('#000000')} style={{ backgroundColor: '#000000' }} className="cursor-pointer h-6 w-6 rounded border"></button>
        <button onClick={() => onColorChange('#ff0000')} style={{ backgroundColor: '#ff0000' }} className="cursor-pointer h-6 w-6 rounded border"></button>
        <button onClick={() => onColorChange('#00ff00')} style={{ backgroundColor: '#00ff00' }} className="cursor-pointer h-6 w-6 rounded border"></button>
        <button onClick={() => onColorChange('#0000ff')} style={{ backgroundColor: '#0000ff' }} className="cursor-pointer h-6 w-6 rounded border"></button>
      </div>
      <div className="flex items-center space-x-2">
        <span>Size:</span>
        <button onClick={() => onBrushSizeChange(3)} className="cursor-pointer px-2 py-1 bg-blue-500 text-white rounded">
          Small
        </button>
        <button onClick={() => onBrushSizeChange(5)} className="cursor-pointer px-2 py-1 bg-blue-500 text-white rounded">
          Medium
        </button>
        <button onClick={() => onBrushSizeChange(8)} className="cursor-pointer px-2 py-1 bg-blue-500 text-white rounded">
          Large
        </button>
      </div>
      <button onClick={onUndo} className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded">
        Undo
      </button>
      <button onClick={onRedo} className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded">
        Redo
      </button>
      <button onClick={onClear} className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded">
        Clear
      </button>
      <button onClick={onSave} className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded">
        Save
      </button>
    </>
  );
}