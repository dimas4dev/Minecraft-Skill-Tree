import { useEffect } from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import { useAppDispatch, useAppSelector } from '../../Redux/skillTreeStore';

import { fetchSkillTree } from '../../Redux/skillTreeSlice';
import CustomNode from '../CustomNode/CustomNode';
import styles from './SkillTree.module.css';

const nodeTypes = { customNode: CustomNode };

const SkillTree = () => {
    const dispatch = useAppDispatch();
    const { nodes, edges, loading, error } = useAppSelector((state) => state.skillTree);

    useEffect(() => {
        dispatch(fetchSkillTree());
    }, [dispatch]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!nodes.length) return <p>No hay datos disponibles.</p>;

    return (
        <div className={styles.treeContainer}>
            <ReactFlow nodes={nodes} edges={edges} fitView nodeTypes={nodeTypes}>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default SkillTree;
