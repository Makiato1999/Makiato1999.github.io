import {
  Terminal,
  Code2,
  Cpu,
  FolderGit2,
  FlaskConical,
  Download,
  Linkedin,
  Github,
  Mail,
  MapPin
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { projectRepoLinks } from './config/projectRepos'
import avatar from './assets/avatar.jpg'
import avatarWithBackground from './assets/avatar2.webp'
import background from './assets/background.webp'

const sections = ['about', 'projects']
const resumeFiles = {
  en: {
    href: '/resume-en.pdf',
    download: 'Xiaoran-Xie-Resume-EN.pdf'
  },
  zh: {
    href: '/resume-zh.pdf',
    download: '解晓然-简历.pdf'
  }
}

const content = {
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      backgroundOn: 'BG ON',
      backgroundOff: 'BG OFF',
      lang: '中/EN'
    },
    profile: {
      name: 'Xiaoran Xie',
      role: 'AI & Software Engineer',
      slogan: 'Building reliable systems\nfor scalable intelligence.',
      email: 'xiaoran.xie@outlook.com',
      linkedin: 'linkedin.com/in/xiaoran-xie-3a305720a/',
      github: 'github.com/Makiato1999',
      location: 'Toronto, ON',
      resume: 'Download Resume'
    },
    about: {
      introTitle: 'Introduction',
      introBody: 'I engineer scalable AI systems and backend infrastructure, focusing on reliability, performance, and architectural clarity. With a background in software engineering and applied AI research, I bridge system design with intelligent application development.',
      experienceTitle: 'Work Experience',
      experiences: [
        {
          role: 'Software Developer Co-op, AI Applications',
          company: 'ArcelorMittal',
          address: 'Toronto, Canada',
          period: '2025.4 - 2025.8',
          detail:
            'Built an enterprise AI assistant for knowledge retrieval and task automation using LLMs, RAG, and multi-agent orchestration.'
        },
        {
          role: 'Software Developer Co-op, Backend',
          company: 'ArcelorMittal',
          address: 'Toronto, Canada',
          period: '2024.9 - 2025.4',
          detail:
            'Modernized a B2B steel sales platform with a focus on backend refactoring, query performance, and data consistency.'
        },
        {
          role: 'Research Assistant',
          company: 'McMaster Human-Robot Interaction (HuRoN) Lab',
          address: 'Hamilton, Canada',
          period: '2025.9 - 2026.4',
          detail:
            'Conducted research on multimodal emotion recognition for human-robot interaction, focusing on cross-modal fusion, Transformer-based emotion modeling, and interpretable analysis.'
        },
        {
          role: 'Java Developer Intern',
          company: 'Guo Tai Epoint Software',
          address: 'Nanjing, China',
          period: '2023.4 - 2023.8',
          detail:
            'Supported backend development, API integration, and functional testing for smart government dashboard and citizen service platform modules.'
        }
      ],
      educationTitle: 'Education',
      educations: [
        {
          school: 'McMaster University',
          degree: 'M.Eng. in Computing and Software',
          period: '2023 - 2026'
        },
        {
          school: 'University of Manitoba',
          degree: 'B.S. in Computer Science',
          period: '2019 - 2023'
        }
      ]
    },
    projects: {
      title: 'Selected Projects',
      // tip: 'Edit repo links in `src/config/projectRepos.js`.'
    }
  },
  zh: {
    nav: {
      about: '关于',
      projects: '项目',
      backgroundOn: '背景 开',
      backgroundOff: '背景 关',
      lang: 'EN/中'
    },
    profile: {
      name: '解晓然',
      role: 'AI & 软件工程师',
      slogan: '构建可靠系统\n支撑规模化智能。',
      email: 'xiaoran.xie@outlook.com',
      linkedin: 'linkedin.com/in/xiaoran-xie-3a305720a/',
      github: 'github.com/Makiato1999',
      location: '多伦多, 安大略',
      resume: '下载简历'
    },
    about: {
      introTitle: '简介',
      introBody:
        '我专注于构建可扩展的 AI 系统与后端基础设施，重视系统的可靠性、性能与长期可维护的架构设计。依托软件工程与应用型 AI 研究背景，我将系统架构能力与智能应用实践相结合。',
      experienceTitle: '工作经历',
      experiences: [
        {
          role: '软件开发实习生，AI 应用',
          company: '安赛乐米塔尔 ArcelorMittal',
          address: '加拿大 多伦多',
          period: '2025.4 - 2025.8',
          detail: '基于 LLM、RAG 与多 Agent 协作机制，开发面向企业知识检索、任务路由与流程辅助场景的智能助手。'
        },
        {
          role: '软件开发实习生，后端',
          company: '安赛乐米塔尔 ArcelorMittal',
          address: '加拿大 多伦多',
          period: '2024.9 - 2025.4',
          detail: '参与 ToB 非标钢材销售交易平台的现代化升级与后端重构，负责复杂查询、业务流程与数据一致性相关模块开发。'
        },
        {
          role: '研究助理',
          company: 'McMaster Human-Robot Interaction (HuRoN) Lab',
          address: '加拿大 汉密尔顿',
          period: '2025.9 - 2026.4',
          detail: '参与面向人-机器人交互场景的多模态情绪识别与可解释性研究，围绕自适应跨模态特征融合、情绪级 Transformer 解码与细粒度可解释性分析开展模型设计与实验验证。'
        },
        {
          role: 'Java 开发实习生',
          company: '江苏国泰新点软件有限公司 Epoint Software',
          address: '中国 南京',
          period: '2023.4 - 2023.8',
          detail: '参与政务智慧大屏与便民服务平台相关模块的后端开发、接口联调与功能测试，协助完成需求实现和 bug 修复。'
        }
      ],
      educationTitle: '教育背景',
      educations: [
        {
          school: 'McMaster University',
          degree: '计算机科学与软件工程硕士',
          period: '2023 - 2026'
        },
        {
          school: 'University of Manitoba',
          degree: '计算机科学学士',
          period: '2019 - 2023'
        }
      ]
    },
    projects: {
      title: '项目列表',
      // tip: '在 `src/config/projectRepos.js` 里替换仓库链接。'
    }
  }
}

const iconPool = [Terminal, Code2, Cpu, FolderGit2, FlaskConical]

function pickIcon(seed) {
  const hash = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return iconPool[hash % iconPool.length]
}

function parseRepoSlug(link) {
  try {
    const url = new URL(link)
    const parts = url.pathname.split('/').filter(Boolean)
    if (parts.length < 2) return null
    return { owner: parts[0], repo: parts[1] }
  } catch {
    return null
  }
}

function App() {
  const [section, setSection] = useState('about')
  const [lang, setLang] = useState('en')
  const [showBackground, setShowBackground] = useState(true)
  const [projects, setProjects] = useState([])
  const [isProjectsLoading, setIsProjectsLoading] = useState(false)
  const [projectsError, setProjectsError] = useState('')

  const t = content[lang]
  const resumeFile = resumeFiles[lang]
  const shellClassName = showBackground
    ? 'site-shell background-enabled scanlines min-h-screen text-[var(--text)]'
    : 'scanlines bg-off min-h-screen text-[var(--text)]'
  const headerClassName = showBackground
    ? 'panel panel-header mb-4 px-4 py-3 sm:mb-6'
    : 'mb-4 border border-[var(--line)] bg-[var(--bg-soft)] px-4 py-3 sm:mb-6'
  const asideClassName = showBackground
    ? 'panel panel-solid h-fit px-5 py-6 lg:sticky lg:top-6'
    : 'h-fit border border-[var(--line)] bg-[var(--bg-soft)] px-5 py-6 lg:sticky lg:top-6'
  const sectionClassName = showBackground
    ? 'panel p-6 sm:p-7 lg:p-8'
    : 'border border-[var(--line)] bg-[var(--bg-soft)] p-6 sm:p-7 lg:p-8'
  const avatarClassName = showBackground
    ? 'mb-4 h-24 w-24 rounded-full border border-white/75 object-cover shadow-[0_0_0_4px_rgba(255,255,255,0.03)]'
    : 'mb-4 h-24 w-24 rounded-full border border-[var(--text)] object-cover'
  const avatarSrc = showBackground ? avatarWithBackground : avatar
  const projectCardClassName = showBackground
    ? 'group relative border border-[var(--line)] bg-black/10 p-4 transition-colors hover:border-white/70 hover:bg-white/[0.03]'
    : 'group relative border border-[var(--line)] p-4 transition-colors hover:border-white/70'

  useEffect(() => {
    const token = import.meta.env.VITE_GITHUB_TOKEN
    const headers = {
      Accept: 'application/vnd.github+json'
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    async function loadProjects() {
      setIsProjectsLoading(true)
      setProjectsError('')

      const requests = projectRepoLinks.map(async (link) => {
        const slug = parseRepoSlug(link)

        if (!slug) {
          return {
            name: 'Invalid repo link',
            about: 'Please check this repository URL in src/config/projectRepos.js',
            repo: link
          }
        }

        const response = await fetch(`https://api.github.com/repos/${slug.owner}/${slug.repo}`, {
          headers
        })

        if (!response.ok) {
          throw new Error(`${slug.owner}/${slug.repo}`)
        }

        const data = await response.json()
        return {
          name: data.name || `${slug.owner}/${slug.repo}`,
          about: data.description || 'No description provided.',
          repo: data.html_url || link
        }
      })

      const results = await Promise.allSettled(requests)
      const nextProjects = results.map((result, index) => {
        if (result.status === 'fulfilled') return result.value
        return {
          name: 'Load failed',
          about: `Could not fetch repo metadata for: ${projectRepoLinks[index]}`,
          repo: projectRepoLinks[index]
        }
      })

      const hasFailure = results.some((result) => result.status === 'rejected')
      if (hasFailure) {
        setProjectsError('Some repositories could not be loaded. Check links/token/rate limit.')
      }

      setProjects(nextProjects)
      setIsProjectsLoading(false)
    }

    loadProjects()
  }, [])

  const projectCards = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        Icon: pickIcon(project.repo || project.name)
      })),
    [projects]
  )

  return (
    <div className={shellClassName}>
      <div
        className="site-background"
        style={{ backgroundImage: `url(${background})` }}
        aria-hidden="true"
      />
      <div className="site-overlay" aria-hidden="true" />

      <div className={`${showBackground ? 'relative z-10 ' : ''}mx-auto w-full max-w-[1200px] px-4 py-4 sm:px-6 sm:py-6`}>
        <header className={headerClassName}>
          <div className="flex items-center justify-between gap-3">
            <div className={showBackground ? 'text-xs uppercase tracking-[0.2em] text-white/85' : 'text-xs uppercase tracking-[0.2em]'}>
              ~/portfolio
            </div>
            <nav className="flex items-center gap-5 text-sm">
              {sections.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSection(item)}
                  className={`transition-opacity hover:opacity-70 ${
                    section === item ? 'underline underline-offset-4' : ''
                  }`}
                >
                  {t.nav[item]}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowBackground((prev) => !prev)}
                className="transition-opacity hover:opacity-70"
              >
                {showBackground ? t.nav.backgroundOn : t.nav.backgroundOff}
              </button>
              <button
                type="button"
                onClick={() => setLang((prev) => (prev === 'zh' ? 'en' : 'zh'))}
                className="transition-opacity hover:opacity-70"
              >
                {t.nav.lang}
              </button>
            </nav>
          </div>
        </header>

        <main className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr] lg:gap-6">
          <aside className={asideClassName}>
            <div className="mb-7 flex flex-col items-start">
              <img
                src={avatarSrc}
                alt="Xiaoran Xie"
                className={avatarClassName}
              />
              <div className="text-2xl font-semibold tracking-[0.03em]">{t.profile.name}</div>
              <div className="mt-2 text-sm tracking-[0.04em] text-white/75">
                {t.profile.role}
              </div>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-white/70">{t.profile.slogan}</p>
            </div>

            <div className="mb-6 h-px w-full bg-white/20" />

            <div className="space-y-4 text-sm text-white/80">
              <a
                href={`mailto:${t.profile.email}`}
                className="flex items-center gap-2 hover:opacity-70"
              >
                <Mail size={14} /> {t.profile.email}
              </a>
              <a
                href={`https://${t.profile.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:opacity-70"
              >
                <Linkedin size={14} /> {t.profile.linkedin}
              </a>
              <a
                href={`https://${t.profile.github}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:opacity-70"
              >
                <Github size={14} /> {t.profile.github}
              </a>
              <p className="flex items-center gap-2 text-white/80">
                <MapPin size={14} /> {t.profile.location}
              </p>
            </div>

            <a
              href={resumeFile.href}
              download={resumeFile.download}
              className="mt-6 inline-flex items-center gap-2 border border-white/[0.18] px-3 py-2 text-sm text-white/85 transition-colors hover:border-white/[0.32] hover:bg-white/[0.06] hover:text-white/92"
            >
              <Download size={14} />
              {t.profile.resume}
            </a>
          </aside>

          <section className={sectionClassName}>
            {section === 'about' ? (
              <div className="max-w-[760px] space-y-10">
                <div className="space-y-4">
                  <h2 className="text-sm uppercase tracking-[0.1em] text-white/90">{t.about.introTitle}</h2>
                  <p className="text-sm leading-7 text-white/85">{t.about.introBody}</p>
                </div>

                <div className="space-y-5">
                  <h2 className="text-sm uppercase tracking-[0.1em] text-white/90">
                    {t.about.experienceTitle}
                  </h2>
                  <div className="space-y-6">
                    {t.about.experiences.map((item) => (
                      <article
                        key={`${item.company}-${item.period}`}
                        className="space-y-3 border-l border-white/[0.12] pl-5"
                      >
                        <div className="text-sm font-bold text-white/92">{item.role}</div>
                        <div className="text-sm text-white/75">
                          {item.company}
                          {item.address ? ` | ${item.address}` : ''}
                          {` | ${item.period}`}
                        </div>
                        <p className="text-sm leading-7 text-white/85">{item.detail}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <h2 className="text-sm uppercase tracking-[0.1em] text-white/90">{t.about.educationTitle}</h2>
                  <div className="space-y-5">
                    {t.about.educations.map((item) => (
                      <article
                        key={`${item.school}-${item.period}`}
                        className="space-y-2 border-l border-white/[0.12] pl-5"
                      >
                        <div className="text-sm font-semibold text-white/92">{item.school}</div>
                        <div className="text-sm text-white/75">{item.degree}</div>
                        <div className="text-sm text-white/60">{item.period}</div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-[760px] space-y-6">
                <div className="space-y-2">
                  <h2 className="text-sm uppercase tracking-[0.1em] text-white/90">{t.projects.title}</h2>
                  <p className="text-sm leading-7 text-white/70">{t.projects.tip}</p>
                </div>
                {projectsError ? <p className="text-xs text-white/60">{projectsError}</p> : null}
                {isProjectsLoading ? (
                  <p className="text-sm text-white/80">Loading repositories...</p>
                ) : null}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {projectCards.map((project) => {
                    const Icon = project.Icon
                    return (
                      <a
                        key={project.repo}
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className={projectCardClassName}
                      >
                        <Icon size={16} className="absolute left-4 top-4 text-white/95" />
                        <div className="pl-7">
                          <h3 className="text-sm font-semibold group-hover:underline">{project.name}</h3>
                          <p className="mt-2 text-sm leading-6 text-white/80">{project.about}</p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
