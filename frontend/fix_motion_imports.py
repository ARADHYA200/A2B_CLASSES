from pathlib import Path

files = [
    'src/App.jsx',
    'src/pages/Batches.jsx',
    'src/pages/Login.jsx',
    'src/pages/Dashboard.jsx',
    'src/components/StudentCard.jsx'
]

for file in files:
    path = Path(file)
    content = path.read_text()
    content = content.replace('import { motion } from "framer-motion";', 'import * as Motion from "framer-motion";')
    content = content.replace('<motion.', '<Motion.')
    content = content.replace('</motion.', '</Motion.')
    path.write_text(content)

sidebar_path = Path('src/components/Sidebar.jsx')
content = sidebar_path.read_text()
content = content.replace('import { AnimatePresence } from "framer-motion";', 'import { AnimatePresence } from "framer-motion";\nimport * as Motion from "framer-motion";')
content = content.replace('<motion.', '<Motion.')
content = content.replace('</motion.', '</Motion.')
sidebar_path.write_text(content)
