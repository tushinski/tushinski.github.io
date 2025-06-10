import React from 'react'
import { Icon } from '../../markup/icon/icon'
import s from '../resume-content.module.scss'

type Props = {}

export const ResumeDevVersion: React.FC<Props> = () => {
  return (
    <>
      <h1>Alex Tushinski</h1>
      <a href="https://avatars.githubusercontent.com/u/25905213?v=4" target="_blank">
        <img className={s.avatar} src="https://avatars.githubusercontent.com/u/25905213?v=4"/>
      </a><br/>
      <Icon name="person"/> Frontend Developer / Frontend Team Lead<br/>
      <Icon name="calendar_month"/> 7 years of experience <br/>
      <Icon name="location_on"/> Saint-Petersburg, Russian Federation <br/>
      <Icon name="chat" /> <a href="https://t.me/tushinski">@tushinski</a> <br/>

      <h2> <Icon name="work"/> Employment history</h2>
      <section>
        <h3>Lead Frontend Developer</h3>
        <section>
          <Icon name="corporate_fare"/>  <a href="https://tech.vk.com/">VK Tech</a><br/>
          <Icon name="calendar_clock"/>  Mar 2025 - Present<br/>
          <br/>
          Projects: <a href="https://biz.mail.ru/teams/">VK Teams</a> (Web Version), <a href="https://biz.mail.ru/">VK Workspace</a> Admin Panel (B2B)<br/>
          <br/>
          Responsibilities:
          <ul>
            <li>developing new features</li>
            <li>writing unit and e2e tests</li>
            <li>technical leadership / knowledge sharing</li>
            <li>participating in activities of a dev community</li>
            <li>cross-team code review</li>
            <li>code refactoring and refactoring planning</li>
            <li>technical design of new projects (architecture, UI/UX, web APIs)</li>
            <li>technical elaboration of new product features (quality gates)</li>
            <li>managing tasks: creation/decomposition/estimation</li>
          </ul>
        </section>

        <h3> Team Lead (author of the project)</h3>
        <section>
          <Icon name="corporate_fare"/>  <a href="https://tech.vk.com/">VK Tech</a><br/>
          <Icon name="calendar_clock"/>  Mar 2024 - Mar 2025 <br/>
          <br/>
          Project: a no-code solution for automation of business processes.<br/>
          <br/>
          Responsibilities:
          <ul>
            <li>
              designing project's architecture from scratch
              <ul>
                <li>RESTful API</li>
                <li>microservices (Golang, postgres) + united API Gateway</li>
                <li>custom role model</li>
                <li>frontend monorepo with multiple apps and libraries</li>
                <li>unique event-based mechanics for client-server interactions</li>
                <li>own admin-panel</li>
                <li>integrations with 3P systems</li>
                <li>client-side integrations</li>
              </ul>
            </li>
            <li>communicating with PM, CPO, CTO</li>
            <li>communicating with SRE and DevOps teams</li>
            <li>communicating with QA team</li>
            <li>development planning</li>
            <li>organization of conducting SCRUM rituals <i>(sprint planning/pre-planning, retro, backlog grooming, etc.)</i></li>
            <li>team management <i>(1-1 meets, status meets, team goals, performance review etc.)</i></li>
            <li>developing a complex frontend library</li>
            <li>developing new web services (Golang)</li>
            <li>writing user documentation</li>
            <li>code review</li>
          </ul>
        </section>

        <h3> Senior Frontend Developer</h3>
        <section>
          <Icon name="corporate_fare"/>  <a href="https://vkplay.ru/">VK Play</a><br/>
          <Icon name="calendar_clock"/>  Nov 2021 - Mar 2024<br/>
          <br/>
          Projects:
          <ul>
            <li><a href="https://market.vkplay.ru/">VK Play Market</a></li>
            <li><a href="https://pvp.vkplay.ru/">VK Play PVP</a></li>
            <li><a href="https://vkplay.ru/play">VK Play (Main Section)</a></li>
            <li>a corporate React library for advertising <i>(used by other teams)</i></li>
          </ul>
          <br/>
          Responsibilities:
          <ul>
            <li>setting up </li>
            <li>maintaining a frontend monorepository</li>
            <li>developing shared monorepo libraries <i>(including a ui-library)</i></li>
            <li>developing new features</li>
            <li>technical design of new product features</li>
            <li>technical design of new projects</li>
            <li>code refactoring</li>
            <li>code review</li>
            <li>writing unit tests</li>
            <li>participating in sprint plannings</li>
            <li>tasks decomposition/estimation</li>
            <li>participating in interviews with candidates</li>
          </ul>
        </section>

        <h3> Middle Frontend Developer</h3>
        <section>
          <Icon name="corporate_fare"/>  <a href="https://novardis.com/">NOVARDIS</a><br/>
          <Icon name="calendar_clock"/>  Dec, 2019 - Nov, 2021<br/>
          <br/>
          Projects: two large e-commerce websites based on SAP CMS.<br/>
          <br/>
          Responsibilities:
          <ul>
            <li>developing new features</li>
            <li>code review</li>
            <li>legacy code analysis</li>
            <li>legacy code refactoring</li>
            <li>tasks decomposition/estimation</li>
            <li>mentoring (2 junior devs)</li>
          </ul>
        </section>

        <h3> Junior/Middle Frontend Developer</h3>
        <section>
          <Icon name="corporate_fare"/>  <a href="https://makeit.ru/">MAKEIT</a><br/>
          <Icon name="calendar_clock"/>  Feb, 2019 - Dec, 2019<br/>
          <br/>
          Projects: two small SPAs, multiple CMS-based websites.<br/>
          <br/>
          Responsibilities:
          <ul>
            <li>developing new projects from scratch</li>
            <li>cooperating with a designer</li>
            <li>participating in designing web APIs</li>
            <li>mentoring (1 junior dev)</li>
            <li>participating in communication with customers</li>
          </ul>
        </section>

      </section>

      <h2> <Icon name="skateboarding"/> Skills</h2>
      <section>
        <ul>
          <li>TypeScript</li>
          <li>React, React Ecosystem</li>
          <li>Jest, Playwright</li>
        </ul>
        <br/>
        <ul>
          <li>REST</li>
          <li>Design Patterns</li>
          <li>SOLID</li>
          <li>Functional Programming</li>
          <li>ROP</li>
          <li>KISS, DRY, YAGNI</li>
          <li>DDD</li>
          <li>Hexagonal Architecture</li>
          <li>Microservice Architecture</li>
          <li>Code Quality Analysis</li>
          <li>Code Smells</li>
          <li>Code Refactoring Techniques</li>
        </ul>
        <br/>
        <ul>
          <li>Git</li>
          <li>NPM / PNPM</li>
          <li>Webpack</li>
          <li>NPM Workspaces / Rush</li>
          <li>GitLab</li>
          <li>NodeJS</li>
          <li>Linux</li>
        </ul>
        <br/>
        <ul>
          <li>Agile</li>
          <li>Scrum</li>
        </ul>
      </section>

      <h2><Icon name="school"/> Education</h2>
      <section>
        <h3>Incomplete Higher Education</h3>
        <section>
          <Icon name="castle"/>  <a href="https://english.spbstu.ru/">Peter the Great St.Petersburg Polytechnic University</a>, Higher School of Supercomputer Science and Technology<br/>
          <Icon name="crop_free"/>  Informatics and Computer Engineering<br/>
          <Icon name="calendar_clock"/> Sep, 2019 - May, 2021 <i>(1.5 years)</i>
        </section>

        <h3>Secondary vocational education</h3>
        <section>
          <Icon name="castle"/>  <a href="https://edu.itmo.ru/ru/">ITMO University</a>, Faculty of secondary vocational education<br/>
          <Icon name="crop_free"/>  Information Technologies<br/>
          <Icon name="calendar_clock"/> Sep, 2013 - Jul, 2017
        </section>
      </section>

      <h2> <Icon name="language"/> Languages</h2>
      <section>
        Russian: Native<br/>
        English: B2
      </section>

      <h2> <Icon name="link"/> Links</h2>
      <section>
        <ul>
          <li><a href="https://github.com/tushinski">GitHub</a></li>
        </ul>
      </section>
    </>
  )
}
