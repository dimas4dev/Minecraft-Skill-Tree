import { createSlice } from '@reduxjs/toolkit';
import { Node, Edge } from '@xyflow/react';
import { Achievement, initialState } from './models';
import { fetchSkillTree } from '../Api/fetchSkillTree';

const parseAchievementsToNodes = (
    achievement: Achievement,
    x = 500,
    y = 300,
    edges: Edge[] = [],
    parentId: string | null = null,
    level = 0
): Node[] => {
    if (!achievement || !achievement.name) {
        console.error("🚨 Se intentó procesar un achievement inválido:", achievement);
        return [];
    }

    const nodeId = achievement.name;
    const nodeWidth = 180;
    const nodeHeight = 120;

    const nodes: Node[] = [
        {
            id: nodeId,
            position: { x, y },
            type: 'customNode',
            data: {
                label: achievement.name,
                image: achievement.image,
                description: achievement.description,
                completed: false,
                parentId: parentId,
            },
        },
    ];

    if (parentId) {
        edges.push({
            id: `${parentId}-${nodeId}`,
            source: parentId,
            target: nodeId,
            animated: true,
            style: { strokeWidth: 2, stroke: "#000" },
        });
    }

    let childY = y - ((achievement.children.length - 1) * (nodeHeight + 20)) / 2;
    const childX = x + 105;

    achievement.children?.forEach((child) => {
        nodes.push(...parseAchievementsToNodes(child, childX, childY, edges, nodeId, level + 1));
        childY += nodeHeight + 30;
    });

    return nodes;
};

export const skillTreeSlice = createSlice({
    name: 'Minecraft-Skill-Tree',
    initialState,
    reducers: {
        completeNode: (state, action) => {
            const nodeId = action.payload;
            const nodeIndex = state.nodes.findIndex(node => node.id === nodeId);

            if (nodeIndex === -1) return; 

            const node = state.nodes[nodeIndex];

            if (node.data.parentId) {
                const parentNode = state.nodes.find(n => n.id === node.data.parentId);
                if (!parentNode?.data.completed) {
                    console.warn("🚨 No puedes completar este nodo hasta que su padre esté completado.");
                    return;
                }
            }

            state.nodes[nodeIndex].data.completed = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSkillTree.fulfilled, (state, action) => {
                if (!action.payload || Object.keys(action.payload).length === 0) {
                    console.error("🚨 La API no devolvió datos válidos.");
                    return;
                }

                const edges: Edge[] = [];
                state.nodes = parseAchievementsToNodes(action.payload, 500, 300, edges);
                state.edges = edges;
                state.loading = false;
            });
    },
});

export const { completeNode } = skillTreeSlice.actions;
export { fetchSkillTree };
export default skillTreeSlice.reducer;
