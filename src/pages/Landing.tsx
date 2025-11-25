import { useEffect, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { SiPostgresql, SiPython, SiReact } from '@icons-pack/react-simple-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Project = {
    id: number
    title: string
    status: "Deployed" | "InDev" | "Prototype"
    image?: string
    link?: string
    langs?: string[]
}

export default function Landing() {
    const projects: Project[] = [
        { id: 1, title: 'ERA Official Website', status: 'Deployed', image: 'projects/era.png', link: 'https://oakland-era.web.app/', langs: ['React', 'TypeScript', 'TailwindCSS', 'Firebase'] },
        { id: 2, title: 'projectGoldfinch', status: 'InDev', image: 'projects/projectGoldfinch.png', link: '#', langs: ['Flutter','Supabase']  },
        { id: 3, title: 'projectTrack', status: 'InDev', image: 'projects/projectTrack.png', link: '#', langs: ['Flutter']  },
        { id: 4, title: 'projectSltTanager', status: 'InDev', image: 'projects/projectSltTanager.png', link: '#', langs: ['React', 'Typescript', 'TailwindCSS', 'Firebase']},
        { id: 5, title: 'Class Project #1', status: 'Prototype', image: 'projects/classproject1.png', link: '#', langs: ['Figma']  },
    ]

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
                    <span className='text-white text-md'>Projects</span>
                    <FontAwesomeIcon icon={faChevronDown} className="text-white " />
                </div>
            </div>
            <div className='bg-slate-900 w-screen h-full flex flex-col justify-center items-center z-0'>
                <div className='w-screen h-screen flex flex-row justify-between items-center px-8'>
                    <div className="w-full flex flex-col justify-center items-center">
                        <h1 className='text-6xl text-white font-bold'>Hi there!</h1>
                        <h2 className='text-4xl text-white'>My name is Leo</h2>
                    </div>
                    <div className='w-full flex flex-col justify-center items-start px-8 gap-6'>
                        <span className='text-white text-justify'>
                            I'm a Fullstack Developer (right now mostly focused on frontend). I'm committed to delivering well-organized, high-quality solutions with dedication.
                        </span>
                        <div className='text-white flex flex-col gap-2 items-start'>
                            <span className='text-2xl mb-2'>My Skills</span>
                            <div className='flex flex-row gap-2 justify-center items-center group'>
                                <SiPython size={40} className="text-[#3776AB] transition-all duration-300 group-hover:scale-105" />
                                <span className='text-xl text-center transition-all duration-300 group-hover:scale-105 select-none'>Python</span>
                                <span className='text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-300'> +3yrs experience </span>
                            </div>
                            <div className='flex flex-row gap-2 justify-center items-center group'>
                                <SiPostgresql size={40} className="text-[#4169E1] transition-all duration-300 group-hover:scale-105" />
                                <span className='text-xl text-center transition-all duration-300 group-hover:scale-105 select-none'>PostgreSQL</span>
                                <span className='text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-300'> +2yrs experience </span>
                            </div>
                            <div className='flex flex-row gap-2 justify-center items-center group'>
                                <SiReact size={40} className="text-[#61DAFB] transition-all duration-300 group-hover:scale-105" />
                                <span className='text-xl text-center transition-all duration-300 group-hover:scale-105 select-none'>React</span>
                                <span className='text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-300'> +1yr experience </span>
                            </div>
                            <div className='flex flex-row gap-2 justify-center items-center'>
                                <a>
                                    <span className='text-xl'>... And More!</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="w-full my-12 px-8">
                    <p className='text-white text-2xl font-bold mb-6'>Some of my projects</p>
            
                    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'>
                        {projects.map((p) => (
                            <article key={p.id} className='bg-slate-800 rounded-lg shadow-xl hover:shadow-2xl overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-300'>
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

                <div className='w-full my-12 flex flex-col justify-center items-center gap-2'>
                    <span className='text-white text-3xl'>This website is still WIP</span>
                    <span className='text-white'>Last Updated: 2024/11/25</span>
                </div>
            </div>
        </>
    )
}