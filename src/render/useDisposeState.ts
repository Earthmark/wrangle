import React, { useEffect, Dispatch, SetStateAction } from 'react';

interface Dispose {
  dispose(): void;
}

export function useDisposeState<D extends Dispose>(gen: () => D): [D, Dispatch<SetStateAction<D>>] {
  const [d, sd] = React.useState(gen);
  useEffect(() => () => { d?.dispose() }, [d]);
  return [d, sd];
}

export default useDisposeState;
