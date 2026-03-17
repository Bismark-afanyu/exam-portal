'use client';

import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Transformer } from 'react-konva';
import useImage from 'use-image';

interface SelectionCanvasProps {
  imageSrc: string;
  onSelectionComplete: (selection: { x: number; y: number; width: number; height: number }) => void;
}

export default function SelectionCanvas({ imageSrc, onSelectionComplete }: SelectionCanvasProps) {
  const [image] = useImage(imageSrc);
  const [rects, setRects] = useState<{ x: number; y: number; width: number; height: number }[]>([]);
  const [newRect, setNewRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  const stageRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (selectedId !== null && trRef.current) {
      // we need to attach transformer manually
      const node = stageRef.current.findOne('.rect-' + selectedId);
      trRef.current.nodes([node]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  const handleMouseDown = (e: any) => {
    // deselect when clicked on empty area or image
    const clickedOnEmpty = e.target === e.target.getStage() || e.target.getClassName() === 'Image';
    if (clickedOnEmpty) {
      setSelectedId(null);
      
      const { x, y } = e.target.getStage().getPointerPosition();
      setNewRect({ x, y, width: 0, height: 0 });
    }
  };

  const handleMouseMove = (e: any) => {
    if (!newRect) return;

    const { x, y } = e.target.getStage().getPointerPosition();
    setNewRect((prev: any) => ({
      ...prev,
      width: x - prev.x,
      height: y - prev.y,
    }));
  };

  const handleMouseUp = () => {
    if (newRect && Math.abs(newRect.width) > 5 && Math.abs(newRect.height) > 5) {
      // Normalize rect (handle dragging in negative directions)
      const normalizedRect = {
        x: newRect.width > 0 ? newRect.x : newRect.x + newRect.width,
        y: newRect.height > 0 ? newRect.y : newRect.y + newRect.height,
        width: Math.abs(newRect.width),
        height: Math.abs(newRect.height),
      };
      
      setRects([normalizedRect]); // For now, only one selection at a time
      setNewRect(null);
      setSelectedId(0);
      onSelectionComplete(normalizedRect);
    } else {
      setNewRect(null);
    }
  };

  const handleTransformEnd = (e: any) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // reset scale to 1 and update width/height
    node.scaleX(1);
    node.scaleY(1);

    const updatedRect = {
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
    };

    setRects([updatedRect]);
    onSelectionComplete(updatedRect);
  };

  if (!image) return null;

  // Calculate scaling to fit image in container
  const containerWidth = 800; // Fixed for now, can be responsive
  const scale = containerWidth / image.width;
  const stageWidth = containerWidth;
  const stageHeight = image.height * scale;

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden glass bg-black/40">
      <Stage
        width={stageWidth}
        height={stageHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          <KonvaImage 
            image={image} 
            width={stageWidth} 
            height={stageHeight} 
          />
          {rects.map((rect, i) => (
            <Rect
              key={i}
              name={'rect-' + i}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              fill="rgba(34, 197, 94, 0.2)"
              stroke="#22c55e"
              strokeWidth={2}
              draggable
              onDragEnd={(e) => {
                const updatedRect = {
                    x: e.target.x(),
                    y: e.target.y(),
                    width: rect.width,
                    height: rect.height,
                };
                setRects([updatedRect]);
                onSelectionComplete(updatedRect);
              }}
              onTransformEnd={handleTransformEnd}
              onClick={() => setSelectedId(i)}
            />
          ))}
          {newRect && (
            <Rect
              x={newRect.x}
              y={newRect.y}
              width={newRect.width}
              height={newRect.height}
              fill="rgba(34, 197, 94, 0.1)"
              stroke="#22c55e"
              strokeWidth={1}
              dash={[5, 5]}
            />
          )}
          {selectedId !== null && (
            <Transformer
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                // limit resize
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}
