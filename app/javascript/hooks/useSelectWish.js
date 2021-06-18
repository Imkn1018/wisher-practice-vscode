import React, { useCallback, useState } from 'react';

export const useSelectWish = () => {
  const [selectedWish, setSelectedWish] = useState([]);
  const selectWish = useCallback((props) => {
    const { id, wishes, onOpen } = props;
    const targetWish = wishes.find((wish) => wish.id === id);
    setSelectedWish(targetWish);
    onOpen();
  }, []);
  return { selectedWish, selectWish };
};
