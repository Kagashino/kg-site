import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import dotEnv from 'dotenv';

const envs = dotEnv.config();

const manifestPlugin = () => {

}

export default defineConfig({
    root: process.cwd(),
    build: {
        manifest: true
    },
    define: {
        'process.env': JSON.stringify(envs.parsed),
        'process.cwd': `() => "${process.cwd()}"`
    },
    server: {
        port: 3001
    },
    plugins: [
        reactRefresh(),

    ]
})
