import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Handle, Position } from '@xyflow/react';

import { completeNode } from '../../Redux/skillTreeSlice';

import styles from './CustomNode.module.css';

const CustomNode = ({ data }: any) => {
    const dispatch = useDispatch();
    const [showTooltip, setShowTooltip] = useState(false);

    const handleComplete = () => {
        dispatch(completeNode(data.label));
    };

    return (
        <div
            className={`${styles.skillNode} ${data.completed ? styles.completed : ''}`}
            onClick={handleComplete}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <Handle type="target" position={Position.Left} />
            <img src={data.image} alt={data.label} className={styles.nodeImage} />

            {showTooltip && (
                <div className={styles.tooltip}>
                    <h4>{data.label}</h4>
                    <p>{data.description}</p>
                </div>
            )}

            <Handle type="source" position={Position.Right} />
        </div>
    );
};

export default CustomNode;
