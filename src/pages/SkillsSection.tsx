import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureFull, faTemperatureHalf, faTemperatureQuarter, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons';
import { SiCplusplus, SiDocker, SiFastapi, SiFigma, SiFirebase, SiFlutter, SiPostgresql, SiPython, SiReact, SiSupabase, SiTailwindcss, SiTypescript, type IconType } from '@icons-pack/react-simple-icons'
import { useEffect, useState } from "react";

interface Skill {
    icon: IconType,
    iconColor: string,
    name: string,
    type?: "frontend" | "backend" | "other",
    skillLevel?: "beginner" | "intermediate" | "advanced" | "expert",
    experience: number
}

const skills: Skill[] = [
    { icon: SiReact, iconColor: '#61DAFB', name: 'React', type: 'frontend', skillLevel: "advanced", experience: 1 },
    { icon: SiTailwindcss, iconColor: '#06B6D4', name: 'TailwindCSS', type: 'frontend', skillLevel: "intermediate", experience: 1 },
    { icon: SiFlutter, iconColor: '#02569B', name: 'Flutter', type: 'frontend', skillLevel: "beginner", experience: 1 },
    { icon: SiFigma, iconColor: '#F24E1E', name: 'Figma', type: 'frontend', skillLevel: "intermediate", experience: 1 },

    { icon: SiPython, iconColor: '#3776AB', name: 'Python', type: 'backend', skillLevel: "advanced", experience: 3 },
    { icon: SiFastapi, iconColor: '#009688', name: 'FastAPI', type: 'backend', skillLevel: "intermediate", experience: 2 },
    { icon: SiTypescript, iconColor: '#3178C6', name: 'TypeScript', type: 'backend', skillLevel: "intermediate", experience: 1 },
    { icon: SiPostgresql, iconColor: '#4169E1', name: 'PostgreSQL', type: 'backend', skillLevel: "intermediate", experience: 2 },
    { icon: SiCplusplus, iconColor: '#663399', name: 'C#', type: 'backend', skillLevel: "intermediate", experience: 2 },

    { icon: SiSupabase, iconColor: '#3FCF8E', name: 'Supabase', type: 'other', skillLevel: "beginner", experience: 1 },
    { icon: SiFirebase, iconColor: '#DD2C00', name: 'Firebase', type: 'other', skillLevel: "intermediate", experience: 1 },
    { icon: SiDocker, iconColor: '#2496ED', name: 'Docker', type: 'other', skillLevel: "beginner", experience: 2 },
];

export default function SkillsSection() {
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
        <section className="w-full my-12 px-4 lg:px-8 lg:pr-12">
            <div className='text-white flex flex-col items-start'>
                <div className='w-full flex flex-col mb-4'>
                    <span className='text-3xl mb-2 font-bold'>My Skills</span>
                    <div className='flex flex-row items-center opacity-50 text-sm lg:text-md'>
                        <div className='flex flex-row items-center -ml-2'>
                            <FontAwesomeIcon
                                icon={faTemperatureThreeQuarters}
                                className={`text-white-300 text-center text-xl transition-all duration-300`} />
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
                                            className={`${skill.skillLevel! == 'expert' ? "text-yellow-300" : skill.skillLevel! == 'advanced' ? "text-green-300" : skill.skillLevel! == 'intermediate' ? "text-orange-300" : "text-neutral-300"} text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-300`} />
                                        <span className='text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-300'> +{skill.experience}yrs</span>
                                    </>
                                ) : (
                                    <div className='flex flex-row gap-2 justify-center items-center'>
                                        <FontAwesomeIcon
                                            size="xl"
                                            icon={skill.skillLevel! == "expert" ? faTemperatureFull : skill.skillLevel! == "advanced" ? faTemperatureThreeQuarters : skill.skillLevel! == "intermediate" ? faTemperatureHalf : faTemperatureQuarter}
                                            className={`${skill.skillLevel! == 'expert' ? "text-yellow-300" : skill.skillLevel! == 'advanced' ? "text-green-300" : skill.skillLevel! == 'intermediate' ? "text-orange-300" : "text-neutral-300"} text-center text-xl transition-all duration-300`} />
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
                                            className={`${skill.skillLevel! == 'expert' ? "text-yellow-300" : skill.skillLevel! == 'advanced' ? "text-green-300" : skill.skillLevel! == 'intermediate' ? "text-orange-300" : "text-neutral-300"} text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-300`} />
                                        <span className='text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-300'> +{skill.experience}yrs</span>
                                    </>
                                ) : (
                                    <div className='flex flex-row gap-2 justify-center items-center'>
                                        <FontAwesomeIcon
                                            size="xl"
                                            icon={skill.skillLevel! == "expert" ? faTemperatureFull : skill.skillLevel! == "advanced" ? faTemperatureThreeQuarters : skill.skillLevel! == "intermediate" ? faTemperatureHalf : faTemperatureQuarter}
                                            className={`${skill.skillLevel! == 'expert' ? "text-yellow-300" : skill.skillLevel! == 'advanced' ? "text-green-300" : skill.skillLevel! == 'intermediate' ? "text-orange-300" : "text-neutral-300"} text-center text-xl transition-all duration-300`} />
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
                                            className={`${skill.skillLevel! == 'expert' ? "text-yellow-300" : skill.skillLevel! == 'advanced' ? "text-green-300" : skill.skillLevel! == 'intermediate' ? "text-orange-300" : "text-neutral-300"} text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-300`} />
                                        <span className='text-center text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-10 transition-all duration-300'> +{skill.experience}yrs</span>
                                    </>
                                ) : (
                                    <div className='flex flex-row gap-2 justify-center items-center'>
                                        <FontAwesomeIcon
                                            size="xl"
                                            icon={skill.skillLevel! == "expert" ? faTemperatureFull : skill.skillLevel! == "advanced" ? faTemperatureThreeQuarters : skill.skillLevel! == "intermediate" ? faTemperatureHalf : faTemperatureQuarter}
                                            className={`${skill.skillLevel! == 'expert' ? "text-yellow-300" : skill.skillLevel! == 'advanced' ? "text-green-300" : skill.skillLevel! == 'intermediate' ? "text-orange-300" : "text-neutral-300"} text-center text-xl transition-all duration-300`} />
                                        <span className='text-center text-xl transition-all duration-300'> +{skill.experience}yrs</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}