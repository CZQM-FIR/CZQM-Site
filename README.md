# CZQM FIR New Site Project

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

- Use `npm run download` to download all dependancies.
- Use `lerna run dev` to run a hot swapable dev server on `localhost:3000`.
- Use `lerna run build` to compile to production files.

## Info

- Built using HTML5, CSS, Vue (w/ Vite).
- All internal links **MUST** be router-links.
- All commits must use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Use NPM only, not Yarn. For consistancy.
- Any external API requests *should* go through the backend server and should have some form of caching.

## Roles

Roles are numbered starting at zero (0) through to ten (10). Each role level can be seen below and are used to assign permissions. Admin have their own permission level and it consists of everything above or equal to eight (8). Users shall only be given the permissions that they require and no more.

0. Anyone with a VATSIM account (No special access)
1. Visiting Controller
2. Home Controller
3. Mentor
4. Instructor
5. Events
6. Sector Engineer
7. Chief Instructor
8. Deputy Chief (Admin)
9. Webmaster (Admin)
10. FIR Chief (Admin)

## Flags

These flags may be assigned to users to change permissions, display role and more. All flags must be in all lowercase.

* **staff** - Access to staff portal, all FIR staff (Automated)
* **staff-instructing** - Access to any instructing resources and pages (Automated)
* **instructor** - Display role as instructor
* **mentor** - Display role as instructor
* **chief** - DIsplay role as chief
* **deputy** - Display role as deputy chief
* **chief-instructor** - Display role as chief instructor
* **web** - Display role as webmaster
* **events** - Display role as event coordinator
* **sector** - Display role as sector engineer
* **roster** - *Not a valid flag, see sub flags*
  * **-gnd** - Ground roster state
  * **-twr** - Tower roster state
  * **-app** - Approach roster state
  * **-ctr** - Center roster state
  * *Note: all (except fss) roster subflags must have one of the following suffixes*

    * **-sup** - Under Supervision
    * **-solo** - Solo Certified
    * **-cert** - Fully certified
  * Note: Gnd can only accept -sup and -cert
  * Note: remove the flag entirely to be not certified
* **fss** - User certified for fss
* **admin** - Full admin perms
* **controller** - Home Controller
* **visitor** - Visiting Controller
* **no-email** - Skip user when sending email broadcasts

## Contributors

Thank you to those who helped build this site: ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore-start -->

<!-- markdownlint-disable -->

<table>
  <tr>
    <td align="center"><a href="https://github.com/Jagardstrong"><img src="https://avatars.githubusercontent.com/u/99367993?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jagardstrong</b></sub></a><br /><a href="#ideas-Jagardstrong" title="Ideas, Planning, & Feedback">🤔</a> <a href="#content-Jagardstrong" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/GoldenXLence"><img src="https://avatars.githubusercontent.com/u/65452167?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jack Koskie</b></sub></a><br /><a href="https://github.com/CZQM-FIR/CZQM-Site/commits?author=GoldenXLence" title="Code">💻</a> <a href="#content-GoldenXLence" title="Content">🖋</a> <a href="#design-GoldenXLence" title="Design">🎨</a> <a href="#ideas-GoldenXLence" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://renovatebot.com"><img src="https://avatars.githubusercontent.com/u/38656520?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Renovate Bot</b></sub></a><br /><a href="#tool-renovatebot" title="Tools">🔧</a> <a href="https://github.com/CZQM-FIR/CZQM-Site/issues?q=author%3Arenovatebot" title="Bug reports">🐛</a> <a href="#security-renovatebot" title="Security">🛡️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->

<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
