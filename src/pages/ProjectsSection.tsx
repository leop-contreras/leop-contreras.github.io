type Project = {
    id: number
    title: string
    status: "Deployed" | "InDev" | "Prototype"
    image?: string
    link?: string
    langs?: string[]
}

const projects: Project[] = [
    { id: 1, title: 'ERA Official Website', status: 'Deployed', image: 'projects/era.png', link: 'https://oakland-era.web.app/', langs: ['React', 'TypeScript', 'TailwindCSS', 'Firebase'] },
    { id: 2, title: 'projectGoldfinch', status: 'InDev', image: 'projects/projectGoldfinch.png', link: '', langs: ['Flutter','Supabase']  },
    { id: 3, title: 'projectTrack', status: 'InDev', image: 'projects/projectTrack.png', link: '', langs: ['Flutter']  },
    { id: 4, title: 'projectSltTanager', status: 'InDev', image: 'projects/projectSltTanager.png', link: '', langs: ['React', 'Typescript', 'TailwindCSS', 'Firebase']},
    { id: 5, title: 'Class Project #1', status: 'Prototype', image: 'projects/classproject1_v2.png', link: 'https://www.figma.com/proto/bMFj1jejhMDPBuEDBRZrEk/Proyecto-Final-Interfaces-HM?node-id=0-1&t=Gb1tnduyK6bjSw3d-1', langs: ['Figma']  },
];

export default function ProjectsSection() {
    return (
        <div className="w-full my-12 px-4 lg:px-8">
            <p className='text-white text-3xl font-bold mb-6'>My Projects</p>

            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'>
                {projects.map((p) => (
                    <article key={p.id} className={`group bg-slate-900 rounded-lg shadow-xl hover:shadow-2xl overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-300 ${p.link ? 'cursor-pointer hover:scale-105' : ''}`} 
                    onClick={() => {
                        if (p.link) {
                            window.open(p.link, '_blank', 'noopener,noreferrer');
                        }
                    }}>
                        <div className='bg-slate-700 h-50 flex items-center justify-center text-slate-200 text-lg relative overflow-hidden'>
                            <img alt={p.title} className="w-full h-full object-cover" src={p.image} loading="lazy" />
                            {p.link ? (
                                <div className='absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10' >
                                    <span className='text-white text-center p-4 block font-bold'>Click to view project</span>
                                </div>
                            ) : null}
                        </div>
                        <div className='p-4 flex-1 flex flex-col'>
                            <h3 className='text-white font-semibold text-xl mb-3'>{p.title}</h3>
                            <div className='flex items-center justify-start gap-3'>
                                {p.status === "Deployed" && (
                                    <>
                                        {p.link == '' ? (
                                            <>
                                                <div className='w-5 h-5 bg-green-500 rounded-full' />
                                                <span className="text-white text-md text-center">Deployed Website</span>
                                            </>
                                        ) : (
                                            <a href={p.link} target="_blank" rel="noopener noreferrer" className="group hover:font-bold transition-all duration-300">
                                                <div className="flex items-center justify-start gap-3">
                                                    <div className='w-5 h-5 bg-green-500 rounded-full group-hover:animate-pulse' />
                                                    <span className="text-white group-hover:font-extrabold text-md text-center group-hover:scale-110 transition-all duration-300">Deployed Website</span>
                                                </div>
                                            </a>
                                        )}
                                    </>
                                )}
                                {p.status === "InDev" && (
                                    <>
                                        {p.link == '' ? (
                                            <>
                                                <div className='w-5 h-5 bg-yellow-500 rounded-full' />
                                                <span className="text-white text-md text-center">In Development</span>
                                            </>
                                        ) : (
                                            <a href={p.link} target="_blank" rel="noopener noreferrer" className="group hover:font-bold transition-all duration-300">
                                                <div className="flex items-center justify-start gap-3">
                                                    <div className='w-5 h-5 bg-yellow-500 rounded-full group-hover:animate-pulse' />
                                                    <span className="text-white group-hover:font-extrabold text-md text-center group-hover:scale-110 transition-all duration-300">In Development</span>
                                                </div>
                                            </a>
                                        )}
                                    </>
                                )}
                                {p.status === "Prototype" && (
                                    <>
                                        {
                                            p.link == '' ? 
                                            <>
                                                <div className='w-5 h-5 bg-purple-500 rounded-full' />
                                                <span className="text-white text-md text-center">Prototype</span>
                                            </>
                                            :
                                                <div className="flex items-center justify-start gap-3">
                                                    <div className='w-5 h-5 bg-purple-500 rounded-full group-hover:animate-pulse' />
                                                    <span className="text-white group-hover:font-extrabold text-md text-center group-hover:scale-110 transition-all duration-300">Prototype</span>
                                                </div>
                                        }
                                    </>
                                )}
                            </div>
                            <span className="text-white text-xs mt-4">{p.langs?.join(', ')}</span>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}