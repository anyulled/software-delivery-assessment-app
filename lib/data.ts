import { Assessment, PageResult, UserResults } from './types';
import { TrackerBlockProps } from '@tremor/react/dist/components/vis-elements/Tracker/Tracker';
import { colorIndicator, getAverageScore } from './functions';

export const assessment: Assessment = {
  topics: [
    {
      name: 'Continuous Delivery',
      description:
        'Based on:\n' +
        '\n' +
        'the key practices in the book Continuous Delivery by Jez Humble and Dave Farley\n' +
        "the book Continuous Delivery with Windows and .NET by Matthew Skelton and Chris O'Dell\n" +
        'the summary of the Continuous Delivery practices at CDchecklist.info.\n' +
        'Purpose: Assess the awareness and performance of the team regarding key Continuous Delivery practices\n' +
        '\n' +
        "Method: Use the Spotify Squad Health Check approach to assess the team's answers to the following questions, and also capture the answers:",
      questions: [
        {
          id: 1,
          name: 'Release Candidate',
          description: 'Every Check-in Leads to a Potential Release ',
          minimumText:
            'We have special "Release Candidate" builds occasionally',
          maximumText:
            'Any check-in can generate a build that might go to Production without a further build'
        },
        {
          id: 2,
          name: 'Done',
          description:
            'Done Means Released [that is, released into Production and not causing problems]',
          minimumText:
            'Our Definition of Done means "feature tests have passed"',
          maximumText:
            'Our Definition of Done means that the changes are deployed to Production with monitoring to ensure they have not broken anything'
        },
        {
          id: 3,
          name: 'Automated Config',
          description:
            'Configuration should always be performed by automated processes using values taken from your configuration repository',
          minimumText:
            'Many of our applications and tests are configured manually each time',
          maximumText: 'All configuration is done using scripts'
        },
        {
          id: 4,
          name: 'Config Options',
          description:
            'It should be easy for anyone to see what configuration options are available for a particular version of an application across all environments it will be deployed into',
          minimumText:
            'We have to run diffs against different files, some in version control, some taken from live servers',
          maximumText:
            'We have an API or UI to show the config options deployed to any environment'
        },
        {
          id: 5,
          name: 'Broken Builds',
          description:
            'Don’t Check In on a Broken Build [except to fix the broken build!]',
          minimumText: 'We cannot easily know when our team has broken a build',
          maximumText:
            'We guard the build with care and never check-in on a broken build'
        },
        {
          id: 6,
          name: 'Failing Tests',
          description: 'Don’t Comment Out Failing Tests',
          minimumText:
            'We switch off failing tests to get the build or pipeline working',
          maximumText:
            'We trust our tests; if the tests are failing, then something is wrong and we go and fix it'
        },
        {
          id: 7,
          name: 'Binaries',
          description:
            'Only Build Your Binaries Once [no special "release candidate" builds]',
          minimumText:
            'We have multiple different builds and then merge to create the final Release Candidate',
          maximumText:
            'We have only a single build to produce a binary artifact which then gets promoted through all environments with no additional merging or building needed'
        },
        {
          id: 8,
          name: 'Stop The Line',
          description:
            'If Any Part of the Pipeline Fails, Stop the Line [everyone stops feature work and fixes the problem]',
          minimumText:
            'The pipeline fails so often that it is difficult to know which team broke the build',
          maximumText:
            'If the pipeline fails, it is very clear which team is responsible and so we stop our work immediately to fix the problem'
        },
        {
          id: 9,
          name: 'Idempotent Deployment',
          description:
            'Ensure the Deployment Process Is Idempotent [we can deploy the same version repeatedly with the same result]',
          minimumText: 'It is difficult to get repeatable deployments',
          maximumText:
            'We can redeploy the same version many times with the same result'
        },
        {
          id: 10,
          name: 'Stubs',
          description:
            "Use Stubs to Simulate External Systems [treat almost every other system as 'external'!]",
          minimumText:
            'There are few stubs available and we do not have enough time to write the stubs ourselves',
          maximumText:
            'The stubs we consume and write are good quality and give us a high degree of confidence that our tests are working well'
        },
        {
          id: 11,
          name: 'API Replay',
          description: 'Record Interactions against a Service or Public API',
          minimumText:
            'We have no way to record requests/responses from a remote API',
          maximumText:
            'We record key requests/responses from remote APIs which we use to build high-fidelity integration tests'
        },
        {
          id: 12,
          name: 'Blue-Green',
          description:
            'Use Blue-Green Deployments [at a granular level] - this means any mechanism that allows you to test a new version alongside an existing version and rollback to the older version if necessary',
          minimumText: 'We do not use any blue-green deployment techniques',
          maximumText:
            'We use fine-grained blue-green deployment techniques - at the level of individual services'
        },
        {
          id: 13,
          name: 'Environment History',
          description:
            'It should be possible to see a history of changes made to every environment, including deployments',
          minimumText: 'We do not use any blue-green deployment techniques',
          maximumText:
            'We have a nice dashboard or log of changes to every environment'
        },
        {
          id: 14,
          name: 'DB Changes',
          description:
            'Decouple Application Deployment from Database Migration [and from other data-rich services] - this relates to shared databases',
          minimumText:
            'We must deploy our application or service together with the database or data layer',
          maximumText:
            'Our application or service is completely decoupled from the underlying database or data layer'
        }
      ]
    },
    {
      name: 'Flow',
      description:
        'Based on the key assessment criteria from:\n' +
        '\n' +
        'Accelerate by Nicole Forsgren, Jez Humble, and Gene Kim\n' +
        'Principles of Product Development Flow by Don Reinertsen\n' +
        'Team Guide to Metrics for Business Decisions by Mattia Battiston and Chris Young\n' +
        'Purpose: Assess the awareness and performance of the team regarding end-to-end delivery metrics',
      questions: [
        {
          id: 1,
          name: 'Cycle Time',
          description:
            'How long does it take for a code change to go from version control to running in Production? (Minimum, Typical)',
          minimumText: '2 weeks or more',
          maximumText: '1 hour or less'
        },
        {
          id: 2,
          name: 'Deployment Frequency',
          description: 'How often does your team deploy to Production?',
          minimumText: 'Every 2 weeks or longer in practice',
          maximumText: 'Every 2 days or less'
        },
        {
          id: 3,
          name: 'MTTR',
          description:
            'How long does it take to restore your application or service after an incident?',
          minimumText: 'We have no idea - we do not track this',
          maximumText:
            'We track MTTR and we restore service in 10 mins automatically and test this in the deployment pipeline'
        },
        {
          id: 4,
          name: 'Failed Changes',
          description:
            'What proportion of changes to your application or service in Production fail or need remediation? (This is typically the number of failed deployments)',
          minimumText:
            'More than 20% of our changes/deployments fail in Production',
          maximumText:
            'Less than 5% of our changes/deployments fail in Production'
        },
        {
          id: 5,
          name: 'Work in Progress',
          description:
            'How many things does your team work on at the same time? (Minimum, Typical)',
          minimumText:
            'We have significantly more Work In Progress (WIP) items than team members',
          maximumText:
            'We have explicitly limited our WIP based on queuing theory (or Cost of Delay) and the WIP is equal to or less than the number of people in our team'
        },
        {
          id: 6,
          name: 'Innovation',
          description:
            'How well are you able to innovate around delivery approaches?',
          minimumText: 'We do not have time to innovate',
          maximumText:
            'We make or reserve time for delivery innovation every week and track progress as part of our team metrics'
        },
        {
          id: 7,
          name: 'Onboarding',
          description:
            'How effective is the onboarding process for new teams and new staff?',
          minimumText:
            'The onboarding process is incredibly difficult and really hampers progress',
          maximumText:
            'The onboarding process is very simple, straightforward, and clear.'
        },
        {
          id: 8,
          name: 'Branch Age',
          description: 'How long do your branches live? (other than master)',
          minimumText: 'Our feature branches last for many sprints',
          maximumText:
            'We develop directly on master/trunk and any feature branches last no more then 2 days'
        },
        {
          id: 9,
          name: 'Retrospectives',
          description: 'How effective are your team retrospectives?',
          minimumText: 'We do not have regular retrospectives',
          maximumText:
            'Our retrospectives are really energising/valuable/effective for the team and we look forward to them\n'
        }
      ]
    },
    {
      name: 'Team Topologies',
      description:
        'Based on selected criteria from the following books:\n' +
        '\n' +
        'Team Topologies by Matthew Skelton and Manuel Pais\n' +
        'Dynamic Reteaming by Heidi Helfand\n' +
        'The Team Topologies area on GitHub contains many free and open tools and templates for helping teams to define behaviors and interactions.\n' +
        '\n' +
        'Purpose: Assess the approach to well-defined team interactions within the software system. ',
      questions: [
        {
          id: 1,
          name: 'Team Type',
          description:
            ' Is the type of your team clear to you and to other teams around you?',
          minimumText: 'We do not really have "types" of teams.',
          maximumText:
            'We are very clear about the type of team we are and we make this clear to other teams around us.'
        },
        {
          id: 2,
          name: 'Long-lived Teams',
          description:
            'How durable (long-lived) is your team? When will the team be disbanded?',
          minimumText:
            'Our team will be disbanded or shuffled within 2-3 months AND/OR Our team will be disbanded when the project finishes.',
          maximumText:
            'Our team is durable (long-lived) and will be disbanded only when the software and services we build & run are decommissioned.'
        },
        {
          id: 3,
          name: 'Changing Team Members',
          description:
            'How are team members added or removed from the team? What informs the process?',
          minimumText:
            'Managers decide when to add or remove people from the team. Team members are expected to start being productive immediately.',
          maximumText:
            'We use the principles and practices from Dynamic Reteaming to help build and rebuild teams in a structured, informed way that brings team cohesion, trust, and fresh perspectives.'
        },
        {
          id: 4,
          name: 'Team API',
          description: 'How do you define the remit and focus of the team?',
          minimumText:
            "People can look in our backlog or ticket list to see what we're working on.",
          maximumText:
            "We use the Team API concept from Team Topologies to define, broadcast, and update our team's mission, current focus, and interaction details. We update our Team API on a regular cadence (at least every 2 weeks)."
        },
        {
          id: 5,
          name: 'Team Interactions',
          description:
            'How do you define, plan, and explore the interactions between your team and other teams?',
          minimumText:
            "We interact with other teams when needed (on-demand) OR We don't really define or plan interactions with other teams.",
          maximumText:
            'We use the team interaction modes from Team Topologies to define/plan/explore interactions with other teams to help us work together and improve our product roadmaps.'
        },
        {
          id: 6,
          name: 'Inter-team Dependencies',
          description:
            'What approach to you take to tracking dependencies between teams?',
          minimumText:
            'We discover dependencies once every planning cycle OR We do not track inter-team dependencies.',
          maximumText:
            'We use the team dependency tracking principles from Team Topologies to explore and remove inter-team dependencies that block the flow of change. We update our team dependency tracking information at least every week.'
        },
        {
          id: 7,
          name: 'Team Workspace',
          description:
            'In what ways does your physical and/or online team space contribute to a sense of team cohesion and empowerment?',
          minimumText:
            'We do not have anything that feels like a team space OR Our team space does not feel empowering.',
          maximumText:
            'Our physical space in the office feels empowering as "our" space AND/OR Our online space feels empowering as "our" space.'
        },
        {
          id: 8,
          name: 'Team Cohesion',
          description:
            'How cohesive does your team feel? How much trust is present inside the team?',
          minimumText:
            'Our group does not really act as a team, but more like a collection of individuals with the same manager OR Our team really feels like several sub-teams: we hand off work from one person to another inside the team.',
          maximumText:
            'Our team feels like a single cohesive unit. We all work together and help each other (and challenge each other in a good way) . We prioritize the team goals over individual goals.'
        },
        {
          id: 9,
          name: 'Team Cognitive Load',
          description: "How does team cognitive load affect the team's work?",
          minimumText:
            'Our cognitive load is high OR We do not measure or think about team cognitive load.',
          maximumText:
            'We assess team cognitive load and aim to limit the size of our software to the cognitive load that the team can deal with. We know that if our cognitive load limit is exceeded, we will not be able to build and run our software properly. "Team-sized software" is a design principle for this organization.'
        }
      ]
    },
    {
      name: 'Security',
      description:
        'Based on selected criteria from the following books:\n' +
        '\n' +
        'Agile Application Security by Laura Bell, Michael Brunton-Spall, Rich Smith, Jim Bird\n' +
        'Alice and Bob Learn Application Security by Tanya Janca\n' +
        'Secure by Design by Dan Bergh Johnsson, Daniel Deogun, Daniel Sawano\n' +
        'Continuous Delivery by Jez Humble and Dave Farley\n' +
        'Threat Modeling: Designing for Security by Adam Shostack\n' +
        'The OWASP Top Ten list of application security risks is an excellent starting point for assessing security and securability in software. The game Elevation of Privilege by Adam Shostack was also an influence, especially in the card deck format provided by Agile Stationery.\n' +
        '\n' +
        'Photo of Elevation of Privilege game card deck from Agile Stationery\n' +
        '\n' +
        'Purpose: Assess the approach to security and securability practices within the software system. ',
      questions: [
        {
          id: 1,
          name: 'OWASP Top Ten',
          description: 'Do you check for the the OWASP Top Ten security risks?',
          minimumText:
            'We check for some of the OWASP Top Ten occasionally or manually.',
          maximumText:
            'We have automated checks for the OWASP Top Ten that run on every commit/check-in to our deployment pipeline.'
        },
        {
          id: 2,
          name: 'Secure Design Principles',
          description: 'What is the approach to security and compliance?',
          minimumText:
            'Compliance with a defined set of criteria is more important than taking the time to do good design.',
          maximumText:
            'We value a culture of finding and fixing design issues over checkbox compliance.'
        },
        {
          id: 3,
          name: 'Threat Modeling',
          description: 'How do you approach threat modeling?',
          minimumText:
            'We build a system and put changes into production. Later, we might ask an expert outside the team to try and break it.',
          maximumText:
            'We model our system and review it for threats whenever we are performing design work. We use the four questions frame [1) What are we working on? 2) What can go wrong? 3) What are we going to do about it? 4) Did we do a good job?] to provide structure and repeatability to the process.'
        },
        {
          id: 4,
          name: 'Domain-driven Security',
          description:
            'In what ways to you work with domain experts to help make code secure?',
          minimumText:
            'We use domain experts to define software features but not secure code.',
          maximumText:
            'We use the expertise and viewpoints of domain experts to help us model the domain accurately with deep modeling and domain invariants. This leads to code that is inherently more secure because it uses more specific data types, not just the primitives like String, integer, etc.'
        },
        {
          id: 5,
          name: 'Input Testing',
          description:
            'What kind of input testing do you perform in the deployment pipeline?',
          minimumText:
            'We do not test the inputs into the software application or we rely on client-side validation only.',
          maximumText:
            'We perform at least four types of input testing: Normal input (input that confirms to domain rules), Boundary input (input that conforms only to structural correctness), Invalid input (input like null and strange characters), and Extreme input (such as 40 million characters).'
        },
        {
          id: 5,
          name: 'Input Testing',
          description:
            'What kind of input testing do you perform in the deployment pipeline?',
          minimumText:
            'We do not test the inputs into the software application or we rely on client-side validation only.',
          maximumText:
            'We perform at least four types of input testing: Normal input (input that confirms to domain rules), Boundary input (input that conforms only to structural correctness), Invalid input (input like null and strange characters), and Extreme input (such as 40 million characters).'
        },
        {
          id: 6,
          name: 'Least Privilege',
          description:
            'What approach to you take to access permissions for the accounts used to run your software?',
          minimumText:
            "We don't have a consistent account access policy OR some daemon/Service accounts run as root/Administrator",
          maximumText:
            'We use the Principle Of Least Privilege to restrict ALL daemon/Service accounts to the bare minimum permissions needed. Access via interactive logins is highly restricted.'
        },
        {
          id: 7,
          name: 'Supply-Chain Security',
          description:
            'How do you verify the quality and safety of the external software components used in your software?',
          minimumText:
            'We do not do any supply-chain validation of external code OR we manually verify every line of code in every external component or library.',
          maximumText:
            'We use an open source or commercial code scanning and notification tool to track, report, and alert on vulnerabilities and malicious code in all external code components and libraries.'
        },
        {
          id: 8,
          name: 'HTTPS Everywhere',
          description:
            'Where is HTTPS (HTTP over TLS/SSL) used within your software?',
          minimumText:
            'HTTPS is used for the externally-accessible services and applications only. Internal applications and services use insecure HTTP only OR Some of our publicly accessible services use insecure HTTP.',
          maximumText:
            'All our endpoints - internal and external - use HTTPS (with TLS 1.2 or later) or equivalent secure transport. Security certificates are renewed and installed automatically via a service like LetsEncrypt.'
        },
        {
          id: 9,
          name: 'Automated Security Testing',
          description:
            'What kind of automated security testing is performed on your code and when?',
          minimumText:
            "We don't do any automated security testing OR we run automated security testing at the end of a development cycle",
          maximumText:
            'We run automated security checks on the code automatically on every check-in/commit (using tools such as OWASP ZAP) AND software developers can run similar checks before code check-in/commit to increase their awareness of security issues.'
        },
        {
          id: 10,
          name: 'Responsibility for Security',
          description:
            'Who is responsible for the security and securability of your software?',
          minimumText:
            'A separate Security team reviews our code and performs a "sign-off" before deployment to production/live.',
          maximumText:
            'We (the engineers developing the software) are responsible for the security and securability of the software. We seek and get regular help and mentoring from security experts, and we use security and securability features from an internal platform (or external tools) to help us make our software secure and securable.'
        },
        {
          id: 11,
          name: 'Policy as Code',
          description:
            'Are security policies defined in code (or configuration) and testable?',
          minimumText:
            'We do not use policy-as-code for defining and testing security policies.',
          maximumText:
            'We use policy-as-code (such as Open Policy Agent) for defining and testing security policies. \nThe policy-as-code is co-authored with security experts together with engineers.'
        }
      ]
    },
    {
      name: 'Deployment',
      description:
        'Based on the maturity questions from Mirco Hering, author of DevOps for the Modern Enterprise\n' +
        '\n' +
        'Purpose:  Assess the confidence of the team in the deployment practices for its software',
      questions: [
        {
          id: 1,
          name: 'Environment Rebuild',
          description:
            'What would happen if we decided to: blow away the environment and rebuild it from our stored configuration',
          minimumText:
            "We don't know what would happen - the environments are flaky",
          maximumText:
            'No problem - we test this in the deployment pipeline already'
        },
        {
          id: 2,
          name: 'Fresh Config',
          description:
            'What would happen if we decided to: delete the application config and redeploy it',
          minimumText:
            "We don't know what would happen - the configuration process is flaky",
          maximumText:
            'No problem - we test this in the deployment pipeline already'
        },
        {
          id: 3,
          name: 'Redeploy App',
          description:
            'What would happen if we decided to: redeploy the application even though nothing has changed',
          minimumText:
            "We don't know what would happen - the deployments are flaky",
          maximumText:
            'No problem - we test this in the deployment pipeline already'
        },
        {
          id: 4,
          name: 'Rerun Tests',
          description:
            'What would happen if we decided to: rerun the test suite and then again',
          minimumText:
            "We don't know what would happen - the test suite is really flaky",
          maximumText:
            'No problem - we test this in the deployment pipeline already'
        }
      ]
    },
    {
      name: 'Operability',
      description:
        'Based on the operability assessment questions from Team Guide to Software Operability by Matthew Skelton, Alex Moore, and Rob Thatcher at OperabilityQuestions.com\n' +
        '\n' +
        'Purpose: Assess the awareness and practices of the team in relation to software operability - readiness for Production',
      questions: [
        {
          id: 1,
          name: 'Collaboration',
          description:
            'How often and in what ways do we collaborate with other teams on operational aspects of the system such as operational features (logging, monitoring, alerting, etc.) and NFRs?',
          minimumText:
            'We respond to the need for operational aspects after go-live when tickets are raised by the live service teams',
          maximumText:
            'We collaborate on operational aspects from the very first week of the engagement/project'
        },
        {
          id: 2,
          name: 'Spend on operability',
          description:
            'What proportion of product budget and team effort is spent addressing operational aspects? How do you track this? [Ignore infrastructure costs and focus on team effort]',
          minimumText:
            'We try to spend as little time and effort as possible on operational aspects / We do not track the spend on operational aspects at all',
          maximumText:
            'We spend around 30% of our time and budget addressing operational aspects and raise an alert if focus on operational aspects drops'
        },
        {
          id: 3,
          name: 'Feature Toggles',
          description:
            'How do we know which feature toggles (feature switches) are active for this subsystem?',
          minimumText:
            'We need to run diffs against config files to determine which feature toggles are active',
          maximumText:
            'We have a simple UI or API to report the active/inactive feature flags in an environment'
        },
        {
          id: 4,
          name: 'Config deployment',
          description:
            'How do we deploy a configuration change without redeploying the software?',
          minimumText:
            'We cannot deploy a configuration change without deploying the software or causing an outage',
          maximumText:
            'We simply run a config deployment separately from the software / We deploy config together with the software without an outage'
        },
        {
          id: 5,
          name: 'System health',
          description:
            'How do we know that the system is healthy (or unhealthy)?',
          minimumText:
            'We wait for checks made manually by another team to tell us if our software is healthy',
          maximumText:
            'We query the software using a standard HTTP health check URL, returning HTTP 200/500, etc. based on logic that we write in the code, and with synthetic transaction monitoring for key scenarios'
        },
        {
          id: 6,
          name: 'Service KPIs',
          description:
            'How do we track the main service/system Key Performance Indicators (KPIs)? What are the KPIs?',
          minimumText: 'We do not have service KPIs defined',
          maximumText:
            'We use logging and/or time series metrics to emit service KPIs that are picked up by a dashboard'
        },
        {
          id: 7,
          name: 'Logging working',
          description: 'How do we know that logging is working correctly?',
          minimumText: 'We do not test if logging is working',
          maximumText:
            'We test that logging is working using BDD feature tests that search for specific log message strings after a particular application behaviour is executed and we can see logs appear correctly in the central log aggregation/search system'
        },
        {
          id: 8,
          name: 'Testability',
          description:
            'How do we show that the software system is easy to test? What do we provide and to whom?',
          minimumText:
            'We do not explicitly aim to make our software easily testable',
          maximumText:
            'We run clients and external test packs against all parts of our software within our deployment pipeline'
        },
        {
          id: 9,
          name: 'TLS Certs',
          description:
            'How do we know when an SSL/TLS certificate is close to expiry?',
          minimumText:
            'We do not know when our certificates are going to expire',
          maximumText:
            'We use auto-renewal of certificates combined with certificate monitoring/alerting tools to keep a live check on when certs will expire so we can take remedial action ahead of time'
        },
        {
          id: 10,
          name: 'Sensitive data',
          description:
            'How do we ensure that sensitive data in logs is masked or hidden?',
          minimumText: 'We do not test for sensitive data in logs',
          maximumText:
            'We test that data masking is happening by using BDD feature tests that search for specific log message strings after a particular application behaviour is executed'
        },
        {
          id: 11,
          name: 'Performance',
          description:
            'How do we know that the system/service performs within acceptable ranges?',
          minimumText:
            'We rely solely on the Performance team to validate the performance of our service or application',
          maximumText:
            'We run a set of indicative performance tests within our deployment pipeline that are run on every check-in to version control'
        },
        {
          id: 12,
          name: 'Failure modes',
          description:
            'How can we see and share the different known failure modes (failure scenarios) for the system?',
          minimumText: 'We do not really know how the system might fail',
          maximumText:
            'We use a set of error identifiers to define the failure modes in our software and we use these identifiers in our log messages'
        },
        {
          id: 13,
          name: 'Call tracing',
          description:
            'How do we trace a call/request end-to-end through the system?',
          minimumText: 'We do not trace calls through the system',
          maximumText:
            'We use a standard tracing library such as OpenTracing to trace calls through the system. We collaborate with other teams to ensure that the correct tracing fields are maintained across component boundaries.'
        },
        {
          id: 14,
          name: 'Service status',
          description:
            'How do we display the current service/system status to operations-facing teams?',
          minimumText:
            'Operations teams tend to discover the status indicators themselves\t',
          maximumText:
            'We build a dashboard in collaboration with the Operations teams so they have all the details they need in a user-friendly way with UX a key consideration\n'
        }
      ]
    },
    {
      name: 'Reliability',
      description: '',
      questions: [
        {
          id: 1,
          name: 'Service Availability',
          description:
            'How available (in "nines") does your service or application need to be and how do you know or decide?',
          minimumText:
            'We don\'t know how available our service needs to be --OR-- The availability "needs to be 100%".',
          maximumText:
            'The reliability is based on clear business priorities and is less than 100%.'
        },
        {
          id: 2,
          name: 'User Goals and SLIs',
          description:
            'What should your service/application do from the viewpoint of the user?',
          minimumText:
            'We do not have a clear definition of what our application or service does from the user perspective.',
          maximumText:
            'We have clear, user-centric definitions of the application/service capabilities and outcomes from a user perspective.'
        },
        {
          id: 3,
          name: 'Understanding users and behavior',
          description:
            'Who are the users of the software and how do they interact with the software? How do you know?',
          minimumText:
            "We don't really know how our users interact with our application/service --OR-- We don't really know who our users are.",
          maximumText:
            'We have user personas validated through user research and we measure and track usage of the applications/services using digital telemetry.'
        },
        {
          id: 4,
          name: 'SLIs/SLOs',
          description:
            'How do you know when users have experienced an outage or unexpected behaviour in the software?',
          minimumText:
            'We know there is an outage or problem when users complain via chat or the help desk.',
          maximumText:
            'We proactively monitor the user experience using synthetic transactions across the key user journeys.'
        },
        {
          id: 5,
          name: 'Service Health',
          description:
            'What is the single most important indicator or metric you use to determine the health and availability of your software in production/live?',
          minimumText:
            "We don't have a single key metric for the health and availability of the application/service.",
          maximumText:
            'We have a clear, agreed key metric for each application/service and we display this figure on a team-visible dashboard. The dashboard data is updated at least every 10 minutes.'
        },
        {
          id: 6,
          name: 'SLIs',
          description:
            'What combination of three or four indicators or metrics do you use (or could/would you use) to provide a comprehensive picture of the health and availability of your software in production/live?',
          minimumText:
            "We don't have a set of key metrics for the health and availability of the application/service.",
          maximumText:
            'We have a clear, agreed set of key metrics for each application/service and we display this figure on a team-visible dashboard. The dashboard data is updated at least every 10 minutes.'
        },
        {
          id: 7,
          name: 'Error Budget and similar mechanisms',
          description:
            'How does the team know when to spend time on operational aspects of the software (logging, metrics, performance, reliability, security, etc.)? Does that time actually get spent?',
          minimumText:
            'We spend time on operational aspects only when there is a problem that needs fixing.',
          maximumText:
            'We allocate between 20% and 30% of our time for working on operational aspects and we check this each week. We alert if we have not spent time on operational aspects --OR-- We use SRE Error Budgets to plan our time spent on operational aspects.'
        },
        {
          id: 8,
          name: 'Alerting',
          description:
            'What proportion (approximately) of your time and effort as a team do you spend on making alerts and operational messages more reliable and more relevant?',
          minimumText:
            'We spend as little time as possible on alerts and operational messages - we need to focus on user-visible features.',
          maximumText:
            'We regularly spend time reviewing and improving alerts and operational messages.'
        },
        {
          id: 9,
          name: 'Toil and fixing problems',
          description:
            'What proportion (approx) of your time gets taken up with incidents from live systems and how predictable is the time needed to fix problems?',
          minimumText:
            'We do not deal with issues from live systems at all - we focus on new features --OR-- live issues can really affect our delivery cadence and are very disruptive.',
          maximumText:
            'We allocate a consistent amount of time for dealing with live issues --OR-- one team member is responsible for triage of live issues each week OR we rarely have problems with live issues because the software works well.'
        },
        {
          id: 10,
          name: 'Time to Diagnose',
          description:
            'How long does it typically take to diagnose problems in the live/production environment? This is the time taken to understand and pinpoint what is wrong (not to fix or remediate the problem).',
          minimumText:
            'It can take hours or days to diagnose most problems in live/production.',
          maximumText:
            'It typically takes seconds or minutes to diagnose most problems in live/production.'
        }
      ]
    },
    {
      name: 'on-Call',
      description:
        'Based on selected criteria from the following books:\n' +
        '\n' +
        'Site Reliability Engineering by Betsy Beyer, Chris Jones, Jennifer Petoff, & Niall Murphy\n' +
        'The Site Reliability Workbook edited by Betsy Beyer, Niall Richard Murphy, David K. Rensin, Kent Kawahara, & Stephen Thorne\n' +
        'Team Guide to Software Operability by Matthew Skelton, Alex Moore, & Rob Thatcher\n' +
        'Definition of on-call: for this assessment, "on-call" means being available and responsible for diagnosing and fixing (through workarounds or updated code) any problems in the live/production systems that relate to software that you and your team creates and evolves. You might be available during working hours or outside of working hours\n' +
        '\n' +
        'NOTE: The subject of on-call is very emotive and there is significant context and nuance behind the assessment criteria here. We recommend that you read at least these two articles:\n' +
        '\n' +
        'On Call Shouldn’t Suck: A Guide For Managers\n' +
        'On-call doesn’t have to suck\n' +
        'Try to understand the social context in which the criteria for Tired and Inspired would make sense. At one extreme, paying people 3x or 4x normal salary to be on-call could incentivize more bugs reaching the live systems (because the more problems that occur in live, the more money they get paid for being on-call); conversely, having on-call open only to those people with compatible home lives could exclude many people with home care responsibilities, depriving them of valuable experience.\n' +
        '\n' +
        'Purpose: Assess the approach to on-call support within the software system. ',
      questions: [
        {
          id: 1,
          name: 'Purpose of on-call',
          description: 'How would you define "on-call"?',
          minimumText:
            "On-call is a way to get developers to fix problems that people in Support or Live Services don't know how to fix.",
          maximumText:
            'On-call is a sensing mechanism to help teams build better software.'
        },
        {
          id: 2,
          name: 'Benefits of on-call',
          description:
            'What are some ways in which the software benefits by having developers on-call?',
          minimumText: 'Bugs are fixed quickly.',
          maximumText:
            'The needs of all kinds of users can be better understood by having team members on-call. We can better empathise with primary/secondary/tertiary users by seeing the problems for ourselves.\n'
        },
        {
          id: 3,
          name: 'Reward',
          description:
            'How are you rewarded for being on-call out of working hours?',
          minimumText:
            'Significant compensation/money - 3x or 4x normal salary - plus additional time off. The more bugs in the software that reach live/production, the more money we make.\t',
          maximumText:
            'We are recognized for our increasing skills as engineers: experience from on-call counts towards our performance reviews. We may also get some time off to recover from out-of-hours on-call and/or some additional money for out-of-hours on-call. Overall, on-call feels valuable for our careers.\n'
        },
        {
          id: 4,
          name: 'On-call UX',
          description:
            'What is the User Experience (UX) / Developer Experience (DevEx) of being on-call at the moment?',
          minimumText: 'It is painful and slow to diagnose problems.',
          maximumText:
            'The tools and access rights make diagnosis exciting and an opportunity to learn.'
        },
        {
          id: 5,
          name: 'Learning from on-call',
          description:
            'What happens to knowledge gained during on-call? How is the software improved based on on-call experiences?',
          minimumText:
            'Little time is allocated to fix problems after they are discovered when on-call.',
          maximumText:
            "Learning from on-call is used to prioritise key aspects of the team's work."
        },
        {
          id: 6,
          name: 'Attitude to on-cal',
          description:
            'Under what circumstances would on-call not be a burden?',
          minimumText:
            'On-call would not be a burden if we never had to do it.',
          maximumText:
            "On-call is not a burden - it's a privilege to be able to learn how the software actually works."
        },
        {
          id: 7,
          name: 'Future on-call ',
          description:
            'What would be needed for this team/squad to be happy to be on-call?',
          minimumText:
            'We would want significant additional money/compensation.',
          maximumText:
            'We would want a great UX/DevEx and opportunity to learn when on-call.'
        },
        {
          id: 8,
          name: 'Tooling for on-call',
          description:
            'What tooling or process is missing, ineffective, or insufficient at the moment in relation to on-call?',
          minimumText: 'All aspects of the on-call experience are ineffective.',
          maximumText: 'Only very small things feel like a problem.'
        },
        {
          id: 9,
          name: 'Improving on-call',
          description:
            'How much time do you spend as a team improving the on-call experience? How often do you work on improvements to on-call?',
          minimumText: "We don't have time to improve the on-call experience.",
          maximumText:
            "We make improvements and tweaks to on-call every week - it's continuous and part of our remit."
        },
        {
          id: 10,
          name: 'Flexibility of on-call',
          description:
            'How flexible is the on-call rota or schedule? In what ways does the schedule meet the different needs of team members?',
          minimumText:
            'Everyone must follow the same on-call schedule, including out-of-hours work.',
          maximumText:
            'Team members have flexibility to fit on-call work around their personal commitments and/or can opt to do on-call work solely during working hours (office hours).'
        },
        {
          id: 11,
          name: 'Accessibility of on-cal',
          description:
            'How accessible is on-call? Specifically, what proportion of your team members are actually on-call regularly?',
          minimumText:
            'Only one or two people from our team typically go on-call. Other people find on-call too difficult or confusing.',
          maximumText:
            'Everyone on our team takes part regularly in the on-call rota, whether during office ours or out-of-hours. We all share our on-call experiences and learning.'
        }
      ]
    },
    {
      name: 'Testability',
      description:
        'Based on material from the following books:\n' +
        '\n' +
        'Agile Testing by Lisa Crispin and Janet Gregory\n' +
        'Continuous Delivery by Jez Humble and Dave Farley\n' +
        'Growing Object-Oriented Software by Steve Freeman and Nat Price\n' +
        'Working Effectively with Legacy Code by Michael Feathers\n' +
        'Team Guide to Software Testability by Ash Winter and Rob Meaney and the companion website TestabilityQuestions.com\n' +
        'Purpose: Assess the approach to testing and testability within the software system. ',
      questions: [
        {
          id: 1,
          name: 'Test-first (classes)',
          description:
            'What proportion of the time do you write the test first for methods and classes?',
          minimumText: 'We often do not have time to use a test-first approach',
          maximumText:
            "We use a test-first approach all the time - it's the only way to get good software!"
        },
        {
          id: 2,
          name: 'Test-first (features) ',
          description:
            'What proportion of the time do you write the test first for features and behaviour?',
          minimumText: 'We often do not have time to use a test-first approach',
          maximumText:
            "We use a test-first approach all the time - it's the only way to get good software!"
        },
        {
          id: 3,
          name: 'Unit Test %',
          description:
            'At what code coverage level do you deem your Unit Tests to have succeeded?',
          minimumText: 'Our unit tests succeed with 10% coverage',
          maximumText: 'Our unit tests succeed with 80% or greater coverage'
        },
        {
          id: 4,
          name: 'Feature Tests %',
          description:
            'At what feature coverage level do you deem your Feature Tests (or Behaviour Tests) to have succeeded?',
          minimumText: 'Our feature tests succeed with 10% coverage',
          maximumText: 'Our feature tests succeed with 100% coverage'
        },
        {
          id: 5,
          name: 'Feature Coverage',
          description:
            'What proportion of the features in your code is covered by a Feature Test (or Behaviour Test)?',
          minimumText:
            'Less then 50% of our features have corresponding feature tests',
          maximumText:
            'Every one of our features has at least one corresponding feature test'
        },
        {
          id: 6,
          name: 'Test Data',
          description:
            'What proportion of your test data is generated from scripts and automatically injected into data stores?',
          minimumText: 'We have manual processes for setting up test data',
          maximumText:
            'All our test data is generated from scripts and injected into data stores as part of automated testing'
        },
        {
          id: 7,
          name: 'Deployment',
          description:
            'What proportion of your deployment pipeline code has tests covering the behaviour of build and deployment?',
          minimumText: 'We do not test our build and deployment code',
          maximumText:
            'We have tests (such as Deployment Verification Tests) for the key parts of our build and deployment scripts and the code is modular and well-structured'
        },
        {
          id: 8,
          name: 'Testability',
          description:
            'What proportion of your time is spent on making the software testable?',
          minimumText: 'We do not spend time making our software testable',
          maximumText:
            'We refactor regularly to make our software more testable - every sprint or week'
        },
        {
          id: 9,
          name: 'CDCs/Pact/SemVer',
          description:
            'How much do you use inter-team testing approaches such as Consumer-Driven Contracts (CDCs)/Pact/Semantic Versioning?',
          minimumText:
            'We just use the latest versions of each component or package',
          maximumText:
            'We use CDCs / Pact to help test interface changes. We use Semantic Versioning to communicate the meaning of changes, including any breaking changes. We strive to make no breaking changes at all using the Tolerant Reader pattern.'
        },
        {
          id: 10,
          name: 'Other Code',
          description:
            'How confident are you in the code from other teams in the organisation that you work with or consume (but not write)?',
          minimumText:
            'Code from other teams is really flaky and unpredictable.',
          maximumText:
            'We are confident in using code from other teams due our comprehensive automated test suites'
        }
      ]
    },
    {
      name: 'Team health',
      description:
        "Based on the Spotify Squad Health Check combined with insight from Google's Project Aristotle\n" +
        '\n' +
        'Purpose:  Assess the health and confidence of the team as a delivery unit',
      questions: [
        {
          id: 1,
          name: 'Easy to release',
          description:
            'how easy is it to release a change to the software you work on?',
          minimumText: 'It is difficult to release a change',
          maximumText: 'It is easy and straightforward to release a change'
        },
        {
          id: 2,
          name: 'Suitable process',
          description:
            'how suitable is the process for developing and delivering software?',
          minimumText: 'The process is cumbersome and unhelpful',
          maximumText: 'The process is mostly hidden and we barely feel it'
        },
        {
          id: 3,
          name: 'Tech quality',
          description: '(code base health) - how healthy is the code base?',
          minimumText:
            'Our code base is piled with workarounds and danger areas',
          maximumText: 'Our code base is clean, safe to use, and well-tested'
        },
        {
          id: 4,
          name: 'Value',
          description: 'do you work on valuable things as a team?',
          minimumText: 'We are disconnected from customer or user value',
          maximumText: 'We live and breathe a value-driven team approach'
        },
        {
          id: 5,
          name: 'Speed',
          description: 'how rapidly do you work as a team?',
          minimumText: 'We seem to take a long time to get things done',
          maximumText: 'We deliver work rapidly together'
        },
        {
          id: 6,
          name: 'Mission',
          description: 'how well do you know why you are working on things?',
          minimumText: 'It is rarely clear what our mission is',
          maximumText:
            'We have a clear mission that we share with all stakeholders'
        },
        {
          id: 7,
          name: 'Fun',
          description:
            'how fun is it to work in your team? How much camaraderie and sense of teamwork?',
          minimumText: 'Fun is rarely an aspect of our teamwork',
          maximumText: 'The team is a fun place to be every day'
        },
        {
          id: 8,
          name: 'Learning',
          description: 'how much do you learn as a team?',
          minimumText: 'Fun is rarely an aspect of our teamwork',
          maximumText: 'The team is a fun place to be every day'
        },
        {
          id: 9,
          name: 'Support',
          description: 'how much support do you get as a team?',
          minimumText: 'We get very little support as a team',
          maximumText: 'We are well-supported as a team'
        },
        {
          id: 10,
          name: 'Pawns or players',
          description:
            'how much control do you have over what you work on and how?',
          minimumText: 'We have very little say in what we work on',
          maximumText: 'We have strong influence over what we work on'
        },
        {
          id: 11,
          name: 'Psychological Safety',
          description: 'how safe do you feel to raise concerns?',
          minimumText: 'If we raise concerns we are shouted down and ignored',
          maximumText:
            'Our concerns are valued and used to help improve the team and organisation'
        },
        {
          id: 12,
          name: 'Teams Around Us',
          description:
            'how well do the teams around you work with you and your team?',
          minimumText: 'Teams around us are unhelpful and rude',
          maximumText:
            "Teams around us are very friendly and helpful - it's a joy to work with the other teams"
        },
        {
          id: 13,
          name: 'Delivery Platform',
          description:
            "how effective and easy to use is the delivery platform underpinning your team's delivery?",
          minimumText:
            'The platform seems to obstruct us and is difficult to use',
          maximumText:
            'The platform is a force-multiplier for us and helps us deliver rapidly and safely. We love the platform.'
        },
        {
          id: 14,
          name: 'Management Style',
          description:
            'how effective and appropriate are the approaches by management and other senior stakeholders?',
          minimumText: 'The management approaches really hamper our efforts',
          maximumText:
            'The management approaches help us to deliver rapidly and safely'
        }
      ]
    }
  ]
};

export const userResults: UserResults = {
  user: {
    id: 1,
    name: 'Anyul Rivas',
    email: 'anyul.rivas@ingrammicro.com',
    team: 'Foundation',
    role: 'Software Engineer'
  },
  completionTime: new Date(2023, 7, 22),
  answers: [
    { id: 1, evaluation: 1 },
    { id: 2, evaluation: 1 },
    { id: 3, evaluation: 1 },
    { id: 4, evaluation: 3 },
    { id: 5, evaluation: 2 },
    { id: 6, evaluation: 5 },
    { id: 7, evaluation: 2 },
    { id: 8, evaluation: 2 },
    { id: 9, evaluation: 2 },
    { id: 10, evaluation: 4 },
    { id: 11, evaluation: 1 },
    { id: 12, evaluation: 1 },
    { id: 13, evaluation: 2 },
    { id: 14, evaluation: 1 },
    { id: 15, evaluation: 4 },
    { id: 16, evaluation: 4 },
    { id: 17, evaluation: 4 },
    { id: 18, evaluation: 4 },
    { id: 19, evaluation: 1 },
    { id: 20, evaluation: 1 },
    { id: 21, evaluation: 4 },
    { id: 22, evaluation: 4 },
    { id: 23, evaluation: 3 },
    { id: 24, evaluation: 2 },
    { id: 25, evaluation: 2 },
    { id: 26, evaluation: 1 },
    { id: 27, evaluation: 3 },
    { id: 28, evaluation: 2 },
    { id: 29, evaluation: 3 },
    { id: 30, evaluation: 1 },
    { id: 31, evaluation: 2 },
    { id: 32, evaluation: 4 },
    { id: 33, evaluation: 1 },
    { id: 34, evaluation: 2 },
    { id: 35, evaluation: 4 },
    { id: 36, evaluation: 2 },
    { id: 37, evaluation: 2 },
    { id: 38, evaluation: 3 },
    { id: 39, evaluation: 4 },
    { id: 40, evaluation: 2 },
    { id: 41, evaluation: 4 },
    { id: 42, evaluation: 4 },
    { id: 43, evaluation: 3 },
    { id: 44, evaluation: 2 },
    { id: 45, evaluation: 2 },
    { id: 46, evaluation: 4 },
    { id: 47, evaluation: 5 },
    { id: 48, evaluation: 4 },
    { id: 49, evaluation: 4 },
    { id: 50, evaluation: 4 },
    { id: 51, evaluation: 3 },
    { id: 52, evaluation: 3 },
    { id: 53, evaluation: 1 },
    { id: 54, evaluation: 2 },
    { id: 55, evaluation: 2 },
    { id: 56, evaluation: 3 },
    { id: 57, evaluation: 3 },
    { id: 58, evaluation: 3 },
    { id: 59, evaluation: 4 },
    { id: 60, evaluation: 3 },
    { id: 61, evaluation: 2 },
    { id: 62, evaluation: 1 },
    { id: 63, evaluation: 3 },
    { id: 64, evaluation: 4 },
    { id: 65, evaluation: 2 },
    { id: 66, evaluation: 2 },
    { id: 67, evaluation: 3 },
    { id: 68, evaluation: 3 },
    { id: 69, evaluation: 3 },
    { id: 70, evaluation: 3 },
    { id: 71, evaluation: 3 },
    { id: 72, evaluation: 3 },
    { id: 73, evaluation: 1 },
    { id: 74, evaluation: 4 },
    { id: 75, evaluation: 4 },
    { id: 76, evaluation: 4 },
    { id: 77, evaluation: 2 },
    { id: 78, evaluation: 2 },
    { id: 79, evaluation: 4 },
    { id: 80, evaluation: 5 },
    { id: 81, evaluation: 1 }
  ]
};
const continuousDeliveryData: TrackerBlockProps[] = [
  { color: colorIndicator(1.8), tooltip: 'Release Candidate', key: 1.8 },
  { color: colorIndicator(2.1), tooltip: 'Done', key: 2.1 },
  { color: colorIndicator(3.3), tooltip: 'Automated Config', key: 3.3 },
  { color: colorIndicator(2.5), tooltip: 'Config Options', key: 2.5 },
  { color: colorIndicator(2.9), tooltip: 'Broken Builds', key: 2.9 },
  { color: colorIndicator(3.3), tooltip: 'Failing Tests', key: 3.3 },
  { color: colorIndicator(2.9), tooltip: 'Binaries', key: 2.9 },
  { color: colorIndicator(3.0), tooltip: 'Stop the Line', key: 3.0 },
  { color: colorIndicator(3.7), tooltip: 'Idempotent Deployment', key: 3.7 },
  { color: colorIndicator(2.0), tooltip: 'Stubs', key: 2.0 },
  { color: colorIndicator(2.0), tooltip: 'API Replay', key: 2.0 },
  { color: colorIndicator(1.7), tooltip: 'Blue-Green', key: 1.7 },
  { color: colorIndicator(2.3), tooltip: 'Environment History', key: 2.3 },
  { color: colorIndicator(2.1), tooltip: 'DB Changes', key: 2.1 }
];
const flowData: TrackerBlockProps[] = [
  { color: colorIndicator(1.5), tooltip: 'Cycle Time', key: 1.5 },
  { color: colorIndicator(2.07), tooltip: 'Deployment Frequency', key: 2.0 },
  { color: colorIndicator(2.41), tooltip: 'MTTR', key: 2.4 },
  { color: colorIndicator(3.9), tooltip: 'Failed Changes', key: 3.9 },
  { color: colorIndicator(2.6), tooltip: 'Work in Progress', key: 2.6 },
  { color: colorIndicator(2.26), tooltip: 'Innovation', key: 2.2 },
  { color: colorIndicator(2.57), tooltip: 'Onboarding', key: 2.5 },
  { color: colorIndicator(3.3), tooltip: 'Branch Age', key: 3.3 },
  { color: colorIndicator(3.4), tooltip: 'Retrospectives', key: 3.4 }
];
const teamTopologiesData: TrackerBlockProps[] = [
  { color: colorIndicator(3.71), tooltip: 'Team Type', key: 3.7 },
  { color: colorIndicator(4.5), tooltip: 'Long-lived Teams', key: 4.5 },
  { color: colorIndicator(3.07), tooltip: 'Changing Team Members', key: 3.0 },
  { color: colorIndicator(2.6), tooltip: 'Team API', key: 2.6 },
  { color: colorIndicator(2.5), tooltip: 'Team Interactions', key: 2.5 },
  { color: colorIndicator(2.5), tooltip: 'Inter-team Dependencies', key: 2.5 },
  { color: colorIndicator(3.23), tooltip: 'Team Workspace', key: 3.2 },
  { color: colorIndicator(4.35), tooltip: 'Team Cohesion', key: 4.3 },
  { color: colorIndicator(3.14), tooltip: 'Team Cognitive Load', key: 3.1 }
];
const teamHealthData: TrackerBlockProps[] = [
  { color: 'red', tooltip: 'Easy to release' },
  { color: 'lime', tooltip: 'Suitable process' },
  { color: 'lime', tooltip: 'Tech quality' },
  { color: 'lime', tooltip: 'Value' },
  { color: 'lime', tooltip: 'Speed' },
  { color: 'amber', tooltip: 'Mission' },
  { color: 'amber', tooltip: 'Fun' },
  { color: 'green', tooltip: 'Learning' },
  { color: 'green', tooltip: 'Support' },
  { color: 'yellow', tooltip: 'Pawns or players' },
  { color: 'green', tooltip: 'Psychological Safety' },
  { color: 'amber', tooltip: 'Teams around us' },
  { color: 'amber', tooltip: 'Delivery Platform' },
  { color: 'red', tooltip: 'Management Style' }
];
const testabilityData: TrackerBlockProps[] = [
  { tooltip: 'Test-first (classes)', color: colorIndicator(1.91), key: 1.9 },
  { tooltip: 'Test-first (features)', color: colorIndicator(2.16), key: 2.1 },
  { tooltip: 'Unit Test %', color: colorIndicator(3.33), key: 3.3 },
  { tooltip: 'Feature Tests %', color: colorIndicator(3.12), key: 3.1 },
  { tooltip: 'Feature Coverage', color: colorIndicator(3.1), key: 3.1 },
  { tooltip: 'Test Data', color: colorIndicator(3.3), key: 3.3 },
  { tooltip: 'Deployment', color: colorIndicator(3.07), key: 3.0 },
  { tooltip: 'Testability', color: colorIndicator(3.07), key: 3.0 },
  { tooltip: 'CDCs/Pact/SemVe', color: colorIndicator(2.1), key: 2.1 },
  { tooltip: 'Other Code', color: colorIndicator(3), key: 3 }
];
const securityData: TrackerBlockProps[] = [
  { tooltip: 'OWASP Top Ten', color: colorIndicator(2.64), key: 2.6 },
  {
    tooltip: 'Secure Design Principles',
    color: colorIndicator(2.9),
    key: 2.9
  },
  { tooltip: 'Threat Modeling', color: colorIndicator(2.66), key: 2.6 },
  { tooltip: 'Domain-driven Security', color: colorIndicator(2.8), key: 2.8 },
  { tooltip: 'Input Testing', color: colorIndicator(3.1), key: 3.1 },
  { tooltip: 'Least Privilege', color: colorIndicator(3.6), key: 3.6 },
  { tooltip: 'Supply-Chain Security', color: colorIndicator(3.5), key: 3.5 },
  { tooltip: 'HTTPS Everywhere', color: colorIndicator(3.6), key: 3.6 },
  {
    tooltip: 'Automated Security Testing',
    color: colorIndicator(3.3),
    key: 3.3
  },
  { tooltip: 'Responsibility for Security', color: colorIndicator(3), key: 3 },
  { tooltip: 'Policy as Code', color: colorIndicator(2.2), key: 2.2 }
];
const deploymentData: TrackerBlockProps[] = [
  { tooltip: 'Environment Rebuild', color: colorIndicator(3.1), key: 3.1 },
  { tooltip: 'Fresh Config', color: colorIndicator(3.3), key: 3.3 },
  { tooltip: 'Redeploy App', color: colorIndicator(3.7), key: 3.7 },
  { tooltip: 'Rerun Tests', color: colorIndicator(3.3), key: 3.3 }
];
const operabilityData: TrackerBlockProps[] = [
  { tooltip: 'Collaboration', color: colorIndicator(2.6), key: 2.6 },
  { tooltip: 'Spend on operability', color: colorIndicator(2.8), key: 2.8 },
  { tooltip: 'Feature Toggles', color: colorIndicator(2.1), key: 2.1 },
  { tooltip: 'Config deployment', color: colorIndicator(3.1), key: 3.1 },
  { tooltip: 'System health', color: colorIndicator(3.6), key: 3.6 },
  { tooltip: 'Service KPIs', color: colorIndicator(2.5), key: 2.5 },
  { tooltip: 'Logging working', color: colorIndicator(2.6), key: 2.6 },
  { tooltip: 'Testability', color: colorIndicator(3), key: 3 },
  { tooltip: 'TLS Certs', color: colorIndicator(2.6), key: 2.6 },
  { tooltip: 'Sensitive data', color: colorIndicator(2.9), key: 2.9 },
  { tooltip: 'Performance', color: colorIndicator(2.9), key: 2.9 },
  { tooltip: 'Failure modes', color: colorIndicator(3), key: 3 },
  { tooltip: 'Call tracing', color: colorIndicator(2.9), key: 2.9 },
  { tooltip: 'Service status', color: colorIndicator(3.4), key: 3.4 }
];
const reliabilityData: TrackerBlockProps[] = [
  { tooltip: 'Service Availability', color: colorIndicator(3), key: 3 },
  { tooltip: 'User Goals and SLIs', color: colorIndicator(3), key: 3 },
  {
    tooltip: 'Understanding users and behavior',
    color: colorIndicator(2.6),
    key: 2.6
  },
  { tooltip: 'SLIs/SLOs', color: colorIndicator(2.5), key: 2.5 },
  { tooltip: 'Service Health', color: colorIndicator(2.9), key: 2.9 },
  { tooltip: 'SLIs', color: colorIndicator(2.7), key: 2.7 },
  {
    tooltip: 'Error Budget and similar mechanisms',
    color: colorIndicator(2.5),
    key: 2.5
  },
  { tooltip: 'Alerting', color: colorIndicator(2.5), key: 2.5 },
  { tooltip: 'Toil and fixing problems', color: colorIndicator(2.9), key: 2.9 },
  { tooltip: 'Time to Diagnose', color: colorIndicator(2.6), key: 2.6 }
];
const onCallData: TrackerBlockProps[] = [
  { tooltip: 'Purpose of on-call', color: 'lime' },
  { tooltip: 'Benefits of on-call', color: 'lime' },
  { tooltip: 'Reward', color: 'orange' },
  { tooltip: 'On-call UX', color: 'amber' },
  { tooltip: 'Learning from on-call', color: 'lime' },
  { tooltip: 'Attitude to on-call', color: 'lime' },
  { tooltip: 'Future on-call', color: 'lime' },
  { tooltip: 'Tooling for on-call', color: 'lime' },
  { tooltip: 'Improving on-call', color: 'lime' },
  { tooltip: 'Flexibility of on-call', color: 'lime' },
  { tooltip: 'Accessibility of on-call', color: 'lime' }
];

export const results: PageResult[] = [
  {
    name: 'Continuous Delivery',
    score: getAverageScore(continuousDeliveryData),
    data: continuousDeliveryData,
    enabled: true
  },
  {
    name: 'Flow',
    score: getAverageScore(flowData),
    data: flowData,
    enabled: true
  },
  {
    name: 'Deployment',
    score: getAverageScore(deploymentData),
    data: deploymentData,
    enabled: true
  },
  {
    name: 'Operability',
    score: getAverageScore(operabilityData),
    data: operabilityData,
    enabled: true
  },
  {
    name: 'Testability',
    score: getAverageScore(testabilityData),
    data: testabilityData,
    enabled: true
  },
  {
    name: 'Team Topologies',
    score: getAverageScore(teamTopologiesData),
    data: teamTopologiesData,
    enabled: true
  },
  {
    name: 'Security',
    score: getAverageScore(securityData),
    data: securityData,
    enabled: true
  },
  {
    name: 'Reliability',
    score: getAverageScore(reliabilityData),
    data: reliabilityData,
    enabled: true
  },
  {
    name: 'Team Health',
    score: getAverageScore(teamHealthData),
    data: teamHealthData,
    enabled: false
  },
  {
    name: 'On-Call',
    score: getAverageScore(onCallData),
    data: onCallData,
    enabled: false
  }
];
