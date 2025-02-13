"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      color: "from-blue-600/20 via-cyan-600/10 to-transparent",
      borderColor: "border-blue-900/50",
      iconBg: "bg-blue-900/50",
      textHover: "group-hover:text-blue-400",
      glow: "group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]",
      iconGlow: "group-hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.7)]",
      skills: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "TypeScript", icon: "ts" },
        { name: "JavaScript", icon: "js" },
        { name: "CSS", icon: "css" },
      ],
    },
    {
      title: "Backend",
      color: "from-red-600/20 via-orange-600/10 to-transparent",
      borderColor: "border-red-900/50",
      iconBg: "bg-red-900/50",
      textHover: "group-hover:text-red-400",
      glow: "group-hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.5)]",
      iconGlow: "group-hover:shadow-[0_0_20px_-5px_rgba(220,38,38,0.7)]",
      skills: [{ name: "Node.js", icon: "nodejs" }],
    },
    {
      title: "Other Tools",
      color: "from-purple-600/20 via-pink-600/10 to-transparent",
      borderColor: "border-purple-900/50",
      iconBg: "bg-purple-900/50",
      textHover: "group-hover:text-purple-400",
      glow: "group-hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.5)]",
      iconGlow: "group-hover:shadow-[0_0_20px_-5px_rgba(147,51,234,0.7)]",
      skills: [
        { name: "HTML", icon: "html" },
        { name: "Tailwind", icon: "tailwind" },
        { name: "Git", icon: "git" },
        { name: "VSCode", icon: "vscode" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center px-8 bg-black"
    >
      <div className="max-w-7xl w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 mb-16 text-center"
        >
          <span className="text-red-500 font-medium">What I Know</span>
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-white">
              My <span className="text-glow">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto"></div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={item}
              className="relative group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-b ${category.color} rounded-2xl -z-10 opacity-60`}
              ></div>
              <div
                className={`space-y-6 p-6 rounded-2xl ${category.borderColor} border backdrop-blur-sm transition-all duration-300 ${category.glow}`}
              >
                <h3 className="text-2xl font-semibold text-white">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`flex flex-col items-center space-y-2 p-4 rounded-xl bg-zinc-900/50 transition-all duration-300 group/skill`}
                    >
                      <div
                        className={`w-12 h-12 p-2 rounded-lg ${category.iconBg} group-hover/skill:scale-110 transition-all duration-300 ${category.iconGlow}`}
                      >
                        <Image
                          src={`https://skillicons.dev/icons?i=${skill.icon}`}
                          alt={skill.name}
                          width={32}
                          height={32}
                          unoptimized
                        />
                      </div>
                      <span
                        className={`text-sm text-gray-400 ${category.textHover} transition-colors`}
                      >
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
