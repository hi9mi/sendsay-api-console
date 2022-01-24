import type {ReactChild, ReactPortal} from 'react';

type ReactNode = ReactChild | ReadonlyArray<ReactNode> | ReactPortal | null | undefined;

export type WithChildren<T = {}> = T & {children?: ReactNode};
