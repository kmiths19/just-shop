import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createOrderAsync,
  selectOrder,
} from './orderSlice';

export default function Order() {
  const count = useSelector(selectOrder);
  const dispatch = useDispatch();

  return (
    <div>
    
    </div>
  );
}
