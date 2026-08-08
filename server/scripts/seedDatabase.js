import mongoose from "mongoose"
import Organization from "../models/Organization.js"
import Seeker from "../models/Seeker.js"
import Job from "../models/Job.js"
import Application from "../models/Application.js"
import "dotenv/config"


function randomPastDate(days = 60) {
    const now = Date.now()
    const maxOffset = days * 24 * 60 * 60 * 1000
    return new Date(now - Math.floor(Math.random() * maxOffset))
}

const organizations = [
    {
        orgName: "TechNova Solutions",
        email: "technova@test.com",
        password: "1234"
    },
    {
        orgName: "ByteForge Labs",
        email: "byteforge@test.com",
        password: "1234"
    },
    {
        orgName: "CloudPeak Technologies",
        email: "cloudpeak@test.com",
        password: "1234"
    },
    {
        orgName: "UrbanBridge Systems",
        email: "urbanbridge@test.com",
        password: "1234"
    },
    {
        orgName: "Nexora Innovations",
        email: "nexora@test.com",
        password: "1234"
    }
]

const seekers = [
    {
        seekerName: "Rahul Sharma",
        email: "rahul@test.com",
        password: "1234"
    },
    {
        seekerName: "Priya Nair",
        email: "priya@test.com",
        password: "1234"
    },
    {
        seekerName: "Arjun Reddy",
        email: "arjun@test.com",
        password: "1234"
    },
    {
        seekerName: "Sneha Patel",
        email: "sneha@test.com",
        password: "1234"
    },
    {
        seekerName: "Ananya Gupta",
        email: "ananya@test.com",
        password: "1234"
    },
    {
        seekerName: "John Miller",
        email: "john@test.com",
        password: "1234"
    },
    {
        seekerName: "Emma Wilson",
        email: "emma@test.com",
        password: "1234"
    },
    {
        seekerName: "David Kim",
        email: "david@test.com",
        password: "1234"
    },
    {
        seekerName: "Sophia Martinez",
        email: "sophia@test.com",
        password: "1234"
    },
    {
        seekerName: "Daniel Brown",
        email: "daniel@test.com",
        password: "1234"
    }
]

const jobs = [
    {
        jobTitle: "Frontend Developer",
        location: "Bengaluru, India",
        jobType: "Full Time",
        salary: "₹10,00,000 - ₹14,00,000",

        jobDescription: `About the Role

We are looking for a passionate Frontend Developer to join our engineering team. You will work closely with UI/UX designers and backend developers to build responsive, scalable, and user-friendly web applications using modern frontend technologies.

Responsibilities

• Develop reusable React components.
• Integrate REST APIs with frontend applications.
• Write clean, maintainable JavaScript code.
• Optimize application performance.
• Participate in code reviews.

Requirements

• Strong knowledge of HTML, CSS and JavaScript.
• Experience with React.
• Good understanding of Git.
• Ability to debug frontend issues.

Preferred Skills

• Tailwind CSS
• TypeScript
• Node.js
• Basic knowledge of UI/UX principles`
    },

    {
        jobTitle: "Backend Developer",
        location: "Hyderabad, India",
        jobType: "Full Time",
        salary: "₹12,00,000 - ₹16,00,000",

        jobDescription: `About the Role

Join our backend engineering team to design scalable REST APIs and database solutions powering thousands of users. You will collaborate with frontend developers and DevOps engineers to build reliable services.

Responsibilities

• Build REST APIs using Node.js and Express.
• Design MongoDB schemas.
• Improve API performance.
• Write reusable backend modules.
• Maintain application security.

Requirements

• Strong JavaScript knowledge.
• Experience with Express.js.
• MongoDB fundamentals.
• Git and debugging skills.

Preferred Skills

• Docker
• Redis
• AWS
• Authentication using JWT or Sessions`
    },

    {
        jobTitle: "Full Stack Developer",
        location: "Pune, India",
        jobType: "Full Time",
        salary: "₹14,00,000 - ₹18,00,000",

        jobDescription: `About the Role

As a Full Stack Developer, you will own features from idea to deployment. You will work across frontend and backend systems while collaborating with product managers and designers.

Responsibilities

• Build frontend interfaces using React.
• Develop backend APIs.
• Design MongoDB collections.
• Write reusable code.
• Participate in architecture discussions.

Requirements

• React
• Node.js
• MongoDB
• Express.js
• Git

Preferred Skills

• CI/CD
• Docker
• Cloud deployment
• Testing frameworks`
    },

    {
        jobTitle: "Data Analyst",
        location: "Mumbai, India",
        jobType: "Full Time",
        salary: "₹8,00,000 - ₹12,00,000",

        jobDescription: `About the Role

We are seeking a Data Analyst who enjoys transforming raw datasets into meaningful business insights. You will work with stakeholders to prepare reports and dashboards that drive business decisions.

Responsibilities

• Analyze business datasets.
• Create reports and dashboards.
• Perform data cleaning.
• Present insights to stakeholders.
• Automate recurring reports.

Requirements

• SQL
• Excel
• Data visualization
• Analytical thinking

Preferred Skills

• Python
• Power BI
• Tableau
• Statistics`
    },

    {
        jobTitle: "DevOps Engineer",
        location: "Chennai, India",
        jobType: "Full Time",
        salary: "₹15,00,000 - ₹20,00,000",

        jobDescription: `About the Role

We are looking for a DevOps Engineer to automate deployments and improve infrastructure reliability. You will work closely with software engineers to maintain scalable cloud environments.

Responsibilities

• Build CI/CD pipelines.
• Monitor infrastructure.
• Manage cloud deployments.
• Automate operational tasks.
• Improve system reliability.

Requirements

• Linux
• Docker
• Kubernetes
• CI/CD concepts

Preferred Skills

• AWS
• Terraform
• Monitoring tools
• Bash scripting`
    },

    {
        jobTitle: "Machine Learning Engineer",
        location: "Singapore",
        jobType: "Full Time",
        salary: "₹22,00,000 - ₹30,00,000",

        jobDescription: `About the Role

Join our AI team to build intelligent systems that solve real-world problems using machine learning and deep learning. You will work with large datasets and deploy production-ready ML models.

Responsibilities

• Build ML models.
• Train and evaluate datasets.
• Deploy inference services.
• Improve model accuracy.
• Collaborate with data engineers.

Requirements

• Python
• Machine Learning
• Deep Learning
• Statistics

Preferred Skills

• PyTorch
• TensorFlow
• NLP
• MLOps`
    },
    {
        jobTitle: "Cloud Engineer",
        location: "Seattle, USA",
        jobType: "Full Time",
        salary: "₹20,00,000 - ₹28,00,000",

        jobDescription: `About the Role

Join our cloud engineering team to build secure and scalable cloud infrastructure. You will work on deployment automation, cloud networking, and infrastructure monitoring while collaborating with software engineers.

Responsibilities

• Design cloud infrastructure.
• Maintain cloud resources.
• Improve deployment reliability.
• Monitor production environments.
• Troubleshoot cloud-related issues.

Requirements

• AWS or Azure
• Linux
• Networking fundamentals
• Infrastructure concepts

Preferred Skills

• Terraform
• Kubernetes
• Docker
• CI/CD`
    },

    {
        jobTitle: "UI/UX Designer",
        location: "London, UK",
        jobType: "Full Time",
        salary: "₹12,00,000 - ₹18,00,000",

        jobDescription: `About the Role

We're looking for a creative UI/UX Designer to design modern, intuitive interfaces that provide excellent user experiences across web applications.

Responsibilities

• Create wireframes.
• Design responsive interfaces.
• Conduct usability testing.
• Collaborate with developers.
• Maintain design systems.

Requirements

• Figma
• UI Design
• UX Principles
• Communication skills

Preferred Skills

• Adobe XD
• Prototyping
• Design Systems
• HTML/CSS basics`
    },

    {
        jobTitle: "Android Developer",
        location: "Bengaluru, India",
        jobType: "Full Time",
        salary: "₹11,00,000 - ₹16,00,000",

        jobDescription: `About the Role

Help build high-performance Android applications that are used by thousands of users. You'll work closely with product managers and backend developers.

Responsibilities

• Develop Android apps.
• Consume REST APIs.
• Improve app performance.
• Fix bugs.
• Publish application updates.

Requirements

• Kotlin
• Android SDK
• Git
• REST APIs

Preferred Skills

• Jetpack Compose
• Firebase
• MVVM
• Room Database`
    },

    {
        jobTitle: "Cyber Security Analyst",
        location: "Berlin, Germany",
        jobType: "Full Time",
        salary: "₹18,00,000 - ₹24,00,000",

        jobDescription: `About the Role

Join our security team to protect enterprise applications and infrastructure from evolving cyber threats through proactive monitoring and risk assessments.

Responsibilities

• Monitor security toasts.
• Perform vulnerability assessments.
• Investigate incidents.
• Prepare security reports.
• Improve security policies.

Requirements

• Networking
• Cyber Security fundamentals
• Linux
• Problem solving

Preferred Skills

• SIEM
• Penetration Testing
• OWASP
• Python`
    },

    {
        jobTitle: "Product Manager",
        location: "Toronto, Canada",
        jobType: "Full Time",
        salary: "₹18,00,000 - ₹25,00,000",

        jobDescription: `About the Role

Lead product development by working closely with engineering, design, and business teams. Translate customer feedback into impactful product features.

Responsibilities

• Define product roadmap.
• Prioritize features.
• Coordinate with stakeholders.
• Analyze product metrics.
• Improve customer experience.

Requirements

• Product thinking
• Communication
• Leadership
• Problem solving

Preferred Skills

• Agile
• Scrum
• Analytics
• User research`
    },

    {
        jobTitle: "QA Engineer",
        location: "Hyderabad, India",
        jobType: "Full Time",
        salary: "₹8,00,000 - ₹12,00,000",

        jobDescription: `About the Role

Ensure software quality by planning, designing, and executing manual and automated tests throughout the development lifecycle.

Responsibilities

• Write test cases.
• Perform manual testing.
• Report bugs.
• Verify bug fixes.
• Improve testing processes.

Requirements

• Software Testing
• Analytical skills
• Attention to detail

Preferred Skills

• Selenium
• Cypress
• Playwright
• API Testing`
    },

    {
        jobTitle: "Software Engineer Intern",
        location: "Remote",
        jobType: "Internship",
        salary: "₹35,000 / month",

        jobDescription: `About the Role

This internship is designed for students and recent graduates who are passionate about software engineering. You'll receive mentorship while contributing to real-world projects.

Responsibilities

• Assist senior developers.
• Fix bugs.
• Build small features.
• Write documentation.
• Participate in team meetings.

Requirements

• Basic programming knowledge.
• Problem-solving skills.
• Willingness to learn.

Preferred Skills

• React
• Node.js
• Git
• MongoDB`
    }
]

const applications = [
    { seekerIndex: 0, jobIndex: 0, status: "accepted" },
    { seekerIndex: 1, jobIndex: 0, status: "rejected" },
    { seekerIndex: 2, jobIndex: 0, status: "pending" },

    { seekerIndex: 3, jobIndex: 1, status: "accepted" },
    { seekerIndex: 4, jobIndex: 1, status: "pending" },
    { seekerIndex: 5, jobIndex: 1, status: "rejected" },

    { seekerIndex: 6, jobIndex: 2, status: "accepted" },
    { seekerIndex: 7, jobIndex: 2, status: "pending" },
    { seekerIndex: 8, jobIndex: 2, status: "rejected" },

    { seekerIndex: 9, jobIndex: 3, status: "pending" },
    { seekerIndex: 0, jobIndex: 3, status: "accepted" },

    { seekerIndex: 1, jobIndex: 4, status: "pending" },
    { seekerIndex: 2, jobIndex: 4, status: "accepted" },
    { seekerIndex: 3, jobIndex: 4, status: "rejected" },

    { seekerIndex: 4, jobIndex: 5, status: "accepted" },
    { seekerIndex: 5, jobIndex: 5, status: "pending" },
    { seekerIndex: 6, jobIndex: 5, status: "rejected" },

    { seekerIndex: 7, jobIndex: 6, status: "pending" },
    { seekerIndex: 8, jobIndex: 6, status: "accepted" },

    { seekerIndex: 9, jobIndex: 7, status: "accepted" },
    { seekerIndex: 0, jobIndex: 7, status: "pending" },

    { seekerIndex: 1, jobIndex: 8, status: "accepted" },
    { seekerIndex: 2, jobIndex: 8, status: "pending" },

    { seekerIndex: 3, jobIndex: 9, status: "rejected" },
    { seekerIndex: 4, jobIndex: 9, status: "accepted" },

    { seekerIndex: 5, jobIndex: 10, status: "pending" },
    { seekerIndex: 6, jobIndex: 10, status: "accepted" },

    { seekerIndex: 7, jobIndex: 11, status: "pending" },
    { seekerIndex: 8, jobIndex: 11, status: "rejected" }
]

export async function seedDatabase() {
    try {
        await mongoose.connect(process.env.DB_URL_LINK)

        // -----------------------------
        // Seed Organizations
        // -----------------------------
        const createdOrganizations = []

        for (const org of organizations) {
            const createdOrg = await Organization.create({
                orgName: org.orgName,
                email: org.email,
                password: org.password
            })

            createdOrganizations.push(createdOrg)
        }

        // -----------------------------
        // Seed Seekers
        // -----------------------------
        const createdSeekers = []

        for (const seeker of seekers) {

            const createdSeeker = await Seeker.create({
                seekerName: seeker.seekerName,
                email: seeker.email,
                password: seeker.password
            })

            createdSeekers.push(createdSeeker)
        }

        // -----------------------------
        // Seed Jobs
        // -----------------------------
        const createdJobs = []

        for (let i = 0; i < jobs.length; i++) {

            // Every organization gets a few jobs.
            const organization = createdOrganizations[i % createdOrganizations.length]

            const createdJob = await Job.create({
                ...jobs[i],
                postedBy: organization._id,
                applicantCount: 0
            })

            const jobDate = randomPastDate(45)

            createdJob.createdAt = jobDate
            createdJob.updatedAt = jobDate
            await createdJob.save()

            createdJobs.push(createdJob)
        }

        // -----------------------------
        // Seed Applications
        // -----------------------------
        const createdApplications = []

        for (const application of applications) {

            const createdApplication = await Application.create({
                seekerId: createdSeekers[application.seekerIndex]._id,
                jobId: createdJobs[application.jobIndex]._id,
                status: application.status
            })

            // Application should happen AFTER the job was posted.
            const postedDate = createdJobs[application.jobIndex].createdAt

            const appliedDate = new Date(
                postedDate.getTime() +
                Math.random() * (Date.now() - postedDate.getTime())
            )

            createdApplication.createdAt = appliedDate
            createdApplication.updatedAt = appliedDate

            await createdApplication.save()

            createdApplications.push(createdApplication)

            // Keep applicantCount in sync
            await Job.findByIdAndUpdate(
                createdJobs[application.jobIndex]._id,
                {
                    $inc: {
                        applicantCount: 1
                    }
                }
            )
        }

        // -----------------------------
        // Success Summary
        // -----------------------------

        console.log("\n===================================================")
        console.log("           DATABASE SEEDED SUCCESSFULLY")
        console.log("===================================================\n")

        console.log("Organizations")
        console.table(
            organizations.map(org => ({
                Company: org.orgName,
                Email: org.email,
                Password: org.password
            }))
        )

        console.log("\nJob Seekers")
        console.table(
            seekers.map(seeker => ({
                Name: seeker.seekerName,
                Email: seeker.email,
                Password: seeker.password
            }))
        )

        console.log("\nSummary")
        console.log("----------------------------------------")
        console.log(`Organizations : ${createdOrganizations.length}`)
        console.log(`Seekers       : ${createdSeekers.length}`)
        console.log(`Jobs          : ${createdJobs.length}`)
        console.log(`Applications  : ${createdApplications.length}`)
        console.log("----------------------------------------")

    }
    catch (err) {
        console.error("\nSeeding failed.\n")
        console.error(err)
    }
    finally {
        await mongoose.connection.close()
    }
}

await seedDatabase()