import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  increment,
  incrementAsync,
  selectCount,
} from './counterSlice';

export default function Order() {
  
  const dispatch = useDispatch();


  return (
    <div>
      <div>

      </div>
    </div>
  );
}
