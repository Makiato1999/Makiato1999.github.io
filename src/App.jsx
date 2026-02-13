import {
  Terminal,
  Code2,
  Cpu,
  FolderGit2,
  FlaskConical,
  Linkedin,
  Github,
  Mail,
  MapPin
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { projectRepoLinks } from './config/projectRepos'
import avatar from './assets/avatar.jpg'

const sections = ['about', 'projects']

const content = {
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      lang: '中/EN'
    },
    profile: {
      name: 'Xiaoran Xie',
      role: 'AI & Software Engineer',
      slogan: 'Building reliable systems\nfor scalable intelligence.',
      email: 'xiaoran.xie@outlook.com',
      linkedin: 'linkedin.com/in/xiaoran-xie-3a305720a/',
      github: 'github.com/Makiato1999',
      location: 'Toronto, ON'
    },
    about: {
      introTitle: 'Introduction',
      introBody: 'I engineer scalable AI systems and backend infrastructure, focusing on reliability, performance, and architectural clarity. With a background in software engineering and applied AI research, I bridge system design with intelligent application development.',
      experienceTitle: 'Work Experience',
      experiences: [
        {
          role: 'Full Stack Software Developer Co-op',
          company: 'ArcelorMittal',
          address: 'Toronto, Canada',
          period: '2024.9 - 2025.8',
          detail:
            'Led backend development for an internal B2B e-commerce bidding platform, optimizing complex JPA queries and refactoring business logic for improved consistency and scalability. Redesigned pricing workflows, strengthened concurrency control for transaction safety, and integrated IBM MQ with compensation and logging mechanisms. Prototyped LLM-powered vector retrieval to enhance internal knowledge search over unstructured data.'
        },
        // {
        //   role: 'Software Developer (Research Assistant)',
        //   company: 'HuRoN Lab at McMaster University',
        //   address: 'Hamilton, Canada',
        //   period: '2024.4 - 2024.8',
        //   detail:
        //     'Developed HCI project, microservices'
        // },
        {
          role: 'Backend Software Engineer Intern',
          company: 'Guo Tai Epoint Software',
          address: 'Nanjing, China',
          period: '2023.4 - 2023.7',
          detail:
            'Refactored a legacy MVC payment module into a DDD-centric architecture to enhance domain clarity and maintainability. Designed and implemented a dynamic thread pool component that supports runtime configuration, improving backend performance and resource utilization.'
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
      lang: 'EN/中'
    },
    profile: {
      name: '解晓然',
      role: 'AI & 软件工程师',
      slogan: '构建可靠系统\n支撑规模化智能。',
      email: 'xiaoran.xie@outlook.com',
      linkedin: 'linkedin.com/in/xiaoran-xie-3a305720a/',
      github: 'github.com/Makiato1999',
      location: '多伦多, 安大略'
    },
    about: {
      introTitle: '简介',
      introBody:
        '我专注于构建可扩展的 AI 系统与后端基础设施，重视系统的可靠性、性能与长期可维护的架构设计。依托软件工程与应用型 AI 研究背景，我将系统架构能力与智能应用实践相结合。',
      experienceTitle: '工作经历',
      experiences: [
        {
          role: '全栈软件开发实习生',
          company: '安赛乐米塔尔 ArcelorMittal',
          address: '加拿大 多伦多',
          period: '2024.9 - 2025.8',
          detail: '负责公司 B2B 电商平台的后端功能开发与优化，基于 Spring Boot 与 JPA 实现复杂多条件动态查询与业务逻辑重构，将部分派生字段计算逻辑下沉至数据库层以提升查询一致性与可维护性；重构定价建议模块，拆分计算与持久化职责，优化接口边界与系统扩展性；参与竞价流程中的状态流转与并发控制设计，保障高并发场景下的数据一致性；协助完成与 PSI 系统的 IBM MQ 异步集成，实现消息处理、异常补偿与日志追踪机制。同时探索将 LLM 技术应用于内部文本数据分析与知识检索场景，设计基于向量检索的原型方案，用于提升非结构化业务数据的查询与理解效率。'
        },
        {
          role: '后端软件开发实习生',
          company: '江苏国泰新点软件有限公司 Epoint Software',
          address: '中国 南京',
          period: '2023.4 - 2023.7',
          detail: '将遗留的 MVC 架构支付模块重构为基于领域驱动设计（DDD）的分层架构，提升领域模型清晰度与系统可维护性；设计并实现支持运行时动态配置的线程池组件，增强后端系统在高并发场景下的性能稳定性与资源利用效率。'
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
  const [projects, setProjects] = useState([])
  const [isProjectsLoading, setIsProjectsLoading] = useState(false)
  const [projectsError, setProjectsError] = useState('')

  const t = content[lang]

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
    <div className="scanlines min-h-screen text-[var(--text)]">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-4 sm:px-6 sm:py-6">
        <header className="mb-4 border border-[var(--line)] bg-[var(--bg-soft)] px-4 py-3 sm:mb-6">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs uppercase tracking-[0.2em]">~/portfolio</div>
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
                onClick={() => setLang((prev) => (prev === 'zh' ? 'en' : 'zh'))}
                className="transition-opacity hover:opacity-70"
              >
                {t.nav.lang}
              </button>
            </nav>
          </div>
        </header>

        <main className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr] lg:gap-6">
          <aside className="h-fit border border-[var(--line)] bg-[var(--bg-soft)] px-5 py-6 lg:sticky lg:top-6">
            <div className="mb-7 flex flex-col items-start">
              <img
                src={avatar}
                alt="Xiaoran Xie"
                className="mb-4 h-24 w-24 rounded-full border border-[var(--text)] object-cover"
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
          </aside>

          <section className="border border-[var(--line)] bg-[var(--bg-soft)] p-6 sm:p-7 lg:p-8">
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
                        className="group relative border border-[var(--line)] p-4 transition-colors hover:border-white/70"
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
