import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSkillTree = createAsyncThunk(
    'Minecraft-Skill-Tree/fetchSkillTree',
    async () => {
        try {
            const response = await fetch('https://minecraft.capta.co/BaseSkillTree.json');

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error("🚨 Error al obtener los datos:", error.message);
            throw error;
        }
    }
);
