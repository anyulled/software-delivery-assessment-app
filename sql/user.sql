## Users
drop table if exists sda.user;

create table if not exists sda.user
(
    id       int auto_increment
        primary key,
    username varchar(15)  not null,
    email    varchar(100) not null,
    name     varchar(50)  not null,
    password varchar(100) not null,
    role     varchar(20)  not null
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_general_ci;

insert into user (email, name, role, username, password)
values ('anyulled@gmail.com', 'Anyul Rivas', 'ADMIN', 'anyulled', 'ZWxQdXRvQW1v');

## Sessions

drop table if exists sda.session;

create table if not exists sda.session
(
    id   int auto_increment primary key,
    user int       not null,
    date timestamp not null default current_timestamp()
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_general_ci;

alter table sda.session
    add constraint session_user_id_fk
        foreign key (user) references sda.user (id)
            on update cascade;

insert into session(user)
VALUES (1);

## Dimensions

drop table if exists sda.topic;

create table sda.topic
(
    id          int auto_increment not null primary key,
    name        varchar(50)        not null,
    description varchar(1000)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_general_ci;

insert into sda.topic(name, description)
VALUES ('Continuous Delivery', ''),
       ('Flow', ''),
       ('Team Topologies', ''),
       ('Security', ''),
       ('Deployment', ''),
       ('Operability', ''),
       ('Reliability', ''),
       ('On-Call', ''),
       ('Testability', ''),
       ('Team Health', '');

## Questions

drop table if exists sda.question;

create table if not exists sda.question
(
    id           int auto_increment not null primary key,
    name         varchar(50)        not null,
    description  varchar(1000)      not null,
    minimum_text varchar(5000)      not null,
    maximum_text varchar(5000)      not null,
    topic_id     int                not null
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_general_ci;

alter table sda.question
    add constraint question_topic_id_fk
        foreign key (topic_id) references sda.topic (id)
            on update cascade;

# Continuous Delivery
INSERT INTO question (name, description, minimum_text, maximum_text, topic_id)
VALUES ('Release Candidate', 'Every Check-in Leads to a Potential Release',
        'We have special "Release Candidate" builds occasionally',
        'Any check-in can generate a build that might go to Production without a further build', 1),
       ('Done', 'Done Means Released [that is, released into Production and not causing problems]',
        'Our Definition of Done means "feature tests have passed"',
        'Our Definition of Done means that the changes are deployed to Production with monitoring to ensure they have not broken anything',
        1),
       ('Automated Config',
        'Configuration should always be performed by automated processes using values taken from your configuration repository',
        'Many of our applications and tests are configured manually each time',
        'All configuration is done using scripts', 1),
       ('Config Options',
        'It should be easy for anyone to see what configuration options are available for a particular version of an application across all environments it will be deployed into',
        'We have to run diffs against different files, some in version control, some taken from live servers',
        'We have an API or UI to show the config options deployed to any environment', 1),
       ('Broken Builds', 'Don’t Check In on a Broken Build [except to fix the broken build!]',
        'We cannot easily know when our team has broken a build',
        'We guard the build with care and never check-in on a broken build', 1),
       ('Failing Tests', 'Don’t Comment Out Failing Tests',
        'We switch off failing tests to get the build or pipeline working',
        'We trust our tests; if the tests are failing, then something is wrong and we go and fix it', 1),
       ('Binaries', 'Only Build Your Binaries Once [no special "release candidate" builds]',
        'We have multiple different builds and then merge to create the final Release Candidate',
        'We have only a single build to produce a binary artifact which then gets promoted through all environments with no additional merging or building needed',
        1),
       ('Stop The Line',
        'If Any Part of the Pipeline Fails, Stop the Line [everyone stops feature work and fixes the problem]',
        'The pipeline fails so often that it is difficult to know which team broke the build',
        'If the pipeline fails, it is very clear which team is responsible and so we stop our work immediately to fix the problem',
        1),
       ('Idempotent Deployment',
        'Ensure the Deployment Process Is Idempotent [we can deploy the same version repeatedly with the same result]',
        'It is difficult to get repeatable deployments',
        'We can redeploy the same version many times with the same result', 1),
       ('Stubs', 'Use Stubs to Simulate External Systems [treat almost every other system as "external"!]',
        'There are few stubs available and we do not have enough time to write the stubs ourselves',
        'The stubs we consume and write are good quality and give us a high degree of confidence that our tests are working well',
        1),
       ('API Replay', 'Record Interactions against a Service or Public API',
        'We have no way to record requests/responses from a remote API',
        'We record key requests/responses from remote APIs which we use to build high-fidelity integration tests', 1),
       ('Blue-Green',
        'Use Blue-Green Deployments [at a granular level] - this means any mechanism that allows you to test a new version alongside an existing version and rollback to the older version if necessary',
        'We do not use any blue-green deployment techniques',
        'We use fine-grained blue-green deployment techniques - at the level of individual services', 1),
       ('Environment History',
        'It should be possible to see a history of changes made to every environment, including deployments',
        'We do not use any blue-green deployment techniques',
        'We have a nice dashboard or log of changes to every environment', 1),
       ('DB Changes',
        'Decouple Application Deployment from Database Migration [and from other data-rich services] - this relates to shared databases',
        'We must deploy our application or service together with the database or data layer',
        'Our application or service is completely decoupled from the underlying database or data layer', 1);

#Flow
INSERT INTO question (name, description, minimum_text, maximum_text, topic_id)
VALUES ('Cycle Time',
        'How long does it take for a code change to go from version control to running in Production? (Minimum, Typical)',
        '2 weeks or more', '1 hour or less', 2),
       ('Deployment Frequency', 'How often does your team deploy to Production?', 'Every 2 weeks or longer in practice',
        'Every 2 days or less', 2),
       ('MTTR', 'How long does it take to restore your application or service after an incident?',
        'We have no idea - we do not track this',
        'We track MTTR and we restore service in 10 mins automatically and test this in the deployment pipeline', 2),
       ('Failed Changes',
        'What proportion of changes to your application or service in Production fail or need remediation? (This is typically the number of failed deployments)',
        'More than 20% of our changes/deployments fail in Production',
        'Less than 5% of our changes/deployments fail in Production', 2),
       ('Work in Progress', 'How many things does your team work on at the same time? (Minimum, Typical)',
        'We have significantly more Work In Progress (WIP) items than team members',
        'We have explicitly limited our WIP based on queuing theory (or Cost of Delay) and the WIP is equal to or less than the number of people in our team',
        2),
       ('Innovation', 'How well are you able to innovate around delivery approaches?',
        'We do not have time to innovate',
        'We make or reserve time for delivery innovation every week and track progress as part of our team metrics', 2),
       ('Onboarding', 'How effective is the onboarding process for new teams and new staff?',
        'The onboarding process is incredibly difficult and really hampers progress',
        'The onboarding process is very simple, straightforward, and clear.', 2),
       ('Branch Age', 'How long do your branches live? (other than master)',
        'Our feature branches last for many sprints',
        'We develop directly on master/trunk and any feature branches last no more than 2 days', 2),
       ('Retrospectives', 'How effective are your team retrospectives?', 'We do not have regular retrospectives',
        'Our retrospectives are really energizing/valuable/effective for the team and we look forward to them', 2);

#3,Team Topologies
INSERT INTO question (name, description, minimum_text, maximum_text, topic_id)
VALUES ('Team Type', 'Is the type of your team clear to you and to other teams around you?',
        'We do not really have "types" of teams.',
        'We are very clear about the type of team we are and we make this clear to other teams around us.', 3),
       ('Long-lived Teams', 'How durable (long-lived) is your team? When will the team be disbanded?',
        'Our team will be disbanded or shuffled within 2-3 months AND/OR Our team will be disbanded when the project finishes.',
        'Our team is durable (long-lived) and will be disbanded only when the software and services we build & run are decommissioned.',
        3),
       ('Changing Team Members', 'How are team members added or removed from the team? What informs the process?',
        'Managers decide when to add or remove people from the team. Team members are expected to start being productive immediately.',
        'We use the principles and practices from Dynamic Reteaming to help build and rebuild teams in a structured, informed way that brings team cohesion, trust, and fresh perspectives.',
        3),
       ('Team API', 'How do you define the remit and focus of the team?',
        'People can look in our backlog or ticket list to see what we\'re working on.',
        'We use the Team API concept from Team Topologies to define, broadcast, and update our team\'s mission, current focus, and interaction details. We update our Team API on a regular cadence (at least every 2 weeks).',
        3),
       ('Team Interactions', 'How do you define, plan, and explore the interactions between your team and other teams?',
        'We interact with other teams when needed (on-demand) OR We don\'t really define or plan interactions with other teams.',
        'We use the team interaction modes from Team Topologies to define/plan/explore interactions with other teams to help us work together and improve our product roadmaps.',
        3),
       ('Inter-team Dependencies', 'What approach do you take to tracking dependencies between teams?',
        'We discover dependencies once every planning cycle OR We do not track inter-team dependencies.',
        'We use the team dependency tracking principles from Team Topologies to explore and remove inter-team dependencies that block the flow of change. We update our team dependency tracking information at least every week.',
        3),
       ('Team Workspace',
        'In what ways does your physical and/or online team space contribute to a sense of team cohesion and empowerment?',
        'We do not have anything that feels like a team space OR Our team space does not feel empowering.',
        'Our physical space in the office feels empowering as "our" space AND/OR Our online space feels empowering as "our" space.',
        3),
       ('Team Cohesion', 'How cohesive does your team feel? How much trust is present inside the team?',
        'Our group does not really act as a team, but more like a collection of individuals with the same manager OR Our team really feels like several sub-teams: we hand off work from one person to another inside the team.',
        'Our team feels like a single cohesive unit. We all work together and help each other (and challenge each other in a good way). We prioritize the team goals over individual goals.',
        3),
       ('Team Cognitive Load', 'How does team cognitive load affect the team\'s work?',
        'Our cognitive load is high OR We do not measure or think about team cognitive load.',
        'We assess team cognitive load and aim to limit the size of our software to the cognitive load that the team can deal with. We know that if our cognitive load limit is exceeded, we will not be able to build and run our software properly. "Team-sized software" is a design principle for this organization.',
        3);

#4,Security
INSERT INTO question (name, description, minimum_text, maximum_text, topic_id)
VALUES ('OWASP Top Ten', 'Do you check for the OWASP Top Ten security risks?',
        'We check for some of the OWASP Top Ten occasionally or manually.',
        'We have automated checks for the OWASP Top Ten that run on every commit/check-in to our deployment pipeline.',
        4),
       ('Secure Design Principles', 'What is the approach to security and compliance?',
        'Compliance with a defined set of criteria is more important than taking the time to do good design.',
        'We value a culture of finding and fixing design issues over checkbox compliance.', 4),
       ('Threat Modeling', 'How do you approach threat modeling?',
        'We build a system and put changes into production. Later, we might ask an expert outside the team to try and break it.',
        'We model our system and review it for threats whenever we are performing design work. We use the four questions frame [1) What are we working on? 2) What can go wrong? 3) What are we going to do about it? 4) Did we do a good job?] to provide structure and repeatability to the process.',
        4),
       ('Domain-driven Security', 'In what ways do you work with domain experts to help make code secure?',
        'We use domain experts to define software features but not secure code.',
        'We use the expertise and viewpoints of domain experts to help us model the domain accurately with deep modeling and domain invariants. This leads to code that is inherently more secure because it uses more specific data types, not just the primitives like String, integer, etc.',
        4),
       ('Input Testing', 'What kind of input testing do you perform in the deployment pipeline?',
        'We do not test the inputs into the software application or we rely on client-side validation only.',
        'We perform at least four types of input testing: Normal input (input that confirms to domain rules), Boundary input (input that conforms only to structural correctness), Invalid input (input like null and strange characters), and Extreme input (such as 40 million characters).',
        4),
       ('Least Privilege',
        'What approach do you take to access permissions for the accounts used to run your software?',
        'We don\'t have a consistent account access policy OR some daemon/Service accounts run as root/Administrator',
        'We use the Principle Of Least Privilege to restrict ALL daemon/Service accounts to the bare minimum permissions needed. Access via interactive logins is highly restricted.',
        4),
       ('Supply-Chain Security',
        'How do you verify the quality and safety of the external software components used in your software?',
        'We do not do any supply-chain validation of external code OR we manually verify every line of code in every external component or library.',
        'We use an open-source or commercial code scanning and notification tool to track, report, and alert on vulnerabilities and malicious code in all external code components and libraries.',
        4),
       ('HTTPS Everywhere', 'Where is HTTPS (HTTP over TLS/SSL) used within your software?',
        'HTTPS is used for externally-accessible services and applications only. Internal applications and services use insecure HTTP only OR Some of our publicly accessible services use insecure HTTP.',
        'All our endpoints - internal and external - use HTTPS (with TLS 1.2 or later) or equivalent secure transport. Security certificates are renewed and installed automatically via a service like LetsEncrypt.',
        4),
       ('Automated Security Testing', 'What kind of automated security testing is performed on your code and when?',
        'We don\'t do any automated security testing OR we run automated security testing at the end of a development cycle',
        'We run automated security checks on the code automatically on every check-in/commit (using tools such as OWASP ZAP) AND software developers can run similar checks before code check-in/commit to increase their awareness of security issues.',
        4),
       ('Responsibility for Security', 'Who is responsible for the security and securability of your software?',
        'A separate Security team reviews our code and performs a "sign-off" before deployment to production/live.',
        'We (the engineers developing the software) are responsible for the security and securability of the software. We seek and get regular help and mentoring from security experts, and we use security and securability features from an internal platform (or external tools) to help us make our software secure and securable.',
        4),
       ('Policy as Code', 'Are security policies defined in code (or configuration) and testable?',
        'We do not use policy-as-code for defining and testing security policies.',
        'We use policy-as-code (such as Open Policy Agent) for defining and testing security policies. The policy-as-code is co-authored with security experts together with engineers.',
        4);

#5,Deployment
INSERT INTO question (name, description, minimum_text, maximum_text, topic_id)
VALUES ('Environment Rebuild',
        'What would happen if we decided to: blow away the environment and rebuild it from our stored configuration',
        'We don''t know what would happen - the environments are flaky',
        'No problem - we test this in the deployment pipeline already', 5),
       ('Fresh Config', 'What would happen if we decided to: delete the application config and redeploy it',
        'We don''t know what would happen - the configuration process is flaky',
        'No problem - we test this in the deployment pipeline already', 5),
       ('Redeploy App', 'What would happen if we decided to: redeploy the application even though nothing has changed',
        'We don''t know what would happen - the deployments are flaky',
        'No problem - we test this in the deployment pipeline already', 5),
       ('Rerun Tests', 'What would happen if we decided to: rerun the test suite and then again',
        'We don''t know what would happen - the test suite is really flaky',
        'No problem - we test this in the deployment pipeline already', 5);

#6,Operability
INSERT INTO question (name, description, minimum_text, maximum_text, topic_id)
VALUES ('Collaboration',
        'How often and in what ways do we collaborate with other teams on operational aspects of the system such as operational features (logging, monitoring, alerting, etc.) and NFRs?',
        'We respond to the need for operational aspects after go-live when tickets are raised by the live service teams',
        'We collaborate on operational aspects from the very first week of the engagement/project', 6),
       ('Spend on operability',
        'What proportion of product budget and team effort is spent addressing operational aspects? How do you track this? [Ignore infrastructure costs and focus on team effort]',
        'We try to spend as little time and effort as possible on operational aspects / We do not track the spend on operational aspects at all',
        'We spend around 30% of our time and budget addressing operational aspects and raise an alert if focus on operational aspects drops',
        6),
       ('Feature Toggles', 'How do we know which feature toggles (feature switches) are active for this subsystem?',
        'We need to run diffs against config files to determine which feature toggles are active',
        'We have a simple UI or API to report the active/inactive feature flags in an environment', 6),
       ('Config deployment', 'How do we deploy a configuration change without redeploying the software?',
        'We cannot deploy a configuration change without deploying the software or causing an outage',
        'We simply run a config deployment separately from the software / We deploy config together with the software without an outage',
        6),
       ('System health', 'How do we know that the system is healthy (or unhealthy)?',
        'We wait for checks made manually by another team to tell us if our software is healthy',
        'We query the software using a standard HTTP health check URL, returning HTTP 200/500, etc. based on logic that we write in the code, and with synthetic transaction monitoring for key scenarios',
        6),
       ('Service KPIs', 'How do we track the main service/system Key Performance Indicators (KPIs)? What are the KPIs?',
        'We do not have service KPIs defined',
        'We use logging and/or time series metrics to emit service KPIs that are picked up by a dashboard', 6),
       ('Logging working', 'How do we know that logging is working correctly?', 'We do not test if logging is working',
        'We test that logging is working using BDD feature tests that search for specific log message strings after a particular application behaviour is executed and we can see logs appear correctly in the central log aggregation/search system',
        6),
       ('Testability', 'How do we show that the software system is easy to test? What do we provide and to whom?',
        'We do not explicitly aim to make our software easily testable',
        'We run clients and external test packs against all parts of our software within our deployment pipeline', 6),
       ('TLS Certs', 'How do we know when an SSL/TLS certificate is close to expiry?',
        'We do not know when our certificates are going to expire',
        'We use auto-renewal of certificates combined with certificate monitoring/alerting tools to keep a live check on when certs will expire so we can take remedial action ahead of time',
        6),
       ('Sensitive data', 'How do we ensure that sensitive data in logs is masked or hidden?',
        'We do not test for sensitive data in logs',
        'We test that data masking is happening by using BDD feature tests that search for specific log message strings after a particular application behaviour is executed',
        6),
       ('Performance', 'How do we know that the system/service performs within acceptable ranges?',
        'We rely solely on the Performance team to validate the performance of our service or application',
        'We run a set of indicative performance tests within our deployment pipeline that are run on every check-in to version control',
        6),
       ('Failure modes',
        'How can we see and share the different known failure modes (failure scenarios) for the system?',
        'We do not really know how the system might fail',
        'We use a set of error identifiers to define the failure modes in our software and we use these identifiers in our log messages',
        6),
       ('Call tracing', 'How do we trace a call/request end-to-end through the system?',
        'We do not trace calls through the system',
        'We use a standard tracing library such as OpenTracing to trace calls through the system. We collaborate with other teams to ensure that the correct tracing fields are maintained across component boundaries.',
        6),
       ('Service status', 'How do we display the current service/system status to operations-facing teams?',
        'Operations teams tend to discover the status indicators themselves',
        'We build a dashboard in collaboration with the Operations teams so they have all the details they need in a user-friendly way with UX a key consideration',
        6);

#7,Reliability
INSERT INTO question (name, description, minimum_text, maximum_text, topic_id)
VALUES ('Service Availability',
        'How available (in "nines") does your service or application need to be and how do you know or decide?',
        'We don''t know how available our service needs to be --OR-- The availability "needs to be 100%".',
        'The reliability is based on clear business priorities and is less than 100%.', 7),
       ('User Goals and SLIs', 'What should your service/application do from the viewpoint of the user?',
        'We do not have a clear definition of what our application or service does from the user perspective.',
        'We have clear, user-centric definitions of the application/service capabilities and outcomes from a user perspective.',
        7),
       ('Understanding users and behavior',
        'Who are the users of the software and how do they interact with the software? How do you know?',
        'We don''t really know how our users interact with our application/service --OR-- We don''t really know who our users are.',
        'We have user personas validated through user research and we measure and track usage of the applications/services using digital telemetry.',
        7),
       ('SLIs/SLOs', 'How do you know when users have experienced an outage or unexpected behavior in the software?',
        'We know there is an outage or problem when users complain via chat or the help desk.',
        'We proactively monitor the user experience using synthetic transactions across the key user journeys.', 7),
       ('Service Health',
        'What is the single most important indicator or metric you use to determine the health and availability of your software in production/live?',
        'We don''t have a single key metric for the health and availability of the application/service.',
        'We have a clear, agreed key metric for each application/service and we display this figure on a team-visible dashboard. The dashboard data is updated at least every 10 minutes.',
        7),
       ('SLIs',
        'What combination of three or four indicators or metrics do you use (or could/would you use) to provide a comprehensive picture of the health and availability of your software in production/live?',
        'We don''t have a set of key metrics for the health and availability of the application/service.',
        'We have a clear, agreed set of key metrics for each application/service and we display this figure on a team-visible dashboard. The dashboard data is updated at least every 10 minutes.',
        7),
       ('Error Budget and similar mechanisms',
        'How does the team know when to spend time on operational aspects of the software (logging, metrics, performance, reliability, security, etc.)? Does that time actually get spent?',
        'We spend time on operational aspects only when there is a problem that needs fixing.',
        'We allocate between 20% and 30% of our time for working on operational aspects and we check this each week. We alert if we have not spent time on operational aspects --OR-- We use SRE Error Budgets to plan our time spent on operational aspects.',
        7),
       ('Alerting',
        'What proportion (approximately) of your time and effort as a team do you spend on making alerts and operational messages more reliable and more relevant?',
        'We spend as little time as possible on alerts and operational messages - we need to focus on user-visible features.',
        'We regularly spend time reviewing and improving alerts and operational messages.', 7),
       ('Toil and fixing problems',
        'What proportion (approx) of your time gets taken up with incidents from live systems and how predictable is the time needed to fix problems?',
        'We do not deal with issues from live systems at all - we focus on new features --OR-- live issues can really affect our delivery cadence and are very disruptive.',
        'We allocate a consistent amount of time for dealing with live issues --OR-- one team member is responsible for triage of live issues each week OR we rarely have problems with live issues because the software works well.',
        7),
       ('Time to Diagnose',
        'How long does it typically take to diagnose problems in the live/production environment? This is the time taken to understand and pinpoint what is wrong (not to fix or remediate the problem).',
        'It can take hours or days to diagnose most problems in live/production.',
        'It typically takes seconds or minutes to diagnose most problems in live/production.', 7);

#8,On-Call
INSERT INTO question (name, description, minimum_text, maximum_text, topic_id)
VALUES ('Purpose of on-call', 'How would you define \'on-call\'?',
        'On-call is a way to get developers to fix problems that people in Support or Live Services don''t know how to fix.',
        'On-call is a sensing mechanism to help teams build better software.', 8),
       ('Benefits of on-call', 'What are some ways in which the software benefits by having developers on-call?',
        'Bugs are fixed quickly.',
        'The needs of all kinds of users can be better understood by having team members on-call. We can better empathize with primary/secondary/tertiary users by seeing the problems for ourselves.',
        8),
       ('Reward', 'How are you rewarded for being on-call out of working hours?',
        'Significant compensation/money - 3x or 4x normal salary - plus additional time off. The more bugs in the software that reach live/production, the more money we make.',
        'We are recognized for our increasing skills as engineers: experience from on-call counts towards our performance reviews. We may also get some time off to recover from out-of-hours on-call and/or some additional money for out-of-hours on-call. Overall, on-call feels valuable for our careers.',
        8),
       ('On-call UX', 'What is the User Experience (UX) / Developer Experience (DevEx) of being on-call at the moment?',
        'It is painful and slow to diagnose problems.',
        'The tools and access rights make diagnosis exciting and an opportunity to learn.', 8),
       ('Learning from on-call',
        'What happens to knowledge gained during on-call? How is the software improved based on on-call experiences?',
        'Little time is allocated to fix problems after they are discovered when on-call.',
        'Learning from on-call is used to prioritize key aspects of the team\'s work.', 8),
       ('Attitude to on-call', 'Under what circumstances would on-call not be a burden?',
        'On-call would not be a burden if we never had to do it.',
        'On-call is not a burden - it\'s a privilege to be able to learn how the software actually works.', 8),
       ('Future on-call', 'What would be needed for this team/squad to be happy to be on-call?',
        'We would want significant additional money/compensation.',
        'We would want a great UX/DevEx and opportunity to learn when on-call.', 8),
       ('Tooling for on-call',
        'What tooling or process is missing, ineffective, or insufficient at the moment in relation to on-call?',
        'All aspects of the on-call experience are ineffective.', 'Only very small things feel like a problem.', 8),
       ('Improving on-call',
        'How much time do you spend as a team improving the on-call experience? How often do you work on improvements to on-call?',
        'We don\'t have time to improve the on-call experience.',
        'We make improvements and tweaks to on-call every week - it\'s continuous and part of our remit.', 8),
       ('Flexibility of on-call',
        'How flexible is the on-call rota or schedule? In what ways does the schedule meet the different needs of team members?',
        'Everyone must follow the same on-call schedule, including out-of-hours work.',
        'Team members have flexibility to fit on-call work around their personal commitments and/or can opt to do on-call work solely during working hours (office hours).',
        8),
       ('Accessibility of on-call',
        'How accessible is on-call? Specifically, what proportion of your team members are actually on-call regularly?',
        'Only one or two people from our team typically go on-call. Other people find on-call too difficult or confusing.',
        'Everyone on our team takes part regularly in the on-call rota, whether during office hours or out-of-hours. We all share our on-call experiences and learning.',
        8);

#9,Testability
INSERT INTO question (name, description, minimum_text, maximum_text, topic_id)
VALUES ('Test-first (classes)', 'What proportion of the time do you write the test first for methods and classes?',
        'We often do not have time to use a test-first approach',
        'We use a test-first approach all the time - it''s the only way to get good software!', 9),
       ('Test-first (features)', 'What proportion of the time do you write the test first for features and behavior?',
        'We often do not have time to use a test-first approach',
        'We use a test-first approach all the time - it''s the only way to get good software!', 9),
       ('Unit Test %', 'At what code coverage level do you deem your Unit Tests to have succeeded?',
        'Our unit tests succeed with 10% coverage', 'Our unit tests succeed with 80% or greater coverage', 9),
       ('Feature Tests %',
        'At what feature coverage level do you deem your Feature Tests (or Behavior Tests) to have succeeded?',
        'Our feature tests succeed with 10% coverage', 'Our feature tests succeed with 100% coverage', 9),
       ('Feature Coverage',
        'What proportion of the features in your code is covered by a Feature Test (or Behavior Test)?',
        'Less than 50% of our features have corresponding feature tests',
        'Every one of our features has at least one corresponding feature test', 9),
       ('Test Data',
        'What proportion of your test data is generated from scripts and automatically injected into data stores?',
        'We have manual processes for setting up test data',
        'All our test data is generated from scripts and injected into data stores as part of automated testing', 9),
       ('Deployment',
        'What proportion of your deployment pipeline code has tests covering the behavior of build and deployment?',
        'We do not test our build and deployment code',
        'We have tests (such as Deployment Verification Tests) for the key parts of our build and deployment scripts and the code is modular and well-structured',
        9),
       ('Testability', 'What proportion of your time is spent on making the software testable?',
        'We do not spend time making our software testable',
        'We refactor regularly to make our software more testable - every sprint or week', 9),
       ('CDCs/Pact/SemVer',
        'How much do you use inter-team testing approaches such as Consumer-Driven Contracts (CDCs)/Pact/Semantic Versioning?',
        'We just use the latest versions of each component or package',
        'We use CDCs / Pact to help test interface changes. We use Semantic Versioning to communicate the meaning of changes, including any breaking changes. We strive to make no breaking changes at all using the Tolerant Reader pattern.',
        9),
       ('Other Code',
        'How confident are you in the code from other teams in the organization that you work with or consume (but not write)?',
        'Code from other teams is really flaky and unpredictable.',
        'We are confident in using code from other teams due to our comprehensive automated test suites', 9);

#10,Team Health
INSERT INTO question (name, description, minimum_text, maximum_text, topic_id)
VALUES ('Easy to release', 'how easy is it to release a change to the software you work on?',
        'It is difficult to release a change', 'It is easy and straightforward to release a change', 10),
       ('Suitable process', 'how suitable is the process for developing and delivering software?',
        'The process is cumbersome and unhelpful', 'The process is mostly hidden and we barely feel it', 10),
       ('Tech quality', '(code base health) - how healthy is the code base?',
        'Our code base is piled with workarounds and danger areas',
        'Our code base is clean, safe to use, and well-tested', 10),
       ('Value', 'do you work on valuable things as a team?', 'We are disconnected from customer or user value',
        'We live and breathe a value-driven team approach', 10),
       ('Speed', 'how rapidly do you work as a team?', 'We seem to take a long time to get things done',
        'We deliver work rapidly together', 10),
       ('Mission', 'how well do you know why you are working on things?', 'It is rarely clear what our mission is',
        'We have a clear mission that we share with all stakeholders', 10),
       ('Fun', 'how fun is it to work in your team? How much camaraderie and sense of teamwork?',
        'Fun is rarely an aspect of our teamwork', 'The team is a fun place to be every day', 10),
       ('Learning', 'how much do you learn as a team?', 'Fun is rarely an aspect of our teamwork',
        'The team is a fun place to be every day', 10),
       ('Support', 'how much support do you get as a team?', 'We get very little support as a team',
        'We are well-supported as a team', 10),
       ('Pawns or players', 'how much control do you have over what you work on and how?',
        'We have very little say in what we work on', 'We have strong influence over what we work on', 10),
       ('Psychological Safety', 'how safe do you feel to raise concerns?',
        'If we raise concerns we are shouted down and ignored',
        'Our concerns are valued and used to help improve the team and organisation', 10),
       ('Teams Around Us', 'how well do the teams around you work with you and your team?',
        'Teams around us are unhelpful and rude',
        'Teams around us are very friendly and helpful - it''s a joy to work with the other teams', 10),
       ('Delivery Platform',
        'how effective and easy to use is the delivery platform underpinning your team''s delivery?',
        'The platform seems to obstruct us and is difficult to use',
        'The platform is a force-multiplier for us and helps us deliver rapidly and safely. We love the platform.', 10),
       ('Management Style',
        'how effective and appropriate are the approaches by management and other senior stakeholders?',
        'The management approaches really hamper our efforts',
        'The management approaches help us to deliver rapidly and safely', 10);

## Sessions Dimensions

drop table if exists sda.sessions_topic;

create table if not exists sda.sessions_topic
(
    id         int unique auto_increment not null,
    session_id int                       not null,
    topic_id   int                       not null
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_general_ci;

alter table sda.sessions_topic
    add constraint sessions_topic_session_id_fk
        foreign key (session_id) references sda.session (id)
            on update cascade;

alter table sda.sessions_topic
    add constraint sessions_topic_topic_id_fk
        foreign key (topic_id) references sda.topic (id)
            on update cascade;

insert into sda.sessions_topic(session_id, topic_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (1, 5),
       (1, 6),
       (1, 7),
       (1, 9);

select session.date, t.name, user.name
from session
         inner join sda.sessions_topic st on session.id = st.session_id
         inner join sda.topic t on st.topic_id = t.id
         inner join user on session.user = user.id;