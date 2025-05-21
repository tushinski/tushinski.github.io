import React from 'react'
import { Icon } from '../markup/icon/icon'
import s from './resume-content.module.scss'

type Props = {}

export const ResumeContent: React.FC<Props> = () => {
  return (
    <div className={s.content}>
      <h1>Alex Tushinski</h1>
      <section>
        <Icon name="person"/> Frontend Developer / Team Lead <br/>
        <Icon name="calendar_month"/> 7 years of experience <br/>
        <Icon name="location_on"/> Saint-Petersburg, Russian Federation <br/>
        <Icon name="chat" /> Telegram: <a href="https://t.me/tushinski">@tushinski</a> <br/>
      </section>
      <h2> <Icon name="work"/> Employment history</h2>
      <section>
        <h3> Lead Frontend Developer</h3>
        <section>
          <Icon name="corporate_fare"/>  <a href="https://tech.vk.com/">VK Tech</a><br/>
          <Icon name="calendar_clock"/>  Mar 2025 - Present
        </section>

        <h3> Team Lead</h3>
        <section>
          <Icon name="corporate_fare"/>  <a href="https://tech.vk.com/">VK Tech</a><br/>
          <Icon name="calendar_clock"/>  Oct 2024 - Mar 2025 <br/>
          <br/>
          Project: a no-code solution for automation of business processes.
        </section>

        <h3> Product Owner (Corporate startup)</h3>
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
            <li>calculation of project budget for 5 years</li>
            <li>communication with the financial department</li>
            <li>definition of key metrics and projects KPIs</li>
            <li>creation of a 2-years project plan including resources and recruitment planning</li>
          </ul>
        </section>

        <h3> Senior Frontend Developer</h3>
        <section>
          <Icon name="corporate_fare"/>  <a href="https://vkplay.ru/">VK Play</a><br/>
          <Icon name="calendar_clock"/>  Nov 2021 - Mar 2024<br/>
          <br/>
          Projects: four SPAs (monorepo)<br/>
          <br/>
          Responsibilities:
          <ul>
            <li>monorepo maintenance</li>
            <li>development of shared monorepo libraries</li>
            <li>development of new features (for different projects)</li>
            <li>code refactoring</li>
            <li>code review</li>
            <li>participation in sprint plannings</li>
            <li>tasks decomposition</li>
            <li>participation in sprint plannings</li>
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
            <li>tasks decomposition</li>
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

    </div>
  )
}
