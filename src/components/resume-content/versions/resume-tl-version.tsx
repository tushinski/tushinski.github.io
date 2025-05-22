import React from 'react'
import { Icon } from '../../markup/icon/icon'

type Props = {}

// TODO: improve
export const ResumeTLVersion: React.FC<Props> = () => {
  return (
    <>
      <h1>Alex Tushinski</h1>
      <section>
        <Icon name="person"/> Frontend Team Lead / Frontend Developer<br/>
        <Icon name="calendar_month"/> 7 years of experience <br/>
        <Icon name="location_on"/> Saint-Petersburg, Russian Federation <br/>
        <Icon name="chat" /> <a href="https://t.me/tushinski">@tushinski</a> <br/>
      </section>
      <h2> <Icon name="work"/> Employment history</h2>
      <section>
        <h3> Lead Frontend Developer</h3>
        <section>
          <Icon name="corporate_fare"/>  <a href="https://tech.vk.com/">VK Tech</a><br/>
          <Icon name="calendar_clock"/>  Mar 2025 - Present<br/>
          <br/>
          Projects: <a href="https://biz.mail.ru/teams/">VK Teams</a> (Web Version), <a href="https://biz.mail.ru/">VK Workspace</a> Admin Panel (B2B)<br/>
          <br/>
          Responsibilities:
          <ul>
            <li>development of new features</li>
            <li>technical leadership / knowledge sharing</li>
            <li>participation in activities of a dev community</li>
            <li>code refactoring</li>
            <li>cross-team code review</li>
            <li>technical design of new features (UI/UX, web APIs)</li>
            <li>technical elaboration of new product features (quality gates)</li>
            <li>tasks decomposition/estimation</li>
          </ul>
        </section>

        <h3> Team Lead</h3>
        <section>
          <Icon name="corporate_fare"/>  <a href="https://tech.vk.com/">VK Tech</a><br/>
          <Icon name="calendar_clock"/>  Oct 2024 - Mar 2025 <br/>
          <br/>
          Project: a no-code solution for automation of business processes.<br/>
          <br/>
          Responsibilities:
          <ul>
            <li>design of project architecture</li>
            <li>communication with PM, CPO, CTO</li>
            <li>communication with SRE and DevOps teams</li>
            <li>communication with QA team</li>
            <li>development planning</li>
            <li>organization of conducting SCRUM rituals <i>(sprint planning/pre-planning, retro, backlog grooming, etc.)</i></li>
            <li>team management <i>(1-1 meets, status meets, team goals, performance review etc.)</i></li>
            <li>development of a complex frontend library</li>
            <li>development of new web services (Golang)</li>
            <li>writing user documentation</li>
            <li>code review</li>
          </ul>
        </section>

        <h3> Product Owner</h3>
        <section>
          <Icon name="corporate_fare"/>  <a href="https://vk.company/">VK</a><br/>
          <Icon name="calendar_clock"/>  Mar 2024 - Oct 2024<br/>
          <br/>
          Project: a no-code solution for automation of business processes.<br/>
          <br/>
          Responsibilities:
          <ul>
            <li>project design</li>
            <li>market analysis</li>
            <li>analysis of economic effects</li>
            <li>communication with stakeholders</li>
            <li>creation of a business model</li>
            <li>definition of key metrics and projects KPIs</li>
            <li>creation of a 2-years project plan including resources and recruitment planning</li>
            <li>describing the general product strategy</li>
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
            <li>monorepo maintenance</li>
            <li>development of shared monorepo libraries <i>(including an UI components library)</i></li>
            <li>development of new features</li>
            <li>code refactoring</li>
            <li>code review</li>
            <li>writing tests</li>
            <li>participation in sprint plannings</li>
            <li>tasks decomposition/estimation</li>
            <li>participation in interviews with candidates</li>
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
            <li>development of new features</li>
            <li>code review</li>
            <li>code refactoring</li>
            <li>tasks decomposition/estimation</li>
            <li>mentoring</li>
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
            <li>development of new projects from scratch</li>
            <li>close cooperation with a designer</li>
            <li>participation in designing web APIs</li>
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
          <li>SOLID</li>
          <li>Design Patterns</li>
          <li>Functional Programming</li>
          <li>ROP</li>
          <li>KISS, DRY, YAGNI</li>
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
