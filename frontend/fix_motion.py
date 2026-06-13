from pathlib import Path

files = [
    "src/pages/Students.jsx",
    "src/pages/Teachers.jsx",
    "src/pages/Login.jsx",
    "src/pages/Dashboard.jsx",
    "src/components/Sidebar.jsx",
]

for f in files:
    p = Path(f)
    text = p.read_text(encoding="utf-8")
    orig = text

    if f == "src/pages/Students.jsx" and 'import * as Motion from "framer-motion";' not in text:
        text = text.replace(
            'import axios from "axios";\nimport { useEffect, useState, useCallback } from "react";',
            'import axios from "axios";\nimport { useEffect, useState, useCallback } from "react";\nimport * as Motion from "framer-motion";'
        )

    if f == "src/pages/Teachers.jsx" and 'import * as Motion from "framer-motion";' not in text:
        text = text.replace(
            'import axios from "axios";\nimport { useEffect, useState } from "react";',
            'import axios from "axios";\nimport { useEffect, useState } from "react";\nimport * as Motion from "framer-motion";'
        )

    if f == "src/components/Sidebar.jsx":
        text = text.replace(
            'import { AnimatePresence, motion } from "framer-motion";import * as Motion from "framer-motion";',
            'import { AnimatePresence } from "framer-motion";\nimport * as Motion from "framer-motion";'
        )

    text = text.replace("<motion.", "<Motion.")
    text = text.replace("</motion.", "</Motion.")
    text = text.replace("<motion ", "<Motion ")
    text = text.replace("</motion", "</Motion")

    if text != orig:
        p.write_text(text, encoding="utf-8")
        print(f"Updated {f}")
    else:
        print(f"No changes for {f}")
