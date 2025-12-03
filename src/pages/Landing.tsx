import { lazy, Suspense, useEffect, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { SiPostgresql, SiPython, SiReact, type IconType } from '@icons-pack/react-simple-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProjectsSection from './ProjectsSection';
const SkillsSection = lazy(() => import('./SkillsSection'));

type Skill = {
    icon: IconType,
    iconColor: string,
    name: string,
    type?: "frontend" | "backend" | "other",
    skillLevel?: "beginner" | "intermediate" | "advanced" | "expert",
    experience: number
}

export default function Landing() {
    const highlightedSkills: Skill[] = [
        { icon: SiPython, iconColor: '#3776AB', name: 'Python', experience: 3 },
        { icon: SiPostgresql, iconColor: '#4169E1', name: 'PostgreSQL', experience: 2 },
        { icon: SiReact, iconColor: '#61DAFB', name: 'React', experience: 1 },
    ];

    // Scroll Indicator State
    const [showIndicator, setShowIndicator] = useState(true)
    useEffect(() => {
        const onScroll = () => {
            setShowIndicator(window.scrollY < 10)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
            <div className={`flex flex-col justify-center items-center absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-50 ${showIndicator ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'}`}>
                <div className={`${showIndicator ? 'animate-bounce' : ''} flex flex-col justify-center items-center`}> 
                    <span className='text-white text-md hidden lg:block'>Projects</span>
                    <span className='text-white text-md lg:hidden'>Scroll</span>
                    <FontAwesomeIcon icon={faChevronDown} className="text-white " />
                </div>
            </div>
            <div 
                className='w-screen h-full flex flex-col justify-center items-center z-0'
                style={{ 
                    backgroundColor: 'hsla(288,0%,0%,1)',
                    backgroundImage:
                        "radial-gradient(at 8% 3%, hsla(222,100%,39%,0.25) 0px, transparent 50%), " +
                        "radial-gradient(at 98% 58%, hsla(208,77%,39%,0.1) 0px, transparent 50%), " +
                        "radial-gradient(at 44% 20%, hsla(270,94%,39%,0.1) 0px, transparent 50%), " +
                        "radial-gradient(at 56% 86%, hsla(198,73%,39%,0.1) 0px, transparent 50%)"
                    }}
                >
                <div className='w-screen h-[120vh] lg:h-screen flex flex-col lg:flex-row justify-center lg:gap-0 lg:justify-between items-center px-2 lg:px-8'>
                    <div className="w-full h-screen lg:h-full flex flex-col justify-center items-center">
                        <h1 className='text-6xl 2xl:text-7xl text-white font-bold'>Hi there!</h1>
                        <h2 className='text-4xl 2xl:text-5xl text-white'>My name is Leo</h2>
                    </div>
                    <div className='w-full h-[20vh] lg:h-full flex flex-col justify-center items-center px-2 lg:px-8 gap-6'>
                        <span className='text-white 2xl:text-lg text-justify w-full lg:max-w-4xl'>
                            I'm a Fullstack Developer (right now mostly focused on frontend). I'm committed to delivering well-organized, high-quality solutions with dedication.
                        </span>
                        <div className='text-white hidden lg:flex flex-col w-full gap-2 items-center'>
                            <span className='text-3xl mb-2'>My Skills</span>
                            <div className='flex flex-row items-center justify-between w-full lg:max-w-4xl'>
                                {highlightedSkills.map((skill) => (
                                    <div className="flex flex-col group items-center">
                                        <div key={skill.name} className='flex flex-row gap-2 justify-center items-center'>
                                            <skill.icon size={40} style={{ color: skill.iconColor }} className={`transition-all duration-300 group-hover:scale-105`} />
                                            <span className='text-xl text-center transition-all duration-300 group-hover:scale-105 select-none'>{skill.name}</span>
                                        </div>
                                        <span className='text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300'> +{skill.experience}yrs experience </span>
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-row gap-2 justify-center items-center'>
                                <a>
                                    <span className='text-xl'>... And More!</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            
                <Suspense fallback={<div className='text-white'>Loading Projects...</div>}>
                    <ProjectsSection />
                </Suspense>

                <Suspense fallback={<div className='text-white'>Loading Skills...</div>}>
                    <SkillsSection />
                </Suspense>

                <div className='w-full my-12 flex flex-col justify-center items-center gap-2 px-4 lg:px-8'>
                    <span className='text-white text-3xl text-center'>This website is still WIP</span>
                    <span className='text-white text-center'>Last Updated: 2024/12/02</span>
                </div>
            </div>
        </>
    )
}