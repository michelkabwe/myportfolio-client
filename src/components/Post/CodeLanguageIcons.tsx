import React from 'react'
import styles from '../../styles/Post.module.css';
import { FaNode } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { SiFirebase } from "react-icons/si";
import { BsBootstrapFill } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaWix } from "react-icons/fa";
import { FaFigma } from "react-icons/fa";
import { FaWordpress } from "react-icons/fa";
import { SiGooglecloud } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { TbBrandReactNative } from "react-icons/tb";
import { FaCss3Alt } from "react-icons/fa";


interface CodeLanguageIconsProps {
    codeLangIcon?: string | string[] | undefined;

}

const CodeLanguageIcons: React.FC<CodeLanguageIconsProps> = ({ codeLangIcon }) => {

    const renderIcon = (lang: string) => {
        switch (lang) {
            case 'node':
                return <FaNode size={30} color="#fcf55f" />;
            case 'javascript':
                return <IoLogoJavascript size={30} color="#fcf55f" />;
            case 'typescript':
                return <SiTypescript size={26} color="#fcf55f" />;
            case 'firebase':
                return <SiFirebase size={30} color="#fcf55f" />;
            case 'bootstrap':
                return <BsBootstrapFill size={30} color="#fcf55f" />;
            case 'react':
                return <FaReact size={30} color="#fcf55f" />;
            case 'github':
                return <FaGithub size={30} color="#fcf55f" />;
            case 'wix':
                return <FaWix size={30} color="#fcf55f" />
            case 'figma':
                return <FaFigma size={30} color="#fcf55f" />
            case 'wordpress':
                return <FaWordpress size={30} color="#fcf55f" />
            case 'nextjs':
                return <FaWordpress size={30} color="#fcf55f" />
            case 'googlecloud':
                return <SiGooglecloud size={30} color="#fcf55f" />
            case 'html':
                return <FaHtml5 size={30} color="#fcf55f" />
            case 'reactnative':
                return <TbBrandReactNative size={30} color="#fcf55f" />
            case 'css':
                return <FaCss3Alt size={30} color="#fcf55f" />
            default:
                return null;
        }
    };
    return (
        <div className={styles.codeLanguageWrapper}>
            {typeof codeLangIcon === 'string' ? (
                            <div className={styles.codeLanguageIconWrapper}>{(codeLangIcon as string).split(',').map((icon:string, index:number) => (
                              <div key={index} className={styles.codeIcon}>{renderIcon(icon.trim())}</div>
                            ))}</div>
                          ) : null}
        </div>
    )
}

export default CodeLanguageIcons