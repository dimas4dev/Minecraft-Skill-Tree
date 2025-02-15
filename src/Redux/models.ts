import { Node, Edge } from '@xyflow/react';

export interface Achievement {
    name: string;
    description: string;
    image: string;
    children: Achievement[];
}

export interface SliceState {
    nodes: Node[];
    edges: Edge[];
    loading: boolean;
    error: string | null;
}

export const initialState: SliceState = {
    nodes: [],
    edges: [],
    loading: false,
    error: null,
};