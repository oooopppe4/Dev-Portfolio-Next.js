'use client';

import { useEffect } from 'react';
import useFluidCursor from '@/components/ui/useFluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    // Ensure canvas exists before initializing
    const canvas = document.getElementById('fluid');
    if (canvas) {
      useFluidCursor();
    }
  }, []);

  return (
    <div className='fixed top-0 left-0 z-[9999] pointer-events-none'>
      <canvas id='fluid' className='w-screen h-screen' />
    </div>
  );
};

export default FluidCursor;

