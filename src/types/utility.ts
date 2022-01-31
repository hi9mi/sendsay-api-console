import type {ReactChild, ReactPortal} from 'react';

type ReactNode = ReactChild | ReactNode[] | ReadonlyArray<ReactNode> | ReactPortal | boolean | null | undefined;

export type WithChildren<T = {}> = T & {children?: ReactNode};
