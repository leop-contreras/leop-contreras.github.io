import { useEffect, useState } from 'react';
import { faChevronDown, faTemperatureFull, faTemperatureHalf, faTemperatureQuarter, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons';

import { SiCplusplus, SiDocker, SiFastapi, SiFigma, SiFirebase, SiFlutter, SiPostgresql, SiPython, SiReact, SiSupabase, SiTailwindcss, SiTypescript, type IconType } from '@icons-pack/react-simple-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Project = {
    id: number
    title: string
    status: "Deployed" | "InDev" | "Prototype"
    image?: string
    link?: string
    langs?: string[]
}

type Skill = {
    icon: IconType,
    iconColor: string,
    name: string,
    type?: "frontend" | "backend" | "other",
    skillLevel?: "beginner" | "intermediate" | "advanced" | "expert",
    experience: number
}

export default function Landing() {
    const projects: Project[] = [
        { id: 1, title: 'ERA Official Website', status: 'Deployed', image: 'projects/era.png', link: 'https://oakland-era.web.app/', langs: ['React', 'TypeScript', 'TailwindCSS', 'Firebase'] },
        { id: 2, title: 'projectGoldfinch', status: 'InDev', image: 'projects/projectGoldfinch.png', link: '#', langs: ['Flutter','Supabase']  },
        { id: 3, title: 'projectTrack', status: 'InDev', image: 'projects/projectTrack.png', link: '#', langs: ['Flutter']  },
        { id: 4, title: 'projectSltTanager', status: 'InDev', image: 'projects/projectSltTanager.png', link: '#', langs: ['React', 'Typescript', 'TailwindCSS', 'Firebase']},
        { id: 5, title: 'Class Project #1', status: 'Prototype', image: 'projects/classproject1.png', link: '#', langs: ['Figma']  },
    ];

    const skills: Skill[] = [
        { icon: SiReact, iconColor: '#61DAFB', name: 'React', type:'frontend', skillLevel: "advanced", experience: 1 },
        { icon: SiTailwindcss, iconColor: '#06B6D4', name: 'TailwindCSS', type:'frontend', skillLevel: "intermediate", experience: 1 },
        { icon: SiFlutter, iconColor: '#02569B', name: 'Flutter', type:'frontend', skillLevel: "beginner", experience: 1 },
        { icon: SiFigma, iconColor: '#F24E1E', name: 'Figma', type:'frontend', skillLevel: "intermediate", experience: 1 },

        { icon: SiPython, iconColor: '#3776AB', name: 'Python', type:'backend',  skillLevel: "advanced", experience: 3 },
        { icon: SiFastapi, iconColor: '#009688', name: 'FastAPI', type:'backend', skillLevel: "intermediate", experience: 2 },
        { icon: SiTypescript, iconColor: '#3178C6', name: 'TypeScript', type:'backend', skillLevel: "intermediate", experience: 1 },
        { icon: SiPostgresql, iconColor: '#4169E1', name: 'PostgreSQL', type:'backend', skillLevel: "intermediate", experience: 2 },
        { icon: SiCplusplus, iconColor: '#663399', name: 'C#', type:'backend', skillLevel: "intermediate", experience: 2 },

        { icon: SiSupabase, iconColor: '#3FCF8E', name: 'Supabase', type:'other', skillLevel: "beginner", experience: 1 },
        { icon: SiFirebase, iconColor: '#DD2C00', name: 'Firebase', type:'other', skillLevel: "intermediate", experience: 1 },
        { icon: SiDocker, iconColor: '#2496ED', name: 'Docker', type:'other', skillLevel: "beginner", experience: 2 },
    ];

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

    // Checks if display is lg
    const [isLarge, setIsLarge] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false
        return window.matchMedia('(min-width: 1024px)').matches
    })

    useEffect(() => {
        if (typeof window === 'undefined') return
        const mq = window.matchMedia('(min-width: 1024px)')
        const onChange = (e: MediaQueryListEvent) => setIsLarge(e.matches)
        // matchMedia.addEventListener is modern; fallback to addListener
        if (typeof mq.addEventListener === 'function') mq.addEventListener('change', onChange)
        else mq.addListener(onChange as unknown as EventListener)
        // ensure initial state in case of hydration mismatch
        setIsLarge(mq.matches)
        return () => {
            if (typeof mq.removeEventListener === 'function') mq.removeEventListener('change', onChange)
            else mq.removeListener(onChange as unknown as EventListener)
        }
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
                <div className='w-screen h-[150vh] lg:h-screen flex flex-col lg:flex-row justify-center lg:gap-0 lg:justify-between items-center px-2 lg:px-8'>
                    <div className="w-full h-screen lg:h-full flex flex-col justify-center items-center">
                        <h1 className='text-6xl 2xl:text-7xl text-white font-bold'>Hi there!</h1>
                        <h2 className='text-4xl 2xl:text-5xl text-white'>My name is Leo</h2>
                    </div>
                    <div className='w-full h-[50vh] lg:h-full flex flex-col justify-center items-center px-2 lg:px-8 gap-6'>
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
            
                <div className="w-full my-12 px-4 lg:px-8">
                    <p className='text-white text-3xl font-bold mb-6'>My Projects</p>
            
                    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'>
                        {projects.map((p) => (
                            <article key={p.id} className='bg-slate-900 rounded-lg shadow-xl hover:shadow-2xl overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-300'>
                                <div className='bg-slate-700 h-50 flex items-center justify-center text-slate-200 text-lg'>
                                    <img alt={p.title} className="w-full h-full object-cover" src={p.image} />
                                </div>
                                <div className='p-4 flex-1 flex flex-col'>
                                    <h3 className='text-white font-semibold text-xl mb-3'>{p.title}</h3>
                                    <div className='flex items-center justify-start gap-3'>
                                        {p.status === "Deployed" && (
                                            <>
                                                <a href={p.link} target="_blank" rel="noopener noreferrer" className="group hover:font-bold transition-all duration-300">
                                                    <div className="flex items-center justify-start gap-3">
                                                        <div className='w-5 h-5 bg-green-500 rounded-full group-hover:animate-pulse'/>
                                                        <span className="text-white text-md text-center">Deployed Website</span>
                                                    </div>
                                                </a>
                                            </>
                                        )}
                                        {p.status === "InDev" && (
                                            <>
                                                <div className='w-5 h-5 bg-yellow-500 rounded-full'/>
                                                <span className="text-white text-md text-center">In Development</span>
                                            </>
                                        )}
                                        {p.status === "Prototype" && (
                                            <>
                                                <div className='w-5 h-5 bg-purple-500 rounded-full'/>
                                                <span className="text-white text-md text-center">Prototype</span>
                                            </>
                                        )}
                                    </div>
                                    <span className="text-white text-xs mt-4">{p.langs?.join(', ')}</span>
                                </div>
                            </article>
                        ))}
                    </div>

                </div>

                <div className="w-full my-12 px-4 lg:px-8 lg:pr-12">
                    <div className='text-white flex flex-col items-start'>
                        <div className='w-full flex flex-col mb-4'>
                            <span className='text-3xl mb-2 font-bold'>My Skills</span>
                            <div className='flex flex-row items-center opacity-50 text-sm lg:text-md'>
                                <div className='flex flex-row items-center -ml-2'>
                                    <FontAwesomeIcon 
                                    icon={faTemperatureThreeQuarters} 
                                    className={`text-white-300 text-center text-xl transition-all duration-300`}/>
                                    <span>Level of Expertise</span>
                                </div>
                                <span className='ml-6'>+Xyrs of experience</span>
                            </div>
                        </div>
                        <div className='w-full lg:max-w-7xl flex flex-col gap-8 lg:gap-0 lg:flex-row justify-between'>
                            <div className='flex flex-col justify-start items-start gap-3'>
                                <span className='text-2xl mb-1'>Backend</span>
                                {skills.filter(skill => skill.type === "backend").map((skill) => (
                                    <div key={skill.name} className='w-full flex flex-row gap-2 justify-between lg:justify-start items-center group'>
                                        <div className='flex flex-row gap-2 justify-center items-center'>
                                            <skill.icon size={40} style={{ color: skill.iconColor }} className={`transition-all duration-300 group-hover:scale-105`} />
                                            <span className='text-xl text-center transition-all duration-300 group-hover:scale-105 select-none'>{skill.name}</span>
                                        </div>
                                        {isLarge ? (
                                            <>
                                                <FontAwesomeIcon 
                                                    size="xl"
                                                    icon={skill.skillLevel! == "expert" ? faTemperatureFull : skill.skillLevel! == "advanced" ? faTemperatureThreeQuarters : skill.skillLevel! == "intermediate" ? faTemperatureHalf : faTemperatureQuarter} 
                                                    className={`${skill.skillLevel! == 'expert' ? "text-yellow-300" : skill.skillLevel! == 'advanced' ? "text-green-300" : skill.skillLevel! == 'intermediate' ? "text-orange-300" : "text-neutral-300"} text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-300`}/>
                                                <span className='text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-300'> +{skill.experience}yrs</span>
                                            </>
                                        ) : (
                                            <div className='flex flex-row gap-2 justify-center items-center'>
                                                <FontAwesomeIcon 
                                                    size="xl"
                                                    icon={skill.skillLevel! == "expert" ? faTemperatureFull : skill.skillLevel! == "advanced" ? faTemperatureThreeQuarters : skill.skillLevel! == "intermediate" ? faTemperatureHalf : faTemperatureQuarter} 
                                                    className={`${skill.skillLevel! == 'expert' ? "text-yellow-300" : skill.skillLevel! == 'advanced' ? "text-green-300" : skill.skillLevel! == 'intermediate' ? "text-orange-300" : "text-neutral-300"} text-center text-xl transition-all duration-300`}/>
                                                <span className='text-center text-xl transition-all duration-300'> +{skill.experience}yrs</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col justify-start items-start gap-3'>
                                <span className='text-2xl mb-1'>Frontend</span>
                                {skills.filter(skill => skill.type === "frontend").map((skill) => (
                                    <div key={skill.name} className='w-full flex flex-row gap-2 justify-between lg:justify-start items-center group'>
                                        <div className='flex flex-row gap-2 justify-center items-center'>
                                            <skill.icon size={40} style={{ color: skill.iconColor }} className={`transition-all duration-300 group-hover:scale-105`} />
                                            <span className='text-xl text-center transition-all duration-300 group-hover:scale-105 select-none'>{skill.name}</span>
                                        </div>
                                        {isLarge ? (
                                            <>
                                                <FontAwesomeIcon 
                                                    size="xl"
                                                    icon={skill.skillLevel! == "expert" ? faTemperatureFull : skill.skillLevel! == "advanced" ? faTemperatureThreeQuarters : skill.skillLevel! == "intermediate" ? faTemperatureHalf : faTemperatureQuarter} 
                                                    className={`${skill.skillLevel! == 'expert' ? "text-yellow-300" : skill.skillLevel! == 'advanced' ? "text-green-300" : skill.skillLevel! == 'intermediate' ? "text-orange-300" : "text-neutral-300"} text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-300`}/>
                                                <span className='text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-300'> +{skill.experience}yrs</span>
                                            </>
                                        ) : (
                                            <div className='flex flex-row gap-2 justify-center items-center'>
                                                <FontAwesomeIcon 
                                                    size="xl"
                                                    icon={skill.skillLevel! == "expert" ? faTemperatureFull : skill.skillLevel! == "advanced" ? faTemperatureThreeQuarters : skill.skillLevel! == "intermediate" ? faTemperatureHalf : faTemperatureQuarter} 
                                                    className={`${skill.skillLevel! == 'expert' ? "text-yellow-300" : skill.skillLevel! == 'advanced' ? "text-green-300" : skill.skillLevel! == 'intermediate' ? "text-orange-300" : "text-neutral-300"} text-center text-xl transition-all duration-300`}/>
                                                <span className='text-center text-xl transition-all duration-300'> +{skill.experience}yrs</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col justify-start items-start gap-3'>
                                <span className='text-2xl mb-1'>Other</span>
                                {skills.filter(skill => skill.type === "other").map((skill) => (
                                    <div key={skill.name} className='w-full flex flex-row gap-2 justify-between lg:justify-start items-center group'>
                                        <div className='flex flex-row gap-2 justify-center items-center'>
                                            <skill.icon size={40} style={{ color: skill.iconColor }} className={`transition-all duration-300 group-hover:scale-105`} />
                                            <span className='text-xl text-center transition-all duration-300 group-hover:scale-105 select-none'>{skill.name}</span>
                                        </div>
                                        {isLarge ? (
                                            <>
                                                <FontAwesomeIcon 
                                                    size="xl"
                                                    icon={skill.skillLevel! == "expert" ? faTemperatureFull : skill.skillLevel! == "advanced" ? faTemperatureThreeQuarters : skill.skillLevel! == "intermediate" ? faTemperatureHalf : faTemperatureQuarter} 
                                                    className={`${skill.skillLevel! == 'expert' ? "text-yellow-300" : skill.skillLevel! == 'advanced' ? "text-green-300" : skill.skillLevel! == 'intermediate' ? "text-orange-300" : "text-neutral-300"} text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-300`}/>
                                                <span className='text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-300'> +{skill.experience}yrs</span>
                                            </>
                                        ) : (
                                            <div className='flex flex-row gap-2 justify-center items-center'>
                                                <FontAwesomeIcon 
                                                    size="xl"
                                                    icon={skill.skillLevel! == "expert" ? faTemperatureFull : skill.skillLevel! == "advanced" ? faTemperatureThreeQuarters : skill.skillLevel! == "intermediate" ? faTemperatureHalf : faTemperatureQuarter} 
                                                    className={`${skill.skillLevel! == 'expert' ? "text-yellow-300" : skill.skillLevel! == 'advanced' ? "text-green-300" : skill.skillLevel! == 'intermediate' ? "text-orange-300" : "text-neutral-300"} text-center text-xl transition-all duration-300`}/>
                                                <span className='text-center text-xl transition-all duration-300'> +{skill.experience}yrs</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full my-12 flex flex-col justify-center items-center gap-2 px-4 lg:px-8'>
                    <span className='text-white text-3xl text-center'>This website is still WIP</span>
                    <span className='text-white text-center'>Last Updated: 2024/11/25</span>
                </div>
            </div>
        </>
    )
}