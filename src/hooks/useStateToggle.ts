import { useState } from 'react';

function useStateToggle(initialState: boolean): [boolean, () => void] {
  const [state, setState] = useState(initialState);
  const toggle = () => setState((b) => !b);
  return [state, toggle];
}

export default useStateToggle;
